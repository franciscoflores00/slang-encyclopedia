// Improved hobby scraper for allpastimes.com
// This approach tries to systematically extract actual hobby names

const baseUrl = 'https://www.allpastimes.com'
const hobbies = new Set()

// Common hobby-related words to help filter legitimate hobbies
const hobbyKeywords = [
  'printing', 'running', 'cycling', 'swimming', 'cooking', 'baking', 'gardening', 'painting', 'drawing', 
  'photography', 'music', 'dancing', 'singing', 'reading', 'writing', 'gaming', 'fishing', 'hunting',
  'hiking', 'camping', 'climbing', 'skiing', 'snowboarding', 'surfing', 'diving', 'sailing', 'flying',
  'collecting', 'building', 'making', 'crafting', 'knitting', 'sewing', 'pottery', 'woodworking',
  'metalworking', 'jewelry', 'chess', 'cards', 'sports', 'tennis', 'golf', 'baseball', 'basketball',
  'football', 'soccer', 'volleyball', 'badminton', 'archery', 'martial', 'yoga', 'pilates', 'fitness'
]

// Function to check if a string looks like a legitimate hobby name
function isLikelyHobby(text) {
  const cleaned = text.trim().toLowerCase()
  
  // Basic filters
  if (cleaned.length < 3 || cleaned.length > 50) return false
  if (cleaned.includes('_') || cleaned.includes('3feb58')) return false
  if (cleaned.includes('json') || cleaned.includes('css')) return false
  if (cleaned.includes('component') || cleaned.includes('widget')) return false
  if (cleaned.includes('thunderbolt') || cleaned.includes('wix')) return false
  if (/^[0-9a-f-]{20,}/.test(cleaned)) return false // Hash-like strings
  if (/^\d+$/.test(cleaned)) return false // Pure numbers
  
  // Look for hobby keywords
  const hasHobbyKeyword = hobbyKeywords.some(keyword => cleaned.includes(keyword))
  
  // Check for common hobby patterns
  const hasHobbyPattern = (
    cleaned.includes(' making') ||
    cleaned.includes(' playing') ||
    cleaned.includes(' collecting') ||
    cleaned.includes(' building') ||
    cleaned.includes(' training') ||
    cleaned.includes(' riding') ||
    cleaned.includes(' dancing') ||
    cleaned.includes(' flying') ||
    cleaned.endsWith('ing') ||
    cleaned.endsWith('ry') ||
    cleaned.endsWith('cs') ||
    cleaned.includes('3d ') ||
    /^[a-z]+ [a-z]+$/.test(cleaned) // Two word combinations
  )
  
  return hasHobbyKeyword || hasHobbyPattern
}

// Function to try multiple hobby pages systematically
async function scrapeMultiplePages() {
  console.log('🔍 Scraping multiple hobby pages systematically...')
  
  const foundHobbies = new Set()
  let pageCount = 0
  let successfulPages = 0
  
  // Try hobby pages from 1 to 50 to start
  for (let i = 1; i <= 50; i++) {
    const url = `${baseUrl}/hobby${i}`
    pageCount++
    
    try {
      console.log(`Checking page ${i}...`)
      const response = await fetch(url)
      
      if (response.status === 404) {
        console.log(`  Page ${i}: Not found (404) - likely end of hobby pages`)
        if (i > 10 && successfulPages === 0) {
          console.log('  No successful pages found, stopping search')
          break
        }
        continue
      }
      
      if (!response.ok) {
        console.log(`  Page ${i}: Error ${response.status}`)
        continue
      }
      
      const html = await response.text()
      successfulPages++
      
      // Extract potential hobby names using various patterns
      const patterns = [
        // Direct text patterns
        /"([a-zA-Z][a-zA-Z0-9\s\-]{2,30})"/g,
        /'([a-zA-Z][a-zA-Z0-9\s\-]{2,30})'/g,
        />([a-zA-Z][a-zA-Z0-9\s\-]{2,30})</g,
        
        // Title and heading patterns
        /<title>([^<]+)<\/title>/gi,
        /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi,
        
        // Meta description patterns
        /content="([^"]*hobby[^"]*)"/gi,
        /content="([^"]*pastime[^"]*)"/gi,
      ]
      
      patterns.forEach(pattern => {
        const matches = [...html.matchAll(pattern)]
        matches.forEach(match => {
          const text = match[1]?.trim()
          if (text && isLikelyHobby(text)) {
            foundHobbies.add(text)
            console.log(`  ✅ Found hobby: "${text}"`)
          }
        })
      })
      
      // Add small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 300))
      
    } catch (error) {
      console.log(`  Page ${i}: Network error - ${error.message}`)
    }
  }
  
  console.log(`\n📊 Scraping Results:`)
  console.log(`📄 Pages checked: ${pageCount}`)
  console.log(`✅ Successful pages: ${successfulPages}`)
  console.log(`🎯 Hobbies found: ${foundHobbies.size}`)
  
  return Array.from(foundHobbies).sort()
}

// Function to clean and categorize hobbies
function processHobbies(hobbyList) {
  console.log('\n🧹 Processing and cleaning hobbies...')
  
  const cleaned = hobbyList
    .map(hobby => {
      // Clean up the hobby name
      let clean = hobby.trim()
      clean = clean.replace(/^(the\s+)/i, '') // Remove "the" prefix
      clean = clean.replace(/\s+/g, ' ') // Normalize spaces
      
      // Capitalize first letter of each word
      clean = clean.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return clean
    })
    .filter((hobby, index, array) => array.indexOf(hobby) === index) // Remove duplicates
    .filter(hobby => hobby.length >= 3 && hobby.length <= 40) // Length filter
  
  console.log(`✨ Cleaned hobbies: ${cleaned.length}`)
  
  return cleaned
}

// Main execution
async function main() {
  console.log('🚀 Starting improved allpastimes.com hobby scraper...')
  console.log(`🎯 Target: ${baseUrl}\n`)
  
  try {
    const rawHobbies = await scrapeMultiplePages()
    const cleanHobbies = processHobbies(rawHobbies)
    
    console.log(`\n🎨 Final Hobby List (${cleanHobbies.length} hobbies):`)
    cleanHobbies.forEach((hobby, index) => {
      console.log(`${index + 1}. ${hobby}`)
    })
    
    // Convert to the format needed for our database
    const categoryFormat = cleanHobbies.map(hobby => ({
      name: hobby,
      slug: hobby.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: `Terms and activities related to ${hobby.toLowerCase()}`,
      emoji: getHobbyEmoji(hobby),
      color: getRandomColor(),
      term_count: 0
    }))
    
    // Save results
    const results = {
      timestamp: new Date().toISOString(),
      source: 'allpastimes.com',
      totalHobbies: cleanHobbies.length,
      hobbies: cleanHobbies,
      categoriesFormat: categoryFormat
    }
    
    const fs = require('fs')
    fs.writeFileSync('scraped-hobbies-clean.json', JSON.stringify(results, null, 2))
    console.log(`\n💾 Results saved to scraped-hobbies-clean.json`)
    
    return cleanHobbies
    
  } catch (error) {
    console.error('❌ Script failed:', error)
    return []
  }
}

// Helper function to suggest emoji based on hobby name
function getHobbyEmoji(hobby) {
  const emojiMap = {
    '3d printing': '🖨️', 'printing': '🖨️',
    'running': '🏃', 'jogging': '🏃',
    'cycling': '🚴', 'biking': '🚴',
    'swimming': '🏊', 'diving': '🤿',
    'cooking': '👨‍🍳', 'baking': '🧁',
    'gardening': '🌱', 'farming': '🚜',
    'photography': '📷', 'filming': '🎬',
    'music': '🎵', 'singing': '🎤',
    'dancing': '💃', 'ballet': '🩰',
    'reading': '📚', 'writing': '✍️',
    'gaming': '🎮', 'chess': '♟️',
    'fishing': '🎣', 'hunting': '🏹',
    'hiking': '🥾', 'camping': '⛺',
    'climbing': '🧗', 'skiing': '⛷️',
    'painting': '🎨', 'drawing': '✏️',
    'knitting': '🧶', 'sewing': '🪡',
    'woodworking': '🪵', 'crafting': '✂️'
  }
  
  const hobbyLower = hobby.toLowerCase()
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (hobbyLower.includes(key)) {
      return emoji
    }
  }
  
  return '🎯' // Default emoji
}

// Helper function to get random colors
function getRandomColor() {
  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'yellow', 'gray', 'brown']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { main, scrapeMultiplePages, processHobbies }