-- Add cycling terms to the database (final version without term_count)
-- First, get the cycling category ID
DO $$
DECLARE
    cycling_category_id UUID;
BEGIN
    -- Get the cycling category ID
    SELECT id INTO cycling_category_id FROM categories WHERE slug = 'cycling';
    
    -- Insert the new cycling terms (skip if they already exist)
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    -- Technical Components
    (gen_random_uuid(), 'Drivetrain', 'drivetrain', 'The system that transfers power from pedals to wheels (chain, cassette, derailleurs)', 'intermediate', ARRAY['The bike''s drivetrain needs regular maintenance', 'A clean drivetrain improves efficiency'], NOW(), NOW()),
    (gen_random_uuid(), 'Cassette', 'cassette', 'The cluster of gears on the rear wheel', 'beginner', ARRAY['An 11-speed cassette offers more gear options', 'Replace your cassette when the teeth are worn'], NOW(), NOW()),
    (gen_random_uuid(), 'Chainring', 'chainring', 'The front gears attached to the cranks', 'beginner', ARRAY['A compact chainring is better for climbing', 'Clean your chainring regularly to prevent wear'], NOW(), NOW()),
    (gen_random_uuid(), 'Derailleur', 'derailleur', 'Mechanism that moves the chain between gears', 'intermediate', ARRAY['The rear derailleur needs proper adjustment', 'A bent derailleur hanger affects shifting'], NOW(), NOW()),
    (gen_random_uuid(), 'Groupset', 'groupset', 'Complete set of components (shifters, derailleurs, brakes, etc.)', 'intermediate', ARRAY['Shimano and SRAM are popular groupset manufacturers', 'Upgrading your groupset improves performance'], NOW(), NOW()),
    (gen_random_uuid(), 'Bottom Bracket', 'bottom-bracket', 'The bearing system that connects cranks to frame', 'advanced', ARRAY['A loose bottom bracket causes creaking sounds', 'Press-fit bottom brackets can be problematic'], NOW(), NOW()),
    (gen_random_uuid(), 'Headset', 'headset', 'Bearing system that allows steering', 'advanced', ARRAY['A worn headset makes steering feel loose', 'Integrated headsets are common on modern bikes'], NOW(), NOW()),
    (gen_random_uuid(), 'Dropout', 'dropout', 'Frame slots where the rear wheel attaches', 'advanced', ARRAY['Horizontal dropouts allow chain tension adjustment', 'Through-axle dropouts provide better stiffness'], NOW(), NOW()),
    
    -- Pedaling & Technique
    (gen_random_uuid(), 'Cadence', 'cadence', 'Pedaling rhythm (revolutions per minute)', 'intermediate', ARRAY['My optimal cadence is around 90 RPM', 'Higher cadence is easier on your knees'], NOW(), NOW()),
    (gen_random_uuid(), 'Spinning', 'spinning', 'Pedaling with high cadence, low resistance', 'beginner', ARRAY['Spinning helps build cardiovascular fitness', 'Professional cyclists prefer spinning over mashing'], NOW(), NOW()),
    (gen_random_uuid(), 'Mashing', 'mashing', 'Pedaling with high resistance, low cadence', 'beginner', ARRAY['Mashing puts more stress on your knees', 'Avoid mashing on long climbs'], NOW(), NOW()),
    (gen_random_uuid(), 'Soft Pedal', 'soft-pedal', 'Easy, recovery-pace riding', 'beginner', ARRAY['Let''s soft pedal for the next few miles', 'Soft pedaling helps with recovery between intervals'], NOW(), NOW()),
    
    -- Aerodynamics & Strategy
    (gen_random_uuid(), 'Drafting', 'drafting', 'Riding behind someone to reduce wind resistance', 'intermediate', ARRAY['Drafting can save up to 30% energy', 'Good drafting technique requires staying close but safe'], NOW(), NOW()),
    (gen_random_uuid(), 'Slipstreaming', 'slipstreaming', 'Another term for drafting - riding in someone''s wind shadow', 'intermediate', ARRAY['The peloton uses slipstreaming to conserve energy', 'Slipstreaming is most effective at higher speeds'], NOW(), NOW()),
    
    -- Energy & Performance
    (gen_random_uuid(), 'Bonk', 'bonk', 'Running out of energy/glycogen during a ride', 'beginner', ARRAY['I totally bonked at mile 80 of the century ride', 'Eat regularly to avoid bonking on long rides'], NOW(), NOW()),
    (gen_random_uuid(), 'Hitting the Wall', 'hitting-the-wall', 'Another term for bonking - sudden energy depletion', 'beginner', ARRAY['She hit the wall during the last climb', 'Proper nutrition prevents hitting the wall'], NOW(), NOW()),
    
    -- Group Riding & Racing
    (gen_random_uuid(), 'Peloton', 'peloton', 'Main group of riders in a race', 'intermediate', ARRAY['The breakaway was caught by the peloton', 'Riding in the peloton requires good bike handling skills'], NOW(), NOW()),
    (gen_random_uuid(), 'Breakaway', 'breakaway', 'Small group of riders ahead of the main pack', 'intermediate', ARRAY['Five riders formed a breakaway early in the race', 'The breakaway gained a 3-minute advantage'], NOW(), NOW()),
    (gen_random_uuid(), 'Echelon', 'echelon', 'Diagonal riding formation used in crosswinds', 'advanced', ARRAY['The team formed an echelon in the crosswind section', 'Echelons can split the peloton in windy conditions'], NOW(), NOW()),
    (gen_random_uuid(), 'Pull', 'pull', 'Taking a turn at the front of a group to set pace', 'intermediate', ARRAY['It''s your turn to take a pull', 'He did a long pull up the climb'], NOW(), NOW())
    
    -- Skip duplicates if slug already exists
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link all terms to the cycling category (only if not already linked)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT 
        gen_random_uuid(),
        t.id,
        cycling_category_id,
        true,
        NOW()
    FROM terms t 
    WHERE t.slug IN (
        'drivetrain', 'cassette', 'chainring', 'derailleur', 
        'groupset', 'bottom-bracket', 'headset', 'dropout',
        'cadence', 'spinning', 'mashing', 'soft-pedal',
        'drafting', 'slipstreaming', 'bonk', 'hitting-the-wall',
        'peloton', 'breakaway', 'echelon', 'pull'
    )
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = cycling_category_id
    );
    
END $$;