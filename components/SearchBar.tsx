'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

interface SearchSuggestion {
  id: string
  name: string
  type: 'term' | 'category'
  category?: string
  slug: string
}

const mockSuggestions: SearchSuggestion[] = [
  { id: '1', name: 'Bonk', type: 'term', category: 'Cycling', slug: 'bonk' },
  { id: '2', name: 'Aperture', type: 'term', category: 'Photography', slug: 'aperture' },
  { id: '3', name: 'Freestyle', type: 'term', category: 'Swimming', slug: 'freestyle' },
  { id: '4', name: 'Golden Hour', type: 'term', category: 'Photography', slug: 'golden-hour' },
  { id: '5', name: 'Cadence', type: 'term', category: 'Cycling', slug: 'cadence' },
  { id: '6', name: 'Depth of Field', type: 'term', category: 'Photography', slug: 'depth-of-field' },
  { id: '7', name: 'Flip Turn', type: 'term', category: 'Swimming', slug: 'flip-turn' },
  { id: '8', name: 'Drafting', type: 'term', category: 'Cycling', slug: 'drafting' },
  { id: '9', name: 'ISO', type: 'term', category: 'Photography', slug: 'iso' },
  { id: '10', name: 'Butterfly', type: 'term', category: 'Swimming', slug: 'butterfly' },
  { id: '11', name: 'Cycling', type: 'category', slug: 'cycling' },
  { id: '12', name: 'Photography', type: 'category', slug: 'photography' },
  { id: '13', name: 'Swimming', type: 'category', slug: 'swimming' },
  { id: '14', name: 'Fixed Gear', type: 'term', category: 'Cycling', slug: 'fixed-gear' },
  { id: '15', name: 'Bokeh', type: 'term', category: 'Photography', slug: 'bokeh' }
]

export default function SearchBar({ placeholder = "Search for a term...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
      setSuggestions(filtered)
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery?: string) => {
    const searchTerm = searchQuery || query.trim()
    if (searchTerm) {
      if (onSearch) {
        onSearch(searchTerm)
      } else {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      }
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelectSuggestion(suggestions[selectedIndex])
    } else {
      handleSearch()
    }
  }

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'term') {
      router.push(`/term/${suggestion.slug}`)
    } else {
      router.push(`/category/${suggestion.slug}`)
    }
    setQuery('')
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-full border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   shadow-lg pr-20 md:pr-24 touch-manipulation"
          autoComplete="off"
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-16 md:right-20 top-1/2 transform -translate-y-1/2 w-7 h-7 md:w-6 md:h-6
                     text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                     flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
        
        <button 
          type="submit"
          className="absolute right-1 md:right-2 top-1 md:top-2 px-3 md:px-6 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white rounded-full transition-colors text-sm md:text-base touch-manipulation"
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg 
                   overflow-hidden z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 
                       flex items-center justify-between transition-colors ${
                         index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                       }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  suggestion.type === 'term' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {suggestion.type === 'term' ? 'T' : 'C'}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {suggestion.name}
                  </div>
                  {suggestion.category && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      in {suggestion.category}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {suggestion.type === 'term' ? 'Term' : 'Category'}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}