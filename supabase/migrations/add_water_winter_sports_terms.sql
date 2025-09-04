-- Comprehensive terms for water and winter sports: Water Polo, Surfing, Rowing, Skiing, Snowboarding, Ice Skating, Hockey
DO $$
DECLARE
    waterpolo_id UUID;
    surfing_id UUID;
    rowing_id UUID;
    skiing_id UUID;
    snowboarding_id UUID;
    iceskating_id UUID;
    hockey_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO waterpolo_id FROM categories WHERE slug = 'water-polo';
    SELECT id INTO surfing_id FROM categories WHERE slug = 'surfing';
    SELECT id INTO rowing_id FROM categories WHERE slug = 'rowing';
    SELECT id INTO skiing_id FROM categories WHERE slug = 'skiing';
    SELECT id INTO snowboarding_id FROM categories WHERE slug = 'snowboarding';
    SELECT id INTO iceskating_id FROM categories WHERE slug = 'ice-skating';
    SELECT id INTO hockey_id FROM categories WHERE slug = 'hockey';
    
    -- Insert Water Polo Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Eggbeater', 'eggbeater', 'Treading water technique using alternating leg rotations', 'intermediate', ARRAY['Strong eggbeater keeps you high in water', 'Master the eggbeater for better positioning'], NOW(), NOW()),
    (gen_random_uuid(), 'Hole Set', 'hole-set', 'Offensive player positioned in front of goal', 'intermediate', ARRAY['The hole set scored from close range', 'Feed the ball to the hole set'], NOW(), NOW()),
    (gen_random_uuid(), 'Counterattack', 'counterattack', 'Fast offensive transition after gaining possession', 'advanced', ARRAY['Quick counterattack caught them off guard', 'The counterattack led to an easy goal'], NOW(), NOW()),
    (gen_random_uuid(), 'Ejection', 'ejection', 'Temporary removal from game for rule violation', 'beginner', ARRAY['He was ejected for exclusion foul', 'The ejection gave them a man advantage'], NOW(), NOW()),
    (gen_random_uuid(), 'Steal', 'steal-waterpolo', 'Taking ball away from opposing player', 'intermediate', ARRAY['Great steal at midfield', 'The steal started the counterattack'], NOW(), NOW()),
    (gen_random_uuid(), 'Lob Shot', 'lob-shot', 'High arcing shot over goalkeeper', 'advanced', ARRAY['Perfect lob shot over the keeper', 'The lob found the top corner'], NOW(), NOW()),
    (gen_random_uuid(), 'Defensive Press (Water Polo)', 'press-water-polo', 'Defensive strategy applying constant pressure', 'advanced', ARRAY['The press forced turnovers', 'Maintain the press for six meters'], NOW(), NOW()),
    (gen_random_uuid(), 'Pit', 'pit', 'Area directly in front of goal where hole set plays', 'intermediate', ARRAY['Battle for position in the pit', 'The pit player drew the ejection'], NOW(), NOW()),
    (gen_random_uuid(), 'Backhand', 'backhand-waterpolo', 'Shot taken with back of hand facing target', 'advanced', ARRAY['Deceptive backhand shot', 'The backhand caught the keeper off guard'], NOW(), NOW()),
    (gen_random_uuid(), 'Penalty Shot', 'penalty-shot-waterpolo', 'One-on-one shot against goalkeeper from 5-meter line', 'intermediate', ARRAY['He converted the penalty shot', 'Penalty shot for the major foul'], NOW(), NOW()),
    
    -- Insert Surfing Terms
    (gen_random_uuid(), 'Barrel', 'barrel', 'Hollow section of breaking wave that surfer can ride inside', 'advanced', ARRAY['He got barreled on that wave', 'Perfect barrel ride'], NOW(), NOW()),
    (gen_random_uuid(), 'Drop In', 'drop-in', 'Taking off on wave closest to breaking section', 'intermediate', ARRAY['She dropped in perfectly', 'Don''t drop in on someone else''s wave'], NOW(), NOW()),
    (gen_random_uuid(), 'Cutback', 'cutback', 'Sharp turn back toward breaking section of wave', 'advanced', ARRAY['Smooth cutback on the open face', 'The cutback generated speed'], NOW(), NOW()),
    (gen_random_uuid(), 'Duck Dive', 'duck-dive', 'Technique to dive under incoming waves', 'intermediate', ARRAY['Duck dive under the whitewater', 'Perfect duck dive timing'], NOW(), NOW()),
    (gen_random_uuid(), 'Lineup', 'lineup', 'Area beyond breakers where surfers wait for waves', 'beginner', ARRAY['Paddle out to the lineup', 'The lineup was crowded today'], NOW(), NOW()),
    (gen_random_uuid(), 'Sets (Surfing)', 'sets', 'Groups of larger waves that arrive together', 'beginner', ARRAY['Big sets coming in', 'Wait for the next set'], NOW(), NOW()),
    (gen_random_uuid(), 'Wipeout', 'wipeout', 'Falling off board, usually due to wave power', 'beginner', ARRAY['Epic wipeout on that wave', 'The wipeout was gnarly'], NOW(), NOW()),
    (gen_random_uuid(), 'Bottom Turn', 'bottom-turn', 'Turn at bottom of wave face to set up ride', 'intermediate', ARRAY['Powerful bottom turn generated speed', 'The bottom turn is crucial'], NOW(), NOW()),
    (gen_random_uuid(), 'Aerial', 'aerial', 'Maneuver where surfer and board leave water surface', 'advanced', ARRAY['Incredible aerial above the lip', 'He stuck the aerial landing'], NOW(), NOW()),
    (gen_random_uuid(), 'Pearl', 'pearl', 'Nose diving underwater when catching wave', 'beginner', ARRAY['Avoid pearling by staying back', 'He pearled on the takeoff'], NOW(), NOW()),
    
    -- Insert Rowing Terms
    (gen_random_uuid(), 'Catch (Rowing)', 'catch-rowing', 'Beginning of rowing stroke when oar enters water', 'intermediate', ARRAY['Clean catch at the front end', 'The catch timing was perfect'], NOW(), NOW()),
    (gen_random_uuid(), 'Drive (Rowing)', 'drive', 'Power phase of rowing stroke using legs and back', 'intermediate', ARRAY['Strong drive through the water', 'Connect the drive with your legs'], NOW(), NOW()),
    (gen_random_uuid(), 'Recovery (Rowing)', 'recovery-rowing', 'Return phase between strokes when oar is out of water', 'beginner', ARRAY['Controlled recovery to the catch', 'Relax during the recovery phase'], NOW(), NOW()),
    (gen_random_uuid(), 'Crab', 'crab', 'When oar gets stuck in water disrupting stroke rhythm', 'beginner', ARRAY['She caught a crab on that stroke', 'Avoid catching crabs in rough water'], NOW(), NOW()),
    (gen_random_uuid(), 'Cox', 'cox', 'Coxswain who steers boat and calls race strategy', 'beginner', ARRAY['The cox called a perfect race', 'Listen to your cox during the sprint'], NOW(), NOW()),
    (gen_random_uuid(), 'Stroke Rate (Rowing)', 'stroke-rate-rowing', 'Number of strokes per minute', 'intermediate', ARRAY['Increase the stroke rate for the sprint', 'Holding 32 strokes per minute'], NOW(), NOW()),
    (gen_random_uuid(), 'Blade (Rowing)', 'blade', 'Flat end of oar that enters water', 'beginner', ARRAY['Keep the blade squared through drive', 'The blade caught the water cleanly'], NOW(), NOW()),
    (gen_random_uuid(), 'Feather (Rowing)', 'feather', 'Rotating oar blade parallel to water during recovery', 'intermediate', ARRAY['Feather the blade after release', 'Smooth feathering reduces wind resistance'], NOW(), NOW()),
    (gen_random_uuid(), 'Power 10', 'power-10', 'Series of 10 hard strokes to gain advantage', 'intermediate', ARRAY['Power 10 to move on the field', 'That power 10 got us the lead'], NOW(), NOW()),
    (gen_random_uuid(), 'Shell (Rowing)', 'shell', 'Racing boat used in rowing', 'beginner', ARRAY['The shell glided smoothly', 'Eight-person shell with coxswain'], NOW(), NOW()),
    
    -- Insert Skiing Terms
    (gen_random_uuid(), 'Carve', 'carve', 'Turn technique using ski edges without skidding', 'advanced', ARRAY['Perfect carved turn down the slope', 'Carve your turns for more control'], NOW(), NOW()),
    (gen_random_uuid(), 'Moguls', 'moguls', 'Bumps formed on ski slopes by repeated turns', 'intermediate', ARRAY['The mogul field was challenging', 'Absorb the moguls with your legs'], NOW(), NOW()),
    (gen_random_uuid(), 'Powder (Skiing)', 'powder', 'Fresh, deep, untracked snow', 'beginner', ARRAY['Amazing powder conditions today', 'The powder was knee deep'], NOW(), NOW()),
    (gen_random_uuid(), 'Schuss', 'schuss', 'Straight downhill run at high speed', 'intermediate', ARRAY['He schussed the steep section', 'The schuss required courage'], NOW(), NOW()),
    (gen_random_uuid(), 'Parallel Turn', 'parallel-turn', 'Turn with skis remaining parallel throughout', 'intermediate', ARRAY['Smooth parallel turns down groomer', 'Master parallel turns first'], NOW(), NOW()),
    (gen_random_uuid(), 'Fall Line', 'fall-line', 'Steepest and most direct path down slope', 'beginner', ARRAY['Follow the fall line for speed', 'Turn across the fall line'], NOW(), NOW()),
    (gen_random_uuid(), 'Edge (Skiing)', 'edge', 'Metal strip on ski bottom used for control', 'beginner', ARRAY['Use your edges to grip icy snow', 'The edges need sharpening'], NOW(), NOW()),
    (gen_random_uuid(), 'Traverse (Skiing)', 'traverse', 'Skiing across slope rather than straight down', 'beginner', ARRAY['Traverse to control your speed', 'Long traverse across the face'], NOW(), NOW()),
    (gen_random_uuid(), 'Après-ski', 'apres-ski', 'Social activities after skiing', 'beginner', ARRAY['Great après-ski scene at the lodge', 'Let''s enjoy some après-ski drinks'], NOW(), NOW()),
    (gen_random_uuid(), 'Yard Sale', 'yard-sale', 'Spectacular crash leaving equipment scattered', 'beginner', ARRAY['Epic yard sale on that run', 'The yard sale left gear everywhere'], NOW(), NOW()),
    
    -- Insert Snowboarding Terms
    (gen_random_uuid(), 'Goofy', 'goofy', 'Stance with right foot forward on board', 'beginner', ARRAY['He rides goofy stance', 'Goofy or regular stance?'], NOW(), NOW()),
    (gen_random_uuid(), 'Regular (Snowboarding)', 'regular', 'Stance with left foot forward on board', 'beginner', ARRAY['Most riders are regular stance', 'She rides regular foot'], NOW(), NOW()),
    (gen_random_uuid(), 'Halfpipe', 'halfpipe', 'U-shaped ramp for aerial maneuvers', 'intermediate', ARRAY['He hit the halfpipe hard', 'Halfpipe competition was amazing'], NOW(), NOW()),
    (gen_random_uuid(), 'Ollie (Snowboarding)', 'ollie-snowboarding', 'Jump technique lifting board off ground', 'intermediate', ARRAY['Perfect ollie over the log', 'The ollie cleared the obstacle'], NOW(), NOW()),
    (gen_random_uuid(), 'Frontside (Snowboarding)', 'frontside-snowboarding', 'Turn or trick where chest faces slope', 'intermediate', ARRAY['Frontside 360 in the pipe', 'Frontside turn feels natural'], NOW(), NOW()),
    (gen_random_uuid(), 'Backside (Snowboarding)', 'backside-snowboarding', 'Turn or trick where back faces slope', 'intermediate', ARRAY['Backside turn is harder', 'Backside 540 was clean'], NOW(), NOW()),
    (gen_random_uuid(), 'Jib', 'jib', 'Sliding on rails, boxes, or other features', 'advanced', ARRAY['Jibbing the rail perfectly', 'The jib session was fun'], NOW(), NOW()),
    (gen_random_uuid(), 'Kicker', 'kicker', 'Jump ramp in terrain park', 'intermediate', ARRAY['Hit the kicker with speed', 'The kicker launched him high'], NOW(), NOW()),
    (gen_random_uuid(), 'Heel Edge', 'heel-edge', 'Turning using edge under heels', 'beginner', ARRAY['Control speed with heel edge', 'The heel edge carved nicely'], NOW(), NOW()),
    (gen_random_uuid(), 'Toe Edge', 'toe-edge', 'Turning using edge under toes', 'beginner', ARRAY['Link toe edge to heel edge', 'Toe edge turn down the fall line'], NOW(), NOW()),
    
    -- Insert Ice Skating Terms
    (gen_random_uuid(), 'Axel', 'axel', 'Jump taking off from forward edge and landing backward', 'advanced', ARRAY['She landed a triple axel', 'The axel is the hardest jump'], NOW(), NOW()),
    (gen_random_uuid(), 'Lutz', 'lutz', 'Jump taking off from back outside edge', 'advanced', ARRAY['Perfect lutz technique', 'The lutz requires good edge control'], NOW(), NOW()),
    (gen_random_uuid(), 'Spin (Ice Skating)', 'spin-skating', 'Rotation in place on ice', 'intermediate', ARRAY['Beautiful camel spin', 'The spin was perfectly centered'], NOW(), NOW()),
    (gen_random_uuid(), 'Spiral (Ice Skating)', 'spiral', 'Gliding on one foot with free leg extended', 'intermediate', ARRAY['Graceful spiral sequence', 'The spiral showed great flexibility'], NOW(), NOW()),
    (gen_random_uuid(), 'Crossover (Ice Skating)', 'crossover-skating', 'Technique for turning and gaining speed', 'beginner', ARRAY['Smooth crossovers around the corner', 'Practice your crossover technique'], NOW(), NOW()),
    (gen_random_uuid(), 'Edge (Ice Skating)', 'edge-skating', 'Inside or outside curve of skate blade', 'intermediate', ARRAY['Strong edge control in turns', 'The edge carved into the ice'], NOW(), NOW()),
    (gen_random_uuid(), 'Toe Pick', 'toe-pick', 'Serrated front section of figure skate blade', 'beginner', ARRAY['Use toe pick for jumps', 'Don''t catch your toe pick'], NOW(), NOW()),
    (gen_random_uuid(), 'Camel Spin', 'camel-spin', 'Spin position with free leg extended horizontally behind', 'advanced', ARRAY['Beautiful camel spin position', 'The camel spin lasted 8 rotations'], NOW(), NOW()),
    (gen_random_uuid(), 'Footwork (Ice Skating)', 'footwork', 'Sequence of steps and turns across ice', 'advanced', ARRAY['Intricate footwork sequence', 'The footwork showed great skill'], NOW(), NOW()),
    (gen_random_uuid(), 'Glide (Ice Skating)', 'glide', 'Smooth movement across ice without pushing', 'beginner', ARRAY['Long glide on one foot', 'The glide was effortless'], NOW(), NOW()),
    
    -- Insert Hockey Terms
    (gen_random_uuid(), 'Hat Trick', 'hat-trick', 'Three goals scored by same player in one game', 'beginner', ARRAY['He scored a hat trick tonight', 'The hat trick sealed the victory'], NOW(), NOW()),
    (gen_random_uuid(), 'Power Play', 'power-play', 'Advantage when opposing team has player in penalty box', 'intermediate', ARRAY['Score on the power play', 'The power play unit took the ice'], NOW(), NOW()),
    (gen_random_uuid(), 'Penalty Kill', 'penalty-kill', 'Playing short-handed due to penalty', 'intermediate', ARRAY['Great penalty kill by defense', 'The penalty kill was perfect'], NOW(), NOW()),
    (gen_random_uuid(), 'One Timer', 'one-timer', 'Shot taken immediately upon receiving pass', 'advanced', ARRAY['Perfect one timer from the circle', 'The one timer beat the goalie'], NOW(), NOW()),
    (gen_random_uuid(), 'Deke', 'deke', 'Fake move to deceive opponent', 'intermediate', ARRAY['Great deke around the defender', 'The deke opened up the shot'], NOW(), NOW()),
    (gen_random_uuid(), 'Five Hole', 'five-hole', 'Space between goaltender''s legs', 'intermediate', ARRAY['Shot through the five hole', 'The five hole was wide open'], NOW(), NOW()),
    (gen_random_uuid(), 'Forechecking', 'forechecking', 'Pressuring opponents in their defensive zone', 'advanced', ARRAY['Aggressive forechecking created turnovers', 'The forecheck forced the mistake'], NOW(), NOW()),
    (gen_random_uuid(), 'Backcheck', 'backcheck', 'Defensive pressure while retreating to own zone', 'advanced', ARRAY['Good backcheck broke up the rush', 'The backcheck saved a goal'], NOW(), NOW()),
    (gen_random_uuid(), 'Icing', 'icing', 'Illegal clearing of puck from behind center line', 'beginner', ARRAY['Called for icing the puck', 'The icing stopped play'], NOW(), NOW()),
    (gen_random_uuid(), 'Rebound (Hockey)', 'rebound-hockey', 'Puck that bounces off goaltender', 'beginner', ARRAY['He scored on the rebound', 'The rebound sat in the crease'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link all terms to their respective categories
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, waterpolo_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('eggbeater', 'hole-set', 'counterattack', 'ejection', 'steal-waterpolo', 'lob-shot', 'press-water-polo', 'pit', 'backhand-waterpolo', 'penalty-shot-waterpolo')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = waterpolo_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, surfing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('barrel', 'drop-in', 'cutback', 'duck-dive', 'lineup', 'sets', 'wipeout', 'bottom-turn', 'aerial', 'pearl')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = surfing_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, rowing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('catch-rowing', 'drive', 'recovery-rowing', 'crab', 'cox', 'stroke-rate-rowing', 'blade', 'feather', 'power-10', 'shell')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = rowing_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, skiing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('carve', 'moguls', 'powder', 'schuss', 'parallel-turn', 'fall-line', 'edge', 'traverse', 'apres-ski', 'yard-sale')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = skiing_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, snowboarding_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('goofy', 'regular', 'halfpipe', 'ollie-snowboarding', 'frontside-snowboarding', 'backside-snowboarding', 'jib', 'kicker', 'heel-edge', 'toe-edge')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = snowboarding_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, iceskating_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('axel', 'lutz', 'spin-skating', 'spiral', 'crossover-skating', 'edge-skating', 'toe-pick', 'camel-spin', 'footwork', 'glide')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = iceskating_id);
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, hockey_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('hat-trick', 'power-play', 'penalty-kill', 'one-timer', 'deke', 'five-hole', 'forechecking', 'backcheck', 'icing', 'rebound-hockey')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = hockey_id);
    
END $$;