-- Comprehensive terms for strength and climbing sports: Powerlifting, Bodybuilding, Rock Climbing, Bouldering
DO $$
DECLARE
    powerlifting_id UUID;
    bodybuilding_id UUID;
    rockclimbing_id UUID;
    bouldering_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO powerlifting_id FROM categories WHERE slug = 'powerlifting';
    SELECT id INTO bodybuilding_id FROM categories WHERE slug = 'bodybuilding';
    SELECT id INTO rockclimbing_id FROM categories WHERE slug = 'rock-climbing';
    SELECT id INTO bouldering_id FROM categories WHERE slug = 'bouldering';
    
    -- Insert Powerlifting Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Squat', 'squat', 'Lower body exercise where athlete descends into seated position then stands', 'beginner', ARRAY['His squat max is 500 pounds', 'Squat to proper depth for competition'], NOW(), NOW()),
    (gen_random_uuid(), 'Bench Press', 'bench-press', 'Upper body exercise pressing weight from chest', 'beginner', ARRAY['She benched 225 for a new PR', 'Bench press requires good setup'], NOW(), NOW()),
    (gen_random_uuid(), 'Deadlift', 'deadlift', 'Exercise lifting weight from floor to standing position', 'beginner', ARRAY['The deadlift is king of all exercises', 'His deadlift broke the gym record'], NOW(), NOW()),
    (gen_random_uuid(), 'One Rep Max', 'one-rep-max', 'Maximum weight that can be lifted for single repetition', 'intermediate', ARRAY['Testing one rep max requires proper warmup', 'Her squat one rep max increased 50 pounds'], NOW(), NOW()),
    (gen_random_uuid(), 'Meet', 'meet', 'Powerlifting competition with three attempts per lift', 'intermediate', ARRAY['His first powerlifting meet was successful', 'The meet had over 200 competitors'], NOW(), NOW()),
    (gen_random_uuid(), 'Opener', 'opener', 'Conservative first attempt in competition', 'intermediate', ARRAY['Make sure your opener is automatic', 'He missed his opener due to nerves'], NOW(), NOW()),
    (gen_random_uuid(), 'PR', 'pr-powerlifting', 'Personal record, best lift achieved', 'beginner', ARRAY['She hit a 20-pound deadlift PR', 'PR attempts require maximum effort'], NOW(), NOW()),
    (gen_random_uuid(), 'Raw', 'raw', 'Lifting without supportive equipment like suits or wraps', 'intermediate', ARRAY['Raw powerlifting is gaining popularity', 'His raw total was impressive'], NOW(), NOW()),
    (gen_random_uuid(), 'Equipped', 'equipped', 'Lifting with supportive gear like suits and wraps', 'advanced', ARRAY['Equipped lifting adds significant weight', 'Learning equipped technique takes time'], NOW(), NOW()),
    (gen_random_uuid(), 'Singlet', 'singlet', 'Tight-fitting uniform worn in powerlifting competition', 'beginner', ARRAY['The singlet must meet federation standards', 'His lucky singlet brought good lifts'], NOW(), NOW()),
    (gen_random_uuid(), 'Belt', 'belt', 'Supportive equipment worn around waist for core stability', 'intermediate', ARRAY['The belt helps with intra-abdominal pressure', 'Use the belt only for heavy sets'], NOW(), NOW()),
    (gen_random_uuid(), 'Knee Wraps', 'knee-wraps', 'Elastic wraps providing knee support in squat', 'advanced', ARRAY['Knee wraps can add 50+ pounds to squat', 'Wrapping technique affects performance'], NOW(), NOW()),
    (gen_random_uuid(), 'Peaking', 'peaking', 'Training phase preparing for maximum performance', 'advanced', ARRAY['The peaking program led to huge PRs', 'Peaking requires careful intensity management'], NOW(), NOW()),
    (gen_random_uuid(), 'Deload', 'deload', 'Reduced training volume to promote recovery', 'intermediate', ARRAY['Deload week refreshed his energy', 'Regular deloads prevent overtraining'], NOW(), NOW()),
    (gen_random_uuid(), 'Commands', 'commands', 'Official instructions given during competition lifts', 'intermediate', ARRAY['Wait for the commands before lifting', 'Missing commands results in red lights'], NOW(), NOW()),
    (gen_random_uuid(), 'Red Light', 'red-light', 'Failed attempt in powerlifting competition', 'intermediate', ARRAY['The red light came from depth', 'Two red lights failed the lift'], NOW(), NOW()),
    (gen_random_uuid(), 'White Light', 'white-light', 'Successful attempt in powerlifting competition', 'intermediate', ARRAY['Three white lights - good lift!', 'The white lights confirmed the record'], NOW(), NOW()),
    (gen_random_uuid(), 'Total', 'total', 'Sum of best squat, bench press, and deadlift', 'beginner', ARRAY['Her total qualified for nationals', 'Elite total is over 1500 pounds'], NOW(), NOW()),
    (gen_random_uuid(), 'Wilks Score', 'wilks-score', 'Formula comparing strength across different body weights', 'intermediate', ARRAY['The Wilks score levels the playing field', 'Her Wilks score was competition-winning'], NOW(), NOW()),
    (gen_random_uuid(), 'Cutting', 'cutting', 'Process of losing weight to compete in lower class', 'intermediate', ARRAY['Cutting for the 181 weight class', 'The cutting process affected his strength'], NOW(), NOW()),
    
    -- Insert Bodybuilding Terms
    (gen_random_uuid(), 'Bulk', 'bulk', 'Phase of gaining weight and muscle mass', 'beginner', ARRAY['The bulk added 20 pounds of muscle', 'Bulking requires eating in caloric surplus'], NOW(), NOW()),
    (gen_random_uuid(), 'Cut (Bodybuilding)', 'cut-bodybuilding', 'Phase of losing fat while preserving muscle', 'beginner', ARRAY['The cut revealed his muscle definition', 'Cutting for 12 weeks before the show'], NOW(), NOW()),
    (gen_random_uuid(), 'Shredded', 'shredded', 'Extremely low body fat with high muscle definition', 'intermediate', ARRAY['He looked absolutely shredded on stage', 'Getting shredded takes discipline'], NOW(), NOW()),
    (gen_random_uuid(), 'Pump (Bodybuilding)', 'pump', 'Temporary muscle swelling from increased blood flow', 'beginner', ARRAY['The pump made his arms look huge', 'Chase the pump with high reps'], NOW(), NOW()),
    (gen_random_uuid(), 'DOMS', 'doms', 'Delayed onset muscle soreness after intense training', 'beginner', ARRAY['DOMS hit hard after leg day', 'DOMS indicates muscle adaptation'], NOW(), NOW()),
    (gen_random_uuid(), 'Hypertrophy', 'hypertrophy', 'Increase in muscle fiber size', 'intermediate', ARRAY['Hypertrophy training builds muscle mass', 'The hypertrophy phase lasted 16 weeks'], NOW(), NOW()),
    (gen_random_uuid(), 'Volume', 'volume', 'Total amount of work performed in training', 'intermediate', ARRAY['High volume promotes muscle growth', 'Volume needs periodic adjustment'], NOW(), NOW()),
    (gen_random_uuid(), 'Macros', 'macros', 'Macronutrients: protein, carbohydrates, and fats', 'intermediate', ARRAY['Track your macros for best results', 'Macros determine body composition changes'], NOW(), NOW()),
    (gen_random_uuid(), 'Lean Mass', 'lean-mass', 'Body weight minus fat mass', 'intermediate', ARRAY['He gained 10 pounds of lean mass', 'Preserve lean mass during cuts'], NOW(), NOW()),
    (gen_random_uuid(), 'Symmetry', 'symmetry', 'Balanced development between body parts', 'advanced', ARRAY['His physique had perfect symmetry', 'Symmetry separates good from great physiques'], NOW(), NOW()),
    (gen_random_uuid(), 'Conditioning', 'conditioning', 'Low body fat with high muscle definition and vascularity', 'advanced', ARRAY['His conditioning was stage-ready', 'Conditioning improves in final weeks'], NOW(), NOW()),
    (gen_random_uuid(), 'Posing', 'posing', 'Art of displaying physique in competition', 'intermediate', ARRAY['Posing practice is essential', 'Her posing routine was flawless'], NOW(), NOW()),
    (gen_random_uuid(), 'Peak Week', 'peak-week', 'Final week of preparation before competition', 'advanced', ARRAY['Peak week manipulation paid off', 'Peak week requires precise planning'], NOW(), NOW()),
    (gen_random_uuid(), 'Water Depletion', 'water-depletion', 'Reducing water intake before competition for tighter appearance', 'advanced', ARRAY['Water depletion is risky but effective', 'Improper water depletion can ruin conditioning'], NOW(), NOW()),
    (gen_random_uuid(), 'Carb Load', 'carb-load', 'Increasing carbohydrate intake to fill muscles before show', 'advanced', ARRAY['The carb load made his muscles pop', 'Timing the carb load is critical'], NOW(), NOW()),
    (gen_random_uuid(), 'Stage Weight', 'stage-weight', 'Competition weight at lowest body fat', 'intermediate', ARRAY['His stage weight was 180 pounds', 'Stage weight is 15-20 pounds below off-season'], NOW(), NOW()),
    (gen_random_uuid(), 'Off-Season', 'off-season', 'Period between competitions focused on building muscle', 'intermediate', ARRAY['Off-season is for gaining quality mass', 'He weighed 220 in the off-season'], NOW(), NOW()),
    (gen_random_uuid(), 'Mandatory Poses', 'mandatory-poses', 'Required poses judged in bodybuilding competition', 'intermediate', ARRAY['Practice the mandatory poses daily', 'The mandatory poses showcase different angles'], NOW(), NOW()),
    (gen_random_uuid(), 'Vacuum Pose', 'vacuum-pose', 'Pose sucking in abdomen to show small waist', 'advanced', ARRAY['His vacuum pose was incredible', 'The vacuum pose requires diaphragm control'], NOW(), NOW()),
    (gen_random_uuid(), 'Striations', 'striations', 'Visible muscle fiber separations indicating low body fat', 'advanced', ARRAY['Glute striations showed his conditioning', 'Striations appear at very low body fat'], NOW(), NOW()),
    
    -- Insert Rock Climbing Terms
    (gen_random_uuid(), 'Route', 'route', 'Climbing path up rock face or artificial wall', 'beginner', ARRAY['The route had challenging overhangs', 'She sent the 5.10 route cleanly'], NOW(), NOW()),
    (gen_random_uuid(), 'Grade', 'grade', 'Rating system indicating climbing difficulty', 'beginner', ARRAY['The grade was harder than expected', 'Grades help choose appropriate routes'], NOW(), NOW()),
    (gen_random_uuid(), 'Belay', 'belay', 'Safety technique controlling rope for climbing partner', 'beginner', ARRAY['Give me a tight belay on this section', 'Good belaying keeps climbers safe'], NOW(), NOW()),
    (gen_random_uuid(), 'Lead Climbing', 'lead-climbing', 'Climbing while placing protection and trailing rope', 'intermediate', ARRAY['Lead climbing requires mental strength', 'She led the entire pitch confidently'], NOW(), NOW()),
    (gen_random_uuid(), 'Top Rope', 'top-rope', 'Climbing with rope anchored above the route', 'beginner', ARRAY['Top rope climbing is safer for beginners', 'Set up the top rope anchor carefully'], NOW(), NOW()),
    (gen_random_uuid(), 'Pitch', 'pitch', 'Section of climb between belay stations', 'intermediate', ARRAY['The second pitch was the crux', 'Multi-pitch routes have several pitches'], NOW(), NOW()),
    (gen_random_uuid(), 'Crux', 'crux', 'Most difficult section of a climbing route', 'intermediate', ARRAY['The crux move required precise footwork', 'He struggled with the crux sequence'], NOW(), NOW()),
    (gen_random_uuid(), 'Send', 'send', 'Successfully complete a route without falling', 'intermediate', ARRAY['She finally sent her project route', 'The send felt incredible after months'], NOW(), NOW()),
    (gen_random_uuid(), 'Project', 'project', 'Challenging route worked on over multiple attempts', 'advanced', ARRAY['His project route is 5.13a', 'Projects push your climbing limits'], NOW(), NOW()),
    (gen_random_uuid(), 'Crimp', 'crimp', 'Grip using fingertips on small edge holds', 'intermediate', ARRAY['The crimp hold was painful but secure', 'Crimping strength develops over time'], NOW(), NOW()),
    (gen_random_uuid(), 'Pinch', 'pinch', 'Grip squeezing hold between thumb and fingers', 'intermediate', ARRAY['The pinch grip required thumb strength', 'Work on pinch grip training'], NOW(), NOW()),
    (gen_random_uuid(), 'Mantle', 'mantle', 'Climbing move pressing up onto ledge like getting out of pool', 'intermediate', ARRAY['The mantle move topped out the route', 'Mantling requires pushing strength'], NOW(), NOW()),
    (gen_random_uuid(), 'Dyno', 'dyno', 'Dynamic movement launching to distant hold', 'advanced', ARRAY['The dyno required perfect timing', 'She stuck the dyno on first try'], NOW(), NOW()),
    (gen_random_uuid(), 'Heel Hook', 'heel-hook', 'Using heel to pull body up or maintain position', 'advanced', ARRAY['The heel hook saved energy', 'Perfect heel hook placement'], NOW(), NOW()),
    (gen_random_uuid(), 'Toe Hook', 'toe-hook', 'Using top of foot to pull or maintain position', 'advanced', ARRAY['The toe hook kept him stable', 'Toe hooks work on overhanging routes'], NOW(), NOW()),
    (gen_random_uuid(), 'Flagging', 'flagging', 'Extending leg for balance without weight-bearing', 'intermediate', ARRAY['Flagging helped her reach the next hold', 'The flag prevented barn-dooring'], NOW(), NOW()),
    (gen_random_uuid(), 'Barn Door', 'barn-door', 'Uncontrolled swinging away from rock face', 'intermediate', ARRAY['He barn-doored off the overhang', 'Prevent barn-dooring with good flagging'], NOW(), NOW()),
    (gen_random_uuid(), 'Pump (Climbing)', 'pump-climbing', 'Muscle fatigue in forearms from sustained gripping', 'intermediate', ARRAY['The pump forced him to rest', 'Manage pump with good pacing'], NOW(), NOW()),
    (gen_random_uuid(), 'Flash', 'flash', 'Completing route successfully on first attempt', 'advanced', ARRAY['She flashed the difficult route', 'Flashing requires reading routes well'], NOW(), NOW()),
    (gen_random_uuid(), 'Redpoint', 'redpoint', 'Completing route cleanly after previous practice', 'advanced', ARRAY['His redpoint attempt was successful', 'Redpointing shows route mastery'], NOW(), NOW()),
    
    -- Insert Bouldering Terms
    (gen_random_uuid(), 'Problem', 'problem', 'Bouldering route or sequence of moves', 'beginner', ARRAY['The problem had a tricky start', 'She solved the problem in three tries'], NOW(), NOW()),
    (gen_random_uuid(), 'V-Scale', 'v-scale', 'Grading system for bouldering difficulty (V0-V17)', 'beginner', ARRAY['The problem was graded V7', 'V-scale helps gauge difficulty'], NOW(), NOW()),
    (gen_random_uuid(), 'Crash Pad', 'crash-pad', 'Foam mat providing protection from falls', 'beginner', ARRAY['Place crash pads under the problem', 'Multiple crash pads increase safety'], NOW(), NOW()),
    (gen_random_uuid(), 'Spotter', 'spotter', 'Person helping guide falling climber to crash pad', 'beginner', ARRAY['The spotter kept her safe', 'Good spotting prevents injury'], NOW(), NOW()),
    (gen_random_uuid(), 'Highball', 'highball', 'Tall boulder problem where fall consequences are serious', 'advanced', ARRAY['The highball problem was intimidating', 'Highballs require mental composure'], NOW(), NOW()),
    (gen_random_uuid(), 'Top Out', 'top-out', 'Completing boulder by climbing over the top', 'beginner', ARRAY['The top out was easier than expected', 'Make sure to top out completely'], NOW(), NOW()),
    (gen_random_uuid(), 'Sit Start', 'sit-start', 'Beginning boulder problem from sitting position', 'intermediate', ARRAY['The sit start added difficulty', 'Sit starts require core strength'], NOW(), NOW()),
    (gen_random_uuid(), 'Stand Start', 'stand-start', 'Beginning boulder problem from standing position', 'beginner', ARRAY['The stand start was more accessible', 'Stand starts are easier than sit starts'], NOW(), NOW()),
    (gen_random_uuid(), 'Beta', 'beta', 'Information about how to complete climbing moves', 'intermediate', ARRAY['He shared beta for the crux move', 'Working out beta is part of the challenge'], NOW(), NOW()),
    (gen_random_uuid(), 'Eliminate', 'eliminate', 'Modified version of problem restricting certain holds', 'advanced', ARRAY['The eliminate version was much harder', 'Eliminates create variations'], NOW(), NOW()),
    (gen_random_uuid(), 'Traverse (Climbing)', 'traverse-climbing', 'Horizontal movement across rock face', 'intermediate', ARRAY['The traverse required endurance', 'Long traverses pump your forearms'], NOW(), NOW()),
    (gen_random_uuid(), 'Arete', 'arete', 'Outside corner or edge of rock formation', 'intermediate', ARRAY['The arete problem had great exposure', 'Aretes offer unique movement'], NOW(), NOW()),
    (gen_random_uuid(), 'Overhang', 'overhang', 'Rock face angled past vertical', 'intermediate', ARRAY['The overhang required powerful moves', 'Overhangs demand upper body strength'], NOW(), NOW()),
    (gen_random_uuid(), 'Slab', 'slab', 'Rock face angled less than vertical', 'intermediate', ARRAY['Slab climbing requires precise footwork', 'The slab was smooth and technical'], NOW(), NOW()),
    (gen_random_uuid(), 'Dabbing', 'dabbing', 'Touching ground or object other than designated holds', 'intermediate', ARRAY['He dabbed on his foot placement', 'Dabbing makes the attempt invalid'], NOW(), NOW()),
    (gen_random_uuid(), 'Gaston', 'gaston', 'Grip pushing sideways away from body', 'advanced', ARRAY['The gaston move felt unnatural', 'Gastons require different muscle activation'], NOW(), NOW()),
    (gen_random_uuid(), 'Under Cling', 'under-cling', 'Grip pulling upward on bottom of hold', 'intermediate', ARRAY['The under cling was surprisingly secure', 'Under clings work on overhangs'], NOW(), NOW()),
    (gen_random_uuid(), 'Match', 'match', 'Placing both hands on same hold', 'beginner', ARRAY['Match hands on the jug hold', 'Matching often precedes the next move'], NOW(), NOW()),
    (gen_random_uuid(), 'Compression', 'compression', 'Squeezing holds toward each other', 'advanced', ARRAY['The compression section was powerful', 'Compression problems require core strength'], NOW(), NOW()),
    (gen_random_uuid(), 'Campus', 'campus', 'Climbing using only arms without feet', 'advanced', ARRAY['He campused the entire overhang', 'Campusing builds finger strength'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Powerlifting)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, powerlifting_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('squat', 'bench-press', 'deadlift', 'one-rep-max', 'meet', 'opener', 'pr-powerlifting', 'raw', 'equipped', 'singlet', 'belt', 'knee-wraps', 'peaking', 'deload', 'commands', 'red-light', 'white-light', 'total', 'wilks-score', 'cutting')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = powerlifting_id);
    
    -- Link terms to categories (Bodybuilding)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, bodybuilding_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('bulk', 'cut-bodybuilding', 'shredded', 'pump', 'doms', 'hypertrophy', 'volume', 'macros', 'lean-mass', 'symmetry', 'conditioning', 'posing', 'peak-week', 'water-depletion', 'carb-load', 'stage-weight', 'off-season', 'mandatory-poses', 'vacuum-pose', 'striations')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = bodybuilding_id);
    
    -- Link terms to categories (Rock Climbing)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, rockclimbing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('route', 'grade', 'belay', 'lead-climbing', 'top-rope', 'pitch', 'crux', 'send', 'project', 'crimp', 'pinch', 'mantle', 'dyno', 'heel-hook', 'toe-hook', 'flagging', 'barn-door', 'pump-climbing', 'flash', 'redpoint')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = rockclimbing_id);
    
    -- Link terms to categories (Bouldering)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, bouldering_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('problem', 'v-scale', 'crash-pad', 'spotter', 'highball', 'top-out', 'sit-start', 'stand-start', 'beta', 'eliminate', 'traverse-climbing', 'arete', 'overhang', 'slab', 'dabbing', 'gaston', 'under-cling', 'match', 'compression', 'campus')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = bouldering_id);
    
END $$;