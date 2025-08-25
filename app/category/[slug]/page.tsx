import { notFound } from 'next/navigation'
import Link from 'next/link'

// Placeholder terms organized by category and letter
const termsByCategory: Record<string, Record<string, string[]>> = {
  cycling: {
    A: ['Aerodynamics', 'Aero Position', 'Attack', 'All-Mountain'],
    B: ['Bonk', 'Bottom Bracket', 'Brake Cable', 'Bunny Hop'],
    C: ['Cadence', 'Chain Ring', 'Criterium', 'Climbing'],
    D: ['Derailleur', 'Drops', 'Drafting', 'Double Track'],
    E: ['Endurance', 'Endo', 'Ergometer'],
    F: ['Fixed Gear', 'Frame', 'Front Derailleur'],
    G: ['Granny Gear', 'Group Set', 'Grip Shift'],
    H: ['Hammer', 'Headset', 'Hill Climb'],
    I: ['Inner Tube', 'ISO'],
    J: ['Jockey Wheel'],
    K: ['Kick Turn', 'Kit'],
    L: ['LSD', 'Lock Ring', 'Lugged Frame'],
    M: ['Mash', 'Mountain Bike', 'Mud Guard'],
    N: ['Nipple', 'Noodle'],
    O: ['Off Road', 'Over Gear'],
    P: ['Paceline', 'Peloton', 'Power Meter'],
    Q: ['Quick Release'],
    R: ['Road Rash', 'Rim', 'Rolling Resistance'],
    S: ['Spin', 'Slipstream', 'Single Track'],
    T: ['Time Trial', 'Track Stand', 'Tubeless'],
    U: ['Upstroke'],
    V: ['Velodrome', 'V-Brake'],
    W: ['Wheelie', 'Wind Trainer'],
    X: ['XC (Cross Country)'],
    Y: ['Yellow Jersey'],
    Z: ['Zone Training']
  },
  swimming: {
    A: ['Anchor', 'Aquatics', 'Arm Stroke'],
    B: ['Backstroke', 'Bilateral Breathing', 'Butterfly'],
    C: ['Catch', 'Chlorine', 'Crawl'],
    D: ['Dive', 'Dolphin Kick', 'Drag'],
    E: ['Entry', 'Endurance Set'],
    F: ['Flip Turn', 'Freestyle', 'Flutter Kick'],
    G: ['Gallop', 'Glide'],
    H: ['Hypoxic', 'Hand Paddles'],
    I: ['IM (Individual Medley)', 'Interval'],
    J: ['Jammer'],
    K: ['Kick Board', 'Kick Set'],
    L: ['Lane', 'Lap', 'Long Course'],
    M: ['Medley', 'Main Set'],
    N: ['Negative Split'],
    O: ['Open Water', 'Over Distance'],
    P: ['Pull Buoy', 'Pace Clock'],
    Q: ['Qualifying Time'],
    R: ['Recovery', 'Relay', 'Repetition'],
    S: ['Streamline', 'Sprint', 'Stroke Count'],
    T: ['Taper', 'Technique', 'Tempo'],
    U: ['Underwater'],
    V: ['Vertical Kicking'],
    W: ['Warm Up', 'Wall'],
    X: ['X-Training'],
    Y: ['Yardage'],
    Z: ['Zone Swimming']
  },
  photography: {
    A: ['Aperture', 'Autofocus', 'Aspect Ratio'],
    B: ['Bokeh', 'Bracketing', 'Burst Mode'],
    C: ['Composition', 'Contrast', 'Crop Factor'],
    D: ['Depth of Field', 'Digital Zoom', 'Dynamic Range'],
    E: ['Exposure', 'EXIF', 'EVF'],
    F: ['F-Stop', 'Flash', 'Focal Length'],
    G: ['Golden Hour', 'Grain', 'Gradient'],
    H: ['Histogram', 'HDR', 'Hyperfocal'],
    I: ['ISO', 'Image Stabilization'],
    J: ['JPEG'],
    K: ['Kelvin', 'Kit Lens'],
    L: ['Light Meter', 'Long Exposure'],
    M: ['Manual Mode', 'Macro', 'Metering'],
    N: ['Noise', 'ND Filter'],
    O: ['Overexposure', 'Optical Zoom'],
    P: ['Prime Lens', 'Portrait', 'Post Processing'],
    Q: ['Quality'],
    R: ['RAW', 'Rule of Thirds', 'Resolution'],
    S: ['Shutter Speed', 'Sensor', 'Saturation'],
    T: ['Telephoto', 'Time Lapse', 'Tripod'],
    U: ['Underexposure', 'UV Filter'],
    V: ['Viewfinder', 'Vignetting'],
    W: ['White Balance', 'Wide Angle'],
    X: ['X-Sync'],
    Y: ['YUV'],
    Z: ['Zoom']
  }
}

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // Get terms for this category or show not found
  const categoryTerms = termsByCategory[slug]
  if (!categoryTerms) {
    notFound()
  }

  // Get category display name
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)
  const letters = Object.keys(categoryTerms).sort()
  const totalTerms = Object.values(categoryTerms).flat().length

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mr-2">
            Home
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <Link href="/categories" className="text-blue-600 hover:text-blue-700 mr-2">
            Categories
          </Link>
          <span className="text-gray-400 mr-2">/</span>
          <span className="text-gray-600 dark:text-gray-300 capitalize">{categoryName}</span>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
            {categoryName} Dictionary
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore {totalTerms} specialized terms and vocabulary used in {categoryName.toLowerCase()}.
            From beginner basics to advanced terminology.
          </p>
        </div>

        {/* Alphabetical Index Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex w-full">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
                const hasTerms = categoryTerms[letter] && categoryTerms[letter].length > 0
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    className={`flex-1 flex items-center justify-center h-8 text-sm font-semibold rounded transition-colors ${
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

        {/* Terms by Letter */}
        <div className="max-w-6xl mx-auto space-y-8">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-3">
                  <h2 className="text-2xl font-bold">{letter}</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryTerms[letter].map((term) => (
                      <Link
                        key={term}
                        href={`/term/${term.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                        className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600"
                      >
                        <span className="font-medium text-sm">{term}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Explore More Categories
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover terminology from other hobbies and interests, or search across all categories.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              All Categories
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Browse Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}