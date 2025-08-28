// Script to insert scraped hobbies into Supabase database
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertScrapedHobbies() {
  console.log('🚀 Starting to insert scraped hobbies...')
  
  // Read the cleaned hobby data
  let hobbiesData
  try {
    hobbiesData = JSON.parse(fs.readFileSync('hobbies-final-clean.json', 'utf8'))
  } catch (error) {
    console.error('❌ Could not read hobbies-final-clean.json:', error.message)
    console.log('💡 Make sure to run clean-hobbies-final.js first')
    process.exit(1)
  }
  
  console.log(`📊 Found ${hobbiesData.totalHobbies} hobbies to insert`)
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  const errors = []
  
  // Process in batches to avoid overwhelming the database
  const batchSize = 10
  const batches = []
  
  for (let i = 0; i < hobbiesData.categoriesFormat.length; i += batchSize) {
    batches.push(hobbiesData.categoriesFormat.slice(i, i + batchSize))
  }
  
  console.log(`📦 Processing ${batches.length} batches of ${batchSize} hobbies each...\n`)
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex]
    console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length}...`)
    
    for (const hobby of batch) {
      try {
        // Check if category already exists
        const { data: existing } = await supabase
          .from('categories')
          .select('id, name')
          .eq('slug', hobby.slug)
          .single()
        
        if (existing) {
          console.log(`⏭️  Skipping "${hobby.name}" - already exists`)
          skipCount++
          continue
        }
        
        // Insert the new category
        const { error } = await supabase
          .from('categories')
          .insert({
            name: hobby.name,
            slug: hobby.slug,
            description: hobby.description,
            emoji: hobby.emoji,
            color: hobby.color
          })
        
        if (error) {
          console.error(`❌ Error inserting "${hobby.name}":`, error.message)
          errorCount++
          errors.push({ hobby: hobby.name, error: error.message })
        } else {
          console.log(`✅ Successfully inserted "${hobby.name}"`)
          successCount++
        }
        
      } catch (err) {
        console.error(`❌ Unexpected error with "${hobby.name}":`, err.message)
        errorCount++
        errors.push({ hobby: hobby.name, error: err.message })
      }
    }
    
    // Small delay between batches to be respectful to the database
    if (batchIndex < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }
  
  console.log('\n📊 Final Summary:')
  console.log(`✅ Successfully inserted: ${successCount} hobbies`)
  console.log(`⏭️  Skipped (already exist): ${skipCount} hobbies`)
  console.log(`❌ Errors: ${errorCount} hobbies`)
  console.log(`📈 Total processed: ${successCount + skipCount + errorCount}`)
  
  if (errors.length > 0) {
    console.log('\n❌ Error details:')
    errors.slice(0, 10).forEach(e => console.log(`  - ${e.hobby}: ${e.error}`))
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`)
    }
  }
  
  if (successCount > 0) {
    console.log('\n🎉 Success! Your Hobbipedia now has hundreds of new hobby categories!')
    console.log('🔍 You can view them at /categories on your website')
    console.log('📝 Consider adding terms to these new categories to build out your content')
  }
}

// Run the script
insertScrapedHobbies()
  .then(() => {
    console.log('\n✨ Script completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error)
    process.exit(1)
  })