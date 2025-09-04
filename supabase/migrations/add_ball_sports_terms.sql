-- Comprehensive terms for ball sports: Tennis, Table Tennis, Volleyball, Basketball, Baseball, Soccer
DO $$
DECLARE
    tennis_id UUID;
    tabletennis_id UUID;
    volleyball_id UUID;
    basketball_id UUID;
    baseball_id UUID;
    soccer_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO tennis_id FROM categories WHERE slug = 'tennis';
    SELECT id INTO tabletennis_id FROM categories WHERE slug = 'table-tennis';
    SELECT id INTO volleyball_id FROM categories WHERE slug = 'volleyball';
    SELECT id INTO basketball_id FROM categories WHERE slug = 'basketball';
    SELECT id INTO baseball_id FROM categories WHERE slug = 'baseball';
    SELECT id INTO soccer_id FROM categories WHERE slug = 'soccer';
    
    -- Insert Tennis Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Ace', 'ace', 'Serve that opponent cannot return, winning the point immediately', 'beginner', ARRAY['She served three aces in that game', 'The ace saved him from break point'], NOW(), NOW()),
    (gen_random_uuid(), 'Deuce', 'deuce', 'Score of 40-40, requiring two consecutive points to win game', 'intermediate', ARRAY['They went to deuce five times', 'Back to deuce after that error'], NOW(), NOW()),
    (gen_random_uuid(), 'Break Point', 'break-point', 'Opportunity for receiving player to win opponent''s service game', 'intermediate', ARRAY['She converted the break point', 'He saved three break points'], NOW(), NOW()),
    (gen_random_uuid(), 'Drop Shot', 'drop-shot', 'Softly hit shot that barely clears net and drops short', 'advanced', ARRAY['The drop shot caught him at baseline', 'Perfect drop shot execution'], NOW(), NOW()),
    (gen_random_uuid(), 'Topspin', 'topspin', 'Forward rotation on ball causing it to dip and bounce high', 'intermediate', ARRAY['Heavy topspin on that forehand', 'Use topspin to clear the net safely'], NOW(), NOW()),
    (gen_random_uuid(), 'Slice', 'slice', 'Backward rotation on ball causing low bounce', 'intermediate', ARRAY['The slice backhand stayed low', 'Slice approach to the net'], NOW(), NOW()),
    (gen_random_uuid(), 'Volley', 'volley', 'Shot hit before ball bounces', 'intermediate', ARRAY['Great volley at the net', 'Come in behind your serve and volley'], NOW(), NOW()),
    (gen_random_uuid(), 'Lob', 'lob', 'High shot over opponent''s head', 'beginner', ARRAY['The lob went over his reach', 'Perfect defensive lob'], NOW(), NOW()),
    (gen_random_uuid(), 'Approach Shot', 'approach-shot', 'Shot used to move forward to net position', 'advanced', ARRAY['The approach shot set up the volley', 'Hit your approach shot deep'], NOW(), NOW()),
    (gen_random_uuid(), 'Passing Shot', 'passing-shot', 'Shot that goes past net player for winner', 'advanced', ARRAY['Incredible passing shot down the line', 'The passing shot wrong-footed him'], NOW(), NOW()),
    
    -- Insert Table Tennis Terms
    (gen_random_uuid(), 'Paddle', 'paddle', 'Racquet used in table tennis, also called bat or racket', 'beginner', ARRAY['Choose a paddle that suits your style', 'His paddle has smooth rubber'], NOW(), NOW()),
    (gen_random_uuid(), 'Rubber', 'rubber', 'Surface material on paddle affecting ball spin and speed', 'intermediate', ARRAY['Pips-out rubber creates different spin', 'Change your rubber regularly'], NOW(), NOW()),
    (gen_random_uuid(), 'Loop', 'loop', 'Topspin shot with curved racket motion', 'intermediate', ARRAY['His forehand loop was devastating', 'Counter-loop against heavy topspin'], NOW(), NOW()),
    (gen_random_uuid(), 'Smash', 'smash', 'Powerful downward shot against high ball', 'beginner', ARRAY['Perfect setup for the smash', 'The smash ended the rally'], NOW(), NOW()),
    (gen_random_uuid(), 'Block (Table Tennis)', 'block', 'Defensive shot against fast attack', 'intermediate', ARRAY['Steady block returned the smash', 'His block game is excellent'], NOW(), NOW()),
    (gen_random_uuid(), 'Chop', 'chop', 'Defensive shot with heavy underspin', 'advanced', ARRAY['The chop changed the pace', 'Long pips create wicked chop'], NOW(), NOW()),
    (gen_random_uuid(), 'Service', 'service', 'Shot that starts each point', 'beginner', ARRAY['Legal service must bounce twice', 'His service has great variation'], NOW(), NOW()),
    (gen_random_uuid(), 'Flick', 'flick', 'Quick wrist shot against short ball', 'advanced', ARRAY['Backhand flick over the net', 'The flick caught him off guard'], NOW(), NOW()),
    (gen_random_uuid(), 'Push', 'push', 'Passive shot with underspin', 'beginner', ARRAY['Push the ball back safely', 'Long push to the corners'], NOW(), NOW()),
    (gen_random_uuid(), 'Let', 'let', 'Point replayed due to net interference or other interruption', 'beginner', ARRAY['Service let, replay the point', 'The ball clipped the net - let'], NOW(), NOW()),
    
    -- Insert Volleyball Terms
    (gen_random_uuid(), 'Spike', 'spike', 'Powerful downward attack shot', 'intermediate', ARRAY['She spiked it cross-court', 'The spike was unreturnable'], NOW(), NOW()),
    (gen_random_uuid(), 'Set (Volleyball)', 'set', 'Pass positioned for teammate to attack', 'intermediate', ARRAY['Perfect set to the outside hitter', 'The setter delivered a quick set'], NOW(), NOW()),
    (gen_random_uuid(), 'Dig', 'dig', 'Defensive save of attacked ball', 'intermediate', ARRAY['Amazing dig kept the rally alive', 'She dug the spike beautifully'], NOW(), NOW()),
    (gen_random_uuid(), 'Block (Volleyball)', 'block-volleyball', 'Defensive action at net against attack', 'intermediate', ARRAY['The block stuffed the attack', 'Triple block at the net'], NOW(), NOW()),
    (gen_random_uuid(), 'Serve (Volleyball)', 'serve-volleyball', 'Shot that initiates play', 'beginner', ARRAY['Float serve moved in the air', 'The serve found the corner'], NOW(), NOW()),
    (gen_random_uuid(), 'Bump', 'bump', 'Pass using forearms to contact ball', 'beginner', ARRAY['Clean bump to the setter', 'Use your platform for the bump'], NOW(), NOW()),
    (gen_random_uuid(), 'Kill', 'kill', 'Attack that results in immediate point', 'advanced', ARRAY['That kill ended the rally', 'She had 15 kills in the match'], NOW(), NOW()),
    (gen_random_uuid(), 'Rotation', 'rotation', 'Clockwise movement of players after winning serve', 'beginner', ARRAY['Time to rotate positions', 'The rotation brought her to front row'], NOW(), NOW()),
    (gen_random_uuid(), 'Libero', 'libero', 'Specialized defensive player who cannot attack above net', 'advanced', ARRAY['The libero made incredible saves', 'She plays libero exclusively'], NOW(), NOW()),
    (gen_random_uuid(), 'Quick Set', 'quick-set', 'Fast, low set to middle attacker', 'advanced', ARRAY['The quick set beat the block', 'Perfect timing on the quick set'], NOW(), NOW()),
    
    -- Insert Basketball Terms
    (gen_random_uuid(), 'Dunk', 'dunk', 'Shot where player jumps and forces ball down through hoop', 'intermediate', ARRAY['Spectacular dunk energized the crowd', 'He threw down a powerful dunk'], NOW(), NOW()),
    (gen_random_uuid(), 'Three-Pointer', 'three-pointer', 'Shot worth three points from beyond arc', 'beginner', ARRAY['She drained the three-pointer', 'That three-pointer tied the game'], NOW(), NOW()),
    (gen_random_uuid(), 'Free Throw', 'free-throw', 'Uncontested shot from foul line worth one point', 'beginner', ARRAY['He sank both free throws', 'Practice your free throw routine'], NOW(), NOW()),
    (gen_random_uuid(), 'Fast Break', 'fast-break', 'Quick transition from defense to offense', 'intermediate', ARRAY['The fast break led to easy points', 'Push the fast break tempo'], NOW(), NOW()),
    (gen_random_uuid(), 'Pick and Roll', 'pick-and-roll', 'Offensive play involving screen and roll to basket', 'advanced', ARRAY['Classic pick and roll execution', 'The pick and roll opened up the lane'], NOW(), NOW()),
    (gen_random_uuid(), 'Rebound (Basketball)', 'rebound', 'Gaining possession of missed shot', 'beginner', ARRAY['Great offensive rebound', 'Box out for the rebound'], NOW(), NOW()),
    (gen_random_uuid(), 'Assist (Basketball)', 'assist', 'Pass leading directly to teammate''s score', 'beginner', ARRAY['Beautiful assist for the easy basket', 'He had 12 assists in the game'], NOW(), NOW()),
    (gen_random_uuid(), 'Steal (Basketball)', 'steal', 'Taking ball away from opposing team', 'intermediate', ARRAY['Quick steal led to fast break', 'The steal changed momentum'], NOW(), NOW()),
    (gen_random_uuid(), 'Block (Basketball)', 'block-basketball', 'Defensive rejection of shot attempt', 'intermediate', ARRAY['Emphatic block at the rim', 'The block sent the crowd wild'], NOW(), NOW()),
    (gen_random_uuid(), 'Crossover (Basketball)', 'crossover', 'Dribbling move to change direction and beat defender', 'advanced', ARRAY['The crossover left him stumbling', 'Deadly crossover dribble'], NOW(), NOW()),
    
    -- Insert Baseball Terms
    (gen_random_uuid(), 'Home Run', 'home-run', 'Hit that allows batter to circle all bases and score', 'beginner', ARRAY['Grand slam home run with bases loaded', 'The home run cleared the fence'], NOW(), NOW()),
    (gen_random_uuid(), 'Strike (Baseball)', 'strike', 'Pitch in strike zone or swung at and missed', 'beginner', ARRAY['Called strike on the outside corner', 'Three strikes and you''re out'], NOW(), NOW()),
    (gen_random_uuid(), 'Ball (Baseball)', 'ball', 'Pitch outside strike zone not swung at', 'beginner', ARRAY['Ball four, take your base', 'The pitch was clearly a ball'], NOW(), NOW()),
    (gen_random_uuid(), 'Double Play', 'double-play', 'Defensive play retiring two runners', 'intermediate', ARRAY['Turned a smooth double play', 'The double play ended the inning'], NOW(), NOW()),
    (gen_random_uuid(), 'Balk', 'balk', 'Illegal motion by pitcher resulting in baserunner advancement', 'advanced', ARRAY['The umpire called a balk', 'That balk moved him to second'], NOW(), NOW()),
    (gen_random_uuid(), 'Stolen Base', 'stolen-base', 'Runner advancing to next base during play', 'intermediate', ARRAY['He stole second base easily', 'The stolen base put him in scoring position'], NOW(), NOW()),
    (gen_random_uuid(), 'RBI', 'rbi', 'Run batted in - run scored due to batter''s action', 'beginner', ARRAY['Two RBI single to center', 'He leads the team in RBI'], NOW(), NOW()),
    (gen_random_uuid(), 'ERA', 'era', 'Earned run average - pitcher''s runs allowed per nine innings', 'intermediate', ARRAY['His ERA is under 3.00', 'Low ERA indicates good pitching'], NOW(), NOW()),
    (gen_random_uuid(), 'Sacrifice Fly', 'sacrifice-fly', 'Out that allows runner to score from third base', 'intermediate', ARRAY['Sacrifice fly brought him home', 'Good situational hitting sacrifice fly'], NOW(), NOW()),
    (gen_random_uuid(), 'Curveball', 'curveball', 'Pitch with downward and sideways break', 'advanced', ARRAY['His curveball has great break', 'The curveball fooled the hitter'], NOW(), NOW()),
    
    -- Insert Soccer Terms
    (gen_random_uuid(), 'Goal (Soccer)', 'goal-soccer', 'Point scored by getting ball into opponent''s net', 'beginner', ARRAY['Beautiful goal from outside the box', 'The goal came in stoppage time'], NOW(), NOW()),
    (gen_random_uuid(), 'Assist (Soccer)', 'assist-soccer', 'Pass leading directly to goal', 'beginner', ARRAY['Perfect assist set up the goal', 'He had two assists in the match'], NOW(), NOW()),
    (gen_random_uuid(), 'Offside', 'offside', 'Violation when player is ahead of last defender when ball is played', 'intermediate', ARRAY['He was caught offside', 'The offside trap worked perfectly'], NOW(), NOW()),
    (gen_random_uuid(), 'Corner Kick', 'corner-kick', 'Restart from corner after ball goes out off defending team', 'beginner', ARRAY['Dangerous corner kick delivery', 'The goal came from a corner kick'], NOW(), NOW()),
    (gen_random_uuid(), 'Free Kick', 'free-kick', 'Restart after foul with opponents 10 yards away', 'intermediate', ARRAY['He scored from the free kick', 'Direct free kick from 25 yards'], NOW(), NOW()),
    (gen_random_uuid(), 'Penalty', 'penalty', 'Free shot from penalty spot after foul in box', 'beginner', ARRAY['He converted the penalty', 'Clear penalty for the handball'], NOW(), NOW()),
    (gen_random_uuid(), 'Header (Soccer)', 'header', 'Playing ball with head', 'intermediate', ARRAY['Powerful header into the net', 'The header cleared the danger'], NOW(), NOW()),
    (gen_random_uuid(), 'Tackle (Soccer)', 'tackle', 'Defensive move to take ball from opponent', 'intermediate', ARRAY['Clean tackle won the ball', 'The sliding tackle was perfectly timed'], NOW(), NOW()),
    (gen_random_uuid(), 'Dribble', 'dribble', 'Moving ball with feet while maintaining control', 'beginner', ARRAY['Great dribble past two defenders', 'His dribbling skills are exceptional'], NOW(), NOW()),
    (gen_random_uuid(), 'Cross (Soccer)', 'cross', 'Pass from wide area toward goal area', 'intermediate', ARRAY['Perfect cross from the wing', 'The cross found him unmarked'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Tennis)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, tennis_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('ace', 'deuce', 'break-point', 'drop-shot', 'topspin', 'slice', 'volley', 'lob', 'approach-shot', 'passing-shot')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = tennis_id);
    
    -- Link terms to categories (Table Tennis)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, tabletennis_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('paddle', 'rubber', 'loop', 'smash', 'block', 'chop', 'service', 'flick', 'push', 'let')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = tabletennis_id);
    
    -- Link terms to categories (Volleyball)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, volleyball_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('spike', 'set', 'dig', 'block-volleyball', 'serve-volleyball', 'bump', 'kill', 'rotation', 'libero', 'quick-set')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = volleyball_id);
    
    -- Link terms to categories (Basketball)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, basketball_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('dunk', 'three-pointer', 'free-throw', 'fast-break', 'pick-and-roll', 'rebound', 'assist', 'steal', 'block-basketball', 'crossover')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = basketball_id);
    
    -- Link terms to categories (Baseball)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, baseball_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('home-run', 'strike', 'ball', 'double-play', 'balk', 'stolen-base', 'rbi', 'era', 'sacrifice-fly', 'curveball')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = baseball_id);
    
    -- Link terms to categories (Soccer)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, soccer_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('goal-soccer', 'assist-soccer', 'offside', 'corner-kick', 'free-kick', 'penalty', 'header', 'tackle', 'dribble', 'cross')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = soccer_id);
    
END $$;