import Link from 'next/link'

// Mock data for popular terms with view counts and rankings
const mockPopularTerms = [
  { 
    id: 1, 
    name: 'Bonk', 
    category: 'Cycling', 
    difficulty: 'beginner', 
    definition: 'The sudden loss of energy due to glycogen depletion during long rides.',
    views: 15420,
    rank: 1,
    weeklyGrowth: 15
  },
  { 
    id: 2, 
    name: 'Depth of Field', 
    category: 'Photography', 
    difficulty: 'intermediate', 
    definition: 'The range of distance in which objects appear acceptably sharp in an image.',
    views: 12350,
    rank: 2,
    weeklyGrowth: 8
  },
  { 
    id: 3, 
    name: 'Freestyle', 
    category: 'Swimming', 
    difficulty: 'beginner', 
    definition: 'The fastest and most common competitive swimming stroke.',
    views: 11200,
    rank: 3,
    weeklyGrowth: -2
  },
  { 
    id: 4, 
    name: 'Cadence', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'The number of pedal revolutions per minute (RPM).',
    views: 9800,
    rank: 4,
    weeklyGrowth: 12
  },
  { 
    id: 5, 
    name: 'Golden Hour', 
    category: 'Photography', 
    difficulty: 'beginner', 
    definition: 'The period shortly after sunrise or before sunset when lighting is soft.',
    views: 9200,
    rank: 5,
    weeklyGrowth: 25
  },
  { 
    id: 6, 
    name: 'Flip Turn', 
    category: 'Swimming', 
    difficulty: 'intermediate', 
    definition: 'A swimming turn executed by doing a forward somersault.',
    views: 8700,
    rank: 6,
    weeklyGrowth: 5
  },
  { 
    id: 7, 
    name: 'Aperture', 
    category: 'Photography', 
    difficulty: 'beginner', 
    definition: 'The opening in a lens that controls how much light enters the camera.',
    views: 8400,
    rank: 7,
    weeklyGrowth: -1
  },
  { 
    id: 8, 
    name: 'Drafting', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'Riding closely behind another cyclist to reduce wind resistance.',
    views: 7900,
    rank: 8,
    weeklyGrowth: 18
  },
  { 
    id: 9, 
    name: 'Butterfly', 
    category: 'Swimming', 
    difficulty: 'advanced', 
    definition: 'The most technically demanding competitive swimming stroke.',
    views: 7200,
    rank: 9,
    weeklyGrowth: 7
  },
  { 
    id: 10, 
    name: 'ISO', 
    category: 'Photography', 
    difficulty: 'beginner', 
    definition: 'A camera setting that controls sensor sensitivity to light.',
    views: 6800,
    rank: 10,
    weeklyGrowth: -5
  },
  { 
    id: 11, 
    name: 'Criterium', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'A short-distance bike race held on a closed circuit.',
    views: 6200,
    rank: 11,
    weeklyGrowth: 22
  },
  { 
    id: 12, 
    name: 'Bokeh', 
    category: 'Photography', 
    difficulty: 'intermediate', 
    definition: 'The aesthetic quality of out-of-focus areas in an image.',
    views: 5900,
    rank: 12,
    weeklyGrowth: 10
  },
  { 
    id: 13, 
    name: 'Backstroke', 
    category: 'Swimming', 
    difficulty: 'beginner', 
    definition: 'One of the four competitive swimming strokes, performed on the back.',
    views: 5400,
    rank: 13,
    weeklyGrowth: 3
  },
  { 
    id: 14, 
    name: 'Fixed Gear', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'A bicycle drivetrain with no freewheel mechanism.',
    views: 5100,
    rank: 14,
    weeklyGrowth: -8
  },
  { 
    id: 15, 
    name: 'F-Stop', 
    category: 'Photography', 
    difficulty: 'intermediate', 
    definition: 'A number that indicates the size of the aperture opening.',
    views: 4800,
    rank: 15,
    weeklyGrowth: 14
  }
]

export default function PopularTermsPage() {
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Terms
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the most searched and viewed terms in our dictionary. 
            Rankings updated weekly based on user engagement.
          </p>
        </div>

        {/* Top 3 Highlighted */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            🏆 Top 3 Most Popular
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockPopularTerms.slice(0, 3).map((term, index) => (
              <div key={term.id} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-700 relative">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex items-start justify-between mb-3">
                  <Link 
                    href={`/term/${term.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                  >
                    {term.name}
                  </Link>
                  <div className="text-right text-sm">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {term.views.toLocaleString()}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">views</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {term.definition}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${categoryColors[term.category as keyof typeof categoryColors]}`}>
                      {term.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[term.difficulty as keyof typeof difficultyColors]}`}>
                      {term.difficulty}
                    </span>
                  </div>
                  <div className={`flex items-center text-xs ${term.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{term.weeklyGrowth >= 0 ? '\u2191' : '\u2193'}</span>
                    <span className="ml-1">{Math.abs(term.weeklyGrowth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Rankings */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            📊 Complete Rankings
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Term
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockPopularTerms.map((term) => (
                    <tr key={term.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`font-bold text-lg ${
                            term.rank <= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {term.rank}
                          </span>
                          {term.rank <= 3 && <span className="ml-2">🏆</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <Link 
                            href={`/term/${term.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                          >
                            {term.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[term.difficulty as keyof typeof difficultyColors]}`}>
                              {term.difficulty}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${categoryColors[term.category as keyof typeof categoryColors]}`}>
                          {term.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {term.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center font-semibold ${term.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span>{term.weeklyGrowth >= 0 ? '\u2191' : '\u2193'}</span>
                          <span className="ml-1">{Math.abs(term.weeklyGrowth)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Discover More Terms
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Explore all terms or see what&apos;s been added recently to our dictionary.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/all-terms"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              All Terms
            </Link>
            <Link
              href="/recent"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Recent Additions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}