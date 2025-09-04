import { createClient } from '@supabase/supabase-js'
import { allCategories } from '../lib/all-categories'

// Load environment variables
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertCategories() {
  console.log(`🚀 Starting to insert ${allCategories.length} categories...`)
  
  let successCount = 0
  let errorCount = 0
  const errors: any[] = []

  for (const category of allCategories) {
    try {
      // Check if category already exists
      const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category.slug)
        .single()

      if (existing) {
        console.log(`⏭️  Skipping ${category.name} - already exists`)
        continue
      }

      // Insert the category
      const { error } = await supabase
        .from('categories')
        .insert({
          name: category.name,
          slug: category.slug,
          description: category.description,
          emoji: category.emoji,
          color: category.color,
          term_count: 0
        })

      if (error) {
        console.error(`❌ Error inserting ${category.name}:`, error.message)
        errorCount++
        errors.push({ category: category.name, error: error.message })
      } else {
        console.log(`✅ Successfully inserted ${category.name}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Unexpected error with ${category.name}:`, err)
      errorCount++
      errors.push({ category: category.name, error: err })
    }
  }

  console.log('\n📊 Summary:')
  console.log(`✅ Successfully inserted: ${successCount} categories`)
  console.log(`❌ Errors: ${errorCount}`)
  
  if (errors.length > 0) {
    console.log('\n❌ Error details:')
    errors.forEach(e => console.log(`  - ${e.category}: ${e.error}`))
  }
}

// Run the script
insertCategories()
  .then(() => {
    console.log('\n✨ Script completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error)
    process.exit(1)
  })