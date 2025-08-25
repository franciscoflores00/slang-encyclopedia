import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { getTrendingTerms, getTermOfTheDay } from '@/lib/api'

export default async function Home() {
  const trendingTerms = await getTrendingTerms(6)
  const termOfDay = await getTermOfTheDay()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hobbipedia
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Your comprehensive guide to hobbies, interests, and specialized terminology. 
            From sports and crafts to technology and beyond.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>

        {/* Alphabetical Index Bar - Hidden on Mobile */}
        <div className="hidden md:block max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="text-center mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Browse by Letter
              </span>
            </div>
            <div className="flex w-full">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
                <Link
                  key={letter}
                  href={`/browse/${letter.toLowerCase()}`}
                  className="flex-1 flex items-center justify-center h-10 text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  {letter}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Term of the Day */}
        {termOfDay && (
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
                    ✨ Term of the Day
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <Link href={`/term/${termOfDay.id}`} className="block group">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3 group-hover:text-blue-700">
                    {termOfDay.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-4">
                    {termOfDay.definition}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    {termOfDay.categories?.map(cat => (
                      <span key={cat.id} className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {cat.emoji} {cat.name}
                      </span>
                    ))}
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                      termOfDay.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      termOfDay.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {termOfDay.difficulty}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Trending Terms */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔥 Trending Terms Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trendingTerms.length > 0 ? (
              trendingTerms.map((term, index) => (
                <Link key={term.id} href={`/term/${term.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {term.name}
                    </h3>
                    <span className={`text-sm font-bold ${
                      index < 3 ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {term.definition}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {term.categories?.[0] && (
                        <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {term.categories[0].emoji} {term.categories[0].name}
                        </span>
                      )}
                    </div>
                    {term.view_count && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {term.view_count.toLocaleString()} views
                      </span>
                    )}
                  </div>
                  {term.trending_score && term.trending_score > 0 && (
                    <div className="mt-2 flex items-center text-green-600 text-xs">
                      <span>↑ {term.trending_score}% today</span>
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No trending terms yet. Start exploring!
                </p>
                <Link href="/all-terms" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse All Terms →
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 px-4">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Search All Categories
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Search All Terms
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Submit a Term
            </Link>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            Start exploring hobby terminology or contribute by submitting new terms!
          </p>
        </div>
      </main>
    </div>
  )
}