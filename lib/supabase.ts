import { createClient } from '@supabase/supabase-js'
import { Term, Category } from '@/types'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL && 
                     process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url') 
                    ? process.env.NEXT_PUBLIC_SUPABASE_URL 
                    : 'https://placeholder.supabase.co'

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key') 
                       ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
                       : 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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