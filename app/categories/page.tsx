import Link from 'next/link'

// Placeholder categories organized by letter (like Investopedia's financial dictionary)
const categoriesByLetter = {
  A: ['Archery', 'Astronomy', 'Aquaculture', 'Art History', 'Automotive'],
  B: ['Baseball', 'Basketball', 'Baking', 'Beekeeping', 'Bird Watching', 'Boxing'],
  C: ['Cycling', 'Chess', 'Cooking', 'Cricket', 'Climbing', 'Ceramics'],
  D: ['Dancing', 'Diving', 'Drawing', 'Drone Flying', 'Darts'],
  E: ['Embroidery', 'Electronics', 'Equestrian', 'Esports'],
  F: ['Football', 'Fishing', 'Fencing', 'Fashion Design', 'Filmmaking'],
  G: ['Gaming', 'Gardening', 'Golf', 'Gymnastics', 'Guitar Playing'],
  H: ['Hiking', 'Hockey', 'Hunting', 'Horseback Riding', 'Home Brewing'],
  I: ['Ice Skating', 'Interior Design', 'Illustration', 'Investing'],
  J: ['Jewelry Making', 'Judo', 'Jazz Music', 'Journalism'],
  K: ['Kayaking', 'Knitting', 'Kite Flying', 'Karate'],
  L: ['Literature', 'Lacrosse', 'Landscape Architecture', 'Language Learning'],
  M: ['Mountain Biking', 'Martial Arts', 'Music Production', 'Motorcycling'],
  N: ['Nature Photography', 'Needlepoint', 'Numismatics', 'Nutrition'],
  O: ['Origami', 'Orchestra', 'Outdoor Survival', 'Oil Painting'],
  P: ['Photography', 'Pottery', 'Piano Playing', 'Parkour', 'Pilates'],
  Q: ['Quilting', 'Quantum Physics', 'Quidditch'],
  R: ['Rock Climbing', 'Running', 'Rugby', 'Robotics', 'Reading'],
  S: ['Swimming', 'Skiing', 'Soccer', 'Sculpture', 'Sailing', 'Skateboarding'],
  T: ['Tennis', 'Triathlon', 'Theater', 'Travel Photography', 'Table Tennis'],
  U: ['Urban Exploration', 'Ukulele', 'Ultimate Frisbee'],
  V: ['Volleyball', 'Video Editing', 'Violin', 'Viticulture'],
  W: ['Weightlifting', 'Woodworking', 'Wrestling', 'Wine Tasting'],
  X: ['Xerography', 'Xtreme Sports'],
  Y: ['Yoga', 'Yachting', 'Youth Coaching'],
  Z: ['Zoology', 'Zumba', 'Zero Waste Living']
}

export default function CategoriesPage() {
  const letters = Object.keys(categoriesByLetter).sort()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
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
                    {categoriesByLetter[letter as keyof typeof categoriesByLetter].map((category) => (
                      <Link
                        key={category}
                        href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600"
                      >
                        <span className="text-sm font-medium">{category}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Don't see your hobby or interest?
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