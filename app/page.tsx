import SearchBar from '@/components/SearchBar'
import { TermCard } from '@/components/TermCard'
import { getTrendingTerms, getTermOfTheDay, getAllCategories } from '@/lib/api-http'
import Link from 'next/link'

export default async function Home() {
  const [termOfTheDay, trendingTerms, categories] = await Promise.all([
    getTermOfTheDay(),
    getTrendingTerms(6),
    getAllCategories()
  ])

  // Get top categories (those with terms)
  const topCategories = categories
    .filter(cat => (cat.term_count || 0) > 0)
    .slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to Hobbipedia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12">
              Your comprehensive encyclopedia of hobby and niche terms. Discover, learn, and contribute to our growing collection.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Term of the Day */}
      {termOfTheDay && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Term of the Day
            </h2>
            <Link href={`/term/${termOfTheDay.slug || termOfTheDay.id}`}>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl text-white hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-bold">{termOfTheDay.name}</h3>
                  {termOfTheDay.categories?.[0] && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {termOfTheDay.categories[0].name}
                    </span>
                  )}
                </div>
                <p className="text-lg mb-4">{termOfTheDay.definition}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 hover:text-white transition-colors">
                    Learn more →
                  </span>
                  {termOfTheDay.difficulty && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                      {termOfTheDay.difficulty}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Trending Terms */}
      {trendingTerms.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Trending Terms
              </h2>
              <Link 
                href="/trending"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View all →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTerms.map((term) => (
                <TermCard key={term.id} term={term} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Category */}
      {topCategories.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Browse by Category
              </h2>
              <Link 
                href="/categories"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                All categories →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="text-3xl mb-3">{category.emoji}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {category.name}
                  </h3>
                  {category.term_count !== undefined && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {category.term_count} {category.term_count === 1 ? 'term' : 'terms'}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Know a term we're missing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Help us build the world's most comprehensive hobby dictionary
          </p>
          <Link
            href="/submit"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contribute a Term
          </Link>
        </div>
      </section>

    </div>
  )
}