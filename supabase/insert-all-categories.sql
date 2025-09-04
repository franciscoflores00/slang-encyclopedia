-- Insert all hobby categories into the database
-- This script checks for existing categories before inserting to avoid duplicates

INSERT INTO categories (name, slug, description, emoji, color)
SELECT * FROM (VALUES
  -- Original categories
  ('Cycling', 'cycling', 'Terms related to cycling, bicycle racing, and bike maintenance', '🚴', '#FF6B6B'),
  ('Swimming', 'swimming', 'Swimming techniques, pool terminology, and aquatic sports', '🏊', '#4ECDC4'),
  ('Running', 'running', 'Running, jogging, marathons, and track terminology', '🏃', '#45B7D1'),
  ('Basketball', 'basketball', 'Basketball terminology, techniques, and gameplay', '🏀', '#FF8C42'),
  ('Astronomy', 'astronomy', 'Celestial observation, equipment, and astronomical phenomena', '🔭', '#6A4C93'),
  
  -- Sports & Athletics
  ('3D printing', '3d-printing', 'Three-dimensional printing and additive manufacturing', '🖨️', 'purple'),
  ('Abseiling', 'abseiling', 'Rope descent and rappelling techniques', '🧗', 'gray'),
  ('Acting', 'acting', 'Theatrical performance and drama', '🎭', 'red'),
  ('Adventure racing', 'adventure-racing', 'Multi-discipline outdoor endurance events', '🏃‍♂️', 'orange'),
  ('Aerobics', 'aerobics', 'Cardiovascular fitness and dance exercise', '💃', 'pink'),
  ('Airsoft', 'airsoft', 'Military simulation combat sport', '🔫', 'green'),
  ('Archery', 'archery', 'Bow and arrow target shooting', '🏹', 'brown'),
  ('Athletics', 'athletics', 'Track and field sports', '🏃', 'blue'),
  ('Auto racing', 'auto-racing', 'Motor vehicle competitive racing', '🏎️', 'red'),

  -- Water Sports
  ('Boating', 'boating', 'Recreational and competitive watercraft activities', '⛵', 'blue'),
  ('Bodyboarding', 'bodyboarding', 'Wave riding on a short board', '🏄', 'teal'),
  ('Bowling', 'bowling', 'Rolling balls to knock down pins', '🎳', 'yellow'),
  ('Boxing', 'boxing', 'Combat sport with gloved punches', '🥊', 'red'),

  -- Creative & Crafts
  ('Calligraphy', 'calligraphy', 'Decorative handwriting and lettering art', '✒️', 'black'),
  ('Ceramics', 'ceramics', 'Pottery and clay artwork creation', '🏺', 'brown'),
  ('Chess', 'chess', 'Strategic board game for two players', '♟️', 'black'),
  ('Climbing', 'climbing', 'Ascending natural or artificial rock formations', '🧗‍♀️', 'gray'),
  ('Collecting', 'collecting', 'Gathering and preserving items of interest', '📦', 'brown'),
  ('Cross-stitch', 'cross-stitch', 'Counted thread embroidery technique', '🧵', 'pink'),

  -- Dance & Performance
  ('Dance', 'dance', 'Rhythmic body movement and choreography', '💃', 'pink'),
  ('Drawing', 'drawing', 'Creating images with pencils, pens, or other tools', '✏️', 'gray'),

  -- Outdoor Activities
  ('Fishing', 'fishing', 'Catching fish for sport or recreation', '🎣', 'blue'),
  ('Geocaching', 'geocaching', 'GPS-based treasure hunting game', '🗺️', 'green'),
  ('Golf', 'golf', 'Club and ball sport on courses', '⛳', 'green'),

  -- Martial Arts
  ('Judo', 'judo', 'Japanese martial art and Olympic sport', '🥋', 'white'),
  ('Karate', 'karate', 'Japanese martial art with strikes and blocks', '🥋', 'orange'),
  ('Kickboxing', 'kickboxing', 'Combat sport combining boxing and kicking', '🥊', 'red'),

  -- Creative Arts
  ('Knitting', 'knitting', 'Creating fabric by interlocking loops of yarn', '🧶', 'blue'),

  -- Music & Instruments
  ('Piano', 'piano', 'Keyboard instrument and musical performance', '🎹', 'black'),
  ('Guitar', 'guitar', 'Stringed musical instrument', '🎸', 'brown'),
  ('Violin', 'violin', 'Bowed string instrument', '🎻', 'brown'),
  ('Drums', 'drums', 'Percussion instruments and rhythmic performance', '🥁', 'red'),

  -- Technology & Digital
  ('Programming', 'programming', 'Computer software development and coding', '💻', 'blue'),
  ('Web design', 'web-design', 'Creating and designing websites', '🌐', 'blue'),
  ('Robotics', 'robotics', 'Design and construction of robots', '🤖', 'gray'),

  -- Outdoor & Adventure
  ('Camping', 'camping', 'Outdoor recreational activity and survival', '⛺', 'green'),
  ('Kayaking', 'kayaking', 'Paddling small watercraft', '🛶', 'blue'),
  ('Skiing', 'skiing', 'Snow sport with skis and poles', '⛷️', 'blue'),
  ('Snowboarding', 'snowboarding', 'Snow sport on a single board', '🏂', 'blue'),
  ('Surfing', 'surfing', 'Riding waves on a surfboard', '🏄‍♂️', 'blue'),

  -- Indoor Activities
  ('Reading', 'reading', 'Literature appreciation and book study', '📚', 'brown'),
  ('Writing', 'writing', 'Creative and technical written expression', '✍️', 'black'),
  ('Puzzles', 'puzzles', 'Problem-solving games and brain teasers', '🧩', 'rainbow'),

  -- Sports Continued
  ('Baseball', 'baseball', 'Bat and ball team sport', '⚾', 'white'),
  ('Football', 'football', 'American tackle football sport', '🏈', 'brown'),
  ('Soccer', 'soccer', 'Association football with feet and ball', '⚽', 'black'),
  ('Tennis', 'tennis', 'Racquet sport on a court', '🎾', 'yellow'),
  ('Volleyball', 'volleyball', 'Net-based team sport', '🏐', 'white'),

  -- Crafts & DIY
  ('Woodworking', 'woodworking', 'Creating objects from wood', '🪵', 'brown'),
  ('Metalworking', 'metalworking', 'Shaping and forming metal objects', '🔨', 'gray'),
  ('Jewelry making', 'jewelry-making', 'Creating decorative personal accessories', '💎', 'purple'),
  ('Sewing', 'sewing', 'Joining fabrics with needle and thread', '🪡', 'blue'),

  -- Performance Arts
  ('Magic', 'magic', 'Illusion and sleight of hand entertainment', '🎩', 'black'),
  ('Juggling', 'juggling', 'Manipulating objects in continuous motion', '🤹', 'rainbow'),

  -- Animal & Nature
  ('Birdwatching', 'birdwatching', 'Observing and identifying wild birds', '🦅', 'brown'),
  ('Horseback riding', 'horseback-riding', 'Equestrian sports and recreation', '🐴', 'brown'),
  ('Pet training', 'pet-training', 'Animal behavior and obedience training', '🐕', 'blue'),

  -- Games & Puzzles
  ('Board games', 'board-games', 'Tabletop strategic and social games', '🎲', 'rainbow'),
  ('Card games', 'card-games', 'Playing card entertainment and strategy', '🃏', 'red'),
  ('Video games', 'video-games', 'Digital interactive entertainment', '🎮', 'blue'),

  -- Health & Wellness
  ('Meditation', 'meditation', 'Mindfulness and spiritual practice', '🧘‍♀️', 'purple'),
  ('Pilates', 'pilates', 'Physical fitness and core strengthening', '🤸', 'pink'),
  ('Weightlifting', 'weightlifting', 'Strength training with weights', '🏋️', 'red'),

  -- Adventure Sports
  ('Skydiving', 'skydiving', 'Parachuting from aircraft', '🪂', 'blue'),
  ('Bungee jumping', 'bungee-jumping', 'Jumping from heights with elastic cord', '🤸‍♂️', 'orange'),
  ('Paragliding', 'paragliding', 'Free-flying with fabric wing', '🪂', 'yellow'),

  -- Water Activities
  ('Scuba diving', 'scuba-diving', 'Underwater exploration with breathing apparatus', '🤿', 'blue'),
  ('Snorkeling', 'snorkeling', 'Swimming at surface with mask and snorkel', '🤿', 'teal'),
  ('Water skiing', 'water-skiing', 'Surface water sport behind motorboat', '🎿', 'blue'),

  -- Motor Sports
  ('Motorcycling', 'motorcycling', 'Two-wheeled motor vehicle operation', '🏍️', 'black'),
  ('Go-karting', 'go-karting', 'Small open-wheel racing vehicles', '🏎️', 'yellow'),

  -- Traditional Games
  ('Billiards', 'billiards', 'Cue sports on felt-covered tables', '🎱', 'green'),
  ('Darts', 'darts', 'Throwing small missiles at circular target', '🎯', 'red'),

  -- Creative Digital
  ('Animation', 'animation', 'Creating moving images and cartoons', '🎬', 'yellow'),
  ('Video editing', 'video-editing', 'Post-production video content creation', '🎞️', 'black'),
  ('Podcasting', 'podcasting', 'Audio content creation and broadcasting', '🎙️', 'red'),

  -- Collecting & Hobbies
  ('Coin collecting', 'coin-collecting', 'Numismatic hobby and currency study', '🪙', 'gold'),
  ('Stamp collecting', 'stamp-collecting', 'Philatelic hobby and postal history', '📮', 'blue'),
  ('Model building', 'model-building', 'Scale replica construction and detailing', '✈️', 'gray'),

  -- Outdoor Exploration
  ('Rock climbing', 'rock-climbing', 'Ascending natural rock formations', '🧗‍♀️', 'brown'),
  ('Mountaineering', 'mountaineering', 'High-altitude climbing and expedition', '🏔️', 'white'),
  ('Orienteering', 'orienteering', 'Navigation sport using map and compass', '🧭', 'green'),

  -- Combat Sports
  ('Wrestling', 'wrestling', 'Grappling combat sport', '🤼', 'blue'),
  ('Fencing', 'fencing', 'Sword fighting sport with protective gear', '🤺', 'white'),
  ('Mixed martial arts', 'mixed-martial-arts', 'Full-contact combat sport', '🥊', 'red'),

  -- Precision Sports
  ('Shooting', 'shooting', 'Marksmanship with firearms or air guns', '🎯', 'black'),
  ('Archery hunting', 'archery-hunting', 'Bow hunting and outdoor pursuit', '🏹', 'brown'),

  -- Team Sports
  ('Rugby', 'rugby', 'Full-contact team sport with oval ball', '🏉', 'brown'),
  ('Cricket', 'cricket', 'Bat and ball sport with wickets', '🏏', 'white'),
  ('Badminton', 'badminton', 'Racquet sport with shuttlecock', '🏸', 'yellow'),
  ('Table tennis', 'table-tennis', 'Indoor racquet sport on small table', '🏓', 'orange'),

  -- Winter Sports
  ('Ice hockey', 'ice-hockey', 'Team sport on ice with sticks and puck', '🏒', 'black'),
  ('Figure skating', 'figure-skating', 'Artistic ice skating with jumps and spins', '⛸️', 'blue'),
  ('Curling', 'curling', 'Ice sport with stones and brooms', '🥌', 'blue'),

  -- Extreme Sports
  ('Skateboarding', 'skateboarding', 'Riding and performing tricks on skateboards', '🛹', 'gray'),
  ('BMX', 'bmx', 'Bicycle motocross racing and freestyle', '🚴‍♂️', 'yellow'),
  ('Parkour', 'parkour', 'Movement discipline through urban environments', '🤸‍♂️', 'gray'),

  -- Intellectual Pursuits
  ('Trivia', 'trivia', 'Knowledge-based question and answer games', '🧠', 'purple'),
  ('Crosswords', 'crosswords', 'Word puzzle solving', '📝', 'black'),
  ('Sudoku', 'sudoku', 'Number placement logic puzzle', '🔢', 'blue'),

  -- Nature & Science
  ('Meteorology', 'meteorology', 'Weather observation and forecasting', '🌤️', 'blue'),
  ('Geology', 'geology', 'Earth science and rock study', '🪨', 'brown'),
  ('Botany', 'botany', 'Plant science and identification', '🌿', 'green'),

  -- Social Activities
  ('Volunteering', 'volunteering', 'Community service and charitable work', '🤝', 'blue'),
  ('Event planning', 'event-planning', 'Organizing and coordinating gatherings', '🎉', 'rainbow'),
  ('Public speaking', 'public-speaking', 'Presentation and communication skills', '🎤', 'red'),

  -- Traditional Crafts
  ('Blacksmithing', 'blacksmithing', 'Forging metal using hammer and anvil', '⚒️', 'black'),
  ('Leatherworking', 'leatherworking', 'Crafting items from animal hide', '👜', 'brown'),
  ('Glassblowing', 'glassblowing', 'Forming glass using breath and tools', '🫧', 'blue'),

  -- Food & Beverage
  ('Baking', 'baking', 'Preparing breads, cakes, and pastries', '🧁', 'pink'),
  ('Wine tasting', 'wine-tasting', 'Evaluating and appreciating wines', '🍷', 'purple'),
  ('Coffee roasting', 'coffee-roasting', 'Processing coffee beans for brewing', '☕', 'brown'),
  ('Brewing', 'brewing', 'Making beer, mead, and fermented beverages', '🍺', 'amber'),

  -- Transportation Hobbies
  ('Model trains', 'model-trains', 'Scale railway modeling and operation', '🚂', 'green'),
  ('Remote control', 'remote-control', 'Operating RC vehicles and aircraft', '📡', 'blue'),
  ('Sailing', 'sailing', 'Wind-powered watercraft navigation', '⛵', 'blue'),

  -- Mind & Body
  ('Tai chi', 'tai-chi', 'Chinese martial art and moving meditation', '☯️', 'blue'),
  ('Qigong', 'qigong', 'Chinese energy cultivation practice', '🌸', 'pink'),
  ('Acrobatics', 'acrobatics', 'Gymnastic feats and aerial performance', '🤸', 'red'),

  -- Technology Hobbies
  ('3D modeling', '3d-modeling', 'Creating digital three-dimensional objects', '🖥️', 'blue'),
  ('Electronics', 'electronics', 'Circuit design and electrical engineering', '🔌', 'yellow'),
  ('Ham radio', 'ham-radio', 'Amateur radio communication', '📻', 'red'),

  -- Outdoor Skills
  ('Survival skills', 'survival-skills', 'Wilderness self-reliance techniques', '🔥', 'orange'),
  ('Foraging', 'foraging', 'Gathering wild plants and mushrooms', '🍄', 'green'),
  ('Bushcraft', 'bushcraft', 'Outdoor skills and wilderness living', '🪵', 'brown'),

  -- Home & Garden Extended
  ('Hydroponics', 'hydroponics', 'Soilless plant cultivation methods', '🌱', 'green'),
  ('Beekeeping', 'beekeeping', 'Honey bee maintenance and honey production', '🐝', 'yellow'),
  ('Composting', 'composting', 'Organic waste recycling for soil', '🪱', 'brown'),

  -- Cultural Activities
  ('Language learning', 'language-learning', 'Acquiring foreign language skills', '🗣️', 'blue'),
  ('Cultural exchange', 'cultural-exchange', 'International cultural sharing', '🌍', 'rainbow'),
  ('Genealogy', 'genealogy', 'Family history research and documentation', '📜', 'brown'),

  -- Performance & Entertainment
  ('Stand-up comedy', 'stand-up-comedy', 'Solo comedic performance art', '🎤', 'yellow'),
  ('Improv', 'improv', 'Spontaneous theatrical performance', '🎭', 'purple'),
  ('Puppetry', 'puppetry', 'Manipulating puppet characters', '🎪', 'red'),

  -- Fashion & Style
  ('Fashion design', 'fashion-design', 'Creating clothing and accessories', '👗', 'pink'),
  ('Cosplay', 'cosplay', 'Costume play and character portrayal', '🦸', 'rainbow'),
  ('Makeup artistry', 'makeup-artistry', 'Cosmetic application and design', '💄', 'red'),

  -- Additional categories
  ('Photography', 'photography', 'Capturing images with cameras and artistic techniques', '📷', '#9B59B6'),
  ('Hiking', 'hiking', 'Walking and trekking in natural environments', '🥾', '#27AE60'),
  ('Yoga', 'yoga', 'Physical, mental, and spiritual practices', '🧘', '#E74C3C'),
  ('Gaming', 'gaming', 'Video games, board games, and competitive gaming', '🎮', '#3498DB'),
  ('Cooking', 'cooking', 'Culinary arts, recipes, and food preparation', '👨‍🍳', '#F39C12'),
  ('Gardening', 'gardening', 'Plant cultivation, landscaping, and horticulture', '🌱', '#2ECC71'),
  ('Music', 'music', 'Musical performance, theory, and appreciation', '🎵', '#9B59B6')
) AS new_categories(name, slug, description, emoji, color)
WHERE NOT EXISTS (
  SELECT 1 FROM categories 
  WHERE categories.slug = new_categories.slug
);

-- Update the count to show how many categories we have
SELECT COUNT(*) as total_categories FROM categories;