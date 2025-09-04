import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface HobbyData {
  name: string;
  description: string;
  url: string;
}

// Function to fetch and parse a single hobby page
async function scrapeHobbyPage(pageNumber: number): Promise<HobbyData | null> {
  const url = `https://www.allpastimes.com/hobby${pageNumber}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Page ${pageNumber} returned status ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    
    // Extract hobby name - looking for h1 or h2 tags
    const titleMatch = html.match(/<h[12][^>]*>([^<]+)<\/h[12]>/i);
    if (!titleMatch) {
      console.log(`Could not find title on page ${pageNumber}`);
      return null;
    }
    
    let hobbyName = titleMatch[1].trim();
    // Clean up the hobby name
    hobbyName = hobbyName.replace(/&amp;/g, '&')
                         .replace(/&#39;/g, "'")
                         .replace(/&quot;/g, '"')
                         .replace(/&lt;/g, '<')
                         .replace(/&gt;/g, '>')
                         .replace(/\s+/g, ' ')
                         .trim();
    
    // Extract description - looking for the main paragraph
    // Try to find paragraph after the title
    const descPattern = /<h[12][^>]*>[^<]+<\/h[12]>\s*(?:<[^>]+>\s*)*<p[^>]*>([\s\S]*?)<\/p>/i;
    const descMatch = html.match(descPattern);
    
    let description = '';
    if (descMatch) {
      description = descMatch[1]
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    } else {
      // Fallback: try to get any paragraph that looks like a description
      const paragraphs = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
      if (paragraphs) {
        for (const p of paragraphs) {
          const text = p.replace(/<[^>]+>/g, '').trim();
          if (text.length > 100 && !text.includes('cookie') && !text.includes('privacy')) {
            description = text
              .replace(/&amp;/g, '&')
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&nbsp;/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            break;
          }
        }
      }
    }
    
    if (!description) {
      console.log(`Could not find description on page ${pageNumber}`);
    }
    
    return {
      name: hobbyName,
      description: description || `Learn about ${hobbyName} as a hobby.`,
      url: url
    };
  } catch (error) {
    console.error(`Error scraping page ${pageNumber}:`, error);
    return null;
  }
}

// Function to create or update a category
async function upsertHobbyCategory(hobby: HobbyData) {
  try {
    // Generate slug from hobby name
    const slug = hobby.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if category already exists
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .single();
    
    if (existing) {
      console.log(`Category "${hobby.name}" already exists, updating...`);
      
      // Update existing category with description
      const { error } = await supabase
        .from('categories')
        .update({
          description: hobby.description.substring(0, 500), // Limit description length
          history: hobby.description, // Store full description in history field
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug);
      
      if (error) {
        console.error(`Error updating category "${hobby.name}":`, error);
      }
    } else {
      console.log(`Creating new category: ${hobby.name}`);
      
      // Insert new category
      const { error } = await supabase
        .from('categories')
        .insert({
          name: hobby.name,
          slug: slug,
          description: hobby.description.substring(0, 500),
          history: hobby.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error(`Error creating category "${hobby.name}":`, error);
      }
    }
  } catch (error) {
    console.error(`Error processing hobby "${hobby.name}":`, error);
  }
}

// Main scraping function
async function scrapeAllHobbies() {
  console.log('Starting hobby scraping from allpastimes.com...');
  console.log('This will scrape pages 1-188');
  
  const hobbies: HobbyData[] = [];
  const batchSize = 5; // Process 5 pages at a time to avoid rate limiting
  
  for (let i = 1; i <= 188; i += batchSize) {
    const batch = [];
    for (let j = i; j < Math.min(i + batchSize, 189); j++) {
      batch.push(j);
    }
    
    console.log(`\nProcessing pages ${i} to ${Math.min(i + batchSize - 1, 188)}...`);
    
    const results = await Promise.all(
      batch.map(pageNum => scrapeHobbyPage(pageNum))
    );
    
    for (let k = 0; k < results.length; k++) {
      const hobby = results[k];
      if (hobby) {
        hobbies.push(hobby);
        console.log(`✓ Page ${batch[k]}: ${hobby.name}`);
        
        // Insert into database immediately
        await upsertHobbyCategory(hobby);
      } else {
        console.log(`✗ Page ${batch[k]}: No data found`);
      }
    }
    
    // Add a small delay between batches to be respectful
    if (i + batchSize <= 188) {
      console.log('Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`\n✅ Scraping complete! Total hobbies collected: ${hobbies.length}`);
  
  // Save to a JSON file as backup
  const fs = await import('fs');
  const backupPath = resolve(process.cwd(), 'scripts/hobbies-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(hobbies, null, 2));
  console.log(`Backup saved to: ${backupPath}`);
  
  return hobbies;
}

// Run the scraper
scrapeAllHobbies()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });