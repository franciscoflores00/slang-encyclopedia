// Expanded hobby scraper for allpastimes.com - checking 1-2500 range
// This approach checks a much wider range to capture all 2000+ hobbies

const baseUrl = 'https://www.allpastimes.com'
const fs = require('fs')

// More lenient hobby keywords to capture more entries
const hobbyKeywords = [
  'printing', 'running', 'cycling', 'swimming', 'cooking', 'baking', 'gardening', 'painting', 'drawing', 
  'photography', 'music', 'dancing', 'singing', 'reading', 'writing', 'gaming', 'fishing', 'hunting',
  'hiking', 'camping', 'climbing', 'skiing', 'snowboarding', 'surfing', 'diving', 'sailing', 'flying',
  'collecting', 'building', 'making', 'crafting', 'knitting', 'sewing', 'pottery', 'woodworking',
  'metalworking', 'jewelry', 'chess', 'cards', 'sports', 'tennis', 'golf', 'baseball', 'basketball',
  'football', 'soccer', 'volleyball', 'badminton', 'archery', 'martial', 'yoga', 'pilates', 'fitness',
  'training', 'exercise', 'racing', 'riding', 'driving', 'flying', 'sailing', 'rowing', 'kayaking',
  'art', 'craft', 'design', 'model', 'toy', 'game', 'puzzle', 'magic', 'trick', 'performance',
  'theater', 'drama', 'comedy', 'film', 'video', 'audio', 'radio', 'podcast', 'blog', 'vlog'
]

// More lenient filtering - only exclude obvious non-hobbies
function isLikelyHobby(text) {
  const cleaned = text.trim().toLowerCase()
  
  // Basic filters - more lenient than before
  if (cleaned.length < 3 || cleaned.length > 60) return false
  
  // Exclude obvious technical/website terms
  const excludeTerms = [
    'json', 'css', 'html', 'javascript', 'php', 'sql', 'api', 'url', 'http', 'www',
    'component', 'widget', 'plugin', 'module', 'function', 'variable', 'array',
    'thunderbolt', 'wix', 'squarespace', 'wordpress', 'github', 'facebook', 'twitter',
    'analytics', 'tracking', 'cookie', 'session', 'login', 'logout', 'signup',
    'database', 'server', 'client', 'browser', 'mobile', 'desktop', 'tablet',
    'undefined', 'null', 'false', 'true', 'error', 'warning', 'debug'
  ]
  
  for (const term of excludeTerms) {
    if (cleaned.includes(term)) return false
  }
  
  // Exclude hash-like strings and pure numbers
  if (/^[0-9a-f-]{20,}/.test(cleaned)) return false
  if (/^\d+$/.test(cleaned)) return false
  
  // Look for hobby keywords - more inclusive
  const hasHobbyKeyword = hobbyKeywords.some(keyword => cleaned.includes(keyword))
  
  // Check for common hobby patterns - expanded
  const hasHobbyPattern = (
    cleaned.includes(' making') ||
    cleaned.includes(' playing') ||
    cleaned.includes(' collecting') ||
    cleaned.includes(' building') ||
    cleaned.includes(' training') ||
    cleaned.includes(' riding') ||
    cleaned.includes(' dancing') ||
    cleaned.includes(' flying') ||
    cleaned.includes(' racing') ||
    cleaned.includes(' watching') ||
    cleaned.includes(' listening') ||
    cleaned.includes(' creating') ||
    cleaned.includes(' designing') ||
    cleaned.includes(' crafting') ||
    cleaned.endsWith('ing') ||
    cleaned.endsWith('ry') ||
    cleaned.endsWith('cs') ||
    cleaned.endsWith('al') ||
    cleaned.endsWith('er') ||
    cleaned.endsWith('ly') ||
    cleaned.includes('3d ') ||
    cleaned.includes(' art') ||
    cleaned.includes(' sport') ||
    cleaned.includes(' game') ||
    cleaned.includes(' music') ||
    cleaned.includes(' dance') ||
    /^[a-z]+ [a-z]+$/.test(cleaned) || // Two word combinations
    /^[a-z]+ [a-z]+ [a-z]+$/.test(cleaned) || // Three word combinations
    cleaned.length > 8 // Give longer names benefit of doubt
  )
  
  return hasHobbyKeyword || hasHobbyPattern || cleaned.length > 10
}

// Function to scrape a much wider range of hobby pages
async function scrapeExpandedRange() {
  console.log('🔍 Scraping EXPANDED range: hobby1 to hobby2500...')
  
  const foundHobbies = new Set()
  let pageCount = 0
  let successfulPages = 0
  let consecutiveFailures = 0
  const maxConsecutiveFailures = 50 // Stop after 50 consecutive 404s
  
  // Check hobby pages from 1 to 2500
  for (let i = 1; i <= 2500; i++) {
    const url = `${baseUrl}/hobby${i}`
    pageCount++
    
    try {
      console.log(`Checking page ${i}... (${foundHobbies.size} hobbies found so far)`)
      const response = await fetch(url)
      
      if (response.status === 404) {
        consecutiveFailures++
        console.log(`  Page ${i}: Not found (404) - consecutive failures: ${consecutiveFailures}`)
        
        // Stop if we hit too many consecutive failures
        if (consecutiveFailures >= maxConsecutiveFailures) {
          console.log(`  Stopping after ${maxConsecutiveFailures} consecutive 404s`)
          break
        }
        continue
      }
      
      if (!response.ok) {
        console.log(`  Page ${i}: Error ${response.status}`)
        continue
      }
      
      // Reset consecutive failures counter on success
      consecutiveFailures = 0
      const html = await response.text()
      successfulPages++
      
      // Extract potential hobby names using various patterns
      const patterns = [
        // Title patterns - most reliable
        /<title>([^<]+)<\/title>/gi,
        /<h1[^>]*>([^<]+)<\/h1>/gi,
        /<h2[^>]*>([^<]+)<\/h2>/gi,
        /<h3[^>]*>([^<]+)<\/h3>/gi,
        
        // Meta description patterns
        /content="([^"]*hobby[^"]*)"/gi,
        /content="([^"]*pastime[^"]*)"/gi,
        /content="([^"]*activity[^"]*)"/gi,
        
        // Navigation and link patterns
        /<a[^>]*>([^<]+)<\/a>/gi,
        
        // Text patterns in quotes
        /"([a-zA-Z][a-zA-Z0-9\s\-']{2,40})"/g,
        /'([a-zA-Z][a-zA-Z0-9\s\-']{2,40})'/g,
        
        // Text between tags
        />([a-zA-Z][a-zA-Z0-9\s\-']{3,40})</g,
      ]
      
      let hobbyFoundOnPage = false
      
      patterns.forEach(pattern => {
        const matches = [...html.matchAll(pattern)]
        matches.forEach(match => {
          const text = match[1]?.trim()
          if (text && isLikelyHobby(text)) {
            // Clean up the text
            let cleanText = text
              .replace(/^(the\s+)/i, '') // Remove "the" prefix
              .replace(/\s+/g, ' ') // Normalize spaces
              .replace(/---+/g, '-') // Fix multiple dashes
              .replace(/[|\-]+.*$/, '') // Remove everything after pipe or long dash
              .trim()
            
            if (cleanText && cleanText.length >= 3 && cleanText.length <= 50) {
              foundHobbies.add(cleanText)
              if (!hobbyFoundOnPage) {
                console.log(`  ✅ Found hobby: \"${cleanText}\"`)
                hobbyFoundOnPage = true
              }
            }
          }
        })
      })
      
      if (!hobbyFoundOnPage) {
        console.log(`  ⚪ Page ${i}: No hobbies extracted`)
      }
      
      // Add delay to be respectful - shorter delay for efficiency
      await new Promise(resolve => setTimeout(resolve, 200))
      
    } catch (error) {
      console.log(`  Page ${i}: Network error - ${error.message}`)
      consecutiveFailures++
    }
    
    // Progress update every 100 pages
    if (i % 100 === 0) {
      console.log(`\n📊 Progress Update (Page ${i}):`);
      console.log(`✅ Successful pages: ${successfulPages}`)
      console.log(`🎯 Unique hobbies found: ${foundHobbies.size}`)
      console.log(`⏸️  Consecutive failures: ${consecutiveFailures}\n`)
    }
  }
  
  console.log(`\n📊 Final Scraping Results:`)
  console.log(`📄 Pages checked: ${pageCount}`)
  console.log(`✅ Successful pages: ${successfulPages}`)
  console.log(`🎯 Total hobbies found: ${foundHobbies.size}`)
  
  return Array.from(foundHobbies).sort()
}

// Function to clean and process the expanded hobby list
function processExpandedHobbies(hobbyList) {
  console.log('\n🧹 Processing and cleaning expanded hobby list...')
  
  const cleaned = hobbyList
    .map(hobby => {
      // Clean up the hobby name
      let clean = hobby.trim()
      
      // Remove common prefixes/suffixes
      clean = clean.replace(/^(the\s+)/i, '') // Remove "the" prefix
      clean = clean.replace(/\s+/g, ' ') // Normalize spaces
      clean = clean.replace(/---+/g, '-') // Fix multiple dashes
      clean = clean.replace(/\s*-\s*$/, '') // Remove trailing dash
      
      // Handle duplicates like "3D Printing - Adventure Running" -> "3D Printing"
      if (clean.includes(' - ') && clean.split(' - ').length === 2) {
        const parts = clean.split(' - ')
        clean = parts[0] // Take first part
      }
      
      // Capitalize properly
      clean = clean.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return clean
    })
    .filter(hobby => hobby.length >= 3 && hobby.length <= 50) // Length filter
    .filter((hobby, index, array) => array.indexOf(hobby) === index) // Remove duplicates
    .sort()
  
  console.log(`✨ Cleaned hobbies: ${cleaned.length}`)
  
  return cleaned
}

// Enhanced emoji mapping for more hobbies
function getHobbyEmoji(hobby) {
  const emojiMap = {
    '3d': '🖨️', 'printing': '🖨️', 'print': '🖨️',
    'running': '🏃', 'jogging': '🏃', 'marathon': '🏃', 'sprint': '🏃',
    'cycling': '🚴', 'biking': '🚴', 'bike': '🚴', 'bicycle': '🚴',
    'swimming': '🏊', 'diving': '🤿', 'scuba': '🤿', 'snorkel': '🤿',
    'cooking': '👨‍🍳', 'baking': '🧁', 'chef': '👨‍🍳', 'culinary': '👨‍🍳',
    'gardening': '🌱', 'farming': '🚜', 'plant': '🌱', 'flower': '🌸',
    'photography': '📷', 'photo': '📷', 'filming': '🎬', 'camera': '📷',
    'music': '🎵', 'singing': '🎤', 'song': '🎤', 'vocal': '🎤',
    'dancing': '💃', 'dance': '💃', 'ballet': '🩰', 'tango': '💃',
    'reading': '📚', 'book': '📚', 'writing': '✍️', 'author': '✍️',
    'gaming': '🎮', 'games': '🎮', 'chess': '♟️', 'puzzle': '🧩',
    'fishing': '🎣', 'hunting': '🏹', 'archery': '🏹', 'bow': '🏹',
    'hiking': '🥾', 'camping': '⛺', 'outdoor': '🏕️', 'backpack': '🎒',
    'climbing': '🧗', 'mountain': '🏔️', 'skiing': '⛷️', 'snowboard': '🏂',
    'painting': '🎨', 'art': '🎨', 'drawing': '✏️', 'sketch': '✏️',
    'knitting': '🧶', 'sewing': '🪡', 'craft': '✂️', 'crochet': '🧶',
    'woodworking': '🪵', 'carpentry': '🔨', 'building': '🔨', 'construct': '🔨',
    'yoga': '🧘', 'meditation': '🧘', 'fitness': '💪', 'workout': '💪',
    'boxing': '🥊', 'martial': '🥋', 'karate': '🥋', 'judo': '🥋',
    'golf': '⛳', 'tennis': '🎾', 'basketball': '🏀', 'ball': '⚽',
    'football': '🏈', 'soccer': '⚽', 'baseball': '⚾', 'volleyball': '🏐',
    'badminton': '🏸', 'ping pong': '🏓', 'table tennis': '🏓',
    'sailing': '⛵', 'boat': '⛵', 'kayak': '🛶', 'canoe': '🛶',
    'skateboard': '🛹', 'surf': '🏄', 'wave': '🏄', 'beach': '🏖️',
    'horse': '🐴', 'riding': '🐴', 'pet': '🐕', 'dog': '🐕', 'cat': '🐱',
    'collect': '📦', 'stamp': '📮', 'coin': '🪙', 'card': '🃏',
    'travel': '✈️', 'flying': '✈️', 'plane': '✈️', 'adventure': '🗺️',
    'theater': '🎭', 'drama': '🎭', 'acting': '🎭', 'comedy': '🎭',
    'magic': '🪄', 'trick': '🪄', 'illusion': '🪄', 'juggle': '🤹',
    'science': '🔬', 'experiment': '🔬', 'chemistry': '⚗️', 'biology': '🔬',
    'astronomy': '🔭', 'star': '⭐', 'space': '🚀', 'rocket': '🚀',
    'car': '🚗', 'auto': '🚗', 'racing': '🏁', 'speed': '🏁',
    'train': '🚂', 'model': '🚂', 'railroad': '🚂', 'locomotive': '🚂'
  }
  
  const hobbyLower = hobby.toLowerCase()
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (hobbyLower.includes(key)) {
      return emoji
    }
  }
  
  return '🎯' // Default emoji
}

function getRandomColor() {
  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'yellow', 'gray', 'brown', 'indigo', 'cyan']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Main execution function
async function main() {
  console.log('🚀 Starting EXPANDED allpastimes.com hobby scraper...')
  console.log(`🎯 Target: ${baseUrl}`)
  console.log(`📈 Range: hobby1 to hobby2500 (up to 50 consecutive failures)\n`)
  
  try {
    const rawHobbies = await scrapeExpandedRange()
    const cleanHobbies = processExpandedHobbies(rawHobbies)
    
    console.log(`\n🎨 Final Expanded Hobby List (${cleanHobbies.length} hobbies):`)
    
    // Show first 100 as sample
    cleanHobbies.slice(0, 100).forEach((hobby, index) => {
      console.log(`${index + 1}. ${getHobbyEmoji(hobby)} ${hobby}`)
    })
    
    if (cleanHobbies.length > 100) {
      console.log(`... and ${cleanHobbies.length - 100} more hobbies`)
    }
    
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
      source: 'allpastimes.com - expanded scrape (1-2500)',
      totalHobbies: cleanHobbies.length,
      hobbies: cleanHobbies,
      categoriesFormat: categoryFormat
    }
    
    fs.writeFileSync('hobbies-expanded-scrape.json', JSON.stringify(results, null, 2))
    console.log(`\n💾 Results saved to: hobbies-expanded-scrape.json`)
    console.log(`📊 Total hobbies scraped: ${cleanHobbies.length}`)
    
    // Also save just the clean list for easy viewing
    fs.writeFileSync('hobbies-expanded-list.txt', cleanHobbies.join('\n'))
    console.log(`📝 Clean list saved to: hobbies-expanded-list.txt`)
    
    return cleanHobbies
    
  } catch (error) {
    console.error('❌ Script failed:', error)
    return []
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .then((hobbies) => {
      console.log(`\n✨ Expanded scraping completed!`)
      console.log(`🎯 Final count: ${hobbies.length} hobbies`)
      if (hobbies.length > 1000) {
        console.log(`🎉 Success! Found ${hobbies.length} hobbies - much closer to the 2000+ goal!`)
      }
    })
    .catch(console.error)
}

module.exports = { main }