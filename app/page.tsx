import Link from 'next/link';
import { getTrendingTerms, getTermOfTheDay, getAllCategories } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import { TermCard } from '@/components/TermCard';
import { CategoryCard } from '@/components/CategoryCard';

export default async function Home() {
  const [trendingTerms, termOfTheDay, categories] = await Promise.all([
    getTrendingTerms(6),
    getTermOfTheDay(),
    getAllCategories()
  ]);

  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Hobbipedia
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Your comprehensive encyclopedia of hobby and niche terms. Discover, learn, and contribute to our growing collection.
        </p>
        <SearchBar />
      </section>

      {/* Term of the Day */}
      {termOfTheDay && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Term of the Day</h2>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
            <Link href={`/term/${termOfTheDay.slug}`}>
              <h3 className="text-2xl font-bold mb-2">{termOfTheDay.name}</h3>
              <p className="text-lg mb-4">{termOfTheDay.definition}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {termOfTheDay.categories?.map((category) => (
                  <span
                    key={category.id}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <span className="text-white/80 hover:text-white">Learn more →</span>
            </Link>
          </div>
        </section>
      )}

      {/* Trending Terms */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Terms</h2>
          <Link href="/popular" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTerms.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Categories</h2>
          <Link href="/categories" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/browse/a" className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <span className="text-3xl mb-2">📚</span>
            <p className="font-medium">Browse A-Z</p>
          </Link>
          <Link href="/recent" className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <span className="text-3xl mb-2">🆕</span>
            <p className="font-medium">Recent Terms</p>
          </Link>
          <Link href="/submit" className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <span className="text-3xl mb-2">➕</span>
            <p className="font-medium">Submit Term</p>
          </Link>
          <Link href="/about" className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <span className="text-3xl mb-2">ℹ️</span>
            <p className="font-medium">About Us</p>
          </Link>
        </div>
      </section>
    </div>
  );
}