-- Add all new hobby categories to the database
-- This script creates the foundational categories for the comprehensive terms

INSERT INTO categories (id, name, slug, description, emoji, color, created_at, updated_at) VALUES

-- Sports Categories
(gen_random_uuid(), 'Yoga', 'yoga', 'Ancient practice combining physical postures, breathing techniques, and meditation for physical and mental well-being', '🧘', 'purple', NOW(), NOW()),
(gen_random_uuid(), 'Wrestling', 'wrestling', 'Combat sport involving grappling techniques to control and pin opponents', '🤼', 'red', NOW(), NOW()),
(gen_random_uuid(), 'Water Polo', 'water-polo', 'Aquatic team sport combining swimming, ball handling, and strategic gameplay', '🤽', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Volleyball', 'volleyball', 'Team sport played by hitting a ball over a net using hands and arms', '🏐', 'orange', NOW(), NOW()),
(gen_random_uuid(), 'Triathlon', 'triathlon', 'Multi-sport endurance event combining swimming, cycling, and running', '🏊', 'teal', NOW(), NOW()),
(gen_random_uuid(), 'Track and Field', 'track-and-field', 'Collection of athletic events including running, jumping, and throwing competitions', '🏃', 'green', NOW(), NOW()),
(gen_random_uuid(), 'Tennis', 'tennis', 'Racquet sport played on a court with a net, emphasizing strategy and technique', '🎾', 'yellow', NOW(), NOW()),
(gen_random_uuid(), 'Table Tennis', 'table-tennis', 'Indoor racquet sport played on a table with a lightweight ball and paddles', '🏓', 'red', NOW(), NOW()),
(gen_random_uuid(), 'Surfing', 'surfing', 'Water sport involving riding waves on a surfboard', '🏄', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Soccer', 'soccer', 'Global team sport played with feet to move a ball into the opposing goal', '⚽', 'green', NOW(), NOW()),
(gen_random_uuid(), 'Snowboarding', 'snowboarding', 'Winter sport involving descending snow-covered slopes on a snowboard', '🏂', 'white', NOW(), NOW()),
(gen_random_uuid(), 'Skiing', 'skiing', 'Winter sport using skis to glide over snow-covered terrain', '⛷️', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Skydiving', 'skydiving', 'Aerial sport involving jumping from aircraft and free-falling before deploying a parachute', '🪂', 'purple', NOW(), NOW()),
(gen_random_uuid(), 'Skateboarding', 'skateboarding', 'Action sport involving riding and performing tricks on a skateboard', '🛹', 'black', NOW(), NOW()),
(gen_random_uuid(), 'Rowing', 'rowing', 'Water sport where athletes propel boats using oars', '🚣', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Rock Climbing', 'rock-climbing', 'Sport involving climbing natural or artificial rock formations', '🧗', 'brown', NOW(), NOW()),
(gen_random_uuid(), 'Powerlifting', 'powerlifting', 'Strength sport consisting of three main lifts: squat, bench press, and deadlift', '🏋️', 'red', NOW(), NOW()),
(gen_random_uuid(), 'Mixed Martial Arts', 'mixed-martial-arts', 'Combat sport combining techniques from various martial arts disciplines', '🥊', 'black', NOW(), NOW()),
(gen_random_uuid(), 'Running', 'running', 'Form of aerobic exercise involving rapid movement on foot', '🏃', 'orange', NOW(), NOW()),
(gen_random_uuid(), 'Lacrosse', 'lacrosse', 'Team sport played with a lacrosse stick and ball, combining elements of various sports', '🥍', 'green', NOW(), NOW()),
(gen_random_uuid(), 'Jiu-Jitsu', 'jiu-jitsu', 'Martial art focusing on ground fighting and submission techniques', '🥋', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Ice Skating', 'ice-skating', 'Sport involving gliding on ice using ice skates', '⛸️', 'white', NOW(), NOW()),
(gen_random_uuid(), 'Hockey', 'hockey', 'Fast-paced team sport played on ice with sticks and a puck', '🏒', 'black', NOW(), NOW()),
(gen_random_uuid(), 'Hiking', 'hiking', 'Outdoor activity involving walking on trails and natural terrain', '🥾', 'green', NOW(), NOW()),
(gen_random_uuid(), 'Gymnastics', 'gymnastics', 'Sport involving exercises requiring physical strength, flexibility, and coordination', '🤸', 'pink', NOW(), NOW()),
(gen_random_uuid(), 'Golf', 'golf', 'Precision sport where players use clubs to hit balls into holes', '⛳', 'green', NOW(), NOW()),
(gen_random_uuid(), 'Fencing', 'fencing', 'Combat sport using sword-like weapons in strategic dueling', '🤺', 'silver', NOW(), NOW()),
(gen_random_uuid(), 'Bouldering', 'bouldering', 'Form of rock climbing on small rock formations without ropes', '🪨', 'gray', NOW(), NOW()),
(gen_random_uuid(), 'Bodybuilding', 'bodybuilding', 'Sport focused on developing muscular physique through resistance training', '💪', 'red', NOW(), NOW()),
(gen_random_uuid(), 'Basketball', 'basketball', 'Team sport involving shooting a ball through elevated hoops', '🏀', 'orange', NOW(), NOW()),
(gen_random_uuid(), 'Baseball', 'baseball', 'Bat-and-ball sport played between two teams taking turns batting and fielding', '⚾', 'blue', NOW(), NOW()),

-- Creative and Performance Categories
(gen_random_uuid(), 'Violin', 'violin', 'String instrument played with a bow, central to classical and contemporary music', '🎻', 'brown', NOW(), NOW()),
(gen_random_uuid(), 'Tattooing', 'tattooing', 'Art form involving creating permanent designs on skin using ink and needles', '🎨', 'black', NOW(), NOW()),
(gen_random_uuid(), 'Stand-up Comedy', 'stand-up-comedy', 'Performance art involving humorous monologues delivered to live audiences', '🎤', 'yellow', NOW(), NOW()),
(gen_random_uuid(), 'Singing', 'singing', 'Musical art of producing vocal sounds in rhythm, pitch, and harmony', '🎵', 'purple', NOW(), NOW()),
(gen_random_uuid(), 'Poetry Writing', 'poetry-writing', 'Literary art form using aesthetic and rhythmic language to express ideas and emotions', '✍️', 'blue', NOW(), NOW()),

-- Craft and Technical Categories
(gen_random_uuid(), 'Woodworking', 'woodworking', 'Craft of creating objects from wood using various tools and techniques', '🪵', 'brown', NOW(), NOW()),
(gen_random_uuid(), 'Wine Tasting', 'wine-tasting', 'Sensory examination and evaluation of wine characteristics', '🍷', 'purple', NOW(), NOW()),
(gen_random_uuid(), 'Wine Making', 'wine-making', 'Process of fermenting grapes or other fruits to produce alcoholic beverages', '🍇', 'purple', NOW(), NOW()),
(gen_random_uuid(), 'Web Design', 'web-design', 'Process of creating and designing websites for optimal user experience', '💻', 'blue', NOW(), NOW()),
(gen_random_uuid(), 'Bartending', 'bartending', 'Art and science of mixing and serving alcoholic and non-alcoholic beverages', '🍹', 'green', NOW(), NOW()),

-- Adventure Categories  
(gen_random_uuid(), 'Spelunking', 'spelunking', 'Recreational exploration of cave systems and underground formations', '🕳️', 'gray', NOW(), NOW())

-- Handle potential duplicates
ON CONFLICT (slug) DO NOTHING;