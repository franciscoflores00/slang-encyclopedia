'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBrowseDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {/* Desktop Logo */}
            <img 
              src="/images/logo/hobbipedia-logo.svg" 
              alt="Hobbipedia - Your hobby encyclopedia" 
              className="hidden md:block h-8 w-auto"
            />
            {/* Mobile Logo - Icon only */}
            <div className="md:hidden flex items-center space-x-2">
              <img 
                src="/images/logo/hobbipedia-icon.svg" 
                alt="Hobbipedia" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-gray-200">
                Hobbipedia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              About
            </Link>
            
            {/* Browse Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                onMouseEnter={() => setBrowseDropdownOpen(true)}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Browse
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {browseDropdownOpen && (
                <div
                  onMouseLeave={() => setBrowseDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                >
                  <Link
                    href="/"
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-t-lg"
                    onClick={() => setBrowseDropdownOpen(false)}
                  >
                    Terms
                  </Link>
                  <Link
                    href="/categories"
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-b-lg"
                    onClick={() => setBrowseDropdownOpen(false)}
                  >
                    Categories
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/submit" 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Contribute
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Browse Terms
            </Link>
            <Link 
              href="/categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/submit" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 mt-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
            >
              Contribute
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}