-- Add swimming terms to the database
-- First, get the swimming category ID
DO $$
DECLARE
    swimming_category_id UUID;
BEGIN
    -- Get the swimming category ID
    SELECT id INTO swimming_category_id FROM categories WHERE slug = 'swimming';
    
    -- Insert the new swimming terms (skip if they already exist)
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    
    -- Strokes & Techniques
    (gen_random_uuid(), 'Stroke', 'stroke', 'Swimming technique (freestyle, backstroke, breaststroke, butterfly)', 'beginner', ARRAY['She has excellent stroke technique', 'Practice all four strokes for the IM'], NOW(), NOW()),
    (gen_random_uuid(), 'Freestyle', 'freestyle', 'Most common competitive swimming stroke', 'beginner', ARRAY['She won the 100m freestyle', 'Freestyle is the fastest stroke'], NOW(), NOW()),
    (gen_random_uuid(), 'Front Crawl', 'front-crawl', 'Technical name for freestyle stroke', 'beginner', ARRAY['Front crawl uses alternating arm movements', 'The front crawl is efficient for distance'], NOW(), NOW()),
    (gen_random_uuid(), 'Backstroke', 'backstroke', 'Swimming on your back with alternating arm movements', 'intermediate', ARRAY['Backstroke requires good body position', 'She specializes in backstroke events'], NOW(), NOW()),
    (gen_random_uuid(), 'Breaststroke', 'breaststroke', 'Frog-like stroke with simultaneous arm and leg movements', 'intermediate', ARRAY['Breaststroke is the slowest competitive stroke', 'His breaststroke kick is powerful'], NOW(), NOW()),
    (gen_random_uuid(), 'Butterfly', 'butterfly', 'Dolphin kick with simultaneous over-water arm recovery', 'advanced', ARRAY['The butterfly requires strong core muscles', 'Butterfly is the most technical stroke'], NOW(), NOW()),
    (gen_random_uuid(), 'Individual Medley', 'individual-medley', 'Race combining all four strokes in order', 'advanced', ARRAY['The 400 IM is a grueling race', 'She broke the IM record'], NOW(), NOW()),
    
    -- Turns & Body Position
    (gen_random_uuid(), 'Flip Turn', 'flip-turn', 'Somersault turn at pool wall during freestyle/backstroke', 'intermediate', ARRAY['Perfect your flip turn to save seconds', 'His flip turn is lightning fast'], NOW(), NOW()),
    (gen_random_uuid(), 'Open Turn', 'open-turn', 'Touch-and-go turn used in breaststroke and butterfly', 'intermediate', ARRAY['Open turns require a two-hand touch', 'She nailed the open turn'], NOW(), NOW()),
    (gen_random_uuid(), 'Streamline', 'streamline', 'Body position for maximum hydrodynamics (arms overhead, tight)', 'intermediate', ARRAY['Hold your streamline off every wall', 'Good streamline reduces drag'], NOW(), NOW()),
    
    -- Stroke Components
    (gen_random_uuid(), 'Catch', 'catch', 'Initial part of stroke when hand enters and grabs water', 'intermediate', ARRAY['Focus on a clean catch', 'Her catch phase is technically perfect'], NOW(), NOW()),
    (gen_random_uuid(), 'Pull', 'pull', 'Main propulsive phase of arm stroke', 'beginner', ARRAY['The pull generates most of the power', 'Work on strengthening your pull'], NOW(), NOW()),
    (gen_random_uuid(), 'Recovery', 'recovery', 'Non-propulsive phase when arm returns to starting position', 'intermediate', ARRAY['Keep your recovery relaxed', 'High elbow recovery is efficient'], NOW(), NOW()),
    (gen_random_uuid(), 'Bilateral Breathing', 'bilateral-breathing', 'Breathing on both sides during freestyle', 'intermediate', ARRAY['Bilateral breathing improves balance', 'Practice breathing every 3 strokes'], NOW(), NOW()),
    
    -- Open Water & Strategy
    (gen_random_uuid(), 'Sighting', 'sighting', 'Lifting head to navigate in open water', 'advanced', ARRAY['Sight every 6-8 strokes in open water', 'Good sighting prevents swimming off course'], NOW(), NOW()),
    (gen_random_uuid(), 'Drafting', 'drafting', 'Swimming behind another swimmer to reduce resistance', 'advanced', ARRAY['Drafting can save 20% energy in open water', 'She drafted perfectly behind the leader'], NOW(), NOW()),
    (gen_random_uuid(), 'Negative Split', 'negative-split', 'Swimming second half of race faster than first half', 'advanced', ARRAY['He ran a perfect negative split', 'Negative splitting requires pacing discipline'], NOW(), NOW()),
    
    -- Training Terms
    (gen_random_uuid(), 'Build', 'build', 'Gradually increasing speed during a swim', 'intermediate', ARRAY['Swim a 400 build by 100s', 'The build set teaches pace control'], NOW(), NOW()),
    (gen_random_uuid(), 'Descending', 'descending', 'Each repeat swim faster than the previous', 'intermediate', ARRAY['Descend 1-4 on the 100s', 'The descending set was challenging'], NOW(), NOW()),
    
    -- Equipment
    (gen_random_uuid(), 'Pull Buoy', 'pull-buoy', 'Foam device held between legs during arm-only sets', 'beginner', ARRAY['Use a pull buoy for stroke technique', 'The pull buoy isolates your arms'], NOW(), NOW()),
    (gen_random_uuid(), 'Kickboard', 'kickboard', 'Flotation device for kick-only training', 'beginner', ARRAY['Grab a kickboard for kick sets', 'Kickboard work strengthens your legs'], NOW(), NOW()),
    (gen_random_uuid(), 'Paddles', 'paddles', 'Hand devices to increase resistance and stroke feel', 'intermediate', ARRAY['Use paddles to build stroke strength', 'Paddles help develop catch technique'], NOW(), NOW()),
    (gen_random_uuid(), 'Fins', 'fins', 'Foot gear to increase propulsion during training', 'beginner', ARRAY['Fins help with body position', 'Short fins are best for technique work'], NOW(), NOW()),
    (gen_random_uuid(), 'Snorkel', 'snorkel', 'Breathing tube allowing continuous stroke work', 'intermediate', ARRAY['The snorkel lets you focus on stroke technique', 'Use a center snorkel for balance'], NOW(), NOW()),
    
    -- Competition Prep
    (gen_random_uuid(), 'Tapering', 'tapering', 'Reducing training volume before competition', 'advanced', ARRAY['The team is tapering for championships', 'Good tapering peaks performance'], NOW(), NOW()),
    (gen_random_uuid(), 'Shave Down', 'shave-down', 'Removing body hair before major competition', 'advanced', ARRAY['She shaved down for the big meet', 'Shaving can drop significant time'], NOW(), NOW()),
    (gen_random_uuid(), 'Tech Suit', 'tech-suit', 'High-performance racing swimsuit', 'advanced', ARRAY['He wore his tech suit for finals', 'Tech suits compress muscles'], NOW(), NOW()),
    
    -- Training Intensities
    (gen_random_uuid(), 'Hypoxic Training', 'hypoxic-training', 'Swimming with restricted breathing patterns', 'advanced', ARRAY['Hypoxic sets build lung capacity', 'Try breathing every 5 strokes'], NOW(), NOW()),
    (gen_random_uuid(), 'Easy', 'easy', 'Low-intensity swimming', 'beginner', ARRAY['Warm up with 400 easy', 'Easy pace should feel comfortable'], NOW(), NOW()),
    (gen_random_uuid(), 'Recovery', 'recovery-swimming', 'Low-intensity swimming for active rest', 'beginner', ARRAY['Do 200 recovery between sets', 'Recovery swimming aids lactic acid clearance'], NOW(), NOW()),
    (gen_random_uuid(), 'Aerobic Base', 'aerobic-base', 'Moderate intensity endurance training', 'intermediate', ARRAY['Build aerobic base in early season', 'Aerobic training improves endurance'], NOW(), NOW()),
    (gen_random_uuid(), 'Lactate Threshold', 'lactate-threshold', 'Intensity where lactic acid accumulates', 'advanced', ARRAY['Train at lactate threshold pace', 'Threshold sets are comfortably hard'], NOW(), NOW()),
    (gen_random_uuid(), 'Sprint', 'sprint', 'Maximum effort short distance', 'intermediate', ARRAY['Sprint the last 25 all out', 'Sprint sets develop speed'], NOW(), NOW()),
    
    -- Metrics & Analysis
    (gen_random_uuid(), 'Distance Per Stroke', 'distance-per-stroke', 'Efficiency measure', 'advanced', ARRAY['Count your DPS for 50s', 'Good DPS indicates efficiency'], NOW(), NOW()),
    (gen_random_uuid(), 'Stroke Rate', 'stroke-rate', 'Number of strokes per minute', 'advanced', ARRAY['His stroke rate is 85 per minute', 'Higher stroke rate for sprints'], NOW(), NOW()),
    
    -- Training Organization
    (gen_random_uuid(), 'Send-off', 'send-off', 'Departure time for interval training', 'intermediate', ARRAY['The send-off is 1:30 for the 100s', 'Leave on the send-off time'], NOW(), NOW()),
    (gen_random_uuid(), 'Circle Swimming', 'circle-swimming', 'Multiple swimmers sharing a lane', 'beginner', ARRAY['Circle swim counterclockwise', 'Stay to the right when circle swimming'], NOW(), NOW()),
    (gen_random_uuid(), 'Warm-up', 'warm-up', 'Preparatory swimming before main workout', 'beginner', ARRAY['Start with a 400 warm-up', 'Good warm-up prevents injury'], NOW(), NOW()),
    (gen_random_uuid(), 'Cool-down', 'cool-down', 'Easy swimming after intense training', 'beginner', ARRAY['Finish with 200 easy cool-down', 'Cool-down helps recovery'], NOW(), NOW()),
    
    -- Competition Terms
    (gen_random_uuid(), 'Split', 'split', 'Time for portion of a race or swim', 'intermediate', ARRAY['His 50 split was 24.5', 'Check your splits for pacing'], NOW(), NOW()),
    (gen_random_uuid(), 'Personal Best', 'personal-best', 'Individual''s fastest time', 'beginner', ARRAY['She dropped 2 seconds for a new PB', 'He''s chasing a personal best'], NOW(), NOW()),
    (gen_random_uuid(), 'Cut', 'cut', 'Qualifying time for higher level competition', 'advanced', ARRAY['He made the state cut', 'She needs the qualifying cut'], NOW(), NOW()),
    (gen_random_uuid(), 'False Start', 'false-start', 'Leaving starting block before signal', 'intermediate', ARRAY['He was called for a false start', 'One false start disqualifies you'], NOW(), NOW()),
    (gen_random_uuid(), 'DQ', 'dq', 'Disqualification for rule violation', 'intermediate', ARRAY['She got a DQ for illegal kick', 'Avoid the DQ with legal technique'], NOW(), NOW()),
    (gen_random_uuid(), 'Heat', 'heat', 'Group of swimmers racing together', 'beginner', ARRAY['She''s in the fastest heat', 'He swims in heat 3 of 5'], NOW(), NOW()),
    (gen_random_uuid(), 'Seed Time', 'seed-time', 'Previous best time used for event entry', 'intermediate', ARRAY['Enter your seed time accurately', 'Seed times determine heat placement'], NOW(), NOW()),
    
    -- Pool & Facility
    (gen_random_uuid(), 'Deck', 'deck', 'Pool area where swimmers and coaches stand', 'beginner', ARRAY['No running on the pool deck', 'Coaches watch from the deck'], NOW(), NOW()),
    (gen_random_uuid(), 'Bulkhead', 'bulkhead', 'Movable wall to adjust pool length', 'intermediate', ARRAY['Move the bulkhead for short course', 'The bulkhead creates two 25-yard pools'], NOW(), NOW()),
    (gen_random_uuid(), 'Gutter', 'gutter', 'Pool edge overflow system', 'beginner', ARRAY['Waves spill into the gutter', 'The gutter keeps water level stable'], NOW(), NOW()),
    (gen_random_uuid(), 'Lane Rope', 'lane-rope', 'Floating barriers separating swim lanes', 'beginner', ARRAY['Lane ropes reduce turbulence', 'Stay in your lane rope boundaries'], NOW(), NOW()),
    (gen_random_uuid(), 'Starting Blocks', 'starting-blocks', 'Platforms for race starts', 'beginner', ARRAY['Step up onto the starting blocks', 'Adjust the starting block for your height'], NOW(), NOW()),
    (gen_random_uuid(), 'Pace Clock', 'pace-clock', 'Large timer for interval training', 'beginner', ARRAY['Watch the pace clock for intervals', 'Leave when the red hand hits 60'], NOW(), NOW()),
    (gen_random_uuid(), 'Yardage', 'yardage', 'Total distance swum in practice', 'beginner', ARRAY['We swam 4000 yards today', 'Track your weekly yardage'], NOW(), NOW())
    
    -- Skip duplicates if slug already exists
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link all terms to the swimming category (only if not already linked)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT 
        gen_random_uuid(),
        t.id,
        swimming_category_id,
        true,
        NOW()
    FROM terms t 
    WHERE t.slug IN (
        'stroke', 'freestyle', 'front-crawl', 'backstroke', 'breaststroke', 'butterfly', 'individual-medley',
        'flip-turn', 'open-turn', 'streamline', 'catch', 'pull', 'recovery', 'bilateral-breathing',
        'sighting', 'drafting', 'negative-split', 'build', 'descending', 'pull-buoy', 'kickboard',
        'paddles', 'fins', 'snorkel', 'tapering', 'shave-down', 'tech-suit', 'hypoxic-training',
        'easy', 'recovery-swimming', 'aerobic-base', 'lactate-threshold', 'sprint', 'distance-per-stroke',
        'stroke-rate', 'send-off', 'circle-swimming', 'warm-up', 'cool-down', 'split', 'personal-best',
        'cut', 'false-start', 'dq', 'heat', 'seed-time', 'deck', 'bulkhead', 'gutter', 'lane-rope',
        'starting-blocks', 'pace-clock', 'yardage'
    )
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = swimming_category_id
    );
    
END $$;