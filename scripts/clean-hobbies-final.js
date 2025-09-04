// Final cleaning script for hobby data
const fs = require('fs')

// Read the scraped data
const data = JSON.parse(fs.readFileSync('scraped-hobbies-clean.json', 'utf8'))

// Words to filter out (non-hobby terms that got through)
const filterOut = [
  'about us', 'use strict', 'address field', 'add rewards', 'autocomplete suggestions',
  'autoplay option', 'undefined ffdpax', 'xmidymid slice', 'top left', 'top right',
  'bottom left', 'bottom right', 'center center', 'left center', 'right center',
  'string', 'client binding', 'arial black', 'loading chunk', 'shortcut icon',
  'search results', 'read more', 'read less', 'log in', 'log out', 'upload image',
  'delete file', 'file upload', 'select year', 'select month', 'time zone',
  'business location', 'customer details', 'delivery details', 'powered by',
  'single post', 'product page', 'hobby articles', 'newsletter hobbies',
  'blog comments', 'blog likes', 'my drafts', 'my posts', 'blog posts',
  'site search', 'forum comments', 'forum posts', 'contact collection',
  'cookie alert', 'service page', 'my bookings', 'bookings checkout',
  'book online', 'booking form', 'booking calendar', 'my account',
  'profile card', 'side cart', 'my wishlist', 'cart page', 'my orders',
  'category page', 'my addresses', 'my wallet', 'members about',
  'fullscreen page', 'pro gallery', 'data binding', 'pay button'
]

// Technical terms that aren't hobbies
const technicalTerms = new Set([
  'monitoring', 'docking', 'errorReporting', 'allowScrolling', 'billing',
  'isExternalPricing', 'dataBinding', 'contactMapping', 'fieldsMapping',
  'caching', 'heading', 'string', 'analytics', 'advertising', 'verification code'
])

// Function to check if a hobby name is legitimate
function isLegitimateHobby(name) {
  const lower = name.toLowerCase()
  
  // Filter out obvious non-hobbies
  if (filterOut.includes(lower)) return false
  if (technicalTerms.has(lower)) return false
  
  // Filter out single common words
  const commonWords = ['string', 'loading', 'missing', 'unknown', 'search', 'free', 'premium']
  if (commonWords.includes(lower)) return false
  
  // Filter out very short or very long names
  if (name.length < 3 || name.length > 50) return false
  
  // Filter out things that look like technical IDs or codes
  if (/^[a-z0-9-]{20,}$/.test(lower)) return false
  if (/^\d+$/.test(name)) return false
  
  // Keep names that contain hobby-related keywords
  const hobbyKeywords = [
    'art', 'craft', 'making', 'building', 'collecting', 'playing', 'sports', 'music',
    'dance', 'painting', 'drawing', 'photography', 'cooking', 'baking', 'gardening',
    'running', 'cycling', 'swimming', 'fishing', 'hunting', 'climbing', 'skiing',
    'sailing', 'diving', 'flying', 'racing', 'wrestling', 'boxing', 'martial',
    'yoga', 'fitness', 'training', 'exercise', 'games', 'puzzles', 'reading',
    'writing', 'singing', 'instrument', 'guitar', 'piano', 'drum', 'violin',
    'archery', 'shooting', 'target', 'model', 'hobby', 'craft'
  ]
  
  const hasHobbyKeyword = hobbyKeywords.some(keyword => lower.includes(keyword))
  
  // Common hobby patterns
  const hobbyPatterns = [
    /ing$/, // ends with 'ing' (like cooking, painting, etc.)
    /ball$/, // sports ending with 'ball'
    /^[a-z]+ [a-z]+$/, // two-word combinations
    /craft/, /making/, /building/, /collecting/, /playing/
  ]
  
  const hasHobbyPattern = hobbyPatterns.some(pattern => pattern.test(lower))
  
  return hasHobbyKeyword || hasHobbyPattern || name.length > 6 // Give longer names benefit of doubt
}

// Clean the hobby list
console.log(`🧹 Starting with ${data.hobbies.length} hobbies...`)

const cleanedHobbies = data.hobbies
  .filter(isLegitimateHobby)
  .map(hobby => {
    // Clean up the name
    let cleaned = hobby.trim()
    
    // Fix common issues
    cleaned = cleaned.replace(/^(the\s+)/i, '') // Remove "the" prefix
    cleaned = cleaned.replace(/\s+/g, ' ') // Normalize spaces
    cleaned = cleaned.replace(/---+/g, '-') // Fix multiple dashes
    
    // Remove duplicates like "3D Printing - Adventure Running" -> "3D Printing"
    if (cleaned.includes(' - ') && cleaned.split(' - ').length === 2) {
      const parts = cleaned.split(' - ')
      cleaned = parts[0] // Take first part
    }
    
    // Capitalize properly
    cleaned = cleaned.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return cleaned
  })
  .filter((hobby, index, array) => array.indexOf(hobby) === index) // Remove duplicates
  .sort()

console.log(`✨ Cleaned to ${cleanedHobbies.length} hobbies`)

// Convert to category format with better emojis
function getHobbyEmoji(hobby) {
  const emojiMap = {
    '3d': '🖨️', 'printing': '🖨️',
    'running': '🏃', 'jogging': '🏃', 'marathon': '🏃',
    'cycling': '🚴', 'biking': '🚴', 'bike': '🚴',
    'swimming': '🏊', 'diving': '🤿', 'scuba': '🤿',
    'cooking': '👨‍🍳', 'baking': '🧁', 'chef': '👨‍🍳',
    'gardening': '🌱', 'farming': '🚜', 'plant': '🌱',
    'photography': '📷', 'photo': '📷', 'filming': '🎬',
    'music': '🎵', 'singing': '🎤', 'song': '🎤',
    'dancing': '💃', 'dance': '💃', 'ballet': '🩰',
    'reading': '📚', 'book': '📚', 'writing': '✍️',
    'gaming': '🎮', 'games': '🎮', 'chess': '♟️',
    'fishing': '🎣', 'hunting': '🏹', 'archery': '🏹',
    'hiking': '🥾', 'camping': '⛺', 'outdoor': '🏕️',
    'climbing': '🧗', 'mountain': '🏔️', 'skiing': '⛷️',
    'painting': '🎨', 'art': '🎨', 'drawing': '✏️',
    'knitting': '🧶', 'sewing': '🪡', 'craft': '✂️',
    'woodworking': '🪵', 'carpentry': '🔨', 'building': '🔨',
    'yoga': '🧘', 'meditation': '🧘', 'fitness': '💪',
    'boxing': '🥊', 'martial': '🥋', 'karate': '🥋',
    'golf': '⛳', 'tennis': '🎾', 'basketball': '🏀',
    'football': '🏈', 'soccer': '⚽', 'baseball': '⚾',
    'volleyball': '🏐', 'badminton': '🏸', 'table tennis': '🏓',
    'sailing': '⛵', 'boat': '⛵', 'kayak': '🛶',
    'skateboard': '🛹', 'snowboard': '🏂', 'surf': '🏄',
    'horse': '🐴', 'riding': '🐴', 'pet': '🐕',
    'collect': '📦', 'stamp': '📮', 'coin': '🪙'
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
  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'yellow', 'gray', 'brown', 'indigo']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Convert to categories format
const categoriesFormat = cleanedHobbies.map(hobby => ({
  name: hobby,
  slug: hobby.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  description: `Terms and activities related to ${hobby.toLowerCase()}`,
  emoji: getHobbyEmoji(hobby),
  color: getRandomColor(),
  term_count: 0
}))

// Final results
const finalResults = {
  timestamp: new Date().toISOString(),
  source: 'allpastimes.com - cleaned',
  totalHobbies: cleanedHobbies.length,
  hobbies: cleanedHobbies,
  categoriesFormat: categoriesFormat
}

// Save cleaned results
fs.writeFileSync('hobbies-final-clean.json', JSON.stringify(finalResults, null, 2))

console.log(`\n🎯 Final Results:`)
console.log(`📊 Total hobbies: ${cleanedHobbies.length}`)
console.log(`💾 Saved to: hobbies-final-clean.json`)

// Show sample of cleaned hobbies
console.log(`\n🎨 Sample hobbies:`)
cleanedHobbies.slice(0, 50).forEach((hobby, index) => {
  const category = categoriesFormat[index]
  console.log(`${index + 1}. ${category.emoji} ${hobby} (${category.slug})`)
})

console.log(`\n✨ Ready for database insertion!`)