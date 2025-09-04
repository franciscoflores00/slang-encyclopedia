-- Comprehensive terms for action and extreme sports: Skateboarding, Skydiving, Spelunking
DO $$
DECLARE
    skateboarding_id UUID;
    skydiving_id UUID;
    spelunking_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO skateboarding_id FROM categories WHERE slug = 'skateboarding';
    SELECT id INTO skydiving_id FROM categories WHERE slug = 'skydiving';
    SELECT id INTO spelunking_id FROM categories WHERE slug = 'spelunking';

    -- Insert Skateboarding Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Ollie', 'ollie', 'Fundamental trick jumping with board without using hands', 'beginner', ARRAY['Master the ollie before other tricks', 'His ollie cleared the gap easily'], NOW(), NOW()),
    (gen_random_uuid(), 'Kickflip', 'kickflip', 'Trick where board flips sideways while in air', 'intermediate', ARRAY['The kickflip took months to learn', 'She landed a perfect kickflip'], NOW(), NOW()),
    (gen_random_uuid(), 'Heelflip', 'heelflip', 'Trick where board flips using heel instead of toe', 'intermediate', ARRAY['Heelflips rotate opposite of kickflips', 'His heelflip was styled perfectly'], NOW(), NOW()),
    (gen_random_uuid(), 'Pop Shuvit', 'pop-shuvit', 'Trick rotating board 180 degrees horizontally', 'intermediate', ARRAY['Pop shuvits are easier than kickflips', 'The pop shuvit spun cleanly'], NOW(), NOW()),
    (gen_random_uuid(), 'Tre Flip', 'tre-flip', 'Advanced trick combining kickflip and 360 shuvit', 'advanced', ARRAY['Tre flips require perfect timing', 'His tre flip was absolutely clean'], NOW(), NOW()),
    (gen_random_uuid(), 'Manual', 'manual', 'Balancing on back wheels while rolling forward', 'intermediate', ARRAY['Hold the manual across the gap', 'Manuals require precise balance'], NOW(), NOW()),
    (gen_random_uuid(), 'Nose Manual', 'nose-manual', 'Balancing on front wheels while rolling', 'intermediate', ARRAY['Nose manuals are harder than manuals', 'The nose manual looked effortless'], NOW(), NOW()),
    (gen_random_uuid(), '50-50 Grind', '50-50-grind', 'Sliding on obstacle with both trucks on edge', 'intermediate', ARRAY['The 50-50 grind was perfectly balanced', 'Approach the rail for a 50-50'], NOW(), NOW()),
    (gen_random_uuid(), 'Boardslide', 'boardslide', 'Sliding sideways on obstacle with board perpendicular', 'intermediate', ARRAY['The boardslide down the handrail', 'Lock into the boardslide position'], NOW(), NOW()),
    (gen_random_uuid(), 'Lipslide', 'lipslide', 'Sliding trick approaching obstacle from opposite side', 'advanced', ARRAY['Lipslides require commitment', 'The lipslide was sketchy but landed'], NOW(), NOW()),
    (gen_random_uuid(), 'Frontside', 'frontside', 'Rotating or approaching with front of body leading', 'intermediate', ARRAY['Frontside 180 is easier to see', 'Go frontside on that quarter pipe'], NOW(), NOW()),
    (gen_random_uuid(), 'Backside', 'backside', 'Rotating or approaching with back of body leading', 'intermediate', ARRAY['Backside tricks feel more natural', 'The backside 180 was smooth'], NOW(), NOW()),
    (gen_random_uuid(), 'Vert', 'vert', 'Vertical skating on ramps and pipes', 'advanced', ARRAY['Vert skating requires serious commitment', 'The vert ramp was intimidating'], NOW(), NOW()),
    (gen_random_uuid(), 'Street', 'street', 'Skateboarding using urban architecture and obstacles', 'intermediate', ARRAY['Street skating is more creative', 'The street course had perfect ledges'], NOW(), NOW()),
    (gen_random_uuid(), 'Deck (Skateboard)', 'deck-skateboard', 'Wooden platform of skateboard that rider stands on', 'beginner', ARRAY['Choose a deck width that feels comfortable', 'His deck had sick graphics'], NOW(), NOW()),
    (gen_random_uuid(), 'Trucks', 'trucks', 'Metal axles connecting wheels to deck', 'beginner', ARRAY['Tight trucks are harder to turn', 'The trucks needed adjustment'], NOW(), NOW()),
    (gen_random_uuid(), 'Bearings', 'bearings', 'Metal balls inside wheels allowing smooth rotation', 'beginner', ARRAY['Clean bearings roll much faster', 'Swiss bearings are high quality'], NOW(), NOW()),
    (gen_random_uuid(), 'Grip Tape', 'grip-tape', 'Sandpaper-like surface on top of deck', 'beginner', ARRAY['Fresh grip tape improves control', 'The grip tape was wearing smooth'], NOW(), NOW()),
    (gen_random_uuid(), 'Primo', 'primo', 'Balancing on edge of skateboard deck', 'advanced', ARRAY['Primo tricks look incredible', 'He held the primo for ten seconds'], NOW(), NOW()),
    (gen_random_uuid(), 'Slam', 'slam', 'Hard fall or crash while skateboarding', 'beginner', ARRAY['That slam looked painful', 'Learning requires taking some slams'], NOW(), NOW()),
    (gen_random_uuid(), 'Session (Skateboard)', 'session-skateboard', 'Skateboarding gathering or practice time', 'beginner', ARRAY['The session lasted all afternoon', 'Good session with the crew'], NOW(), NOW()),
    (gen_random_uuid(), 'Spot', 'spot', 'Location suitable for skateboarding', 'beginner', ARRAY['We found a perfect new spot', 'That spot has gnarly stairs'], NOW(), NOW()),
    (gen_random_uuid(), 'Mongo', 'mongo', 'Pushing skateboard with front foot instead of back foot', 'beginner', ARRAY['Mongo pushing looks awkward', 'Most skaters avoid mongo'], NOW(), NOW()),
    (gen_random_uuid(), 'Stance', 'stance', 'Foot position on board - regular or goofy', 'beginner', ARRAY['Determine your natural stance first', 'His stance was goofy foot'], NOW(), NOW()),
    (gen_random_uuid(), 'Bail', 'bail', 'Jumping off board to avoid crash', 'beginner', ARRAY['Smart bail prevented injury', 'He had to bail on that attempt'], NOW(), NOW()),

    -- Insert Skydiving Terms
    (gen_random_uuid(), 'Tandem', 'tandem', 'Skydiving attached to experienced instructor', 'beginner', ARRAY['Her first jump was a tandem', 'Tandem jumps are safest for beginners'], NOW(), NOW()),
    (gen_random_uuid(), 'AFF', 'aff', 'Accelerated Free Fall training program for solo jumpers', 'intermediate', ARRAY['AFF teaches independent skydiving', 'She completed AFF in two weeks'], NOW(), NOW()),
    (gen_random_uuid(), 'Freefall', 'freefall', 'Period falling through air before parachute deployment', 'beginner', ARRAY['Freefall lasted 60 seconds', 'The freefall felt like flying'], NOW(), NOW()),
    (gen_random_uuid(), 'Terminal Velocity', 'terminal-velocity', 'Maximum falling speed when air resistance equals gravity', 'intermediate', ARRAY['Terminal velocity is about 120 mph', 'Bodies reach terminal velocity quickly'], NOW(), NOW()),
    (gen_random_uuid(), 'Deployment', 'deployment', 'Opening the parachute during descent', 'beginner', ARRAY['Deployment happened at 5000 feet', 'Smooth deployment is crucial'], NOW(), NOW()),
    (gen_random_uuid(), 'Canopy', 'canopy', 'Parachute fabric that provides lift and control', 'beginner', ARRAY['The canopy opened perfectly', 'Modern canopies are highly maneuverable'], NOW(), NOW()),
    (gen_random_uuid(), 'AAD', 'aad', 'Automatic Activation Device that deploys reserve parachute', 'intermediate', ARRAY['The AAD is crucial safety backup', 'AAD activates at predetermined altitude'], NOW(), NOW()),
    (gen_random_uuid(), 'Altimeter', 'altimeter', 'Device showing altitude during jump', 'beginner', ARRAY['Check your altimeter frequently', 'Digital altimeters are most accurate'], NOW(), NOW()),
    (gen_random_uuid(), 'DZ', 'dz', 'Drop Zone - airport or facility for skydiving', 'beginner', ARRAY['The DZ had great facilities', 'Different DZs have different vibes'], NOW(), NOW()),
    (gen_random_uuid(), 'Manifest', 'manifest', 'Sign-up process for getting on loads', 'beginner', ARRAY['Manifest early for popular loads', 'The manifest desk opens at 8 AM'], NOW(), NOW()),
    (gen_random_uuid(), 'Load', 'load', 'Group of skydivers on single aircraft', 'beginner', ARRAY['The load had 12 jumpers', 'Sunset loads are beautiful'], NOW(), NOW()),
    (gen_random_uuid(), 'Exit', 'exit', 'Leaving the aircraft to begin skydive', 'beginner', ARRAY['The exit was clean and stable', 'Practice your exit position'], NOW(), NOW()),
    (gen_random_uuid(), 'Belly Flying', 'belly-flying', 'Traditional freefall position facing earth', 'beginner', ARRAY['Belly flying is most stable', 'Learn belly flying before other positions'], NOW(), NOW()),
    (gen_random_uuid(), 'Free Flying', 'free-flying', 'Advanced body positions like head down or sit flying', 'advanced', ARRAY['Free flying requires extensive training', 'His free flying skills were impressive'], NOW(), NOW()),
    (gen_random_uuid(), 'Formation', 'formation', 'Multiple skydivers linking together in freefall', 'intermediate', ARRAY['The 4-way formation held perfectly', 'Formation skydiving requires teamwork'], NOW(), NOW()),
    (gen_random_uuid(), 'Breakoff', 'breakoff', 'Separating from formation before deployment altitude', 'intermediate', ARRAY['Breakoff at 4500 feet', 'Clean breakoff prevents collisions'], NOW(), NOW()),
    (gen_random_uuid(), 'Track', 'track', 'Body position for horizontal movement in freefall', 'intermediate', ARRAY['Track away from other jumpers', 'Good tracking covers distance'], NOW(), NOW()),
    (gen_random_uuid(), 'Hop and Pop', 'hop-and-pop', 'Jump with immediate parachute deployment', 'beginner', ARRAY['Hop and pop from 5500 feet', 'Hop and pops practice canopy skills'], NOW(), NOW()),
    (gen_random_uuid(), 'PLF', 'plf', 'Parachute Landing Fall technique for safe landing', 'beginner', ARRAY['Practice PLF during ground school', 'Good PLF prevents injury'], NOW(), NOW()),
    (gen_random_uuid(), 'Cutaway', 'cutaway', 'Jettisoning main parachute to deploy reserve', 'advanced', ARRAY['The cutaway was textbook perfect', 'Cutaways are rare but critical skills'], NOW(), NOW()),
    (gen_random_uuid(), 'Reserve', 'reserve', 'Backup parachute for emergency situations', 'beginner', ARRAY['The reserve deployed flawlessly', 'Never jump without a packed reserve'], NOW(), NOW()),
    (gen_random_uuid(), 'Swooping', 'swooping', 'High-speed canopy maneuvers near ground', 'advanced', ARRAY['Swooping requires expert canopy skills', 'The swooping course was thrilling'], NOW(), NOW()),
    (gen_random_uuid(), 'Wingsuit', 'wingsuit', 'Special jumpsuit with fabric wings for gliding', 'advanced', ARRAY['Wingsuit flying extends freefall time', 'Wingsuits require extensive experience'], NOW(), NOW()),
    (gen_random_uuid(), 'BASE', 'base', 'Jumping from Buildings, Antennas, Spans, and Earth', 'advanced', ARRAY['BASE jumping is extremely dangerous', 'Legal BASE jumping locations are rare'], NOW(), NOW()),
    (gen_random_uuid(), 'Logbook', 'logbook', 'Record of all skydives including details and signatures', 'beginner', ARRAY['Keep your logbook current', 'The logbook tracks progression'], NOW(), NOW()),

    -- Insert Spelunking Terms
    (gen_random_uuid(), 'Cave System', 'cave-system', 'Network of connected underground passages and chambers', 'beginner', ARRAY['The cave system extended for miles', 'Map the cave system carefully'], NOW(), NOW()),
    (gen_random_uuid(), 'Passage', 'passage', 'Tunnel or corridor connecting cave chambers', 'beginner', ARRAY['The passage narrowed significantly', 'Follow the main passage to the chamber'], NOW(), NOW()),
    (gen_random_uuid(), 'Chamber', 'chamber', 'Large open space within cave system', 'beginner', ARRAY['The chamber was cathedral-sized', 'Echo tests reveal chamber size'], NOW(), NOW()),
    (gen_random_uuid(), 'Squeeze', 'squeeze', 'Tight passage requiring body contortion to pass', 'intermediate', ARRAY['The squeeze required removing gear', 'Not everyone can make that squeeze'], NOW(), NOW()),
    (gen_random_uuid(), 'Crawlway', 'crawlway', 'Low passage requiring hands and knees navigation', 'intermediate', ARRAY['The crawlway went on forever', 'Knee pads help in crawlways'], NOW(), NOW()),
    (gen_random_uuid(), 'Breakdown', 'breakdown', 'Area of fallen rock creating obstacles', 'intermediate', ARRAY['Navigate carefully through breakdown', 'The breakdown was unstable'], NOW(), NOW()),
    (gen_random_uuid(), 'Flowstone', 'flowstone', 'Mineral deposits creating smooth cave formations', 'beginner', ARRAY['The flowstone looked like frozen waterfalls', 'Don''t damage the flowstone'], NOW(), NOW()),
    (gen_random_uuid(), 'Speleothem', 'speleothem', 'Cave formation created by mineral deposits', 'advanced', ARRAY['Speleothems take thousands of years', 'Protect all speleothems from damage'], NOW(), NOW()),
    (gen_random_uuid(), 'Stalactite', 'stalactite', 'Mineral formation hanging from cave ceiling', 'beginner', ARRAY['Stalactites hang tight from ceiling', 'The stalactite was enormous'], NOW(), NOW()),
    (gen_random_uuid(), 'Stalagmite', 'stalagmite', 'Mineral formation growing up from cave floor', 'beginner', ARRAY['Stalagmites might reach the ceiling', 'The stalagmite was perfectly formed'], NOW(), NOW()),
    (gen_random_uuid(), 'Column', 'column', 'Formation where stalactite and stalagmite meet', 'intermediate', ARRAY['The column supported the ceiling', 'Columns create natural pillars'], NOW(), NOW()),
    (gen_random_uuid(), 'Rimstone', 'rimstone', 'Mineral dams creating pools in caves', 'intermediate', ARRAY['Rimstone pools held crystal clear water', 'Don''t disturb the rimstone formations'], NOW(), NOW()),
    (gen_random_uuid(), 'Headlamp', 'headlamp', 'Primary lighting source worn on head', 'beginner', ARRAY['Always carry backup for your headlamp', 'LED headlamps are most reliable'], NOW(), NOW()),
    (gen_random_uuid(), 'Backup Light', 'backup-light', 'Secondary lighting in case primary fails', 'beginner', ARRAY['Carry three sources of light minimum', 'The backup light saved the trip'], NOW(), NOW()),
    (gen_random_uuid(), 'Cave Pack', 'cave-pack', 'Specialized backpack designed for underground use', 'intermediate', ARRAY['Cave packs resist abrasion', 'The cave pack squeezed through tight spots'], NOW(), NOW()),
    (gen_random_uuid(), 'Knee Pads', 'knee-pads', 'Protective gear for crawling in caves', 'beginner', ARRAY['Quality knee pads prevent injury', 'The knee pads were essential'], NOW(), NOW()),
    (gen_random_uuid(), 'Vertical', 'vertical', 'Cave section requiring rope techniques', 'advanced', ARRAY['The vertical section was 200 feet', 'Vertical caving requires rope skills'], NOW(), NOW()),
    (gen_random_uuid(), 'Rappel', 'rappel', 'Controlled descent using rope', 'advanced', ARRAY['The rappel into darkness was eerie', 'Check your rappel device twice'], NOW(), NOW()),
    (gen_random_uuid(), 'Prusik', 'prusik', 'Rope climbing technique using friction knots', 'advanced', ARRAY['Prusik out of the pit efficiently', 'Practice prusik techniques regularly'], NOW(), NOW()),
    (gen_random_uuid(), 'Survey', 'survey', 'Mapping cave passages with measurements', 'intermediate', ARRAY['The survey revealed new passages', 'Accurate survey data is crucial'], NOW(), NOW()),
    (gen_random_uuid(), 'Compass', 'compass', 'Navigation instrument for determining direction', 'intermediate', ARRAY['Use compass to maintain bearing', 'The compass reading was critical'], NOW(), NOW()),
    (gen_random_uuid(), 'Inclinometer', 'inclinometer', 'Tool measuring passage slopes and angles', 'advanced', ARRAY['The inclinometer showed steep gradient', 'Survey requires accurate inclinometer use'], NOW(), NOW()),
    (gen_random_uuid(), 'Cave Conservation', 'cave-conservation', 'Practices protecting cave environments', 'beginner', ARRAY['Cave conservation preserves formations', 'Follow conservation guidelines strictly'], NOW(), NOW()),
    (gen_random_uuid(), 'White Nose Syndrome', 'white-nose-syndrome', 'Disease affecting cave-dwelling bats', 'intermediate', ARRAY['White nose syndrome devastates bat populations', 'Decontaminate gear to prevent spread'], NOW(), NOW()),
    (gen_random_uuid(), 'Trip Leader', 'trip-leader', 'Experienced caver responsible for group safety', 'intermediate', ARRAY['The trip leader briefed safety procedures', 'Follow your trip leader''s guidance'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;

    -- Link terms to categories (Skateboarding)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, skateboarding_id, true, NOW()
    FROM terms t
    WHERE t.slug IN ('ollie', 'kickflip', 'heelflip', 'pop-shuvit', 'tre-flip', 'manual', 'nose-manual', '50-50-grind', 'boardslide', 'lipslide', 'frontside', 'backside', 'vert', 'street', 'deck-skateboard', 'trucks', 'bearings', 'grip-tape', 'primo', 'slam', 'session-skateboard', 'spot', 'mongo', 'stance', 'bail')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = skateboarding_id);

    -- Link terms to categories (Skydiving)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, skydiving_id, true, NOW()
    FROM terms t
    WHERE t.slug IN ('tandem', 'aff', 'freefall', 'terminal-velocity', 'deployment', 'canopy', 'aad', 'altimeter', 'dz', 'manifest', 'load', 'exit', 'belly-flying', 'free-flying', 'formation', 'breakoff', 'track', 'hop-and-pop', 'plf', 'cutaway', 'reserve', 'swooping', 'wingsuit', 'base', 'logbook')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = skydiving_id);

    -- Link terms to categories (Spelunking)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, spelunking_id, true, NOW()
    FROM terms t
    WHERE t.slug IN ('cave-system', 'passage', 'chamber', 'squeeze', 'crawlway', 'breakdown', 'flowstone', 'speleothem', 'stalactite', 'stalagmite', 'column', 'rimstone', 'headlamp', 'backup-light', 'cave-pack', 'knee-pads', 'vertical', 'rappel', 'prusik', 'survey', 'compass', 'inclinometer', 'cave-conservation', 'white-nose-syndrome', 'trip-leader')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = spelunking_id);

END $$;
