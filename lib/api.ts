import { supabase } from './supabase'
import { Category, Term, TermWithCategories, CategoryRelation } from '@/types'

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
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Cycling',
    slug: 'cycling',
    description: 'Terms related to cycling, bicycle racing, and bike maintenance',
    emoji: '🚴',
    color: '#FF6B6B',
    term_count: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Swimming',
    slug: 'swimming',
    description: 'Swimming techniques, pool terminology, and aquatic sports',
    emoji: '🏊',
    color: '#4ECDC4',
    term_count: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Running',
    slug: 'running',
    description: 'Running, jogging, marathons, and track terminology',
    emoji: '🏃',
    color: '#45B7D1',
    term_count: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const mockTerms: TermWithCategories[] = [
  {
    id: '1',
    name: 'Bonk',
    definition: 'The sudden loss of energy experienced during long endurance activities due to glycogen depletion.',
    difficulty: 'beginner',
    examples: ['I bonked at mile 60 of the century ride', 'Make sure to eat regularly to avoid bonking'],
    etymology: 'Originally from boxing, meaning to hit or strike',
    pronunciation: undefined,
    usage_notes: 'Common in cycling and running communities. Prevented by proper nutrition during activity.',
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
    definition: 'The rhythm or rate of movement, measured differently across various activities.',
    difficulty: 'intermediate',
    examples: ['Maintain a steady cadence of 90 RPM', 'Her running cadence was 180 steps per minute'],
    etymology: 'From Latin "cadentia" meaning falling or rhythm',
    pronunciation: undefined,
    usage_notes: 'In cycling: pedal revolutions per minute. In running: steps per minute.',
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
    return mockCategories
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return mockCategories.find(cat => cat.slug === slug) || null
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
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
    return []
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
      term_relations(
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
    if (item.term && !uniqueTerms.has(item.term.id)) {
      const categories: CategoryRelation[] = item.term.term_categories?.map((tc: any) => ({
        id: tc.category.id,
        name: tc.category.name,
        slug: tc.category.slug,
        emoji: tc.category.emoji,
        is_primary: tc.is_primary
      })) || []

      uniqueTerms.set(item.term.id, {
        ...item.term,
        categories
      })
    }
  })

  return Array.from(uniqueTerms.values()).slice(0, limit)
}

// Increment view count for a term
export async function incrementViewCount(termId: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    // Just log for mock data, don't actually increment
    console.log('Mock: Would increment view count for term:', termId)
    return
  }

  try {
    const { error } = await supabase.rpc('increment_view_count', { term_id: termId })
    
    if (error) {
      console.error('Error incrementing view count:', error)
    }
  } catch (error) {
    console.error('Error calling increment_view_count:', error)
  }
}