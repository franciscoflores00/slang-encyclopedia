import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = 'https://fdtcpxmxrxobdkrucwqf.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGNweG14cnhvYmRrcnVjd3FmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTQ5MjUzNywiZXhwIjoyMDQxMDY4NTM3fQ.zrfMIlC1MWEY57ZDOOc2FG4JOB8JL6OUK6KUXyH-VqQ'

async function testMigration() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    const migrationSQL = readFileSync('./supabase/migrations/add_craft_technical_terms.sql', 'utf8')
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec', { sql: migrationSQL })
    
    if (error) {
      console.error('Migration failed:', error.message)
      console.error('Details:', error.details || error.hint)
      return false
    }
    
    console.log('✅ Craft technical terms migration completed successfully!')
    return true
    
  } catch (err: any) {
    console.error('Error executing migration:', err.message)
    return false
  }
}

testMigration()