-- Comprehensive terms for endurance and outdoor sports: Running, Triathlon, Hiking
DO $$
DECLARE
    running_id UUID;
    triathlon_id UUID;
    hiking_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO running_id FROM categories WHERE slug = 'running';
    SELECT id INTO triathlon_id FROM categories WHERE slug = 'triathlon';
    SELECT id INTO hiking_id FROM categories WHERE slug = 'hiking';
    
    -- Insert Running Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Pace (Running)', 'pace-running', 'Rate of speed, typically measured in minutes per mile or kilometer', 'beginner', ARRAY['Maintain your target pace throughout', 'His marathon pace was 7:00 per mile'], NOW(), NOW()),
    (gen_random_uuid(), 'PR (Running)', 'pr-running', 'Personal record, best time achieved in a specific distance', 'beginner', ARRAY['She set a new 5 K PR today', 'Breaking your PR takes dedication'], NOW(), NOW()),
    (gen_random_uuid(), 'Fartlek', 'fartlek', 'Swedish training method mixing fast and slow running randomly', 'intermediate', ARRAY['Fartlek runs improve speed and endurance', 'The fartlek session was challenging'], NOW(), NOW()),
    (gen_random_uuid(), 'Intervals (Running)', 'intervals-running', 'Repeated periods of fast running with recovery periods', 'intermediate', ARRAY['Track intervals build speed', '400 meter intervals with 90 seconds rest'], NOW(), NOW()),
    (gen_random_uuid(), 'Tempo Run', 'tempo-run', 'Sustained effort at comfortably hard pace', 'intermediate', ARRAY['The tempo run felt controlled', 'Tempo runs improve lactate threshold'], NOW(), NOW()),
    (gen_random_uuid(), 'Long Run', 'long-run', 'Extended distance run at conversational pace', 'beginner', ARRAY['Sunday long run builds endurance', 'The long run should feel comfortable'], NOW(), NOW()),
    (gen_random_uuid(), 'Easy Run', 'easy-run', 'Relaxed pace run for recovery and base building', 'beginner', ARRAY['Most miles should be easy runs', 'Easy runs aid recovery'], NOW(), NOW()),
    (gen_random_uuid(), 'Negative Split (Running)', 'negative-split-running', 'Running second half of race faster than first half', 'advanced', ARRAY['Her negative split won the race', 'Negative splits require patience'], NOW(), NOW()),
    (gen_random_uuid(), 'Bonk (Running)', 'bonk-running', 'Sudden energy depletion during endurance activities', 'intermediate', ARRAY['He bonked at mile 20', 'Proper fueling prevents the bonk'], NOW(), NOW()),
    (gen_random_uuid(), 'Runner''s High', 'runners-high', 'Euphoric feeling experienced during or after running', 'intermediate', ARRAY['The runner''s high kicked in around mile 3', 'Endorphins create the runner''s high'], NOW(), NOW()),
    (gen_random_uuid(), 'Cadence (Running)', 'cadence-running', 'Number of steps taken per minute while running', 'intermediate', ARRAY['Optimal cadence is around 180 steps per minute', 'Higher cadence reduces injury risk'], NOW(), NOW()),
    (gen_random_uuid(), 'Heel Strike', 'heel-strike', 'Landing pattern where heel contacts ground first', 'intermediate', ARRAY['Heel strike is common in recreational runners', 'Transition from heel strike takes time'], NOW(), NOW()),
    (gen_random_uuid(), 'Midfoot Strike', 'midfoot-strike', 'Landing pattern where middle of foot contacts ground first', 'advanced', ARRAY['Midfoot strike is often more efficient', 'Work toward a midfoot strike gradually'], NOW(), NOW()),
    (gen_random_uuid(), 'Forefoot Strike', 'forefoot-strike', 'Landing pattern where front of foot contacts ground first', 'advanced', ARRAY['Sprinters use forefoot strike', 'Forefoot strike requires strong calves'], NOW(), NOW()),
    (gen_random_uuid(), 'Taper (Running)', 'taper-running', 'Reduction in training volume before important race', 'intermediate', ARRAY['The taper period helps legs recover', 'Trust the taper before your marathon'], NOW(), NOW()),
    (gen_random_uuid(), 'Base Building (Running)', 'base-building-running', 'Phase of training focused on building aerobic fitness', 'intermediate', ARRAY['Base building forms foundation of training', 'Spend months in base building phase'], NOW(), NOW()),
    (gen_random_uuid(), 'Lactate Threshold (Running)', 'lactate-threshold-running', 'Exercise intensity where lactate accumulates in blood', 'advanced', ARRAY['Train at lactate threshold for racing', 'Lactate threshold determines sustainable pace'], NOW(), NOW()),
    (gen_random_uuid(), 'VO2 Max (Running)', 'vo2-max-running', 'Maximum rate of oxygen consumption during exercise', 'advanced', ARRAY['Elite runners have high VO2 max', 'VO2 max indicates aerobic fitness'], NOW(), NOW()),
    (gen_random_uuid(), 'Carb Loading', 'carb-loading', 'Dietary strategy to maximize glycogen stores before race', 'intermediate', ARRAY['Carb loading helps marathon performance', 'Start carb loading three days before'], NOW(), NOW()),
    (gen_random_uuid(), 'Ice Bath (Recovery)', 'ice-bath-recovery', 'Recovery method using cold water immersion', 'intermediate', ARRAY['Ice baths reduce inflammation', 'The ice bath was brutally cold'], NOW(), NOW()),
    
    -- Insert Triathlon Terms
    (gen_random_uuid(), 'Transition (Triathlon)', 'transition-triathlon', 'Area and process of changing between swim, bike, and run', 'beginner', ARRAY['Smooth transitions save valuable time', 'She practiced transitions repeatedly'], NOW(), NOW()),
    (gen_random_uuid(), 'T1', 't1', 'First transition from swim to bike', 'beginner', ARRAY['His T1 time was under two minutes', 'Practice your T1 setup beforehand'], NOW(), NOW()),
    (gen_random_uuid(), 'T2', 't2', 'Second transition from bike to run', 'beginner', ARRAY['T2 includes changing shoes', 'The T2 tent was well organized'], NOW(), NOW()),
    (gen_random_uuid(), 'Brick Workout', 'brick-workout', 'Training session combining two disciplines back-to-back', 'intermediate', ARRAY['Brick workouts prepare for race transitions', 'The bike-run brick felt heavy'], NOW(), NOW()),
    (gen_random_uuid(), 'Wetsuit (Triathlon)', 'wetsuit-triathlon', 'Neoprene suit providing buoyancy and warmth in water', 'beginner', ARRAY['The wetsuit made swimming easier', 'Wetsuit legal water temperature is 78 degrees F'], NOW(), NOW()),
    (gen_random_uuid(), 'Drafting (Triathlon)', 'drafting-triathlon', 'Following closely behind another athlete to reduce wind resistance', 'intermediate', ARRAY['Drafting is illegal in most triathlons', 'Swimming drafting can save energy'], NOW(), NOW()),
    (gen_random_uuid(), 'Aero Bars', 'aero-bars', 'Aerodynamic handlebars reducing wind resistance', 'intermediate', ARRAY['Aero bars cut through the wind', 'Practice riding in aero position'], NOW(), NOW()),
    (gen_random_uuid(), 'Sprint Distance', 'sprint-distance', 'Triathlon distance: 750 meter swim, 20 km bike, 5 km run', 'beginner', ARRAY['Sprint distance is perfect for beginners', 'The sprint tri took 90 minutes'], NOW(), NOW()),
    (gen_random_uuid(), 'Olympic Distance', 'olympic-distance', 'Triathlon distance: 1.5 km swim, 40 km bike, 10 km run', 'intermediate', ARRAY['Olympic distance is the standard format', 'She qualified for Olympic trials'], NOW(), NOW()),
    (gen_random_uuid(), 'Half Ironman', 'half-ironman', 'Triathlon distance: 1.2 mile swim, 56 mile bike, 13.1 mile run', 'advanced', ARRAY['Half Ironman is a major milestone', 'Training for half Ironman takes months'], NOW(), NOW()),
    (gen_random_uuid(), 'Ironman', 'ironman', 'Triathlon distance: 2.4 mile swim, 112 mile bike, 26.2 mile run', 'advanced', ARRAY['Ironman is the ultimate endurance test', 'Completing Ironman changes you'], NOW(), NOW()),
    (gen_random_uuid(), 'Aquabike', 'aquabike', 'Event combining swim and bike portions only', 'intermediate', ARRAY['Aquabike is perfect for injured runners', 'The aquabike division is growing'], NOW(), NOW()),
    (gen_random_uuid(), 'Age Group (Triathlon)', 'age-group-triathlon', 'Competition category based on athlete age', 'beginner', ARRAY['She won her age group at nationals', 'Age group rankings determine Kona slots'], NOW(), NOW()),
    (gen_random_uuid(), 'Kona', 'kona', 'Ironman World Championship held in Hawaii', 'advanced', ARRAY['Qualifying for Kona is every triathlete''s dream', 'Kona conditions are brutal'], NOW(), NOW()),
    (gen_random_uuid(), 'Nutrition Strategy', 'nutrition-strategy', 'Plan for fueling during long distance events', 'intermediate', ARRAY['Nutrition strategy can make or break your race', 'Practice your nutrition in training'], NOW(), NOW()),
    (gen_random_uuid(), 'Bike Check', 'bike-check', 'Pre-race inspection ensuring bicycle safety and compliance', 'beginner', ARRAY['Bike check ensures equipment meets standards', 'Arrive early for bike check'], NOW(), NOW()),
    (gen_random_uuid(), 'Wave Start', 'wave-start', 'Staggered start with groups based on age or ability', 'beginner', ARRAY['Wave starts reduce crowding', 'His wave started at 7:15 AM'], NOW(), NOW()),
    (gen_random_uuid(), 'DNF (Racing)', 'dnf-racing', 'Did not finish - withdrawal from race', 'intermediate', ARRAY['Mechanical issues led to DNF', 'DNF is disappointing but sometimes necessary'], NOW(), NOW()),
    (gen_random_uuid(), 'Split Times', 'split-times-triathlon', 'Individual times for each discipline in triathlon', 'beginner', ARRAY['His bike split was exceptionally fast', 'Analyze split times to improve'], NOW(), NOW()),
    
    -- Insert Hiking Terms
    (gen_random_uuid(), 'Trailhead', 'trailhead', 'Starting point of a hiking trail with parking and information', 'beginner', ARRAY['Meet at the trailhead at 8 AM', 'The trailhead has restroom facilities'], NOW(), NOW()),
    (gen_random_uuid(), 'Switchback', 'switchback', 'Zigzag path up steep terrain to reduce grade', 'beginner', ARRAY['The switchbacks made the climb manageable', 'Stay on switchbacks to prevent erosion'], NOW(), NOW()),
    (gen_random_uuid(), 'Elevation Gain', 'elevation-gain', 'Total vertical distance climbed during hike', 'beginner', ARRAY['The hike has 2000 feet of elevation gain', 'Elevation gain determines difficulty'], NOW(), NOW()),
    (gen_random_uuid(), 'Scramble', 'scramble', 'Section requiring hands for balance and progress', 'intermediate', ARRAY['The summit scramble was exposed', 'Class 3 scramble requires careful foot placement'], NOW(), NOW()),
    (gen_random_uuid(), 'Cairn', 'cairn', 'Stack of stones marking trail or important location', 'intermediate', ARRAY['Follow the cairns when trail disappears', 'Don''t build unnecessary cairns'], NOW(), NOW()),
    (gen_random_uuid(), 'Blaze', 'blaze', 'Paint mark on trees indicating trail route', 'intermediate', ARRAY['White blazes mark the Appalachian Trail', 'Follow the blue blazes to the viewpoint'], NOW(), NOW()),
    (gen_random_uuid(), 'False Summit', 'false-summit', 'Peak that appears to be summit but isn''t the highest point', 'intermediate', ARRAY['The false summit was disheartening', 'Two false summits before the real peak'], NOW(), NOW()),
    (gen_random_uuid(), 'Treeline', 'treeline', 'Elevation above which trees cannot grow', 'intermediate', ARRAY['Above treeline, weather changes quickly', 'The treeline offers spectacular views'], NOW(), NOW()),
    (gen_random_uuid(), 'Exposed', 'exposed', 'Trail section with little protection from weather or falls', 'advanced', ARRAY['The exposed ridge was windy', 'Exposed sections require extra caution'], NOW(), NOW()),
    (gen_random_uuid(), 'Bushwhacking', 'bushwhacking', 'Hiking through dense vegetation without established trail', 'advanced', ARRAY['Bushwhacking to the remote lake', 'Bushwhacking requires navigation skills'], NOW(), NOW()),
    (gen_random_uuid(), 'Day Pack', 'day-pack', 'Small backpack for carrying essentials on day hikes', 'beginner', ARRAY['Pack the ten essentials in your day pack', 'A 20-liter day pack is sufficient'], NOW(), NOW()),
    (gen_random_uuid(), 'Base Layer (Hiking)', 'base-layer-hiking', 'Clothing layer next to skin for moisture management', 'intermediate', ARRAY['Merino wool makes excellent base layers', 'Avoid cotton base layers in cold weather'], NOW(), NOW()),
    (gen_random_uuid(), 'Layering System', 'layering-system', 'Method of wearing multiple clothing layers for versatility', 'intermediate', ARRAY['The layering system adapts to conditions', 'Base layer, insulating layer, shell layer'], NOW(), NOW()),
    (gen_random_uuid(), 'Gaiters', 'gaiters', 'Protective covering for lower legs and boot tops', 'intermediate', ARRAY['Gaiters keep snow out of boots', 'Gaiters prevent tick bites'], NOW(), NOW()),
    (gen_random_uuid(), 'Trekking Poles', 'trekking-poles', 'Walking aids providing stability and reducing impact', 'intermediate', ARRAY['Trekking poles help on steep descents', 'Adjustable poles work for different terrain'], NOW(), NOW()),
    (gen_random_uuid(), 'Leave No Trace', 'leave-no-trace', 'Outdoor ethics minimizing environmental impact', 'beginner', ARRAY['Practice Leave No Trace principles', 'Pack out all trash - Leave No Trace'], NOW(), NOW()),
    (gen_random_uuid(), 'Water Source', 'water-source', 'Natural location to obtain drinking water', 'beginner', ARRAY['The water source is two miles ahead', 'Always purify water from natural sources'], NOW(), NOW()),
    (gen_random_uuid(), 'Purification', 'purification', 'Process of making water safe to drink', 'intermediate', ARRAY['Water purification tablets work quickly', 'UV purification kills harmful organisms'], NOW(), NOW()),
    (gen_random_uuid(), 'Ten Essentials', 'ten-essentials', 'Basic items every hiker should carry for safety', 'beginner', ARRAY['Never hike without the ten essentials', 'The ten essentials can save your life'], NOW(), NOW()),
    (gen_random_uuid(), 'Backcountry', 'backcountry', 'Remote wilderness areas away from developed facilities', 'intermediate', ARRAY['Backcountry permits required for overnight', 'The backcountry offers solitude'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Running)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, running_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('pace-running', 'pr-running', 'fartlek', 'intervals-running', 'tempo-run', 'long-run', 'easy-run', 'negative-split-running', 'bonk-running', 'runners-high', 'cadence-running', 'heel-strike', 'midfoot-strike', 'forefoot-strike', 'taper-running', 'base-building-running', 'lactate-threshold-running', 'vo2-max-running', 'carb-loading', 'ice-bath-recovery')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = running_id);
    
    -- Link terms to categories (Triathlon)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, triathlon_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('transition-triathlon', 't1', 't2', 'brick-workout', 'wetsuit-triathlon', 'drafting-triathlon', 'aero-bars', 'sprint-distance', 'olympic-distance', 'half-ironman', 'ironman', 'aquabike', 'age-group-triathlon', 'kona', 'nutrition-strategy', 'bike-check', 'wave-start', 'dnf-racing', 'split-times-triathlon')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = triathlon_id);
    
    -- Link terms to categories (Hiking)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, hiking_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('trailhead', 'switchback', 'elevation-gain', 'scramble', 'cairn', 'blaze', 'false-summit', 'treeline', 'exposed', 'bushwhacking', 'day-pack', 'base-layer-hiking', 'layering-system', 'gaiters', 'trekking-poles', 'leave-no-trace', 'water-source', 'purification', 'ten-essentials', 'backcountry')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = hiking_id);
    
END $$;