-- Comprehensive terms for team sports and fitness: Lacrosse, Yoga  
DO $$
DECLARE
    lacrosse_id UUID;
    yoga_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO lacrosse_id FROM categories WHERE slug = 'lacrosse';
    SELECT id INTO yoga_id FROM categories WHERE slug = 'yoga';
    
    -- Insert Lacrosse Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Stick', 'stick', 'Equipment with netted head used to catch, carry, and throw ball', 'beginner', ARRAY['Choose a stick appropriate for your position', 'The stick head needs restringing'], NOW(), NOW()),
    (gen_random_uuid(), 'Pocket', 'pocket', 'Netted area of stick head that holds the ball', 'beginner', ARRAY['The pocket was perfectly formed', 'Deep pockets help with ball retention'], NOW(), NOW()),
    (gen_random_uuid(), 'Cradle (Lacrosse)', 'cradle-lacrosse', 'Rocking motion to keep ball secure in stick', 'beginner', ARRAY['Cradle the ball while running', 'His cradling technique was smooth'], NOW(), NOW()),
    (gen_random_uuid(), 'Face-off', 'face-off', 'Method of starting play with two players competing for ball', 'intermediate', ARRAY['Win the face-off to gain possession', 'Face-offs happen after each goal'], NOW(), NOW()),
    (gen_random_uuid(), 'Ground Ball', 'ground-ball', 'Loose ball on the ground that players compete for', 'intermediate', ARRAY['Ground balls are crucial for possession', 'She scooped the ground ball cleanly'], NOW(), NOW()),
    (gen_random_uuid(), 'Clear', 'clear', 'Moving ball from defensive to offensive end', 'intermediate', ARRAY['The clear broke their press', 'Successful clears require patience'], NOW(), NOW()),
    (gen_random_uuid(), 'Ride', 'ride', 'Defensive pressure preventing opponent from clearing', 'advanced', ARRAY['The ride forced a turnover', 'Good riding requires coordinated pressure'], NOW(), NOW()),
    (gen_random_uuid(), 'Dodge', 'dodge', 'Offensive move to get past defender', 'intermediate', ARRAY['His dodge to the goal was unstoppable', 'Master the basic dodges first'], NOW(), NOW()),
    (gen_random_uuid(), 'Pick', 'pick', 'Screen set to free up teammate', 'intermediate', ARRAY['Set a pick for the cutter', 'The pick created space'], NOW(), NOW()),
    (gen_random_uuid(), 'Cut (Lacrosse)', 'cut-lacrosse', 'Quick movement to get open for pass', 'intermediate', ARRAY['Cut to the ball aggressively', 'The cut found open space'], NOW(), NOW()),
    (gen_random_uuid(), 'Assist (Lacrosse)', 'assist-lacrosse', 'Pass that directly leads to goal', 'beginner', ARRAY['Beautiful assist through traffic', 'He had three assists in the game'], NOW(), NOW()),
    (gen_random_uuid(), 'Save', 'save', 'Goalkeeper preventing goal attempt', 'beginner', ARRAY['The save kept them in the game', 'Spectacular glove save high'], NOW(), NOW()),
    (gen_random_uuid(), 'Check', 'check', 'Legal defensive contact with stick or body', 'intermediate', ARRAY['Clean check stripped the ball', 'Stick checks are more precise'], NOW(), NOW()),
    (gen_random_uuid(), 'Unsettled', 'unsettled', 'Fast-break situation with numbers advantage', 'advanced', ARRAY['Push the unsettled situation', 'Unsettled offense creates opportunities'], NOW(), NOW()),
    (gen_random_uuid(), 'Settled', 'settled', 'Half-court offense against set defense', 'advanced', ARRAY['Be patient in settled offense', 'Settled situations require execution'], NOW(), NOW()),
    (gen_random_uuid(), 'EMO', 'emo', 'Extra man offense during opponent penalty', 'advanced', ARRAY['EMO unit scored quickly', 'Practice EMO situations regularly'], NOW(), NOW()),
    (gen_random_uuid(), 'Man Down', 'man-down', 'Defensive situation when opponent has extra player', 'advanced', ARRAY['Man down defense held strong', 'Communication is key man down'], NOW(), NOW()),
    (gen_random_uuid(), 'Slide', 'slide', 'Defensive rotation to provide help', 'advanced', ARRAY['The slide came perfectly', 'Know when to slide'], NOW(), NOW()),
    (gen_random_uuid(), 'Adjacent', 'adjacent', 'Defensive player next to ball carrier', 'advanced', ARRAY['Adjacent defender provides support', 'Stay adjacent to your man'], NOW(), NOW()),
    (gen_random_uuid(), 'Alley Dodge', 'alley-dodge', 'Dodge along sideline using space', 'intermediate', ARRAY['The alley dodge created separation', 'Use the alley when pressed'], NOW(), NOW()),
    (gen_random_uuid(), 'Bull Dodge', 'bull-dodge', 'Power dodge straight to goal', 'intermediate', ARRAY['Bull dodge with speed and strength', 'The bull dodge required commitment'], NOW(), NOW()),
    (gen_random_uuid(), 'Question Mark Dodge', 'question-mark-dodge', 'Curved dodge changing direction sharply', 'advanced', ARRAY['Question mark dodge fooled defender', 'The curve created perfect angle'], NOW(), NOW()),
    (gen_random_uuid(), 'Overhand', 'overhand', 'Shooting or passing motion from above shoulder', 'beginner', ARRAY['Overhand shots have more power', 'Practice overhand accuracy'], NOW(), NOW()),
    (gen_random_uuid(), 'Sidearm', 'sidearm', 'Shooting or passing motion from side', 'intermediate', ARRAY['Sidearm release was deceptive', 'Sidearm shots are harder to save'], NOW(), NOW()),
    (gen_random_uuid(), 'Underhand', 'underhand', 'Shooting or passing motion from below', 'intermediate', ARRAY['Underhand shot surprised goalie', 'Underhand feeds thread traffic'], NOW(), NOW()),
    
    -- Insert Yoga Terms
    (gen_random_uuid(), 'Asana', 'asana', 'Physical postures or poses in yoga practice', 'beginner', ARRAY['Hold each asana for five breaths', 'The asana challenged her balance'], NOW(), NOW()),
    (gen_random_uuid(), 'Vinyasa', 'vinyasa', 'Flow connecting postures with breath', 'intermediate', ARRAY['The vinyasa linked poses smoothly', 'Vinyasa creates meditative flow'], NOW(), NOW()),
    (gen_random_uuid(), 'Pranayama', 'pranayama', 'Breathing techniques and breath control practices', 'intermediate', ARRAY['Pranayama calms the mind', 'Practice pranayama before meditation'], NOW(), NOW()),
    (gen_random_uuid(), 'Namaste', 'namaste', 'Greeting recognizing divine in others, hands at heart', 'beginner', ARRAY['The class ended with namaste', 'Namaste honors the practice'], NOW(), NOW()),
    (gen_random_uuid(), 'Downward Dog', 'downward-dog', 'Fundamental pose forming inverted V shape', 'beginner', ARRAY['Downward dog strengthens arms and legs', 'Return to downward dog'], NOW(), NOW()),
    (gen_random_uuid(), 'Warrior Pose', 'warrior-pose', 'Standing poses building strength and stability', 'beginner', ARRAY['Warrior poses embody strength', 'Hold warrior one for courage'], NOW(), NOW()),
    (gen_random_uuid(), 'Child''s Pose', 'childs-pose', 'Resting position with knees down and arms forward', 'beginner', ARRAY['Take child''s pose when needed', 'Child''s pose provides comfort'], NOW(), NOW()),
    (gen_random_uuid(), 'Mountain Pose', 'mountain-pose', 'Basic standing pose with proper alignment', 'beginner', ARRAY['Mountain pose establishes foundation', 'Find your mountain pose'], NOW(), NOW()),
    (gen_random_uuid(), 'Sun Salutation', 'sun-salutation', 'Sequence of poses honoring the sun', 'intermediate', ARRAY['Begin with sun salutations', 'The sun salutation energized her'], NOW(), NOW()),
    (gen_random_uuid(), 'Tree Pose', 'tree-pose', 'Balancing pose standing on one foot', 'intermediate', ARRAY['Tree pose improves balance', 'Find your drishti in tree pose'], NOW(), NOW()),
    (gen_random_uuid(), 'Lotus Pose', 'lotus-pose', 'Seated meditation pose with crossed legs', 'advanced', ARRAY['Full lotus requires hip flexibility', 'Lotus pose centers the mind'], NOW(), NOW()),
    (gen_random_uuid(), 'Cobra Pose', 'cobra-pose', 'Back-bending pose strengthening spine', 'intermediate', ARRAY['Cobra pose opens the heart', 'Press up into cobra'], NOW(), NOW()),
    (gen_random_uuid(), 'Plank Pose', 'plank-pose', 'Strengthening pose holding straight body position', 'intermediate', ARRAY['Plank pose builds core strength', 'Hold plank with steady breath'], NOW(), NOW()),
    (gen_random_uuid(), 'Savasana', 'savasana', 'Final relaxation pose lying flat', 'beginner', ARRAY['Savasana integrates the practice', 'Rest deeply in savasana'], NOW(), NOW()),
    (gen_random_uuid(), 'Drishti', 'drishti', 'Focused gaze point during poses', 'intermediate', ARRAY['Find your drishti for balance', 'Drishti steadies the mind'], NOW(), NOW()),
    (gen_random_uuid(), 'Bandha', 'bandha', 'Energy locks created by muscle contractions', 'advanced', ARRAY['Engage mula bandha for stability', 'Bandhas channel energy'], NOW(), NOW()),
    (gen_random_uuid(), 'Chakra', 'chakra', 'Energy centers along the spine', 'intermediate', ARRAY['Balance all seven chakras', 'The heart chakra governs love'], NOW(), NOW()),
    (gen_random_uuid(), 'Mantra', 'mantra', 'Sacred sound or phrase for meditation', 'intermediate', ARRAY['Repeat your mantra silently', 'Om is a universal mantra'], NOW(), NOW()),
    (gen_random_uuid(), 'Mudra', 'mudra', 'Hand positions channeling energy', 'intermediate', ARRAY['Use prayer mudra at heart', 'Mudras focus intention'], NOW(), NOW()),
    (gen_random_uuid(), 'Ujjayi', 'ujjayi', 'Breathing technique creating ocean-like sound', 'intermediate', ARRAY['Ujjayi breath calms the nervous system', 'Maintain ujjayi throughout practice'], NOW(), NOW()),
    (gen_random_uuid(), 'Meditation', 'meditation', 'Practice of sustained attention and awareness', 'beginner', ARRAY['End practice with meditation', 'Meditation develops mindfulness'], NOW(), NOW()),
    (gen_random_uuid(), 'Mindfulness', 'mindfulness', 'Present moment awareness without judgment', 'intermediate', ARRAY['Bring mindfulness to each pose', 'Mindfulness transforms ordinary moments'], NOW(), NOW()),
    (gen_random_uuid(), 'Alignment', 'alignment', 'Proper positioning of body in poses', 'intermediate', ARRAY['Focus on alignment over depth', 'Good alignment prevents injury'], NOW(), NOW()),
    (gen_random_uuid(), 'Modification', 'modification', 'Adaptation of pose for individual needs', 'beginner', ARRAY['Use modifications as needed', 'Modifications make yoga accessible'], NOW(), NOW()),
    (gen_random_uuid(), 'Props', 'props', 'Equipment like blocks, straps, and bolsters', 'beginner', ARRAY['Props support proper alignment', 'Don''t hesitate to use props'], NOW(), NOW()),
    (gen_random_uuid(), 'Flexibility', 'flexibility', 'Range of motion in joints and muscles', 'beginner', ARRAY['Flexibility improves with practice', 'Strength and flexibility work together'], NOW(), NOW()),
    (gen_random_uuid(), 'Balance', 'balance', 'Ability to maintain steady posture', 'intermediate', ARRAY['Balance poses build confidence', 'Find balance between effort and ease'], NOW(), NOW()),
    (gen_random_uuid(), 'Strength', 'strength', 'Muscular power developed through practice', 'intermediate', ARRAY['Yoga builds functional strength', 'Strength supports deeper poses'], NOW(), NOW()),
    (gen_random_uuid(), 'Flow', 'flow', 'Smooth transition between poses', 'intermediate', ARRAY['Find your natural flow', 'Flow creates moving meditation'], NOW(), NOW()),
    (gen_random_uuid(), 'Intention', 'intention', 'Purpose or focus set for practice', 'beginner', ARRAY['Set an intention at class start', 'Return to your intention'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Lacrosse)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, lacrosse_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('stick', 'pocket', 'cradle-lacrosse', 'face-off', 'ground-ball', 'clear', 'ride', 'dodge', 'pick', 'cut-lacrosse', 'assist-lacrosse', 'save', 'check', 'unsettled', 'settled', 'emo', 'man-down', 'slide', 'adjacent', 'alley-dodge', 'bull-dodge', 'question-mark-dodge', 'overhand', 'sidearm', 'underhand')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = lacrosse_id);
    
    -- Link terms to categories (Yoga)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, yoga_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('asana', 'vinyasa', 'pranayama', 'namaste', 'downward-dog', 'warrior-pose', 'childs-pose', 'mountain-pose', 'sun-salutation', 'tree-pose', 'lotus-pose', 'cobra-pose', 'plank-pose', 'savasana', 'drishti', 'bandha', 'chakra', 'mantra', 'mudra', 'ujjayi', 'meditation', 'mindfulness', 'alignment', 'modification', 'props', 'flexibility', 'balance', 'strength', 'flow', 'intention')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = yoga_id);
    
END $$;