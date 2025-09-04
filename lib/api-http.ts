// Database API functions using direct HTTP calls to bypass broken Supabase SDK
import { createHttpClient } from './supabase-http'
import { Category, Term, TermWithCategories } from '@/types'

export async function getAllCategories(): Promise<Category[]> {
  const client = createHttpClient()
  
  try {
    // Get all categories
    const categories = await client.query('categories', {
      select: '*',
      order: 'name'
    })

    // Get term counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category: any) => {
        const count = await client.count('term_categories', {
          eq: { category_id: category.id }
        })
        
        return {
          ...category,
          term_count: count
        }
      })
    )

    return categoriesWithCounts
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const client = createHttpClient()
  
  try {
    const categories = await client.query('categories', {
      select: '*',
      eq: { slug }
    })

    return categories[0] || null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getTermsByCategorySlug(slug: string): Promise<TermWithCategories[]> {
  const client = createHttpClient()
  
  try {
    // First get the category
    const category = await getCategoryBySlug(slug)
    if (!category) return []

    // Get all terms for this category
    const terms = await client.query('terms', {
      select: `
        *,
        term_categories!inner(
          is_primary,
          categories(
            id,
            name, 
            slug,
            emoji
          )
        )
      `.replace(/\s+/g, ''),
      eq: { 'term_categories.category_id': category.id },
      order: 'name'
    })

    // Transform the nested data structure
    return terms.map((term: any) => ({
      ...term,
      categories: term.term_categories?.map((tc: any) => ({
        id: tc.categories.id,
        name: tc.categories.name,
        slug: tc.categories.slug,
        emoji: tc.categories.emoji,
        is_primary: tc.is_primary
      })) || []
    }))
  } catch (error) {
    console.error('Error fetching terms:', error)
    return []
  }
}

export async function getTermOfTheDay(): Promise<TermWithCategories | null> {
  const client = createHttpClient()
  
  try {
    // Get a random term
    const terms = await client.query('terms', {
      select: `
        *,
        term_categories(
          is_primary,
          categories(
            id,
            name,
            slug,
            emoji
          )
        )
      `.replace(/\s+/g, ''),
      limit: 1
    })

    if (terms.length === 0) return null

    const term = terms[0]
    return {
      ...term,
      categories: term.term_categories?.map((tc: any) => ({
        id: tc.categories.id,
        name: tc.categories.name,
        slug: tc.categories.slug,
        emoji: tc.categories.emoji,
        is_primary: tc.is_primary
      })) || []
    }
  } catch (error) {
    console.error('Error fetching term of the day:', error)
    return null
  }
}

export async function getTrendingTerms(limit: number = 6): Promise<TermWithCategories[]> {
  const client = createHttpClient()
  
  try {
    const terms = await client.query('terms', {
      select: `
        *,
        term_categories(
          is_primary,
          categories(
            id,
            name,
            slug, 
            emoji
          )
        )
      `.replace(/\s+/g, ''),
      order: 'view_count.desc.nullslast',
      limit
    })

    return terms.map((term: any) => ({
      ...term,
      categories: term.term_categories?.map((tc: any) => ({
        id: tc.categories.id,
        name: tc.categories.name,
        slug: tc.categories.slug,
        emoji: tc.categories.emoji,
        is_primary: tc.is_primary
      })) || []
    }))
  } catch (error) {
    console.error('Error fetching trending terms:', error)
    return []
  }
}