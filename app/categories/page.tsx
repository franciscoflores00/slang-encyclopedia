import Link from 'next/link'
import { getAllCategories } from '@/lib/api'
import SearchBar from '@/components/SearchBar'

// All categories organized by letter (including both real and placeholder ones for comprehensive display)
const categoriesByLetter = {
  A: ['3D printing', 'Abseiling', 'Acting', 'Adventure racing', 'Aerobics', 'Airsoft', 'Animation', 'Aquaculture', 'Archery', 'Art History', 'Astronomy', 'Athletics', 'Auto racing', 'Automotive'],
  B: ['Badminton', 'Baking', 'Baseball', 'Basketball', 'Beekeeping', 'Billiards', 'Birdwatching', 'Blacksmithing', 'BMX', 'Board games', 'Boating', 'Bodyboarding', 'Botany', 'Bowling', 'Boxing', 'Brewing', 'Bungee jumping', 'Bushcraft'],
  C: ['Calligraphy', 'Camping', 'Card games', 'Ceramics', 'Chess', 'Climbing', 'Coffee roasting', 'Coin collecting', 'Collecting', 'Composting', 'Cooking', 'Cosplay', 'Cricket', 'Cross-stitch', 'Crosswords', 'Cultural exchange', 'Curling', 'Cycling'],
  D: ['Dance', 'Dancing', 'Darts', 'Diving', 'Drawing', 'Drone Flying', 'Drums'],
  E: ['Electronics', 'Embroidery', 'Equestrian', 'Esports', 'Event planning'],
  F: ['Fashion design', 'Fashion Design', 'Fencing', 'Figure skating', 'Filmmaking', 'Fishing', 'Football', 'Foraging'],
  G: ['Gaming', 'Gardening', 'Genealogy', 'Geocaching', 'Geology', 'Glassblowing', 'Go-karting', 'Golf', 'Guitar', 'Guitar Playing', 'Gymnastics'],
  H: ['Ham radio', 'Hiking', 'Hockey', 'Home Brewing', 'Horseback riding', 'Hunting', 'Hydroponics'],
  I: ['Ice hockey', 'Ice Skating', 'Illustration', 'Improv', 'Interior Design', 'Investing'],
  J: ['Jazz Music', 'Jewelry making', 'Journalism', 'Judo', 'Juggling'],
  K: ['Karate', 'Kayaking', 'Kickboxing', 'Kite Flying', 'Knitting'],
  L: ['Lacrosse', 'Landscape Architecture', 'Language learning', 'Leatherworking', 'Literature'],
  M: ['Magic', 'Makeup artistry', 'Martial Arts', 'Meditation', 'Metalworking', 'Meteorology', 'Mixed martial arts', 'Model building', 'Model trains', 'Motorcycling', 'Mountain Biking', 'Mountaineering', 'Music', 'Music Production'],
  N: ['Nature Photography', 'Needlepoint', 'Numismatics', 'Nutrition'],
  O: ['Oil Painting', 'Orchestra', 'Orienteering', 'Origami', 'Outdoor Survival'],
  P: ['Paragliding', 'Parkour', 'Pet training', 'Photography', 'Piano', 'Piano Playing', 'Pilates', 'Podcasting', 'Pottery', 'Programming', 'Public speaking', 'Puppetry', 'Puzzles'],
  Q: ['Qigong', 'Quantum Physics', 'Quidditch', 'Quilting'],
  R: ['Reading', 'Remote control', 'Robotics', 'Rock climbing', 'Rugby', 'Running'],
  S: ['Sailing', 'Sculpture', 'Scuba diving', 'Sewing', 'Shooting', 'Skateboarding', 'Skiing', 'Skydiving', 'Snorkeling', 'Snowboarding', 'Soccer', 'Stamp collecting', 'Stand-up comedy', 'Sudoku', 'Surfing', 'Survival skills', 'Swimming'],
  T: ['Table tennis', 'Tai chi', 'Tennis', 'Theater', 'Travel Photography', 'Triathlon', 'Trivia'],
  U: ['Ultimate Frisbee', 'Ukulele', 'Urban Exploration'],
  V: ['Video editing', 'Video games', 'Violin', 'Viticulture', 'Volleyball', 'Volunteering'],
  W: ['Water skiing', 'Web design', 'Weightlifting', 'Wine tasting', 'Wine Tasting', 'Woodworking', 'Wrestling', 'Writing'],
  X: ['Xerography', 'Xtreme Sports'],
  Y: ['Yachting', 'Yoga', 'Youth Coaching'],
  Z: ['Zero Waste Living', 'Zoology', 'Zumba']
}

export default async function CategoriesPage() {
  const letters = Object.keys(categoriesByLetter).sort()
  
  // Get real categories to check which ones have actual pages and get term counts
  const realCategories = await getAllCategories()
  const realCategorySlugs = new Set(realCategories.map(cat => cat.slug))
  
  // Create a map of slug to term count for quick lookup
  const termCountMap = new Map(realCategories.map(cat => [cat.slug, cat.term_count || 0]))
  
  // Helper function to convert name to slug
  const nameToSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mr-2">
            Home
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <span className="text-gray-600 dark:text-gray-300">Categories</span>
        </nav>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hobbies & Interests Dictionary
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse categories of hobbies, sports, and interests alphabetically. 
            Each category contains specialized terminology and vocabulary.
          </p>
        </div>

        {/* Alphabetical Index Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex w-full">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="flex-1 flex items-center justify-center h-8 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Categories by Letter */}
        <div className="max-w-6xl mx-auto space-y-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-3">
                  <h2 className="text-2xl font-bold">{letter}</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {categoriesByLetter[letter as keyof typeof categoriesByLetter].map((category) => {
                      const slug = nameToSlug(category)
                      const hasRealPage = realCategorySlugs.has(slug)
                      const termCount = termCountMap.get(slug) || 0
                      
                      return (
                        <Link
                          key={category}
                          href={`/category/${slug}`}
                          className={`block p-3 rounded-lg transition-colors border ${
                            hasRealPage
                              ? 'bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-gray-200 dark:border-gray-600'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-500 cursor-default'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                              {hasRealPage ? termCount : '0'}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Don&apos;t see your hobby or interest?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hobbipedia is constantly growing. Help us expand our collection by suggesting 
            new categories or contributing specialized terminology.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Suggest Category
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Browse Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}