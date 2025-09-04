-- Comprehensive terms for combat sports: Wrestling, MMA, Jiu-Jitsu, Fencing
DO $$
DECLARE
    wrestling_id UUID;
    mma_id UUID;
    jiujitsu_id UUID;
    fencing_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO wrestling_id FROM categories WHERE slug = 'wrestling';
    SELECT id INTO mma_id FROM categories WHERE slug = 'mixed-martial-arts';
    SELECT id INTO jiujitsu_id FROM categories WHERE slug = 'jiu-jitsu';
    SELECT id INTO fencing_id FROM categories WHERE slug = 'fencing';
    
    -- Insert Wrestling Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Takedown', 'takedown', 'Technique used to bring an opponent from standing to the ground', 'beginner', ARRAY['He scored with a double leg takedown', 'The takedown earned him two points'], NOW(), NOW()),
    (gen_random_uuid(), 'Pin', 'pin', 'Holding both of an opponent''s shoulders to the mat simultaneously', 'beginner', ARRAY['She won by pin in the second period', 'A pin ends the match immediately'], NOW(), NOW()),
    (gen_random_uuid(), 'Sprawl', 'sprawl', 'Defensive technique to avoid takedowns by extending legs back', 'intermediate', ARRAY['His sprawl defense was excellent', 'Sprawl and then counter-attack'], NOW(), NOW()),
    (gen_random_uuid(), 'Single Leg', 'single-leg', 'Takedown targeting one of opponent''s legs', 'intermediate', ARRAY['He finished the single leg beautifully', 'Set up the single leg with a head fake'], NOW(), NOW()),
    (gen_random_uuid(), 'Double Leg', 'double-leg', 'Takedown attacking both of opponent''s legs simultaneously', 'intermediate', ARRAY['The double leg took him straight to his back', 'Drive through with the double leg'], NOW(), NOW()),
    (gen_random_uuid(), 'Suplex', 'suplex', 'Throwing technique where opponent is lifted and thrown backward', 'advanced', ARRAY['The suplex scored five points', 'That was a textbook suplex'], NOW(), NOW()),
    (gen_random_uuid(), 'Reversal', 'reversal', 'Moving from bottom to top position and gaining control', 'intermediate', ARRAY['She scored a reversal from bottom', 'The reversal tied up the match'], NOW(), NOW()),
    (gen_random_uuid(), 'Escape', 'escape', 'Getting away from opponent''s control without gaining control yourself', 'beginner', ARRAY['He earned an escape point', 'Work for the escape from bottom'], NOW(), NOW()),
    (gen_random_uuid(), 'Cradle', 'cradle', 'Pinning technique that secures head and leg together', 'advanced', ARRAY['The cradle led to an immediate pin', 'He''s known for his cradle series'], NOW(), NOW()),
    (gen_random_uuid(), 'Half Nelson', 'half-nelson', 'Control technique with arm under opponent''s arm and behind neck', 'intermediate', ARRAY['Use the half nelson to turn him', 'The half nelson opened up the pin'], NOW(), NOW()),
    
    -- Insert MMA Terms
    (gen_random_uuid(), 'Ground and Pound', 'ground-and-pound', 'Technique of taking opponents down and striking them on the ground', 'intermediate', ARRAY['His ground and pound game is devastating', 'She transitioned to ground and pound'], NOW(), NOW()),
    (gen_random_uuid(), 'Submission', 'submission', 'Technique that forces opponent to give up due to pain or unconsciousness', 'intermediate', ARRAY['He won by submission in round two', 'The submission came out of nowhere'], NOW(), NOW()),
    (gen_random_uuid(), 'Sprawl and Brawl', 'sprawl-and-brawl', 'Fighting style focused on defending takedowns and striking', 'advanced', ARRAY['His sprawl and brawl style frustrated wrestlers', 'She prefers to sprawl and brawl'], NOW(), NOW()),
    (gen_random_uuid(), 'Clinch', 'clinch', 'Close-range grappling position standing up', 'intermediate', ARRAY['He dominated in the clinch', 'Work knees from the clinch position'], NOW(), NOW()),
    (gen_random_uuid(), 'Guard', 'guard', 'Defensive position on back with legs controlling opponent', 'intermediate', ARRAY['She has a dangerous guard game', 'Attack from the guard position'], NOW(), NOW()),
    (gen_random_uuid(), 'Mount', 'mount', 'Top position sitting on opponent''s torso', 'beginner', ARRAY['He achieved full mount', 'The mount is a dominant position'], NOW(), NOW()),
    (gen_random_uuid(), 'Side Control', 'side-control', 'Top position perpendicular to opponent lying on side', 'intermediate', ARRAY['Maintain heavy side control pressure', 'He escaped from side control'], NOW(), NOW()),
    (gen_random_uuid(), 'Rear Naked Choke', 'rear-naked-choke', 'Chokehold applied from behind opponent''s back', 'advanced', ARRAY['The rear naked choke ended the fight', 'He locked in the rear naked choke'], NOW(), NOW()),
    (gen_random_uuid(), 'Kimura', 'kimura', 'Shoulder lock submission technique', 'advanced', ARRAY['She tapped to the kimura', 'Set up the kimura from side control'], NOW(), NOW()),
    (gen_random_uuid(), 'Triangle Choke', 'triangle-choke', 'Chokehold using legs to form triangle around opponent''s neck', 'advanced', ARRAY['The triangle choke was picture perfect', 'Attack the triangle from guard'], NOW(), NOW()),
    
    -- Insert Jiu-Jitsu Terms  
    (gen_random_uuid(), 'Gi', 'gi', 'Traditional uniform worn in Brazilian Jiu-Jitsu', 'beginner', ARRAY['He trains in the gi three times a week', 'Gi and no-gi have different strategies'], NOW(), NOW()),
    (gen_random_uuid(), 'No-Gi', 'no-gi', 'Jiu-jitsu practiced without the traditional uniform', 'beginner', ARRAY['No-gi requires different gripping strategies', 'She prefers no-gi competition'], NOW(), NOW()),
    (gen_random_uuid(), 'Berimbolo', 'berimbolo', 'Complex sweeping technique involving spinning under opponent', 'advanced', ARRAY['The berimbolo led to back control', 'His berimbolo game is world-class'], NOW(), NOW()),
    (gen_random_uuid(), 'De La Riva', 'de-la-riva', 'Guard position with one leg hooked behind opponent''s leg', 'advanced', ARRAY['Attack from de la riva guard', 'The de la riva sweep was smooth'], NOW(), NOW()),
    (gen_random_uuid(), 'Omoplata', 'omoplata', 'Shoulder lock using legs to control opponent''s arm', 'advanced', ARRAY['She finished with an omoplata', 'The omoplata setup was brilliant'], NOW(), NOW()),
    (gen_random_uuid(), 'Armbar', 'armbar', 'Joint lock targeting opponent''s elbow', 'intermediate', ARRAY['He tapped to the armbar', 'The armbar from mount was textbook'], NOW(), NOW()),
    (gen_random_uuid(), 'Sweep', 'sweep', 'Technique to reverse positions from bottom to top', 'intermediate', ARRAY['The sweep scored two points', 'Time the sweep with his movement'], NOW(), NOW()),
    (gen_random_uuid(), 'Pass', 'pass', 'Getting past opponent''s legs to achieve dominant position', 'intermediate', ARRAY['He passed her guard cleanly', 'The guard pass opened up submissions'], NOW(), NOW()),
    (gen_random_uuid(), 'Shrimp', 'shrimp', 'Hip escape movement to create space and improve position', 'beginner', ARRAY['Shrimp to create space', 'The shrimp allowed him to escape'], NOW(), NOW()),
    (gen_random_uuid(), 'Bridge', 'bridge', 'Hip thrust movement to create space or escape', 'beginner', ARRAY['Bridge and roll to escape mount', 'Use the bridge to create pressure'], NOW(), NOW()),
    
    -- Insert Fencing Terms
    (gen_random_uuid(), 'En Garde', 'en-garde', 'Starting position and command to begin fencing', 'beginner', ARRAY['Assume the en garde position', 'En garde, ready, fence!'], NOW(), NOW()),
    (gen_random_uuid(), 'Thrust', 'thrust', 'Forward attacking movement with point of weapon', 'beginner', ARRAY['The thrust scored a clean hit', 'Extend into the thrust'], NOW(), NOW()),
    (gen_random_uuid(), 'Parry', 'parry', 'Defensive action deflecting opponent''s attack', 'intermediate', ARRAY['Perfect parry and riposte', 'The parry four blocked his attack'], NOW(), NOW()),
    (gen_random_uuid(), 'Riposte', 'riposte', 'Counter-attack immediately following successful parry', 'intermediate', ARRAY['The riposte found its mark', 'Parry and immediate riposte'], NOW(), NOW()),
    (gen_random_uuid(), 'Lunge', 'lunge', 'Attacking movement extending forward leg and arm', 'intermediate', ARRAY['The lunge reached perfectly', 'Recover quickly after the lunge'], NOW(), NOW()),
    (gen_random_uuid(), 'Fleche', 'fleche', 'Running attack where fencer passes opponent', 'advanced', ARRAY['The fleche caught him off guard', 'Time the fleche carefully'], NOW(), NOW()),
    (gen_random_uuid(), 'Blade Work', 'blade-work', 'Manipulation of weapons in contact with opponent''s blade', 'advanced', ARRAY['Her blade work was exceptional', 'Focus on clean blade work'], NOW(), NOW()),
    (gen_random_uuid(), 'Right of Way', 'right-of-way', 'Priority rules determining who scores when both hit', 'advanced', ARRAY['She had right of way on that action', 'Establish right of way first'], NOW(), NOW()),
    (gen_random_uuid(), 'Piste', 'piste', 'Rectangular strip where fencing takes place', 'beginner', ARRAY['Stay in bounds on the piste', 'The piste is 14 meters long'], NOW(), NOW()),
    (gen_random_uuid(), 'Touch', 'touch', 'Successful hit that scores a point', 'beginner', ARRAY['Clean touch to the torso', 'The touch was clearly valid'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, wrestling_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('takedown', 'pin', 'sprawl', 'single-leg', 'double-leg', 'suplex', 'reversal', 'escape', 'cradle', 'half-nelson')
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = wrestling_id
    );
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, mma_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('ground-and-pound', 'submission', 'sprawl-and-brawl', 'clinch', 'guard', 'mount', 'side-control', 'rear-naked-choke', 'kimura', 'triangle-choke')
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = mma_id
    );
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, jiujitsu_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('gi', 'no-gi', 'berimbolo', 'de-la-riva', 'omoplata', 'armbar', 'sweep', 'pass', 'shrimp', 'bridge')
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = jiujitsu_id
    );
    
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, fencing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('en-garde', 'thrust', 'parry', 'riposte', 'lunge', 'fleche', 'blade-work', 'right-of-way', 'piste', 'touch')
    AND NOT EXISTS (
        SELECT 1 FROM term_categories tc 
        WHERE tc.term_id = t.id AND tc.category_id = fencing_id
    );
    
END $$;