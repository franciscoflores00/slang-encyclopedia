import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllTermsByLetter } from '@/lib/api'
import { TermWithCategories } from '@/types'

interface BrowsePageProps {
  params: Promise<{
    letter: string
  }>
}

export default async function BrowsePage({ params }: BrowsePageProps) {
  const { letter } = await params
  
  // Validate the letter parameter
  const isValidLetter = /^[a-z]$/.test(letter)
  if (!isValidLetter) {
    notFound()
  }

  const terms = await getAllTermsByLetter(letter)
  const displayLetter = letter.toUpperCase()

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
          <span className="text-gray-600 dark:text-gray-300">Browse {displayLetter}</span>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms Starting with &quot;{displayLetter}&quot;
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {terms.length} term{terms.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Alphabetical Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex w-full">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((navLetter) => (
                <Link
                  key={navLetter}
                  href={`/browse/${navLetter.toLowerCase()}`}
                  className={`flex-1 flex items-center justify-center h-10 text-base font-semibold rounded transition-colors ${
                    navLetter.toLowerCase() === letter
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {navLetter}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {terms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No terms found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No terms starting with &quot;{displayLetter}&quot; have been added yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Other Letters
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {terms.map((term) => (
              <div key={term.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-700">
                    <Link href={`/term/${term.id}`}>
                      {term.name}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${difficultyColors[term.difficulty]}`}>
                      {term.difficulty}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                  {term.definition}
                </p>

                {/* Categories */}
                {term.categories && term.categories.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories:</span>
                    {term.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors ${
                          category.is_primary 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {category.emoji && <span>{category.emoji}</span>}
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}

                {term.examples && term.examples.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">Example:</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                      &quot;{term.examples[0]}&quot;
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Added {new Date(term.created_at).toLocaleDateString()}</span>
                  <Link 
                    href={`/term/${term.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors mr-4"
          >
            ← Back to Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search Terms
          </Link>
        </div>
      </div>
    </div>
  )
}