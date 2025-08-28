import Link from 'next/link'

// Mock data for all terms across all categories
const mockAllTerms = [
  { id: 1, name: 'Aerodynamics', category: 'Cycling', difficulty: 'intermediate', definition: 'The study of air flow around objects, crucial for cycling efficiency.' },
  { id: 2, name: 'Anchor', category: 'Swimming', difficulty: 'beginner', definition: 'The slowest swimmer in a relay team, typically swimming last.' },
  { id: 3, name: 'Aperture', category: 'Photography', difficulty: 'beginner', definition: 'The opening in a lens that controls how much light enters the camera.' },
  { id: 4, name: 'Attack', category: 'Cycling', difficulty: 'intermediate', definition: 'A sudden acceleration to break away from the pack.' },
  { id: 5, name: 'Backstroke', category: 'Swimming', difficulty: 'beginner', definition: 'One of the four competitive swimming strokes, performed on the back.' },
  { id: 6, name: 'Bokeh', category: 'Photography', difficulty: 'intermediate', definition: 'The aesthetic quality of out-of-focus areas in an image.' },
  { id: 7, name: 'Bonk', category: 'Cycling', difficulty: 'beginner', definition: 'The sudden loss of energy due to glycogen depletion during long rides.' },
  { id: 8, name: 'Bottom Bracket', category: 'Cycling', difficulty: 'advanced', definition: 'The bearing assembly that connects the crankset to the bicycle frame.' },
  { id: 9, name: 'Bracketing', category: 'Photography', difficulty: 'intermediate', definition: 'Taking multiple shots of the same scene at different exposure settings.' },
  { id: 10, name: 'Butterfly', category: 'Swimming', difficulty: 'advanced', definition: 'The most technically demanding competitive swimming stroke.' },
  { id: 11, name: 'Cadence', category: 'Cycling', difficulty: 'intermediate', definition: 'The number of pedal revolutions per minute (RPM).' },
  { id: 12, name: 'Catch', category: 'Swimming', difficulty: 'intermediate', definition: 'The initial phase of a swimming stroke where the hand enters the water.' },
  { id: 13, name: 'Composition', category: 'Photography', difficulty: 'beginner', definition: 'The arrangement of elements within a photograph.' },
  { id: 14, name: 'Criterium', category: 'Cycling', difficulty: 'intermediate', definition: 'A short-distance bike race held on a closed circuit.' },
  { id: 15, name: 'Depth of Field', category: 'Photography', difficulty: 'intermediate', definition: 'The range of distance in which objects appear acceptably sharp in an image.' },
  { id: 16, name: 'Dolphin Kick', category: 'Swimming', difficulty: 'advanced', definition: 'An undulating kick performed underwater, resembling a dolphin\'s movement.' },
  { id: 17, name: 'Drafting', category: 'Cycling', difficulty: 'intermediate', definition: 'Riding closely behind another cyclist to reduce wind resistance.' },
  { id: 18, name: 'Endurance', category: 'Swimming', difficulty: 'beginner', definition: 'The ability to sustain prolonged physical effort.' },
  { id: 19, name: 'Exposure', category: 'Photography', difficulty: 'beginner', definition: 'The amount of light that reaches the camera sensor.' },
  { id: 20, name: 'F-Stop', category: 'Photography', difficulty: 'intermediate', definition: 'A number that indicates the size of the aperture opening.' },
  { id: 21, name: 'Fixed Gear', category: 'Cycling', difficulty: 'intermediate', definition: 'A bicycle drivetrain with no freewheel mechanism.' },
  { id: 22, name: 'Flip Turn', category: 'Swimming', difficulty: 'intermediate', definition: 'A swimming turn executed by doing a forward somersault.' },
  { id: 23, name: 'Focal Length', category: 'Photography', difficulty: 'intermediate', definition: 'The distance between the lens and the image sensor when focused at infinity.' },
  { id: 24, name: 'Freestyle', category: 'Swimming', difficulty: 'beginner', definition: 'The fastest and most common competitive swimming stroke.' },
  { id: 25, name: 'Golden Hour', category: 'Photography', difficulty: 'beginner', definition: 'The period shortly after sunrise or before sunset when lighting is soft.' },
  { id: 26, name: 'Granny Gear', category: 'Cycling', difficulty: 'beginner', definition: 'The lowest gear ratio on a bicycle, used for climbing steep hills.' },
  { id: 27, name: 'Hammer', category: 'Cycling', difficulty: 'intermediate', definition: 'To ride very hard, putting maximum effort into pedaling.' },
  { id: 28, name: 'HDR', category: 'Photography', difficulty: 'intermediate', definition: 'High Dynamic Range imaging technique for capturing greater tonal detail.' },
  { id: 29, name: 'Hypoxic', category: 'Swimming', difficulty: 'advanced', definition: 'Training with restricted breathing to improve lung capacity.' },
  { id: 30, name: 'ISO', category: 'Photography', difficulty: 'beginner', definition: 'A camera setting that controls sensor sensitivity to light.' }
]

export default function AllTermsPage() {
  const sortedTerms = mockAllTerms.sort((a, b) => a.name.localeCompare(b.name))
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  const categoryColors = {
    'Cycling': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Swimming': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    'Photography': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }

  // Group terms by first letter
  const termsByLetter = sortedTerms.reduce((acc, term) => {
    const letter = term.name[0].toUpperCase()
    if (!acc[letter]) {
      acc[letter] = []
    }
    acc[letter].push(term)
    return acc
  }, {} as Record<string, typeof mockAllTerms>)

  const letters = Object.keys(termsByLetter).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            All Terms
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse all {mockAllTerms.length} terms in our dictionary, organized alphabetically 
            across all categories and difficulty levels.
          </p>
        </div>

        {/* Statistics */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {mockAllTerms.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Terms</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(mockAllTerms.map(term => term.category)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {letters.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Letters Covered</div>
            </div>
          </div>
        </div>

        {/* Alphabetical Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex w-full">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
                const hasTerms = termsByLetter[letter] && termsByLetter[letter].length > 0
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    className={`flex-1 flex items-center justify-center h-8 text-sm font-semibold rounded transition-colors ${
                      hasTerms 
                        ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer'
                        : 'text-gray-400 dark:text-gray-600 cursor-default'
                    }`}
                  >
                    {letter}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Terms by Letter */}
        <div className="max-w-6xl mx-auto space-y-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-3">
                  <h2 className="text-2xl font-bold">{letter}</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {termsByLetter[letter].map((term) => (
                      <div key={term.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <Link 
                            href={`/term/${term.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            {term.name}
                          </Link>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${categoryColors[term.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
                              {term.category}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[term.difficulty as keyof typeof difficultyColors]}`}>
                              {term.difficulty}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Explore More
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Browse by category or discover trending and recently added terms.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Categories
            </Link>
            <Link
              href="/popular"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Popular Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}