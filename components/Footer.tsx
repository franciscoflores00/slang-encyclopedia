import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-700 dark:bg-gray-800 text-white border-t border-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          {/* Left side - Site title */}
          <div>
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Hobbipedia
            </Link>
            <p className="text-gray-400 mt-1 text-sm">
              Your comprehensive guide to hobby terminology
            </p>
          </div>

          {/* Right side - Navigation links */}
          <nav className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">General</h4>
              <div className="space-y-1">
                <Link 
                  href="/about" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white">Legal</h4>
              <div className="space-y-1">
                <Link 
                  href="/privacy" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white">Browse</h4>
              <div className="space-y-1">
                <Link 
                  href="/categories" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Categories
                </Link>
                <Link 
                  href="/all-terms" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white">Discover</h4>
              <div className="space-y-1">
                <Link 
                  href="/recent" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Recent Additions
                </Link>
                <Link 
                  href="/admin" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom border */}
        <div className="mt-8 pt-6 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 Hobbipedia. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Building the world&apos;s most comprehensive hobby dictionary
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}