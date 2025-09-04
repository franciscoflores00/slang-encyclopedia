// Direct HTTP client for Supabase REST API - bypasses broken JS SDK
import { Term, Category, TermWithCategories } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

class SupabaseHttpClient {
  private baseUrl: string
  private headers: HeadersInit

  constructor() {
    this.baseUrl = `${supabaseUrl}/rest/v1`
    this.headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  }

  async query(table: string, options: {
    select?: string
    eq?: Record<string, any>
    order?: string
    limit?: number
  } = {}): Promise<any[]> {
    let url = `${this.baseUrl}/${table}`
    const params = new URLSearchParams()

    if (options.select) {
      params.append('select', options.select)
    }

    if (options.eq) {
      Object.entries(options.eq).forEach(([key, value]) => {
        params.append(`${key}`, `eq.${value}`)
      })
    }

    if (options.order) {
      params.append('order', options.order)
    }

    if (options.limit) {
      params.append('limit', String(options.limit))
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Supabase HTTP query error:', error)
      return []
    }
  }

  async count(table: string, options: {
    eq?: Record<string, any>
  } = {}): Promise<number> {
    let url = `${this.baseUrl}/${table}`
    const params = new URLSearchParams()
    
    params.append('select', '*')

    if (options.eq) {
      Object.entries(options.eq).forEach(([key, value]) => {
        params.append(`${key}`, `eq.${value}`)
      })
    }

    url += `?${params.toString()}`

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          ...this.headers,
          'Prefer': 'count=exact'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentRange = response.headers.get('content-range')
      if (contentRange) {
        const match = contentRange.match(/\/(\d+)$/)
        return match ? parseInt(match[1], 10) : 0
      }

      return 0
    } catch (error) {
      console.error('Supabase HTTP count error:', error)
      return 0
    }
  }
}

export const createHttpClient = () => new SupabaseHttpClient()