import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { getTrendingTerms, getTermOfTheDay } from '@/lib/api'

export default async function Home() {
  // const trendingTerms = await getTrendingTerms(6)
  // const termOfDay = await getTermOfTheDay()

  return (
    <div>
      <h1>Site is working!</h1>
      <p>Database connection will be restored shortly.</p>
    </div>
  );
}