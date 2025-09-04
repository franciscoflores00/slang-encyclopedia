import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

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
  pageNumber: number;
}

// Function to extract hobbies from HTML  
function extractHobbiesFromHTML(html: string, pageNumber: number): HobbyData[] {
  const hobbies: HobbyData[] = [];
  
  // Match pattern for hobby titles in h4 tags with museo font
  const titlePattern = /<h4[^>]*>.*?museo-w01-700[^>]*>([^<]+)<\/span>/gi;
  
  // Find all hobby titles
  const titles: string[] = [];
  let titleMatch;
  while ((titleMatch = titlePattern.exec(html)) !== null) {
    const title = titleMatch[1].trim();
    if (title && title.length > 0 && title.length < 100) {
      titles.push(title);
    }
  }
  
  // For each title, try to find its corresponding description
  for (const title of titles) {
    // Try to find the description paragraph that follows this title
    // Look for paragraphs with color:#545454 which seems to be the consistent style
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const descPattern = new RegExp(
      `museo-w01-700[^>]*>${escapedTitle}</span>[\\s\\S]*?<p[^>]*>[\\s\\S]*?color:#545454[^>]*>([^<]+)</span>`,
      'i'
    );
    
    const descMatch = html.match(descPattern);
    let description = '';
    
    if (descMatch && descMatch[1]) {
      description = descMatch[1]
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/<span class="wixGuard[^>]*>​<\/span>/g, '') // Remove guard spans
        .replace(/\s+/g, ' ')
        .trim();
    }
    
    // If we couldn't find description with the specific pattern, try a broader search
    if (!description) {
      const broadPattern = new RegExp(
        `${escapedTitle}[\\s\\S]{0,500}?<p[^>]*>([\\s\\S]*?)</p>`,
        'i'
      );
      const broadMatch = html.match(broadPattern);
      if (broadMatch && broadMatch[1]) {
        const text = broadMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&nbsp;/g, ' ')
          .replace(/​/g, '') // Remove zero-width spaces
          .replace(/\s+/g, ' ')
          .trim();
        
        // Only use it if it looks like a real description
        if (text.length > 50 && !text.includes('Read more') && !text.includes('cookie')) {
          description = text;
        }
      }
    }
    
    if (!description) {
      description = `Discover the joy of ${title} as a rewarding hobby. Explore techniques, tips, and resources to get started.`;
    }
    
    hobbies.push({
      name: title,
      description: description,
      pageNumber: pageNumber
    });
  }
  
  return hobbies;
}

// Function to fetch a page
async function fetchPage(pageNumber: number): Promise<string | null> {
  const url = `https://www.allpastimes.com/hobby${pageNumber}`;
  
  try {
    console.log(`Fetching page ${pageNumber}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`Page ${pageNumber} returned status ${response.status}`);
      return null;
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error fetching page ${pageNumber}:`, error);
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
      console.log(`  ✓ Category "${hobby.name}" already exists, updating...`);
      
      // Update existing category with description
      const { error } = await supabase
        .from('categories')
        .update({
          description: hobby.description.substring(0, 500),
          history: hobby.description,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug);
      
      if (error) {
        console.error(`  ✗ Error updating category "${hobby.name}":`, error.message);
        return false;
      }
    } else {
      console.log(`  ✓ Creating new category: ${hobby.name}`);
      
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
        console.error(`  ✗ Error creating category "${hobby.name}":`, error.message);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error processing hobby "${hobby.name}":`, error);
    return false;
  }
}

// Main scraping function
async function scrapeAllHobbies() {
  console.log('=====================================');
  console.log('Starting hobby scraping from allpastimes.com');
  console.log('Pages to scrape: 1-188');
  console.log('=====================================\n');
  
  const allHobbies: HobbyData[] = [];
  let successCount = 0;
  let failCount = 0;
  
  // Process pages one at a time to be respectful
  for (let pageNum = 1; pageNum <= 188; pageNum++) {
    console.log(`\n--- Processing page ${pageNum}/188 ---`);
    
    const html = await fetchPage(pageNum);
    
    if (!html) {
      console.log(`✗ Failed to fetch page ${pageNum}`);
      failCount++;
      continue;
    }
    
    const hobbies = extractHobbiesFromHTML(html, pageNum);
    
    if (hobbies.length === 0) {
      console.log(`✗ No hobbies found on page ${pageNum}`);
      failCount++;
    } else {
      console.log(`✓ Found ${hobbies.length} hobbies on page ${pageNum}:`);
      
      for (const hobby of hobbies) {
        console.log(`  - ${hobby.name} (${hobby.description.substring(0, 50)}...)`);
        allHobbies.push(hobby);
        
        // Insert into database
        const success = await upsertHobbyCategory(hobby);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }
    
    // Add delay between pages to be respectful
    if (pageNum < 188) {
      console.log('  Waiting 1 second before next page...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n=====================================');
  console.log('SCRAPING COMPLETE!');
  console.log(`Total hobbies collected: ${allHobbies.length}`);
  console.log(`Successfully added/updated: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('=====================================\n');
  
  // Save to JSON file as backup
  const backupPath = resolve(process.cwd(), 'scripts/hobbies-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(allHobbies, null, 2));
  console.log(`Backup saved to: ${backupPath}`);
  
  return allHobbies;
}

// Test function to scrape just one page
async function testScrapeOnePage(pageNum: number = 1) {
  console.log(`Testing page ${pageNum}...`);
  
  const html = await fetchPage(pageNum);
  if (!html) {
    console.log('Failed to fetch page');
    return;
  }
  
  const hobbies = extractHobbiesFromHTML(html, pageNum);
  console.log(`Found ${hobbies.length} hobbies:`);
  
  for (const hobby of hobbies) {
    console.log(`\n${hobby.name}:`);
    console.log(`  ${hobby.description.substring(0, 150)}...`);
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args[0] === 'test') {
  const pageNum = args[1] ? parseInt(args[1]) : 1;
  testScrapeOnePage(pageNum)
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
} else {
  // Run the full scraper
  scrapeAllHobbies()
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}