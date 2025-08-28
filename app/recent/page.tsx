import Link from 'next/link'

// Mock data for recent additions with timestamps
const mockRecentTerms = [
  { 
    id: 1, 
    name: 'Zone Training', 
    category: 'Cycling', 
    difficulty: 'advanced', 
    definition: 'Training method based on heart rate or power zones to target specific physiological adaptations.',
    addedDate: '2024-01-15T10:30:00Z',
    contributor: 'Sarah M.'
  },
  { 
    id: 2, 
    name: 'X-Sync', 
    category: 'Photography', 
    difficulty: 'advanced', 
    definition: 'The fastest shutter speed at which a camera can synchronize with an external flash.',
    addedDate: '2024-01-14T16:45:00Z',
    contributor: 'Mike R.'
  },
  { 
    id: 3, 
    name: 'Yardage', 
    category: 'Swimming', 
    difficulty: 'beginner', 
    definition: 'The total distance swum in a training session or workout.',
    addedDate: '2024-01-14T09:15:00Z',
    contributor: 'Emma L.'
  },
  { 
    id: 4, 
    name: 'Wind Trainer', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'An indoor bike trainer that uses a fan to create resistance through air displacement.',
    addedDate: '2024-01-13T14:20:00Z',
    contributor: 'Alex K.'
  },
  { 
    id: 5, 
    name: 'White Balance', 
    category: 'Photography', 
    difficulty: 'intermediate', 
    definition: 'A camera setting that adjusts colors to appear natural under different lighting conditions.',
    addedDate: '2024-01-13T11:00:00Z',
    contributor: 'David P.'
  },
  { 
    id: 6, 
    name: 'Vertical Kicking', 
    category: 'Swimming', 
    difficulty: 'intermediate', 
    definition: 'A training drill performed in deep water with the swimmer in a vertical position.',
    addedDate: '2024-01-12T17:30:00Z',
    contributor: 'Lisa W.'
  },
  { 
    id: 7, 
    name: 'Velodrome', 
    category: 'Cycling', 
    difficulty: 'intermediate', 
    definition: 'An arena with a banked oval track designed for track cycling races.',
    addedDate: '2024-01-12T08:45:00Z',
    contributor: 'Tom H.'
  },
  { 
    id: 8, 
    name: 'Viewfinder', 
    category: 'Photography', 
    difficulty: 'beginner', 
    definition: 'The part of the camera used to compose and sometimes focus the picture.',
    addedDate: '2024-01-11T13:15:00Z',
    contributor: 'Anna B.'
  },
  { 
    id: 9, 
    name: 'Underwater', 
    category: 'Swimming', 
    difficulty: 'intermediate', 
    definition: 'The portion of swimming done beneath the water surface, typically after starts and turns.',
    addedDate: '2024-01-11T10:00:00Z',
    contributor: 'Chris M.'
  },
  { 
    id: 10, 
    name: 'Upstroke', 
    category: 'Cycling', 
    difficulty: 'advanced', 
    definition: 'The upward portion of the pedaling motion, important for efficient power transfer.',
    addedDate: '2024-01-10T16:20:00Z',
    contributor: 'Rachel S.'
  },
  { 
    id: 11, 
    name: 'UV Filter', 
    category: 'Photography', 
    difficulty: 'beginner', 
    definition: 'A transparent filter that blocks ultraviolet light and protects the lens.',
    addedDate: '2024-01-10T12:30:00Z',
    contributor: 'Mark T.'
  },
  { 
    id: 12, 
    name: 'Tempo', 
    category: 'Swimming', 
    difficulty: 'intermediate', 
    definition: 'A moderate-intensity training pace that can be sustained for extended periods.',
    addedDate: '2024-01-09T14:45:00Z',
    contributor: 'Sophie G.'
  }
]

export default function RecentAdditionsPage() {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  // Group terms by date
  const termsByDate = mockRecentTerms.reduce((acc, term) => {
    const dateKey = formatDate(term.addedDate)
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(term)
    return acc
  }, {} as Record<string, typeof mockRecentTerms>)

  const dateGroups = Object.keys(termsByDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Additions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay up to date with the latest terms added to our dictionary. 
            New content is added regularly by our community of experts.
          </p>
        </div>

        {/* Statistics */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {mockRecentTerms.length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Terms This Week</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {new Set(mockRecentTerms.map(term => term.category)).size}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Categories Updated</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(mockRecentTerms.map(term => term.contributor)).size}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Contributors</div>
            </div>
          </div>
        </div>

        {/* Most Recent (Last 3 terms) */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            🆕 Just Added
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockRecentTerms.slice(0, 3).map((term) => (
              <div key={term.id} className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-700">
                <div className="flex items-start justify-between mb-3">
                  <Link 
                    href={`/term/${term.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-lg font-bold text-green-600 dark:text-green-400 hover:text-green-700"
                  >
                    {term.name}
                  </Link>
                  <div className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {term.definition}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full font-medium ${categoryColors[term.category as keyof typeof categoryColors]}`}>
                      {term.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full font-medium ${difficultyColors[term.difficulty as keyof typeof difficultyColors]}`}>
                      {term.difficulty}
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    by {term.contributor}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Added {formatDate(term.addedDate)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            📅 Complete Timeline
          </h2>
          <div className="space-y-8">
            {dateGroups.map((dateGroup) => (
              <div key={dateGroup}>
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dateGroup}
                  </h3>
                  <div className="flex-1 border-t border-gray-300 dark:border-gray-600 ml-4"></div>
                  <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                    {termsByDate[dateGroup].length} term{termsByDate[dateGroup].length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-4">
                  {termsByDate[dateGroup].map((term) => (
                    <div key={term.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <Link 
                          href={`/term/${term.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                        >
                          {term.name}
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${categoryColors[term.category as keyof typeof categoryColors]}`}>
                            {term.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[term.difficulty as keyof typeof difficultyColors]}`}>
                            {term.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        {term.definition}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Contributed by {term.contributor}</span>
                        <span>{new Date(term.addedDate).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Want to Contribute?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Help us grow by suggesting new terms or browse our existing collection.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/submit"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Contribute
            </Link>
            <Link
              href="/all-terms"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse All Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}