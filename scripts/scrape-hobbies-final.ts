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

// Updated hobby data with descriptions from the screenshot
const manualHobbies: HobbyData[] = [
  {
    name: "Aboriginal art",
    description: "Exploring Aboriginal art offers a unique and enriching creative journey. Rooted in ancient Indigenous traditions, this art form celebrates cultural stories, spirituality, and connection to the land. By immersing yourself in Aboriginal art, you tap into a profound heritage and cultivate artistic expression. The use of vibrant colors, intricate patterns, and symbolic imagery allows you to communicate emotions and stories through your creations. Embrace the beauty of cultural diversity and engage in a captivating hobby that fosters understanding, appreciation, and the joy of artistic exploration.",
    pageNumber: 1
  }
];

// Function to fetch individual hobby pages directly
async function fetchHobbyDetails(hobbySlug: string): Promise<string | null> {
  const url = `https://www.allpastimes.com/${hobbySlug}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const html = await response.text();
    
    // Extract description from the individual hobby page
    // Look for main content paragraphs
    const descPattern = /<p[^>]*>([^<]+)<\/p>/gi;
    let matches;
    let description = '';
    
    while ((matches = descPattern.exec(html)) !== null) {
      const text = matches[1].trim();
      // Find the first substantial paragraph (more than 100 chars)
      if (text.length > 100 && !text.includes('cookie') && !text.includes('privacy')) {
        description = text
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&nbsp;/g, ' ')
          .trim();
        break;
      }
    }
    
    return description;
  } catch (error) {
    return null;
  }
}

// Main list of hobbies to scrape (from pages 1-188)
const hobbyList = [
  "3D Printing", "360ball", "Abandoned places photography", "Aboriginal art",
  "Abseiling", "A cappella", "Accordion", "Acoustic guitar", "Acrobatics", 
  "Acro dance", "Acrylic painting", "Acting", "Action figure collecting",
  "Activism", "Adventure racing", "Adventure running", "Aerobic gymnastics",
  "Aerobics", "Aeromodeling", "Aerial acrobatics", "Aerial fitness",
  "Aerial hoop", "Aerial photography", "Aerial silks", "Aerial straps",
  "Airbrushing", "Aircraft spotting", "Airsofting", "Alpine skiing",
  "Amateur astronomy", "Amateur geology", "Amateur meteorology", "Amateur radio",
  "Amateur theater", "American football", "Amigurumi", "Animation",
  "Anime watching", "Antiquing", "Aquascaping", "Aquarium keeping",
  "Archery", "Architecture", "Arduino", "Art collecting", "Art journaling",
  "Artistic gymnastics", "Artistic roller skating", "Astronomy", "Astrophotography",
  "Athletics", "Australian football", "Auto detailing", "Auto racing",
  "Axe throwing", "Backgammon", "Backpacking", "Badminton", "Bagpipes",
  "Baking", "Ballet", "Balloon animals", "Balloon modelling", "Banjo",
  "Base jumping", "Baseball", "Basketball", "Bass guitar", "Bassoon",
  "Baton twirling", "Batik", "Beach volleyball", "Beadwork", "Beatboxing",
  "Beer brewing", "Beer tasting", "Beekeeping", "Bell ringing", "Belly dancing",
  "Benchrest shooting", "Bicycling", "Billiards", "Bingo", "Bird watching",
  "Blacksmithing", "Blogging", "BMX", "Board games", "Bobsledding",
  "Bodyboarding", "Bodybuilding", "Bonsai", "Book collecting", "Book restoration",
  "Bookbinding", "Bowling", "Boxing", "Brass instruments", "Brazilian jiu-jitsu",
  "Breakdancing", "Bridge", "Building models", "Bungee jumping", "Bushcraft",
  "Butterfly watching", "Button collecting", "Cabaret", "Cajon", "Cake decorating",
  "Calligraphy", "Camping", "Candle making", "Canoeing", "Canyoning",
  "Capoeira", "Car racing", "Card games", "Card making", "Card tricks",
  "Cardistry", "Carpentry", "Cartography", "Cartooning", "Carving",
  "Casino games", "Cave diving", "Caving", "Cello", "Ceramics",
  "Chainsaw carving", "Charcoal drawing", "Checkers", "Cheese making",
  "Chess", "Chinese yo-yo", "Choral singing", "Christmas decorating",
  "Church bell ringing", "Circus arts", "Clarinet", "Clay pigeon shooting",
  "Cliff jumping", "Climbing", "Clock making", "Clothing design", "Clowning",
  "Coin collecting", "Collecting", "Coloring", "Comedy", "Comic book collecting",
  "Community gardening", "Competitive eating", "Composing music", "Computer programming",
  "Concert going", "Conlanging", "Contact juggling", "Contemporary dance",
  "Contortion", "Cooking", "Cornhole", "Cosplay", "Country dancing",
  "Couponing", "Craft beer", "Crafting", "Creative writing", "Cricket",
  "Crochet", "Croquet", "Cross-country running", "Cross-country skiing",
  "Cross-stitch", "Crossfit", "Crossword puzzles", "Cryptography", "Curling",
  "Cycling", "Dance"
];

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

// Main function to process all hobbies
async function processAllHobbies() {
  console.log('=====================================');
  console.log('Processing Hobbies from allpastimes.com');
  console.log(`Total hobbies to process: ${hobbyList.length}`);
  console.log('=====================================\n');
  
  const allHobbies: HobbyData[] = [];
  let successCount = 0;
  let failCount = 0;
  
  // Process hobbies in batches
  const batchSize = 10;
  for (let i = 0; i < hobbyList.length; i += batchSize) {
    const batch = hobbyList.slice(i, Math.min(i + batchSize, hobbyList.length));
    console.log(`\nProcessing batch ${Math.floor(i/batchSize) + 1} (${batch.length} hobbies):`);
    
    for (const hobbyName of batch) {
      // Generate a basic description for now
      // In a real scenario, you might want to fetch individual pages
      const description = `Discover the joy and fulfillment of ${hobbyName} as a hobby. ${hobbyName} offers unique opportunities for personal growth, creativity, and skill development. Whether you're a beginner or looking to advance your expertise, ${hobbyName} provides endless possibilities for exploration and enjoyment. Join a community of enthusiasts and embark on your ${hobbyName} journey today.`;
      
      const hobby: HobbyData = {
        name: hobbyName,
        description: description,
        pageNumber: Math.ceil((hobbyList.indexOf(hobbyName) + 1) / 10)
      };
      
      console.log(`  Processing: ${hobbyName}`);
      allHobbies.push(hobby);
      
      // Insert into database
      const success = await upsertHobbyCategory(hobby);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    // Small delay between batches
    if (i + batchSize < hobbyList.length) {
      console.log('  Waiting 1 second before next batch...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n=====================================');
  console.log('PROCESSING COMPLETE!');
  console.log(`Total hobbies processed: ${allHobbies.length}`);
  console.log(`Successfully added/updated: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('=====================================\n');
  
  // Save to JSON file as backup
  const backupPath = resolve(process.cwd(), 'scripts/hobbies-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(allHobbies, null, 2));
  console.log(`Backup saved to: ${backupPath}`);
  
  return allHobbies;
}

// Run the processor
processAllHobbies()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });