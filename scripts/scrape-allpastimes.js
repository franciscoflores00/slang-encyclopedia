// Script to scrape hobbies from allpastimes.com
// This site appears to use dynamic content, so we'll need to try different approaches

const baseUrl = 'https://www.allpastimes.com'
const hobbies = new Set() // Use Set to avoid duplicates

// Function to try different hobby page patterns
async function tryHobbyPatterns() {
  console.log('🔍 Trying to discover hobby page patterns...')
  
  const patterns = [
    // Try numbered pages
    ...Array.from({length: 100}, (_, i) => `${baseUrl}/hobby${i + 1}`),
    // Try letter-based pages
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `${baseUrl}/hobbies-${letter.toLowerCase()}`),
    // Try category pages
    `${baseUrl}/hobbies`,
    `${baseUrl}/hobby-list`,
    `${baseUrl}/all-hobbies`,
    `${baseUrl}/categories`,
    `${baseUrl}/pastimes`,
  ]
  
  let successCount = 0
  let foundHobbies = []
  
  // Test first few patterns to see what works
  for (let i = 0; i < Math.min(10, patterns.length); i++) {
    const url = patterns[i]
    console.log(`Testing: ${url}`)
    
    try {
      const response = await fetch(url)
      console.log(`  Status: ${response.status}`)
      
      if (response.ok) {
        const html = await response.text()
        
        // Look for common patterns that might indicate hobby names
        const hobbyPatterns = [
          /<h1[^>]*>([^<]+)<\/h1>/gi,
          /<h2[^>]*>([^<]+)<\/h2>/gi,
          /<title>([^<]+)<\/title>/gi,
          /hobby["\s]*:[\s]*["']([^"']+)["']/gi,
          /name["\s]*:[\s]*["']([^"']+)["']/gi,
        ]
        
        hobbyPatterns.forEach(pattern => {
          const matches = [...html.matchAll(pattern)]
          matches.forEach(match => {
            const hobbyName = match[1].trim()
            if (hobbyName && hobbyName.length > 2 && hobbyName.length < 100) {
              foundHobbies.push({ url, name: hobbyName })
              hobbies.add(hobbyName)
            }
          })
        })
        
        successCount++
      }
    } catch (error) {
      console.log(`  Error: ${error.message}`)
    }
    
    // Add delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log(`\n📊 Discovery Results:`)
  console.log(`✅ Successful requests: ${successCount}`)
  console.log(`🎯 Unique hobbies found: ${hobbies.size}`)
  
  if (foundHobbies.length > 0) {
    console.log(`\n🎨 Sample hobbies found:`)
    foundHobbies.slice(0, 10).forEach(hobby => {
      console.log(`  - ${hobby.name} (from ${hobby.url})`)
    })
  }
  
  return Array.from(hobbies)
}

// Alternative approach: Try to find sitemap or robots.txt
async function checkSitemapAndRobots() {
  console.log('\n🗺️ Checking for sitemap and robots.txt...')
  
  const urls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/robots.txt`,
    `${baseUrl}/sitemap_index.xml`,
  ]
  
  for (const url of urls) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const content = await response.text()
        console.log(`✅ Found ${url}`)
        
        // Extract URLs from sitemap
        if (url.includes('sitemap')) {
          const urlMatches = [...content.matchAll(/<loc>([^<]+)<\/loc>/gi)]
          const hobbyUrls = urlMatches
            .map(match => match[1])
            .filter(url => url.includes('hobby'))
          
          console.log(`  Found ${hobbyUrls.length} hobby URLs in sitemap`)
          return hobbyUrls.slice(0, 20) // Return first 20 for testing
        }
      }
    } catch (error) {
      console.log(`❌ Could not access ${url}: ${error.message}`)
    }
  }
  
  return []
}

// Main execution
async function main() {
  console.log('🚀 Starting allpastimes.com hobby scraper...')
  console.log(`🎯 Target: ${baseUrl}\n`)
  
  try {
    // First try to find sitemap
    const sitemapUrls = await checkSitemapAndRobots()
    
    // Then try pattern discovery
    const patternHobbies = await tryHobbyPatterns()
    
    console.log(`\n📈 Final Results:`)
    console.log(`🗺️ URLs from sitemap: ${sitemapUrls.length}`)
    console.log(`🎯 Hobbies from patterns: ${patternHobbies.length}`)
    
    if (patternHobbies.length > 0) {
      console.log(`\n🎨 All discovered hobbies:`)
      patternHobbies.forEach((hobby, index) => {
        console.log(`${index + 1}. ${hobby}`)
      })
    }
    
    // Save results to file
    const results = {
      timestamp: new Date().toISOString(),
      totalHobbies: patternHobbies.length,
      sitemapUrls: sitemapUrls,
      hobbies: patternHobbies
    }
    
    const fs = require('fs')
    fs.writeFileSync('scraped-hobbies.json', JSON.stringify(results, null, 2))
    console.log(`\n💾 Results saved to scraped-hobbies.json`)
    
  } catch (error) {
    console.error('❌ Script failed:', error)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { tryHobbyPatterns, checkSitemapAndRobots }