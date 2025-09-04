// Test scraping a single page first
async function testScrape() {
  const url = 'https://www.allpastimes.com/hobby1';
  
  try {
    console.log(`Fetching ${url}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`Error: Status ${response.status}`);
      return;
    }
    
    const html = await response.text();
    console.log(`Received HTML (length: ${html.length})`);
    
    // Try to find the title
    const titlePatterns = [
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /<h2[^>]*>([^<]+)<\/h2>/i,
      /<title>([^<]+)<\/title>/i
    ];
    
    let title = null;
    for (const pattern of titlePatterns) {
      const match = html.match(pattern);
      if (match) {
        title = match[1].trim();
        console.log(`Found title with pattern ${pattern}: "${title}"`);
        break;
      }
    }
    
    // Look for paragraphs
    const paragraphs = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (paragraphs) {
      console.log(`Found ${paragraphs.length} paragraphs`);
      
      // Find the main description paragraph
      for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
        const text = paragraphs[i]
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (text.length > 50) {
          console.log(`\nParagraph ${i + 1} (${text.length} chars):`);
          console.log(text.substring(0, 200) + '...');
        }
      }
    }
    
    // Save HTML for inspection
    const fs = await import('fs');
    fs.writeFileSync('test-page.html', html);
    console.log('\nFull HTML saved to test-page.html for inspection');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testScrape();