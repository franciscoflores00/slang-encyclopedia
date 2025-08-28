// Debug script to check term counts
import { getAllCategories } from './lib/api.js'

async function checkTermCounts() {
  console.log('🔍 Checking term counts...')
  
  try {
    const categories = await getAllCategories()
    
    console.log('\n📊 Categories with term counts:')
    categories
      .filter(cat => cat.term_count > 0)
      .forEach(cat => {
        console.log(`✅ ${cat.name} (${cat.slug}): ${cat.term_count} terms`)
      })
    
    console.log('\n📈 Categories with 0 terms:')
    const zeroTermCategories = categories.filter(cat => cat.term_count === 0)
    console.log(`Found ${zeroTermCategories.length} categories with 0 terms`)
    
    if (zeroTermCategories.length < 10) {
      zeroTermCategories.forEach(cat => {
        console.log(`❌ ${cat.name} (${cat.slug}): 0 terms`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkTermCounts()