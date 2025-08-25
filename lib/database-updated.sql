-- Drop existing tables if they exist (be careful with this in production!)
DROP TABLE IF EXISTS term_relations CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS term_categories CASCADE;
DROP TABLE IF EXISTS terms CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Categories table (hobbies/sports)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE, -- URL-friendly version of name
  description TEXT,
  emoji VARCHAR(10),
  color VARCHAR(7), -- Hex color for UI theming
  term_count INTEGER DEFAULT 0, -- Cached count of terms
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Terms table (without direct category_id since terms can belong to multiple categories)
CREATE TABLE terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  definition TEXT NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  examples TEXT[] DEFAULT '{}',
  etymology TEXT,
  pronunciation TEXT,
  usage_notes TEXT, -- Additional usage context
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Many-to-many relationship between terms and categories
CREATE TABLE term_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false, -- Indicates if this is the primary category for the term
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(term_id, category_id)
);

-- Related terms many-to-many relationship
CREATE TABLE term_relations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  related_term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  relation_type VARCHAR(50) DEFAULT 'related', -- 'synonym', 'antonym', 'related', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(term_id, related_term_id)
);

-- User contributions (for future user-generated content)
CREATE TABLE contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  contributor_email VARCHAR(255),
  contribution_type VARCHAR(50) CHECK (contribution_type IN ('new_term', 'edit', 'example', 'correction')),
  content JSONB,
  status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_terms_name_search ON terms USING GIN (to_tsvector('english', name));
CREATE INDEX idx_terms_definition_search ON terms USING GIN (to_tsvector('english', definition));
CREATE INDEX idx_term_categories_term ON term_categories(term_id);
CREATE INDEX idx_term_categories_category ON term_categories(category_id);
CREATE INDEX idx_terms_difficulty ON terms(difficulty);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Function to update category term count
CREATE OR REPLACE FUNCTION update_category_term_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories 
    SET term_count = term_count + 1,
        updated_at = NOW()
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories 
    SET term_count = GREATEST(0, term_count - 1),
        updated_at = NOW()
    WHERE id = OLD.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain term counts
CREATE TRIGGER trigger_update_category_term_count
AFTER INSERT OR DELETE ON term_categories
FOR EACH ROW
EXECUTE FUNCTION update_category_term_count();

-- Function to get terms for a category (sorted alphabetically)
CREATE OR REPLACE FUNCTION get_category_terms(category_slug VARCHAR)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  definition TEXT,
  difficulty VARCHAR,
  examples TEXT[],
  etymology TEXT,
  pronunciation TEXT,
  usage_notes TEXT,
  is_primary BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.name,
    t.definition,
    t.difficulty,
    t.examples,
    t.etymology,
    t.pronunciation,
    t.usage_notes,
    tc.is_primary,
    t.created_at
  FROM terms t
  JOIN term_categories tc ON t.id = tc.term_id
  JOIN categories c ON tc.category_id = c.id
  WHERE c.slug = category_slug
  ORDER BY t.name ASC;
END;
$$ LANGUAGE plpgsql;

-- Insert sample categories
INSERT INTO categories (name, slug, description, emoji, color) VALUES
('Cycling', 'cycling', 'Terms related to cycling, bicycle racing, and bike maintenance', '🚴', '#FF6B6B'),
('Swimming', 'swimming', 'Swimming techniques, pool terminology, and aquatic sports', '🏊', '#4ECDC4'),
('Running', 'running', 'Running, jogging, marathons, and track terminology', '🏃', '#45B7D1'),
('Triathlon', 'triathlon', 'Multi-sport triathlon specific terms and techniques', '🏊‍♂️', '#96CEB4'),
('Rock Climbing', 'rock-climbing', 'Climbing techniques, equipment, and route terminology', '🧗', '#DDA15E'),
('Yoga', 'yoga', 'Yoga poses, philosophy, and practice terminology', '🧘', '#BC6C25'),
('Photography', 'photography', 'Camera settings, composition, and photographic techniques', '📷', '#283618'),
('Gaming', 'gaming', 'Video game terminology, strategies, and culture', '🎮', '#7209B7'),
('Cooking', 'cooking', 'Culinary techniques, ingredients, and kitchen terminology', '👨‍🍳', '#F72585'),
('Gardening', 'gardening', 'Horticulture, plant care, and gardening techniques', '🌱', '#2A9D8F');

-- Insert sample terms
INSERT INTO terms (name, definition, difficulty, examples, etymology, usage_notes) VALUES
(
  'Bonk',
  'The sudden loss of energy experienced during long endurance activities due to glycogen depletion. Also known as "hitting the wall".',
  'beginner',
  ARRAY['I bonked at mile 60 of the century ride', 'Make sure to eat regularly to avoid bonking'],
  'Originally from boxing, meaning to hit or strike',
  'Common in cycling and running communities. Prevented by proper nutrition during activity.'
),
(
  'Cadence',
  'The rhythm or rate of movement, measured differently across various activities.',
  'intermediate',
  ARRAY['Maintain a steady cadence of 90 RPM', 'Her running cadence was 180 steps per minute'],
  'From Latin "cadentia" meaning falling or rhythm',
  'In cycling: pedal revolutions per minute. In running: steps per minute.'
),
(
  'Negative Split',
  'Completing the second half of an activity faster than the first half.',
  'intermediate',
  ARRAY['She ran a perfect negative split in the marathon', 'Swim negative splits to build endurance'],
  'From the concept of splitting times into segments',
  'Commonly used in running and swimming. Requires good pacing strategy.'
),
(
  'Brick Workout',
  'A training session that combines two disciplines back-to-back, typically cycling followed immediately by running.',
  'intermediate',
  ARRAY['Do a brick workout every weekend to practice transitions', 'The brick workout helps your legs adapt'],
  'Named for how your legs feel like bricks when transitioning',
  'Essential for triathlon training. Can also apply to swim-to-bike transitions.'
),
(
  'Beta',
  'Information about how to complete a climbing route or solve a climbing problem.',
  'beginner',
  ARRAY['Can you give me beta on this route?', 'I figured out the beta for the crux'],
  'Originated from Betamax video format, as climbers would record routes',
  'Sharing beta is common in climbing communities but some prefer to figure it out themselves.'
);

-- Create term-category relationships (some terms belong to multiple categories)
INSERT INTO term_categories (term_id, category_id, is_primary) VALUES
-- Bonk belongs to both cycling and running
((SELECT id FROM terms WHERE name = 'Bonk'), (SELECT id FROM categories WHERE slug = 'cycling'), true),
((SELECT id FROM terms WHERE name = 'Bonk'), (SELECT id FROM categories WHERE slug = 'running'), false),

-- Cadence belongs to cycling, running, and swimming
((SELECT id FROM terms WHERE name = 'Cadence'), (SELECT id FROM categories WHERE slug = 'cycling'), true),
((SELECT id FROM terms WHERE name = 'Cadence'), (SELECT id FROM categories WHERE slug = 'running'), false),
((SELECT id FROM terms WHERE name = 'Cadence'), (SELECT id FROM categories WHERE slug = 'swimming'), false),

-- Negative Split belongs to running and swimming
((SELECT id FROM terms WHERE name = 'Negative Split'), (SELECT id FROM categories WHERE slug = 'running'), true),
((SELECT id FROM terms WHERE name = 'Negative Split'), (SELECT id FROM categories WHERE slug = 'swimming'), false),

-- Brick Workout belongs to triathlon
((SELECT id FROM terms WHERE name = 'Brick Workout'), (SELECT id FROM categories WHERE slug = 'triathlon'), true),

-- Beta belongs to rock climbing
((SELECT id FROM terms WHERE name = 'Beta'), (SELECT id FROM categories WHERE slug = 'rock-climbing'), true);

-- Add some term relations
INSERT INTO term_relations (term_id, related_term_id, relation_type) VALUES
((SELECT id FROM terms WHERE name = 'Bonk'), (SELECT id FROM terms WHERE name = 'Negative Split'), 'related'),
((SELECT id FROM terms WHERE name = 'Cadence'), (SELECT id FROM terms WHERE name = 'Brick Workout'), 'related');

-- View to get terms with their categories for easier querying
CREATE OR REPLACE VIEW terms_with_categories AS
SELECT 
  t.*,
  array_agg(
    json_build_object(
      'id', c.id,
      'name', c.name,
      'slug', c.slug,
      'emoji', c.emoji,
      'is_primary', tc.is_primary
    ) ORDER BY tc.is_primary DESC, c.name ASC
  ) as categories
FROM terms t
LEFT JOIN term_categories tc ON t.id = tc.term_id
LEFT JOIN categories c ON tc.category_id = c.id
GROUP BY t.id;