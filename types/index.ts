export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  history?: string // Detailed background/history of the hobby/sport/activity
  emoji?: string
  color?: string
  term_count: number
  created_at: string
  updated_at: string
}

export interface Term {
  id: string
  name: string
  slug?: string
  definition: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  examples?: string[]
  etymology?: string
  pronunciation?: string
  usage_notes?: string
  view_count?: number
  trending_score?: number // Percentage increase in views/popularity
  created_at: string
  updated_at: string
  categories?: CategoryRelation[] // Categories this term belongs to
  related_terms?: Term[] // Related terms
}

export interface CategoryRelation {
  id: string
  name: string
  slug: string
  emoji?: string
  is_primary: boolean
}

export interface TermCategory {
  id: string
  term_id: string
  category_id: string
  is_primary: boolean
  created_at: string
}

export interface TermRelation {
  id: string
  term_id: string
  related_term_id: string
  relation_type: 'synonym' | 'antonym' | 'related'
  created_at: string
}

export interface Contribution {
  id: string
  term_id: string
  contributor_email?: string
  contribution_type: 'new_term' | 'edit' | 'example' | 'correction'
  content: any
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

// View types for easier data fetching
export interface TermWithCategories extends Term {
  categories: CategoryRelation[]
}

export interface CategoryWithTerms extends Category {
  terms: Term[]
}

export interface SearchResult {
  term: Term
  score: number
}