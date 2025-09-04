'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import { searchTerms, getAllCategories } from '@/lib/api'
import { TermWithCategories, Category } from '@/types'
import Link from 'next/link'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<TermWithCategories[]>([])
  const [filteredResults, setFilteredResults] = useState<TermWithCategories[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'relevance'>('relevance')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      const searchResults = await searchTerms(searchQuery)
      setResults(searchResults)
      setFilteredResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setFilteredResults([])
    } finally {
      setLoading(false)
    }
  }

  // Load categories for filter
  useEffect(() => {
    getAllCategories().then(setCategories)
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...results]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => 
        term.categories?.some(cat => cat.id === selectedCategory)
      )
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(term => term.difficulty === selectedDifficulty)
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'difficulty') {
      const diffOrder = { beginner: 0, intermediate: 1, advanced: 2 }
      filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty])
    }

    setFilteredResults(filtered)
  }, [results, selectedCategory, selectedDifficulty, sortBy])

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams])

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    performSearch(newQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Browse Terms
          </h1>
          <div className="max-w-2xl mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Advanced Filters - Desktop */}
          {results.length > 0 && (
            <>
              {/* Desktop Filters */}
              <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Category:
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.emoji} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Difficulty:
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="difficulty">Difficulty</option>
                    </select>
                  </div>
                  
                  {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all')
                        setSelectedDifficulty('all')
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
                
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredResults.length} of {results.length} results
                </div>
              </div>

              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4 flex items-center justify-between">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredResults.length} results
                </span>
              </div>

              {/* Mobile Filter Drawer */}
              {mobileFiltersOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg p-6 max-h-96 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                      <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.emoji} {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        >
                          <option value="all">All Levels</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Sort by
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        >
                          <option value="relevance">Relevance</option>
                          <option value="name">Name (A-Z)</option>
                          <option value="difficulty">Difficulty</option>
                        </select>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => {
                            setSelectedCategory('all')
                            setSelectedDifficulty('all')
                            setSortBy('relevance')
                          }}
                          className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => setMobileFiltersOpen(false)}
                          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Searching...</p>
          </div>
        )}

        {!loading && query && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
          </div>
        )}

        {!loading && !query && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Search for terms, or browse by category and alphabetically from the homepage.
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {filteredResults.map((term) => (
            <div key={term.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700">
                  <Link href={`/term/${term.id}`}>
                    {term.name}
                  </Link>
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {term.categories?.map((category, index) => (
                    <div key={category.id} className="flex items-center gap-1">
                      {category.emoji && (
                        <span className="text-lg">{category.emoji}</span>
                      )}
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        category.is_primary 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {category.name}
                        {category.is_primary && ' (Primary)'}
                      </span>
                    </div>
                  ))}
                  {!term.categories?.length && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full">
                      General
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    term.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    term.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {term.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                {term.definition}
              </p>
              {term.examples && term.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Examples:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                    {term.examples.slice(0, 2).map((example, index) => (
                      <li key={index}>&quot;{example}&quot;</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try searching with different keywords or browse by category
            </p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
              Browse Categories →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}