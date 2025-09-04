const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://fdtcpxmxrxobdkrucwqf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGNweG14cnhvYmRrcnVjd3FmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTQ5MjUzNywiZXhwIjoyMDQxMDY4NTM3fQ.zrfMIlC1MWEY57ZDOOc2FG4JOB8JL6OUK6KUXyH-VqQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    const sql = fs.readFileSync('./supabase/migrations/add_craft_technical_terms.sql', 'utf8');
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('Migration error:', error);
    } else {
      console.log('Migration completed successfully!');
    }
  } catch (err) {
    console.error('Error reading file or executing migration:', err);
  }
}

runMigration();