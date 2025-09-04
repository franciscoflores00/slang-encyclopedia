const fs = require('fs');

async function executeMigration() {
  try {
    // Import pg dynamically 
    const { Client } = require('pg');
    
    const client = new Client({
      connectionString: 'postgresql://postgres.fdtcpxmxrxobdkrucwqf:OIFJjh6pTJLLcYNd@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
    });
    
    await client.connect();
    
    const sql = fs.readFileSync('./supabase/migrations/add_craft_technical_terms.sql', 'utf8');
    
    await client.query(sql);
    
    console.log('Migration executed successfully!');
    
    await client.end();
    
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

executeMigration();