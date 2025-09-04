-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  emoji VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Terms table
CREATE TABLE terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  definition TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  examples TEXT[] DEFAULT '{}',
  etymology TEXT,
  pronunciation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Related terms many-to-many relationship
CREATE TABLE term_relations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  related_term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
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

-- Full-text search indexes
CREATE INDEX idx_terms_name_search ON terms USING GIN (to_tsvector('english', name));
CREATE INDEX idx_terms_definition_search ON terms USING GIN (to_tsvector('english', definition));
CREATE INDEX idx_terms_category ON terms(category_id);
CREATE INDEX idx_terms_difficulty ON terms(difficulty);

-- Insert sample categories
INSERT INTO categories (name, description, emoji) VALUES
('cycling', 'Terms related to cycling and bicycle racing', '🚴‍♂️'),
('swimming', 'Swimming techniques and pool terminology', '🏊‍♀️'),
('running', 'Running and marathon terminology', '🏃‍♂️'),
('triathlon', 'Multi-sport triathlon specific terms', '🏊‍♂️🚴‍♀️🏃‍♂️'),
('fitness', 'General fitness and gym terminology', '💪'),
('nutrition', 'Sports nutrition and diet terminology', '🥗');

-- Insert sample terms
INSERT INTO terms (name, definition, category_id, difficulty, examples, etymology) VALUES
(
  'bonk',
  'The sudden loss of energy experienced during long endurance activities due to glycogen depletion. Also known as "hitting the wall".',
  (SELECT id FROM categories WHERE name = 'cycling'),
  'beginner',
  ARRAY['I bonked at mile 60 of the century ride', 'Make sure to eat regularly to avoid bonking'],
  'Originally from boxing, meaning to hit or strike'
),
(
  'cadence',
  'The number of pedal revolutions per minute (RPM) in cycling. Optimal cadence is typically between 80-100 RPM for most cyclists.',
  (SELECT id FROM categories WHERE name = 'cycling'),
  'intermediate',
  ARRAY['Maintain a steady cadence of 90 RPM', 'Higher cadence reduces strain on leg muscles'],
  'From Latin "cadentia" meaning falling or rhythm'
),
(
  'negative split',
  'Running strategy where the second half of a race is completed faster than the first half.',
  (SELECT id FROM categories WHERE name = 'running'),
  'intermediate',
  ARRAY['She ran a perfect negative split, finishing strong', 'Negative splits help conserve energy early in the race'],
  'From the concept of splitting race times into segments'
),
(
  'brick workout',
  'A training session that combines two disciplines back-to-back, typically cycling followed immediately by running, to simulate race conditions.',
  (SELECT id FROM categories WHERE name = 'triathlon'),
  'intermediate',
  ARRAY['Do a brick workout every weekend to practice transitions', 'The brick workout helps your legs adapt to running after cycling'],
  'Named for how your legs feel like bricks when transitioning from bike to run'
);

-- Add some term relations
INSERT INTO term_relations (term_id, related_term_id) VALUES
((SELECT id FROM terms WHERE name = 'bonk'), (SELECT id FROM terms WHERE name = 'cadence')),
((SELECT id FROM terms WHERE name = 'brick workout'), (SELECT id FROM terms WHERE name = 'negative split'));

-- Function to update term_count in categories
CREATE OR REPLACE FUNCTION update_category_term_count()
RETURNS TRIGGER AS $$
BEGIN
  -- This would be implemented to maintain term counts
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;