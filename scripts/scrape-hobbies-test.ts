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
}

// Test with just a few hobbies
const testHobbies: HobbyData[] = [
  {
    name: "3D Printing",
    description: "3D printing as a hobby has something for everyone, regardless of skill level or interests. For the tech-savvy, it's an opportunity to dive into the intricacies of CAD design and slicing software. For artists and designers, it's a chance to create custom pieces and experiment with new materials. With the ability to print everything from toys and jewelry to replacement parts and medical devices, 3D printing is a hobby with endless possibilities."
  },
  {
    name: "Abandoned places photography",
    description: "Abandoned Places Photography, as a captivating hobby, involves capturing the intriguing beauty and stories of forgotten locations. Through your lens, you'll immortalize the echoes of the past, showcasing the interplay between decay and time. This unique pursuit allows you to explore hidden narratives, ignite historical curiosity, and hone your artistic skills."
  },
  {
    name: "Aboriginal art",
    description: "Exploring Aboriginal art offers a unique and enriching creative journey. Rooted in ancient Indigenous traditions, this art form celebrates cultural stories, spirituality, and connection to the land. By immersing yourself in Aboriginal art, you tap into a profound heritage and cultivate artistic expression. The use of vibrant colors, intricate patterns, and symbolic imagery allows you to communicate emotions and stories through your creations."
  }
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

// Test function
async function testHobbyCreation() {
  console.log('Testing hobby creation...\n');
  
  for (const hobby of testHobbies) {
    console.log(`Processing: ${hobby.name}`);
    const success = await upsertHobbyCategory(hobby);
    if (success) {
      console.log(`  ✅ Successfully processed "${hobby.name}"`);
    } else {
      console.log(`  ❌ Failed to process "${hobby.name}"`);
    }
    console.log('');
  }
  
  console.log('Test complete!');
}

testHobbyCreation()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });