-- Hobbipedia Database Schema
-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS term_relations CASCADE;
DROP TABLE IF EXISTS term_categories CASCADE;
DROP TABLE IF EXISTS terms CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  emoji VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Terms table
CREATE TABLE terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  examples TEXT[],
  etymology TEXT,
  pronunciation VARCHAR(200),
  usage_notes TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100),
  CONSTRAINT unique_term_name UNIQUE (name)
);

-- Many-to-many relationship between terms and categories
CREATE TABLE term_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_term_category UNIQUE (term_id, category_id)
);

-- Related terms (many-to-many self-referencing)
CREATE TABLE term_relations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  related_term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  relation_type VARCHAR(50) DEFAULT 'related', -- related, synonym, antonym, see_also
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_term_relation UNIQUE (term_id, related_term_id),
  CONSTRAINT no_self_reference CHECK (term_id != related_term_id)
);

-- Create indexes for better performance
CREATE INDEX idx_terms_name ON terms(name);
CREATE INDEX idx_terms_slug ON terms(slug);
CREATE INDEX idx_terms_difficulty ON terms(difficulty);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_term_categories_term ON term_categories(term_id);
CREATE INDEX idx_term_categories_category ON term_categories(category_id);
CREATE INDEX idx_term_relations_term ON term_relations(term_id);
CREATE INDEX idx_term_relations_related ON term_relations(related_term_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_terms_updated_at BEFORE UPDATE ON terms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_relations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Terms are viewable by everyone" ON terms
  FOR SELECT USING (true);

CREATE POLICY "Term categories are viewable by everyone" ON term_categories
  FOR SELECT USING (true);

CREATE POLICY "Term relations are viewable by everyone" ON term_relations
  FOR SELECT USING (true);

-- Insert initial categories
INSERT INTO categories (name, slug, description, emoji, color) VALUES
  ('Cycling', 'cycling', 'All things related to bicycles and cycling', '🚴', 'blue'),
  ('Swimming', 'swimming', 'Swimming techniques, equipment, and terminology', '🏊', 'teal'),
  ('Photography', 'photography', 'Photography techniques, equipment, and terminology', '📷', 'purple'),
  ('Running', 'running', 'Running techniques, training, and terminology', '🏃', 'green'),
  ('Hiking', 'hiking', 'Hiking trails, equipment, and outdoor terminology', '🥾', 'brown'),
  ('Yoga', 'yoga', 'Yoga poses, philosophy, and practice terminology', '🧘', 'indigo'),
  ('Gaming', 'gaming', 'Video game terminology and gaming culture', '🎮', 'red'),
  ('Cooking', 'cooking', 'Culinary terms, techniques, and kitchen equipment', '👨‍🍳', 'orange'),
  ('Gardening', 'gardening', 'Gardening techniques, plants, and tools', '🌱', 'green'),
  ('Music', 'music', 'Musical terms, instruments, and theory', '🎵', 'pink');

-- Insert sample terms
INSERT INTO terms (name, slug, definition, difficulty, examples, etymology, pronunciation, created_by) VALUES
  -- Cycling terms
  ('Bonk', 'bonk', 'The sudden loss of energy due to glycogen depletion during long rides', 'beginner', 
   ARRAY['I totally bonked at mile 80 of the century ride', 'Bring snacks to avoid bonking'], 
   'Originally British slang meaning to hit', 'bonk', 'Sarah M.'),
  
  ('Cadence', 'cadence', 'The number of pedal revolutions per minute (RPM)', 'intermediate', 
   ARRAY['My optimal cadence is around 90 RPM', 'Higher cadence can reduce muscle fatigue'], 
   'From Latin cadentia, meaning falling', 'KAY-dense', 'Alex K.'),
  
  ('Drafting', 'drafting', 'Riding closely behind another cyclist to reduce wind resistance', 'intermediate', 
   ARRAY['Drafting can save up to 30% energy', 'The peloton uses drafting to maintain high speeds'], 
   'From nautical terminology', 'DRAFT-ing', 'Tom H.'),
  
  -- Swimming terms
  ('Freestyle', 'freestyle', 'The fastest and most common competitive swimming stroke', 'beginner', 
   ARRAY['She won the 100m freestyle', 'Freestyle is also called front crawl'], 
   'Named for the freedom to choose any stroke in competition', 'FREE-style', 'Emma L.'),
  
  ('Flip Turn', 'flip-turn', 'A swimming turn executed by doing a forward somersault', 'intermediate', 
   ARRAY['Perfect your flip turn to save seconds', 'The flip turn is essential in competitive swimming'], 
   'Descriptive term from the flipping motion', 'flip turn', 'Chris M.'),
  
  ('Butterfly', 'butterfly', 'The most technically demanding competitive swimming stroke', 'advanced', 
   ARRAY['The butterfly requires strong core muscles', 'Michael Phelps dominated the butterfly events'], 
   'Named for the arm motion resembling butterfly wings', 'BUT-ter-fly', 'Lisa W.'),
  
  -- Photography terms
  ('Aperture', 'aperture', 'The opening in a lens that controls how much light enters the camera', 'beginner', 
   ARRAY['A wide aperture creates shallow depth of field', 'Aperture is measured in f-stops'], 
   'From Latin apertura, meaning opening', 'AP-er-chur', 'David P.'),
  
  ('Bokeh', 'bokeh', 'The aesthetic quality of out-of-focus areas in an image', 'intermediate', 
   ARRAY['This lens produces beautiful bokeh', 'Creamy bokeh is highly desired in portrait photography'], 
   'From Japanese boke, meaning blur', 'BOH-keh', 'Anna B.'),
  
  ('Golden Hour', 'golden-hour', 'The period shortly after sunrise or before sunset when lighting is soft', 'beginner', 
   ARRAY['We scheduled the photoshoot during golden hour', 'Golden hour light is warm and flattering'], 
   'Descriptive term from the golden quality of light', 'GOLD-en hour', 'Mike R.'),
  
  ('ISO', 'iso', 'A camera setting that controls sensor sensitivity to light', 'beginner', 
   ARRAY['Higher ISO allows shooting in low light', 'ISO 100 produces the cleanest images'], 
   'From International Organization for Standardization', 'EYE-so', 'Mark T.');

-- Create junction table entries (terms to categories)
INSERT INTO term_categories (term_id, category_id, is_primary)
SELECT t.id, c.id, true
FROM terms t
JOIN categories c ON 
  (t.name IN ('Bonk', 'Cadence', 'Drafting') AND c.slug = 'cycling') OR
  (t.name IN ('Freestyle', 'Flip Turn', 'Butterfly') AND c.slug = 'swimming') OR
  (t.name IN ('Aperture', 'Bokeh', 'Golden Hour', 'ISO') AND c.slug = 'photography');

-- Add some cross-category relationships (e.g., ISO can be relevant to gaming too)
INSERT INTO term_categories (term_id, category_id, is_primary)
SELECT t.id, c.id, false
FROM terms t
JOIN categories c ON 
  (t.name = 'ISO' AND c.slug = 'gaming');

-- Add some related terms
INSERT INTO term_relations (term_id, related_term_id, relation_type)
SELECT t1.id, t2.id, 'related'
FROM terms t1
JOIN terms t2 ON 
  (t1.name = 'Aperture' AND t2.name = 'ISO') OR
  (t1.name = 'Aperture' AND t2.name = 'Bokeh') OR
  (t1.name = 'Freestyle' AND t2.name = 'Butterfly');

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(term_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE terms 
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = term_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;