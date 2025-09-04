import { Term, Category } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a server-side client using dynamic import to avoid SSR issues
export const createServerClient = async () => {
  const { createClient } = await import('@supabase/supabase-js')
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  })
}

// Create a client-side client for use in Client Components
export const createBrowserClient = async () => {
  const { createClient } = await import('@supabase/supabase-js')
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          emoji: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          emoji?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          emoji?: string | null
          created_at?: string
        }
      }
      terms: {
        Row: {
          id: string
          name: string
          definition: string
          category_id: string | null
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          examples: string[]
          etymology: string | null
          pronunciation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          definition: string
          category_id?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          examples?: string[]
          etymology?: string | null
          pronunciation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          definition?: string
          category_id?: string | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          examples?: string[]
          etymology?: string | null
          pronunciation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}