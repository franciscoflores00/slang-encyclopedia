import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTermById, getSimilarTerms, incrementViewCount } from '@/lib/api'

interface TermPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TermPage({ params }: TermPageProps) {
  const { id } = await params
  const term = await getTermById(id)
  
  // Increment view count (non-blocking)
  try {
    await incrementViewCount(id)
  } catch (error) {
    console.error('Failed to increment view count:', error)
  }
  
  if (!term) {
    notFound()
  }

  // Get similar terms for "People also searched for"
  const categoryIds = term.categories?.map(c => c.id) || []
  const similarTerms = categoryIds.length > 0 ? await getSimilarTerms(id, categoryIds, 3) : []

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mr-2">
            Home
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <Link href="/search" className="text-blue-600 hover:text-blue-700 mr-2">
            Search
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <span className="text-gray-600 dark:text-gray-300">{term.name}</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {term.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                {term.categories?.map((category) => (
                  <div key={category.id} className="flex items-center gap-1">
                    {category.emoji && (
                      <span className="text-2xl">{category.emoji}</span>
                    )}
                    <Link 
                      href={`/category/${category.slug}`}
                      className={`px-3 py-1 rounded-full transition-colors ${
                        category.is_primary 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                      {category.is_primary && ' (Primary)'}
                    </Link>
                  </div>
                ))}
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${difficultyColors[term.difficulty]}`}>
                  {term.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none dark:prose-invert mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Definition</h2>
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {term.definition}
            </p>
          </div>

          {term.examples && term.examples.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
              <ul className="space-y-2">
                {term.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300 italic">
                      "{example}"
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {term.etymology && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Etymology</h2>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                {term.etymology}
              </p>
            </div>
          )}

          {term.pronunciation && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Pronunciation</h2>
              <p className="text-gray-700 dark:text-gray-300 font-mono text-lg">
                {term.pronunciation}
              </p>
            </div>
          )}

          {term.usage_notes && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Usage Notes</h2>
              <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                {term.usage_notes}
              </p>
            </div>
          )}

          {term.related_terms && term.related_terms.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Related Terms</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {term.related_terms.map((relatedTerm) => (
                  <Link
                    key={relatedTerm.id}
                    href={`/term/${relatedTerm.id}`}
                    className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {relatedTerm.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {relatedTerm.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p>
              Added: {new Date(term.created_at).toLocaleDateString()}
              {term.updated_at !== term.created_at && (
                <span> • Updated: {new Date(term.updated_at).toLocaleDateString()}</span>
              )}
            </p>
          </div>
        </div>

        {/* People also searched for */}
        {similarTerms.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              People also searched for
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {similarTerms.map((similarTerm) => (
                <Link
                  key={similarTerm.id}
                  href={`/term/${similarTerm.id}`}
                  className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {similarTerm.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                    {similarTerm.definition}
                  </p>
                  <div className="flex items-center gap-2">
                    {similarTerm.categories?.[0] && (
                      <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">
                        {similarTerm.categories[0].emoji} {similarTerm.categories[0].name}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      similarTerm.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      similarTerm.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {similarTerm.difficulty}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search More Terms
          </Link>
        </div>
      </div>
    </div>
  )
}