import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test database connection by fetching categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)
    
    if (catError) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to fetch categories',
        error: catError.message 
      }, { status: 500 })
    }

    // Test fetching terms
    const { data: terms, error: termError } = await supabase
      .from('terms')
      .select('*')
      .limit(5)
    
    if (termError) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to fetch terms',
        error: termError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful!',
      data: {
        categoriesCount: categories?.length || 0,
        termsCount: terms?.length || 0,
        sampleCategories: categories?.map(c => c.name),
        sampleTerms: terms?.map(t => t.name)
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Unexpected error',
      error: String(error) 
    }, { status: 500 })
  }
}