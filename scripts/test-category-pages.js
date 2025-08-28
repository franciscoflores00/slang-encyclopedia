// Simple script to test category page accessibility
const categoryTests = [
  'cycling',
  'programming', 
  'cooking',
  'basketball',
  'astronomy',
  'chess',
  '3d-printing',
  'mixed-martial-arts',
  'video-games',
  'language-learning',
  'stamp-collecting'
]

async function testCategoryPages() {
  console.log('🧪 Testing category page accessibility...\n')
  
  let successCount = 0
  let errorCount = 0
  
  for (const slug of categoryTests) {
    try {
      const response = await fetch(`http://localhost:3000/category/${slug}`)
      
      if (response.ok) {
        console.log(`✅ /category/${slug} - Status: ${response.status}`)
        successCount++
      } else if (response.status === 404) {
        console.log(`❌ /category/${slug} - Not Found (404)`)
        errorCount++
      } else {
        console.log(`⚠️  /category/${slug} - Status: ${response.status}`)
        errorCount++
      }
    } catch (error) {
      console.log(`💥 /category/${slug} - Error: ${error.message}`)
      errorCount++
    }
  }
  
  console.log(`\n📊 Test Results:`)
  console.log(`✅ Successful: ${successCount}/${categoryTests.length}`)
  console.log(`❌ Failed: ${errorCount}/${categoryTests.length}`)
  
  if (errorCount === 0) {
    console.log('\n🎉 All category pages are accessible!')
  } else {
    console.log('\n⚠️  Some category pages need attention.')
  }
}

// Only run if called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  testCategoryPages().catch(console.error)
}

export { testCategoryPages }