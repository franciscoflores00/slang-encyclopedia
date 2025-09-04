-- Comprehensive terms for individual and precision sports: Golf, Gymnastics, Track and Field
DO $$
DECLARE
    golf_id UUID;
    gymnastics_id UUID;
    trackfield_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO golf_id FROM categories WHERE slug = 'golf';
    SELECT id INTO gymnastics_id FROM categories WHERE slug = 'gymnastics';
    SELECT id INTO trackfield_id FROM categories WHERE slug = 'track-and-field';
    
    -- Insert Golf Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Birdie', 'birdie', 'Score of one stroke under par for a hole', 'beginner', ARRAY['She made birdie on the par-3', 'That approach shot set up the birdie'], NOW(), NOW()),
    (gen_random_uuid(), 'Eagle', 'eagle', 'Score of two strokes under par for a hole', 'intermediate', ARRAY['He eagled the par-5 with that chip-in', 'Eagles are rare but exciting'], NOW(), NOW()),
    (gen_random_uuid(), 'Bogey', 'bogey', 'Score of one stroke over par for a hole', 'beginner', ARRAY['The bogey still kept him in contention', 'Avoid the bogey with better course management'], NOW(), NOW()),
    (gen_random_uuid(), 'Albatross', 'albatross', 'Score of three strokes under par, also called double eagle', 'advanced', ARRAY['The albatross on 18 won the tournament', 'Albatross shots are extremely rare'], NOW(), NOW()),
    (gen_random_uuid(), 'Fairway', 'fairway', 'Short grass area between tee and green where ideal shots land', 'beginner', ARRAY['Hit the fairway for the best approach', 'The fairway slopes left to right'], NOW(), NOW()),
    (gen_random_uuid(), 'Rough', 'rough', 'Longer grass areas adjacent to fairway making shots more difficult', 'beginner', ARRAY['The ball settled in the thick rough', 'Play conservatively from the rough'], NOW(), NOW()),
    (gen_random_uuid(), 'Green', 'green', 'Smooth putting surface around the hole', 'beginner', ARRAY['The green slopes toward the water', 'Read the green carefully before putting'], NOW(), NOW()),
    (gen_random_uuid(), 'Tee Box', 'tee-box', 'Designated starting area for each hole', 'beginner', ARRAY['Choose the appropriate tee box', 'The back tee box is for scratch players'], NOW(), NOW()),
    (gen_random_uuid(), 'Bunker', 'bunker', 'Sand hazard strategically placed around course', 'intermediate', ARRAY['The bunker shot landed softly', 'Avoid that greenside bunker'], NOW(), NOW()),
    (gen_random_uuid(), 'Water Hazard', 'water-hazard', 'Penalty area containing water that affects play', 'beginner', ARRAY['The water hazard guards the green', 'Take a penalty drop from the water hazard'], NOW(), NOW()),
    (gen_random_uuid(), 'Chip Shot', 'chip-shot', 'Short shot near green with low trajectory', 'intermediate', ARRAY['The chip shot rolled to within inches', 'Use a wedge for the chip shot'], NOW(), NOW()),
    (gen_random_uuid(), 'Pitch Shot', 'pitch-shot', 'High, soft shot typically with a wedge', 'intermediate', ARRAY['The pitch shot stopped on a dime', 'Open the clubface for the pitch shot'], NOW(), NOW()),
    (gen_random_uuid(), 'Draw (Golf)', 'draw-golf', 'Ball flight curving gently from right to left for right-handers', 'advanced', ARRAY['He hit a perfect draw around the tree', 'The draw shape suits this hole'], NOW(), NOW()),
    (gen_random_uuid(), 'Fade (Golf)', 'fade-golf', 'Ball flight curving gently from left to right for right-handers', 'advanced', ARRAY['A fade keeps you away from trouble', 'The fade landed perfectly on target'], NOW(), NOW()),
    (gen_random_uuid(), 'Hook (Golf)', 'hook-golf', 'Severe right-to-left ball flight for right-handers', 'intermediate', ARRAY['The hook went into the trees', 'Fix your grip to eliminate the hook'], NOW(), NOW()),
    (gen_random_uuid(), 'Slice (Golf)', 'slice-golf', 'Severe left-to-right ball flight for right-handers', 'intermediate', ARRAY['The slice cost him distance', 'Most beginners struggle with a slice'], NOW(), NOW()),
    (gen_random_uuid(), 'Mulligan', 'mulligan', 'Informal do-over shot not counted in official scoring', 'beginner', ARRAY['He took a mulligan on the first tee', 'No mulligans in tournament play'], NOW(), NOW()),
    (gen_random_uuid(), 'Handicap (Golf)', 'handicap-golf', 'System allowing players of different abilities to compete fairly', 'intermediate', ARRAY['His handicap is down to single digits', 'The handicap system levels the field'], NOW(), NOW()),
    (gen_random_uuid(), 'Par (Golf)', 'par-golf', 'Expected number of strokes for a skilled player to complete a hole', 'beginner', ARRAY['The hole is a par-4', 'He finished two under par'], NOW(), NOW()),
    (gen_random_uuid(), 'Fore', 'fore', 'Warning shout to alert others of an approaching golf ball', 'beginner', ARRAY['Yell fore when your ball heads toward people', 'Fore! Duck for cover!'], NOW(), NOW()),
    
    -- Insert Gymnastics Terms
    (gen_random_uuid(), 'Vault', 'vault', 'Apparatus involving running approach and jumping over vaulting table', 'beginner', ARRAY['Her vault scored a perfect 10', 'The vault requires explosive power'], NOW(), NOW()),
    (gen_random_uuid(), 'Beam', 'beam', 'Narrow apparatus requiring balance and precision', 'intermediate', ARRAY['She stuck the dismount off beam', 'Beam routines showcase grace and control'], NOW(), NOW()),
    (gen_random_uuid(), 'Floor Exercise', 'floor-exercise', 'Routine performed on spring floor with tumbling and dance', 'beginner', ARRAY['The floor exercise combined power and artistry', 'Music accompanies the floor routine'], NOW(), NOW()),
    (gen_random_uuid(), 'Uneven Bars', 'uneven-bars', 'Women''s apparatus with two horizontal bars at different heights', 'intermediate', ARRAY['The uneven bars routine was flawless', 'Release moves on bars are spectacular'], NOW(), NOW()),
    (gen_random_uuid(), 'Parallel Bars', 'parallel-bars', 'Men''s apparatus with two parallel horizontal bars', 'intermediate', ARRAY['His parallel bars strength was evident', 'The parallel bars require upper body power'], NOW(), NOW()),
    (gen_random_uuid(), 'High Bar', 'high-bar', 'Men''s apparatus with single horizontal bar for swinging routines', 'intermediate', ARRAY['The high bar dismount was incredible', 'High bar routines are all about momentum'], NOW(), NOW()),
    (gen_random_uuid(), 'Pommel Horse', 'pommel-horse', 'Men''s apparatus featuring circular leg movements', 'advanced', ARRAY['Pommel horse is the most technical event', 'His pommel horse routine was textbook'], NOW(), NOW()),
    (gen_random_uuid(), 'Rings', 'rings', 'Men''s apparatus with two suspended rings requiring strength', 'advanced', ARRAY['The rings routine displayed incredible strength', 'Still rings demand perfect control'], NOW(), NOW()),
    (gen_random_uuid(), 'Salto', 'salto', 'Flip or somersault performed in gymnastics', 'intermediate', ARRAY['She performed a double salto', 'The salto was perfectly executed'], NOW(), NOW()),
    (gen_random_uuid(), 'Pike', 'pike', 'Body position with legs straight and bent at hips', 'intermediate', ARRAY['Hold the pike position longer', 'The pike adds difficulty to the skill'], NOW(), NOW()),
    (gen_random_uuid(), 'Tuck', 'tuck', 'Body position with knees pulled to chest', 'beginner', ARRAY['She came out of the tuck early', 'Tuck jumps build explosive power'], NOW(), NOW()),
    (gen_random_uuid(), 'Layout', 'layout', 'Body position completely straight and extended', 'intermediate', ARRAY['The layout was perfectly straight', 'Hold the layout through the entire skill'], NOW(), NOW()),
    (gen_random_uuid(), 'Dismount', 'dismount', 'Final skill performed when leaving an apparatus', 'beginner', ARRAY['She stuck the dismount perfectly', 'The dismount determines the final impression'], NOW(), NOW()),
    (gen_random_uuid(), 'Mount (Gymnastics)', 'mount-gymnastics', 'Initial skill used to get onto an apparatus', 'beginner', ARRAY['The mount set the tone for the routine', 'Start with a strong mount'], NOW(), NOW()),
    (gen_random_uuid(), 'Handstand', 'handstand', 'Inverted position balanced on hands', 'intermediate', ARRAY['Hold the handstand for two seconds', 'His handstand was rock solid'], NOW(), NOW()),
    (gen_random_uuid(), 'Cartwheel', 'cartwheel', 'Sideways skill with hands and feet touching in sequence', 'beginner', ARRAY['Perfect cartwheel technique', 'The cartwheel opened up the combination'], NOW(), NOW()),
    (gen_random_uuid(), 'Back Walkover', 'back-walkover', 'Backward bending skill ending in a standing position', 'intermediate', ARRAY['The back walkover was smooth and controlled', 'Work on your back walkover flexibility'], NOW(), NOW()),
    (gen_random_uuid(), 'Front Walkover', 'front-walkover', 'Forward bending skill passing through handstand', 'intermediate', ARRAY['Her front walkover had beautiful lines', 'The front walkover requires shoulder flexibility'], NOW(), NOW()),
    (gen_random_uuid(), 'Round-off', 'round-off', 'Skill similar to cartwheel but landing with both feet together', 'intermediate', ARRAY['The round-off set up the back handspring', 'Power through the round-off'], NOW(), NOW()),
    (gen_random_uuid(), 'Back Handspring', 'back-handspring', 'Backward jumping skill landing on hands then feet', 'advanced', ARRAY['She connected three back handsprings', 'The back handspring requires timing and courage'], NOW(), NOW()),
    
    -- Insert Track and Field Terms
    (gen_random_uuid(), 'Sprint (Track)', 'sprint-track', 'Short distance race run at maximum speed', 'beginner', ARRAY['The 100m sprint is the premier event', 'He has a great sprint finish'], NOW(), NOW()),
    (gen_random_uuid(), 'Marathon', 'marathon', 'Long distance race of 26.2 miles or 42.195 kilometers', 'advanced', ARRAY['She qualified for the Boston Marathon', 'Marathon training requires consistent mileage'], NOW(), NOW()),
    (gen_random_uuid(), 'Hurdles', 'hurdles', 'Race involving jumping over barriers while maintaining speed', 'intermediate', ARRAY['The 110m hurdles is a technical event', 'His hurdle technique improved dramatically'], NOW(), NOW()),
    (gen_random_uuid(), 'Relay', 'relay', 'Team race where runners pass a baton', 'intermediate', ARRAY['The 4x100m relay set a world record', 'The relay exchange was perfect'], NOW(), NOW()),
    (gen_random_uuid(), 'Steeplechase', 'steeplechase', 'Distance race with hurdles and water jumps', 'advanced', ARRAY['The steeplechase tests endurance and technique', '3000m steeplechase is an Olympic event'], NOW(), NOW()),
    (gen_random_uuid(), 'High Jump', 'high-jump', 'Event where athletes jump over a horizontal bar', 'intermediate', ARRAY['She cleared the high jump at 6 feet', 'The Fosbury Flop revolutionized high jump'], NOW(), NOW()),
    (gen_random_uuid(), 'Long Jump', 'long-jump', 'Event measuring horizontal distance jumped from takeoff', 'beginner', ARRAY['The long jump requires speed and technique', 'His long jump personal best was 24 feet'], NOW(), NOW()),
    (gen_random_uuid(), 'Triple Jump', 'triple-jump', 'Event consisting of hop, step, and jump phases', 'advanced', ARRAY['The triple jump is highly technical', 'Phase ratios are crucial in triple jump'], NOW(), NOW()),
    (gen_random_uuid(), 'Pole Vault', 'pole-vault', 'Event using a pole to vault over a high bar', 'advanced', ARRAY['Pole vault combines speed, strength, and technique', 'The pole vault world record keeps rising'], NOW(), NOW()),
    (gen_random_uuid(), 'Shot Put', 'shot-put', 'Throwing event with heavy metal ball', 'intermediate', ARRAY['Shot put requires explosive power', 'The glide and spin techniques in shot put'], NOW(), NOW()),
    (gen_random_uuid(), 'Discus', 'discus', 'Throwing event with a heavy disc', 'intermediate', ARRAY['Discus throw is about rhythm and timing', 'The discus spins for maximum distance'], NOW(), NOW()),
    (gen_random_uuid(), 'Javelin', 'javelin', 'Throwing event with a spear-like implement', 'advanced', ARRAY['Javelin technique focuses on the release angle', 'The javelin must land point first'], NOW(), NOW()),
    (gen_random_uuid(), 'Hammer Throw', 'hammer-throw', 'Throwing event with weighted ball on wire', 'advanced', ARRAY['Hammer throw requires exceptional timing', 'The hammer throw cage ensures safety'], NOW(), NOW()),
    (gen_random_uuid(), 'Decathlon', 'decathlon', 'Men''s combined event with ten track and field disciplines', 'advanced', ARRAY['Decathlon crowns the world''s greatest athlete', 'Training for decathlon requires versatility'], NOW(), NOW()),
    (gen_random_uuid(), 'Heptathlon', 'heptathlon', 'Women''s combined event with seven track and field disciplines', 'advanced', ARRAY['Heptathlon tests all-around athletic ability', 'She won the heptathlon at nationals'], NOW(), NOW()),
    (gen_random_uuid(), 'False Start (Track)', 'false-start-track', 'Illegal start before the starting signal', 'beginner', ARRAY['The false start cost him the race', 'Modern timing detects any false start'], NOW(), NOW()),
    (gen_random_uuid(), 'Personal Best (Track)', 'personal-best-track', 'Individual''s fastest time or best mark in an event', 'beginner', ARRAY['She set a personal best in the 800m', 'His personal best qualified him for state'], NOW(), NOW()),
    (gen_random_uuid(), 'Split Time (Track)', 'split-time-track', 'Intermediate time at specific distance during longer race', 'intermediate', ARRAY['His 400m split was too fast', 'Monitor your split times during training'], NOW(), NOW()),
    (gen_random_uuid(), 'Kick (Track)', 'kick-track', 'Final acceleration in middle or long distance races', 'intermediate', ARRAY['Her kick in the final 200m was devastating', 'Save your kick for when it matters most'], NOW(), NOW()),
    (gen_random_uuid(), 'Baton', 'baton', 'Stick passed between runners in relay races', 'beginner', ARRAY['The baton exchange was smooth', 'Don''t drop the baton in the handoff'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Golf)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, golf_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('birdie', 'eagle', 'bogey', 'albatross', 'fairway', 'rough', 'green', 'tee-box', 'bunker', 'water-hazard', 'chip-shot', 'pitch-shot', 'draw-golf', 'fade-golf', 'hook-golf', 'slice-golf', 'mulligan', 'handicap-golf', 'par-golf', 'fore')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = golf_id);
    
    -- Link terms to categories (Gymnastics)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, gymnastics_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('vault', 'beam', 'floor-exercise', 'uneven-bars', 'parallel-bars', 'high-bar', 'pommel-horse', 'rings', 'salto', 'pike', 'tuck', 'layout', 'dismount', 'mount-gymnastics', 'handstand', 'cartwheel', 'back-walkover', 'front-walkover', 'round-off', 'back-handspring')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = gymnastics_id);
    
    -- Link terms to categories (Track and Field)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, trackfield_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('sprint-track', 'marathon', 'hurdles', 'relay', 'steeplechase', 'high-jump', 'long-jump', 'triple-jump', 'pole-vault', 'shot-put', 'discus', 'javelin', 'hammer-throw', 'decathlon', 'heptathlon', 'false-start-track', 'personal-best-track', 'split-time-track', 'kick-track', 'baton')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = trackfield_id);
    
END $$;