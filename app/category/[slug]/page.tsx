import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getTermsByCategorySlug } from '@/lib/api'
import { TermWithCategories } from '@/types'
import SearchBar from '@/components/SearchBar'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // Fetch category and its terms from database
  const category = await getCategoryBySlug(slug)
  const terms = await getTermsByCategorySlug(slug)
  
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

        {/* Category Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="text-center p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-4">
                {category.emoji && (
                  <span className="text-5xl">{category.emoji}</span>
                )}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h1>
              </div>
              {category.description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                  {category.description}
                </p>
              )}
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{totalTerms}</div>
                  <div className="text-gray-500 dark:text-gray-400">{totalTerms === 1 ? 'Term' : 'Terms'}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-green-600 dark:text-green-400">
                    {terms.filter(t => t.difficulty === 'beginner').length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Beginner</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-yellow-600 dark:text-yellow-400">
                    {terms.filter(t => t.difficulty === 'intermediate').length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Intermediate</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-red-600 dark:text-red-400">
                    {terms.filter(t => t.difficulty === 'advanced').length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Advanced</div>
                </div>
              </div>
            </div>
            
            {/* History Section */}
            {category.history && (
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📚 History & Background
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {category.history}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alphabetical Index Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex flex-wrap justify-center gap-1">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
                const hasTerms = termsByLetter[letter] && termsByLetter[letter].length > 0
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded transition-colors ${
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

        {/* Popular Terms Section */}
        {terms.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🔥 Popular Terms in {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms
                  .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
                  .slice(0, 6)
                  .map((term) => (
                    <Link
                      key={term.id}
                      href={`/term/${term.slug || term.id}`}
                      className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg hover:shadow-md transition-all border border-blue-200 dark:border-blue-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-blue-600 dark:text-blue-400">
                          {term.name}
                        </div>
                        {term.view_count && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {term.view_count} views
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {term.definition}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Terms Dictionary Header */}
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            📚 Complete {category.name} Dictionary
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Browse all terms alphabetically
          </p>
        </div>

        {/* Terms by Letter */}
        {terms.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-6">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{letter}</h3>
                      <span className="text-blue-100">
                        {termsByLetter[letter].length} {termsByLetter[letter].length === 1 ? 'term' : 'terms'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {termsByLetter[letter].map((term, index) => (
                        <div key={term.id} className={`${index > 0 ? 'border-t border-gray-200 dark:border-gray-600 pt-4' : ''}`}>
                          <Link
                            href={`/term/${term.slug || term.id}`}
                            className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                {term.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded font-medium ${
                                  term.difficulty === 'beginner' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : term.difficulty === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {term.difficulty}
                                </span>
                                {term.view_count && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {term.view_count} views
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                              {term.definition}
                            </p>
                            {term.categories && term.categories.length > 1 && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Also in:</span>
                                {term.categories
                                  .filter(cat => cat.slug !== category.slug)
                                  .slice(0, 3)
                                  .map((cat, i) => (
                                    <span key={cat.id} className="text-xs text-blue-600 dark:text-blue-400">
                                      {i > 0 && ', '}{cat.emoji} {cat.name}
                                    </span>
                                  ))}
                                {term.categories.filter(cat => cat.slug !== category.slug).length > 3 && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    +{term.categories.filter(cat => cat.slug !== category.slug).length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No terms have been added to this category yet.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center px-6 py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Contribute
            </Link>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Explore More Categories
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover terminology from other hobbies and interests, or contribute your own knowledge.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              All Categories
            </Link>
            <Link
              href="/all-terms"
              className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Browse All Terms
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Contribute
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}