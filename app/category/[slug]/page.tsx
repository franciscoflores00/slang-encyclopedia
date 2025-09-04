import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getTermsByCategorySlug, getAllCategories } from '@/lib/api-http'
import { TermWithCategories } from '@/types'
import SearchBar from '@/components/SearchBar'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Hobbipedia',
      description: 'The requested hobby category was not found.'
    }
  }

  return {
    title: `${category.name} Dictionary - Hobbipedia`,
    description: category.description || `Explore terminology and vocabulary for ${category.name}. Learn the specialized language used by ${category.name.toLowerCase()} enthusiasts and professionals.`,
    keywords: `${category.name}, ${category.name.toLowerCase()} terms, ${category.name.toLowerCase()} vocabulary, ${category.name.toLowerCase()} dictionary, hobby terminology`,
    openGraph: {
      title: `${category.name} Dictionary - Hobbipedia`,
      description: category.description || `Comprehensive ${category.name.toLowerCase()} terminology and vocabulary guide`,
      type: 'website',
    }
  }
}

// Generate static params for all categories (enables static generation)
export async function generateStaticParams() {
  return [
    { slug: 'swimming' },
    { slug: 'cycling' }
  ]
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // Fetch category and its terms from database
  const category = await getCategoryBySlug(slug)
  const terms = await getTermsByCategorySlug(slug)
  const allCategories = await getAllCategories()
  
  if (!category) {
    notFound()
  }

  // Group terms by first letter
  const termsByLetter: Record<string, TermWithCategories[]> = {}
  terms.forEach(term => {
    const firstLetter = term.name[0].toUpperCase()
    if (!termsByLetter[firstLetter]) {
      termsByLetter[firstLetter] = []
    }
    termsByLetter[firstLetter].push(term)
  })

  // Sort letters alphabetically
  const letters = Object.keys(termsByLetter).sort()
  const totalTerms = terms.length

  // Calculate statistics
  const difficultyStats = {
    beginner: terms.filter(t => t.difficulty === 'beginner').length,
    intermediate: terms.filter(t => t.difficulty === 'intermediate').length,
    advanced: terms.filter(t => t.difficulty === 'advanced').length
  }

  // Get popular terms (most viewed) - top 3
  const popularTerms = terms
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 3)

  // Get recent terms (most recently added) - top 3
  const recentTerms = terms
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)

  // Get related categories (exclude current)
  const relatedCategories = allCategories
    .filter(cat => cat.slug !== category.slug)
    .slice(0, 5)


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mr-2">
            Home
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <Link href="/categories" className="text-blue-600 hover:text-blue-700 mr-2">
            Categories
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <span className="text-gray-600 dark:text-gray-300">{category.name}</span>
        </nav>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>

        {/* Hero Section with Category Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            {/* Gradient Header with Category Color */}
            <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    {category.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Category Description and Stats */}
            <div className="p-8">
              {category.description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 text-left mb-6">
                  {category.description}
                </p>
              )}
              
              {/* Statistics - Minimal Format */}
              <div className="text-center">
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-lg text-gray-900 dark:text-white">{totalTerms}</span>
                  <span className="text-lg text-gray-600 dark:text-gray-400">Total Terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History & Background Section */}
        {category.history && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                History & Background
              </h2>
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {category.history}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout for Popular and Recent Terms */}
        <div className="max-w-6xl mx-auto mb-8 grid lg:grid-cols-2 gap-6">
          {/* Popular Terms */}
          {popularTerms.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Most Popular Terms
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">By views</span>
              </div>
              <div className="space-y-3">
                {popularTerms.map((term, index) => (
                  <Link
                    key={term.id}
                    href={`/term/${term.slug || term.id}`}
                    className="block p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-lg hover:shadow-md transition-all border border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            #{index + 1}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {term.name}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            term.difficulty === 'beginner' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : term.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {term.difficulty.charAt(0).toUpperCase() + term.difficulty.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                          {term.definition}
                        </p>
                      </div>
                      {term.view_count && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {term.view_count} views
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recently Added Terms */}
          {recentTerms.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recently Added
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Latest terms</span>
              </div>
              <div className="space-y-3">
                {recentTerms.map((term) => (
                  <Link
                    key={term.id}
                    href={`/term/${term.slug || term.id}`}
                    className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg hover:shadow-md transition-all border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            NEW
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {term.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {new Date(term.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Alphabetical Index Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Quick Navigation
            </h3>
            <div className="flex justify-center gap-1">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
                const hasTerms = termsByLetter[letter] && termsByLetter[letter].length > 0
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-lg transition-all ${
                      hasTerms 
                        ? 'text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                        : 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-700 cursor-default'
                    }`}
                  >
                    {letter}
                    {hasTerms && (
                      <span className="sr-only">({termsByLetter[letter].length} terms)</span>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Complete Dictionary Section */}
        <div id="dictionary" className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Complete {category.name} Dictionary
            </h2>
          </div>

          {/* Terms by Letter */}
          {terms.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{letter}</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid gap-4">
                        {termsByLetter[letter].map((term, index) => (
                          <Link
                            key={term.id}
                            href={`/term/${term.slug || term.id}`}
                            className="group block p-4 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all hover:shadow-md"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                {term.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  term.difficulty === 'beginner' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                    : term.difficulty === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {term.difficulty.charAt(0).toUpperCase() + term.difficulty.slice(1)}
                                </span>
                                {term.view_count && term.view_count > 50 && (
                                  <span className="text-xs text-orange-600 dark:text-orange-400" title="Popular term">
                                    🔥
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                              {term.definition}
                            </p>
                            {term.examples && term.examples.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                  Example: &quot;{term.examples[0]}&quot;
                                </p>
                              </div>
                            )}
                            {term.categories && term.categories.length > 1 && (
                              <div className="flex items-center gap-1 mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Also in:</span>
                                {term.categories
                                  .filter(cat => cat.slug !== category.slug)
                                  .slice(0, 2)
                                  .map((cat, i) => (
                                    <span key={cat.id} className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                                      {cat.emoji} {cat.name}
                                    </span>
                                  ))}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Terms Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to contribute terms to the {category.name} category!
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <span className="mr-2">➕</span> Add the First Term
              </Link>
            </div>
          )}
        </div>

        {/* Related Categories Section */}
        {relatedCategories.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Explore Related Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="group text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all hover:shadow-md"
                  >
                    {cat.emoji && (
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {cat.emoji}
                      </div>
                    )}
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {cat.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {cat.term_count || 0} terms
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/categories"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Browse All Categories →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Help Us Grow the {category.name} Dictionary
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Know a term that&apos;s not listed? Your contributions help make this the most comprehensive {' '}
              {category.name.toLowerCase()} glossary on the web.
            </p>
            <div className="flex justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
              >
                Contribute
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}