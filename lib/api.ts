import { createServerClient } from './supabase'
import { Category, Term, TermWithCategories, CategoryRelation } from '@/types'
import { allCategories } from './all-categories'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'
}

// Mock data for when Supabase is not configured
// Convert allCategories to full Category objects with IDs and timestamps
const mockCategories: Category[] = allCategories.map((cat, index) => ({
  id: String(index + 1),
  ...cat,
  // Use the history from all-categories if it exists, otherwise apply the default history
  history: cat.history || (
    cat.slug === 'swimming'
    ? 'Swimming as a competitive sport dates back to ancient civilizations, but modern competitive swimming began in the 19th century. The first swimming organization was formed in London in 1837, and swimming became part of the modern Olympic Games in 1896. The sport has developed four main competitive strokes (freestyle, backstroke, breaststroke, and butterfly) and encompasses pool swimming, open water swimming, synchronized swimming, and water polo. Swimming terminology has evolved to describe techniques, training methods, pool equipment, and race strategies used by swimmers worldwide.'
    : cat.slug === 'running'
    ? 'Running is humanity\'s most fundamental form of locomotion and has been practiced for thousands of years for hunting, communication, and warfare. Modern competitive running emerged in the 19th century with organized track and field events. The marathon, inspired by the ancient Greek messenger Pheidippides, became an Olympic event in 1896. Running has since diversified into numerous disciplines including sprints, middle distance, long distance, cross country, trail running, and ultramarathons. The running boom of the 1970s popularized jogging and recreational running, creating a rich vocabulary around training methods, gear, and racing strategies.'
    : cat.slug === 'basketball'
    ? 'Basketball was invented in 1891 by Dr. James Naismith in Springfield, Massachusetts, as a winter activity for his students. The sport quickly spread across America and internationally, becoming one of the world\'s most popular sports. Professional basketball leagues like the NBA have created a global audience and developed extensive terminology covering plays, positions, techniques, and strategies. The sport has evolved from peach baskets nailed to gymnasium balconies to high-tech arenas with shot clocks and three-point lines.'
    : cat.slug === 'astronomy'
    ? 'Astronomy is one of humanity\'s oldest sciences, dating back to ancient civilizations that tracked celestial movements for agriculture and navigation. Modern astronomy began with telescopes in the 17th century and has expanded to include radio astronomy, space exploration, and deep space observation. Amateur astronomy has flourished alongside professional research, creating a rich vocabulary covering equipment, observing techniques, celestial objects, and astrophotography.'
    : undefined
  ),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}))

const mockTerms: TermWithCategories[] = [
  {
    id: '1',
    name: 'Bonk',
    slug: 'bonk',
    definition: 'The sudden loss of energy experienced during long endurance activities due to glycogen depletion.',
    difficulty: 'beginner',
    examples: ['I bonked at mile 60 of the century ride', 'Make sure to eat regularly to avoid bonking'],
    etymology: 'Originally from boxing, meaning to hit or strike',
    pronunciation: undefined,
    usage_notes: 'Common in cycling and running communities. Prevented by proper nutrition during activity.',
    view_count: 152,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: [
      { id: '1', name: 'Cycling', slug: 'cycling', emoji: '🚴', is_primary: true },
      { id: '3', name: 'Running', slug: 'running', emoji: '🏃', is_primary: false }
    ]
  },
  {
    id: '2',
    name: 'Cadence',
    slug: 'cadence',
    definition: 'The rhythm or rate of movement, measured differently across various activities.',
    difficulty: 'intermediate',
    examples: ['Maintain a steady cadence of 90 RPM', 'Her running cadence was 180 steps per minute'],
    etymology: 'From Latin "cadentia" meaning falling or rhythm',
    pronunciation: undefined,
    usage_notes: 'In cycling: pedal revolutions per minute. In running: steps per minute.',
    view_count: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: [
      { id: '1', name: 'Cycling', slug: 'cycling', emoji: '🚴', is_primary: true },
      { id: '3', name: 'Running', slug: 'running', emoji: '🏃', is_primary: false }
    ]
  }
]

// Category API functions  
export async function getAllCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock data')
    
    // Calculate actual term counts for mock categories
    const categoriesWithCounts = mockCategories.map(category => {
      const termCount = mockTerms.filter(term => 
        term.categories?.some(cat => cat.slug === category.slug)
      ).length
      
      return {
        ...category,
        term_count: termCount
      }
    })
    
    return categoriesWithCounts
  }

  // Create a fresh server client instance
  const supabase = await createServerClient()
  
  // First get all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
    return []
  }

  if (!categories) return []

  // Then get actual term counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const { count, error: countError } = await supabase
        .from('term_categories')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)

      if (countError) {
        console.error(`Error counting terms for ${category.name}:`, countError)
        return { ...category, term_count: 0 }
      }

      return { ...category, term_count: count || 0 }
    })
  )

  return categoriesWithCounts
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return mockCategories.find(cat => cat.slug === slug) || null
  }

  // Create a fresh server client instance
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching category:', error)
    // Fallback to mock data if category not found in database
    return mockCategories.find(cat => cat.slug === slug) || null
  }
  
  // If no data found in database, fallback to mock data
  if (!data) {
    return mockCategories.find(cat => cat.slug === slug) || null
  }

  return data
}

// Term API functions
export async function getTermsByCategorySlug(slug: string): Promise<TermWithCategories[]> {
  if (!isSupabaseConfigured()) {
    return mockTerms.filter(term => 
      term.categories?.some(cat => cat.slug === slug)
    )
  }

  // First get the category
  const category = await getCategoryBySlug(slug)
  if (!category) return []

  // Check if this is a mock category (not in database)
  const isMockCategory = mockCategories.some(mockCat => mockCat.id === category.id)
  
  if (isMockCategory) {
    // For mock categories, return mock terms
    return mockTerms.filter(term => 
      term.categories?.some(cat => cat.slug === slug)
    )
  }

  // Create a fresh server client instance
  const supabase = await createServerClient()
  
  // Get all terms for this category with their category relationships
  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories!inner(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      )
    `)
    .eq('term_categories.category_id', category.id)
    .order('name')

  if (error) {
    console.error('Error fetching terms:', error)
    // Fallback to mock data if terms not found in database
    return mockTerms.filter(term => 
      term.categories?.some(cat => cat.slug === slug)
    )
  }

  // Transform the data to match our TermWithCategories type
  const terms: TermWithCategories[] = data?.map(term => {
    // Get all categories for this term
    const categories: CategoryRelation[] = term.term_categories?.map((tc: any) => ({
      id: tc.category.id,
      name: tc.category.name,
      slug: tc.category.slug,
      emoji: tc.category.emoji,
      is_primary: tc.is_primary
    })) || []

    return {
      id: term.id,
      name: term.name,
      definition: term.definition,
      difficulty: term.difficulty,
      examples: term.examples,
      etymology: term.etymology,
      pronunciation: term.pronunciation,
      usage_notes: term.usage_notes,
      created_at: term.created_at,
      updated_at: term.updated_at,
      categories
    }
  }) || []

  return terms
}

export async function getTermById(id: string): Promise<TermWithCategories | null> {
  if (!isSupabaseConfigured()) {
    // Try to find by ID first, then by slug (for mock data)
    return mockTerms.find(term => 
      term.id === id || 
      term.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
    ) || null
  }

  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      ),
      term_relations!term_relations_term_id_fkey(
        related_term:terms!term_relations_related_term_id_fkey(
          id,
          name,
          definition,
          difficulty
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching term:', error)
    return null
  }

  if (!data) {
    return null
  }

  // Transform the data
  const categories: CategoryRelation[] = data.term_categories?.map((tc: any) => ({
    id: tc.category.id,
    name: tc.category.name,
    slug: tc.category.slug,
    emoji: tc.category.emoji,
    is_primary: tc.is_primary
  })) || []

  const related_terms: Term[] = data.term_relations?.map((tr: any) => tr.related_term) || []

  return {
    id: data.id,
    name: data.name,
    definition: data.definition,
    difficulty: data.difficulty,
    examples: data.examples,
    etymology: data.etymology,
    pronunciation: data.pronunciation,
    usage_notes: data.usage_notes,
    created_at: data.created_at,
    updated_at: data.updated_at,
    categories,
    related_terms
  }
}

// Search function
export async function searchTerms(query: string): Promise<TermWithCategories[]> {
  if (!isSupabaseConfigured()) {
    return mockTerms.filter(term => 
      term.name.toLowerCase().includes(query.toLowerCase()) ||
      term.definition.toLowerCase().includes(query.toLowerCase())
    )
  }

  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      )
    `)
    .or(`name.ilike.%${query}%,definition.ilike.%${query}%`)
    .limit(20)
    .order('name')

  if (error) {
    console.error('Search error:', error)
    return []
  }

  // Transform the data
  const terms: TermWithCategories[] = data?.map(term => {
    const categories: CategoryRelation[] = term.term_categories?.map((tc: any) => ({
      id: tc.category.id,
      name: tc.category.name,
      slug: tc.category.slug,
      emoji: tc.category.emoji,
      is_primary: tc.is_primary
    })) || []

    return {
      id: term.id,
      name: term.name,
      definition: term.definition,
      difficulty: term.difficulty,
      examples: term.examples,
      etymology: term.etymology,
      pronunciation: term.pronunciation,
      usage_notes: term.usage_notes,
      created_at: term.created_at,
      updated_at: term.updated_at,
      categories
    }
  }) || []

  return terms
}

// Browse by letter function
export async function getAllTermsByLetter(letter: string): Promise<TermWithCategories[]> {
  if (!isSupabaseConfigured()) {
    // Filter mock terms by first letter
    return mockTerms.filter(term => 
      term.name.toLowerCase().startsWith(letter.toLowerCase())
    )
  }

  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      )
    `)
    .ilike('name', `${letter}%`)
    .order('name')

  if (error) {
    console.error('Error fetching terms by letter:', error)
    return []
  }

  // Transform the data
  const terms: TermWithCategories[] = data?.map(term => {
    const categories: CategoryRelation[] = term.term_categories?.map((tc: any) => ({
      id: tc.category.id,
      name: tc.category.name,
      slug: tc.category.slug,
      emoji: tc.category.emoji,
      is_primary: tc.is_primary
    })) || []

    return {
      id: term.id,
      name: term.name,
      definition: term.definition,
      difficulty: term.difficulty,
      examples: term.examples,
      etymology: term.etymology,
      pronunciation: term.pronunciation,
      usage_notes: term.usage_notes,
      created_at: term.created_at,
      updated_at: term.updated_at,
      categories
    }
  }) || []

  return terms
}

// Admin functions for adding/editing data
export async function createCategory(category: Partial<Category>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .insert([{
      name: category.name,
      slug: category.slug || category.name?.toLowerCase().replace(/\s+/g, '-'),
      description: category.description,
      emoji: category.emoji,
      color: category.color
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return null
  }

  return data
}

export async function createTerm(
  term: Partial<Term>,
  categoryIds: string[],
  primaryCategoryId: string
): Promise<Term | null> {
  // First create the term
  const { data: termData, error: termError } = await supabase
    .from('terms')
    .insert([{
      name: term.name,
      definition: term.definition,
      difficulty: term.difficulty || 'beginner',
      examples: term.examples,
      etymology: term.etymology,
      pronunciation: term.pronunciation,
      usage_notes: term.usage_notes
    }])
    .select()
    .single()

  if (termError || !termData) {
    console.error('Error creating term:', termError)
    return null
  }

  // Then create the category relationships
  const termCategories = categoryIds.map(categoryId => ({
    term_id: termData.id,
    category_id: categoryId,
    is_primary: categoryId === primaryCategoryId
  }))

  const { error: relationError } = await supabase
    .from('term_categories')
    .insert(termCategories)

  if (relationError) {
    console.error('Error creating term-category relationships:', relationError)
    // Optionally, delete the term if relationships failed
    await supabase.from('terms').delete().eq('id', termData.id)
    return null
  }

  return termData
}

export async function updateTerm(
  id: string,
  updates: Partial<Term>,
  categoryIds?: string[],
  primaryCategoryId?: string
): Promise<Term | null> {
  // Update the term
  const { data: termData, error: termError } = await supabase
    .from('terms')
    .update({
      name: updates.name,
      definition: updates.definition,
      difficulty: updates.difficulty,
      examples: updates.examples,
      etymology: updates.etymology,
      pronunciation: updates.pronunciation,
      usage_notes: updates.usage_notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (termError) {
    console.error('Error updating term:', termError)
    return null
  }

  // If categories are provided, update the relationships
  if (categoryIds && primaryCategoryId) {
    // Delete existing relationships
    await supabase
      .from('term_categories')
      .delete()
      .eq('term_id', id)

    // Create new relationships
    const termCategories = categoryIds.map(categoryId => ({
      term_id: id,
      category_id: categoryId,
      is_primary: categoryId === primaryCategoryId
    }))

    const { error: relationError } = await supabase
      .from('term_categories')
      .insert(termCategories)

    if (relationError) {
      console.error('Error updating term-category relationships:', relationError)
    }
  }

  return termData
}

export async function deleteTerm(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('terms')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting term:', error)
    return false
  }

  return true
}

// Get trending terms (most viewed in last 7 days)
export async function getTrendingTerms(limit: number = 6): Promise<TermWithCategories[]> {
  if (!isSupabaseConfigured()) {
    // Return mock trending terms
    return mockTerms.slice(0, limit).map(term => ({
      ...term,
      view_count: Math.floor(Math.random() * 1000) + 100,
      trending_score: Math.floor(Math.random() * 50) - 10
    }))
  }

  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      )
    `)
    .order('view_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching trending terms:', error)
    return []
  }

  return data?.map(term => {
    const categories: CategoryRelation[] = term.term_categories?.map((tc: any) => ({
      id: tc.category.id,
      name: tc.category.name,
      slug: tc.category.slug,
      emoji: tc.category.emoji,
      is_primary: tc.is_primary
    })) || []

    return {
      ...term,
      categories,
      trending_score: Math.floor(Math.random() * 50) - 10 // Mock trending score
    }
  }) || []
}

// Get term of the day
export async function getTermOfTheDay(): Promise<TermWithCategories | null> {
  if (!isSupabaseConfigured()) {
    // Return a random mock term as term of the day
    const randomIndex = new Date().getDate() % mockTerms.length
    return mockTerms[randomIndex]
  }

  // Use date-based seed for consistent daily term
  const today = new Date().toISOString().split('T')[0]
  const seed = today.split('-').join('')
  
  const { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      )
    `)
    .limit(1)
    .order('created_at', { ascending: false })

  if (error || !data?.[0]) {
    console.error('Error fetching term of the day:', error)
    return null
  }

  const term = data[0]
  const categories: CategoryRelation[] = term.term_categories?.map((tc: any) => ({
    id: tc.category.id,
    name: tc.category.name,
    slug: tc.category.slug,
    emoji: tc.category.emoji,
    is_primary: tc.is_primary
  })) || []

  return {
    ...term,
    categories
  }
}

// Get similar terms for "People also searched for"
export async function getSimilarTerms(termId: string, categoryIds: string[], limit: number = 3): Promise<TermWithCategories[]> {
  if (!isSupabaseConfigured()) {
    // Return mock similar terms
    return mockTerms
      .filter(t => t.id !== termId)
      .slice(0, limit)
  }

  // Get terms from same categories
  const { data, error } = await supabase
    .from('term_categories')
    .select(`
      term:terms(
        *,
        term_categories(
          is_primary,
          category:categories(
            id,
            name,
            slug,
            emoji
          )
        )
      )
    `)
    .in('category_id', categoryIds)
    .neq('term_id', termId)
    .limit(limit * 2) // Get more to ensure we have enough unique terms

  if (error) {
    console.error('Error fetching similar terms:', error)
    return []
  }

  // Deduplicate and transform
  const uniqueTerms = new Map()
  data?.forEach(item => {
    // Handle case where term might be an array (Supabase sometimes returns arrays for relations)
    const termData = Array.isArray(item.term) ? item.term[0] : item.term
    
    if (termData && !uniqueTerms.has(termData.id)) {
      const categories: CategoryRelation[] = termData.term_categories?.map((tc: any) => ({
        id: tc.category.id,
        name: tc.category.name,
        slug: tc.category.slug,
        emoji: tc.category.emoji,
        is_primary: tc.is_primary
      })) || []

      uniqueTerms.set(termData.id, {
        ...termData,
        categories
      })
    }
  })

  return Array.from(uniqueTerms.values()).slice(0, limit)
}

// Get term by slug (with fallback to ID)
export async function getTermBySlug(slug: string): Promise<TermWithCategories | null> {
  if (!isSupabaseConfigured()) {
    // Find by slug for mock data
    return mockTerms.find(term => 
      term.slug === slug || 
      term.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    ) || null
  }

  // Try to fetch by slug first
  let { data, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_categories(
        is_primary,
        category:categories(
          id,
          name,
          slug,
          emoji
        )
      ),
      term_relations!term_relations_term_id_fkey(
        related_term:terms!term_relations_related_term_id_fkey(
          id,
          name,
          slug,
          definition,
          difficulty
        )
      )
    `)
    .eq('slug', slug)
    .maybeSingle()

  // If not found by slug and slug looks like a UUID, try by ID
  if (!data && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
    const result = await supabase
      .from('terms')
      .select(`
        *,
        term_categories(
          is_primary,
          category:categories(
            id,
            name,
            slug,
            emoji
          )
        ),
        term_relations!term_relations_term_id_fkey(
          related_term:terms!term_relations_related_term_id_fkey(
            id,
            name,
            slug,
            definition,
            difficulty
          )
        )
      `)
      .eq('id', slug)
      .maybeSingle()
    
    data = result.data
    error = result.error
  }

  if (error) {
    console.error('Error fetching term:', error)
    return null
  }

  if (!data) {
    return null
  }

  // Transform the data
  const categories: CategoryRelation[] = data.term_categories?.map((tc: any) => ({
    id: tc.category.id,
    name: tc.category.name,
    slug: tc.category.slug,
    emoji: tc.category.emoji,
    is_primary: tc.is_primary
  })) || []

  const related_terms: Term[] = data.term_relations?.map((tr: any) => tr.related_term) || []

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    definition: data.definition,
    difficulty: data.difficulty,
    examples: data.examples,
    etymology: data.etymology,
    pronunciation: data.pronunciation,
    usage_notes: data.usage_notes,
    view_count: data.view_count,
    created_at: data.created_at,
    updated_at: data.updated_at,
    categories,
    related_terms
  }
}

// Increment view count for a term
export async function incrementViewCount(termId: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    // Just log for mock data, don't actually increment
    console.log('Mock: Would increment view count for term:', termId)
    return
  }

  try {
    // Get the current term to check its view count
    const { data: currentTerm, error: fetchError } = await supabase
      .from('terms')
      .select('view_count')
      .eq('id', termId)
      .single()

    if (fetchError || !currentTerm) {
      console.error('Error fetching current term for view count:', fetchError)
      return
    }

    // Increment the view count
    const newViewCount = (currentTerm.view_count || 0) + 1
    const { error: updateError } = await supabase
      .from('terms')
      .update({ 
        view_count: newViewCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', termId)
    
    if (updateError) {
      console.error('Error incrementing view count:', updateError)
    }
  } catch (error) {
    console.error('Error in incrementViewCount:', error)
  }
}