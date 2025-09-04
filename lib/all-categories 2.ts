import { Category } from '@/types'

// All hobby/category data for Hobbipedia
export const allCategories: Omit<Category, 'id' | 'created_at' | 'updated_at'>[] = [
  // Original categories
  { name: 'Cycling', slug: 'cycling', description: 'Terms related to cycling, bicycle racing, and bike maintenance', emoji: '🚴', color: '#FF6B6B', term_count: 0 },
  { name: 'Swimming', slug: 'swimming', description: 'Swimming techniques, pool terminology, and aquatic sports', emoji: '🏊', color: '#4ECDC4', term_count: 0 },
  { name: 'Running', slug: 'running', description: 'Running, jogging, marathons, and track terminology', emoji: '🏃', color: '#45B7D1', term_count: 0 },
  { name: 'Basketball', slug: 'basketball', description: 'Basketball terminology, techniques, and gameplay', emoji: '🏀', color: '#FF8C42', term_count: 0 },
  { name: 'Astronomy', slug: 'astronomy', description: 'Celestial observation, equipment, and astronomical phenomena', emoji: '🔭', color: '#6A4C93', term_count: 0 },
  
  // Sports & Athletics
  { name: '3D printing', slug: '3d-printing', description: 'Three-dimensional printing and additive manufacturing', emoji: '🖨️', color: 'purple', term_count: 0 },
  { name: 'Abseiling', slug: 'abseiling', description: 'Rope descent and rappelling techniques', emoji: '🧗', color: 'gray', term_count: 0 },
  { name: 'Acting', slug: 'acting', description: 'Theatrical performance and drama', emoji: '🎭', color: 'red', term_count: 0 },
  { name: 'Adventure racing', slug: 'adventure-racing', description: 'Multi-discipline outdoor endurance events', emoji: '🏃‍♂️', color: 'orange', term_count: 0 },
  { name: 'Aerobics', slug: 'aerobics', description: 'Cardiovascular fitness and dance exercise', emoji: '💃', color: 'pink', term_count: 0 },
  { name: 'Airsoft', slug: 'airsoft', description: 'Military simulation combat sport', emoji: '🔫', color: 'green', term_count: 0 },
  { name: 'Archery', slug: 'archery', description: 'Bow and arrow target shooting', emoji: '🏹', color: 'brown', term_count: 0 },
  { name: 'Athletics', slug: 'athletics', description: 'Track and field sports', emoji: '🏃', color: 'blue', term_count: 0 },
  { name: 'Auto racing', slug: 'auto-racing', description: 'Motor vehicle competitive racing', emoji: '🏎️', color: 'red', term_count: 0 },

  // Water Sports
  { name: 'Boating', slug: 'boating', description: 'Recreational and competitive watercraft activities', emoji: '⛵', color: 'blue', term_count: 0 },
  { name: 'Bodyboarding', slug: 'bodyboarding', description: 'Wave riding on a short board', emoji: '🏄', color: 'teal', term_count: 0 },
  { name: 'Bowling', slug: 'bowling', description: 'Rolling balls to knock down pins', emoji: '🎳', color: 'yellow', term_count: 0 },
  { name: 'Boxing', slug: 'boxing', description: 'Combat sport with gloved punches', emoji: '🥊', color: 'red', term_count: 0 },

  // Creative & Crafts
  { name: 'Calligraphy', slug: 'calligraphy', description: 'Decorative handwriting and lettering art', emoji: '✒️', color: 'black', term_count: 0 },
  { name: 'Ceramics', slug: 'ceramics', description: 'Pottery and clay artwork creation', emoji: '🏺', color: 'brown', term_count: 0 },
  { name: 'Chess', slug: 'chess', description: 'Strategic board game for two players', emoji: '♟️', color: 'black', term_count: 0 },
  { name: 'Climbing', slug: 'climbing', description: 'Ascending natural or artificial rock formations', emoji: '🧗‍♀️', color: 'gray', term_count: 0 },
  { name: 'Collecting', slug: 'collecting', description: 'Gathering and preserving items of interest', emoji: '📦', color: 'brown', term_count: 0 },
  { name: 'Cross-stitch', slug: 'cross-stitch', description: 'Counted thread embroidery technique', emoji: '🧵', color: 'pink', term_count: 0 },

  // Dance & Performance
  { name: 'Dance', slug: 'dance', description: 'Rhythmic body movement and choreography', emoji: '💃', color: 'pink', term_count: 0 },
  { name: 'Drawing', slug: 'drawing', description: 'Creating images with pencils, pens, or other tools', emoji: '✏️', color: 'gray', term_count: 0 },

  // Outdoor Activities
  { name: 'Fishing', slug: 'fishing', description: 'Catching fish for sport or recreation', emoji: '🎣', color: 'blue', term_count: 0 },
  { name: 'Geocaching', slug: 'geocaching', description: 'GPS-based treasure hunting game', emoji: '🗺️', color: 'green', term_count: 0 },
  { name: 'Golf', slug: 'golf', description: 'Club and ball sport on courses', emoji: '⛳', color: 'green', term_count: 0 },

  // Martial Arts
  { name: 'Judo', slug: 'judo', description: 'Japanese martial art and Olympic sport', emoji: '🥋', color: 'white', term_count: 0 },
  { name: 'Karate', slug: 'karate', description: 'Japanese martial art with strikes and blocks', emoji: '🥋', color: 'orange', term_count: 0 },
  { name: 'Kickboxing', slug: 'kickboxing', description: 'Combat sport combining boxing and kicking', emoji: '🥊', color: 'red', term_count: 0 },

  // Creative Arts
  { name: 'Knitting', slug: 'knitting', description: 'Creating fabric by interlocking loops of yarn', emoji: '🧶', color: 'blue', term_count: 0 },

  // Music & Instruments
  { name: 'Piano', slug: 'piano', description: 'Keyboard instrument and musical performance', emoji: '🎹', color: 'black', term_count: 0 },
  { name: 'Guitar', slug: 'guitar', description: 'Stringed musical instrument', emoji: '🎸', color: 'brown', term_count: 0 },
  { name: 'Violin', slug: 'violin', description: 'Bowed string instrument', emoji: '🎻', color: 'brown', term_count: 0 },
  { name: 'Drums', slug: 'drums', description: 'Percussion instruments and rhythmic performance', emoji: '🥁', color: 'red', term_count: 0 },

  // Technology & Digital
  { name: 'Programming', slug: 'programming', description: 'Computer software development and coding', emoji: '💻', color: 'blue', term_count: 0 },
  { name: 'Web design', slug: 'web-design', description: 'Creating and designing websites', emoji: '🌐', color: 'blue', term_count: 0 },
  { name: 'Robotics', slug: 'robotics', description: 'Design and construction of robots', emoji: '🤖', color: 'gray', term_count: 0 },

  // Outdoor & Adventure
  { name: 'Camping', slug: 'camping', description: 'Outdoor recreational activity and survival', emoji: '⛺', color: 'green', term_count: 0 },
  { name: 'Kayaking', slug: 'kayaking', description: 'Paddling small watercraft', emoji: '🛶', color: 'blue', term_count: 0 },
  { name: 'Skiing', slug: 'skiing', description: 'Snow sport with skis and poles', emoji: '⛷️', color: 'blue', term_count: 0 },
  { name: 'Snowboarding', slug: 'snowboarding', description: 'Snow sport on a single board', emoji: '🏂', color: 'blue', term_count: 0 },
  { name: 'Surfing', slug: 'surfing', description: 'Riding waves on a surfboard', emoji: '🏄‍♂️', color: 'blue', term_count: 0 },

  // Indoor Activities
  { name: 'Reading', slug: 'reading', description: 'Literature appreciation and book study', emoji: '📚', color: 'brown', term_count: 0 },
  { name: 'Writing', slug: 'writing', description: 'Creative and technical written expression', emoji: '✍️', color: 'black', term_count: 0 },
  { name: 'Puzzles', slug: 'puzzles', description: 'Problem-solving games and brain teasers', emoji: '🧩', color: 'rainbow', term_count: 0 },

  // Sports Continued
  { name: 'Baseball', slug: 'baseball', description: 'Bat and ball team sport', emoji: '⚾', color: 'white', term_count: 0 },
  { name: 'Football', slug: 'football', description: 'American tackle football sport', emoji: '🏈', color: 'brown', term_count: 0 },
  { name: 'Soccer', slug: 'soccer', description: 'Association football with feet and ball', emoji: '⚽', color: 'black', term_count: 0 },
  { name: 'Tennis', slug: 'tennis', description: 'Racquet sport on a court', emoji: '🎾', color: 'yellow', term_count: 0 },
  { name: 'Volleyball', slug: 'volleyball', description: 'Net-based team sport', emoji: '🏐', color: 'white', term_count: 0 },

  // Crafts & DIY
  { name: 'Woodworking', slug: 'woodworking', description: 'Creating objects from wood', emoji: '🪵', color: 'brown', term_count: 0 },
  { name: 'Metalworking', slug: 'metalworking', description: 'Shaping and forming metal objects', emoji: '🔨', color: 'gray', term_count: 0 },
  { name: 'Jewelry making', slug: 'jewelry-making', description: 'Creating decorative personal accessories', emoji: '💎', color: 'purple', term_count: 0 },
  { name: 'Sewing', slug: 'sewing', description: 'Joining fabrics with needle and thread', emoji: '🪡', color: 'blue', term_count: 0 },

  // Performance Arts
  { name: 'Magic', slug: 'magic', description: 'Illusion and sleight of hand entertainment', emoji: '🎩', color: 'black', term_count: 0 },
  { name: 'Juggling', slug: 'juggling', description: 'Manipulating objects in continuous motion', emoji: '🤹', color: 'rainbow', term_count: 0 },

  // Animal & Nature
  { name: 'Birdwatching', slug: 'birdwatching', description: 'Observing and identifying wild birds', emoji: '🦅', color: 'brown', term_count: 0 },
  { name: 'Horseback riding', slug: 'horseback-riding', description: 'Equestrian sports and recreation', emoji: '🐴', color: 'brown', term_count: 0 },
  { name: 'Pet training', slug: 'pet-training', description: 'Animal behavior and obedience training', emoji: '🐕', color: 'blue', term_count: 0 },

  // Games & Puzzles
  { name: 'Board games', slug: 'board-games', description: 'Tabletop strategic and social games', emoji: '🎲', color: 'rainbow', term_count: 0 },
  { name: 'Card games', slug: 'card-games', description: 'Playing card entertainment and strategy', emoji: '🃏', color: 'red', term_count: 0 },
  { name: 'Video games', slug: 'video-games', description: 'Digital interactive entertainment', emoji: '🎮', color: 'blue', term_count: 0 },

  // Health & Wellness
  { name: 'Meditation', slug: 'meditation', description: 'Mindfulness and spiritual practice', emoji: '🧘‍♀️', color: 'purple', term_count: 0 },
  { name: 'Pilates', slug: 'pilates', description: 'Physical fitness and core strengthening', emoji: '🤸', color: 'pink', term_count: 0 },
  { name: 'Weightlifting', slug: 'weightlifting', description: 'Strength training with weights', emoji: '🏋️', color: 'red', term_count: 0 },

  // Adventure Sports
  { name: 'Skydiving', slug: 'skydiving', description: 'Parachuting from aircraft', emoji: '🪂', color: 'blue', term_count: 0 },
  { name: 'Bungee jumping', slug: 'bungee-jumping', description: 'Jumping from heights with elastic cord', emoji: '🤸‍♂️', color: 'orange', term_count: 0 },
  { name: 'Paragliding', slug: 'paragliding', description: 'Free-flying with fabric wing', emoji: '🪂', color: 'yellow', term_count: 0 },

  // Water Activities
  { name: 'Scuba diving', slug: 'scuba-diving', description: 'Underwater exploration with breathing apparatus', emoji: '🤿', color: 'blue', term_count: 0 },
  { name: 'Snorkeling', slug: 'snorkeling', description: 'Swimming at surface with mask and snorkel', emoji: '🤿', color: 'teal', term_count: 0 },
  { name: 'Water skiing', slug: 'water-skiing', description: 'Surface water sport behind motorboat', emoji: '🎿', color: 'blue', term_count: 0 },

  // Motor Sports
  { name: 'Motorcycling', slug: 'motorcycling', description: 'Two-wheeled motor vehicle operation', emoji: '🏍️', color: 'black', term_count: 0 },
  { name: 'Go-karting', slug: 'go-karting', description: 'Small open-wheel racing vehicles', emoji: '🏎️', color: 'yellow', term_count: 0 },

  // Traditional Games
  { name: 'Billiards', slug: 'billiards', description: 'Cue sports on felt-covered tables', emoji: '🎱', color: 'green', term_count: 0 },
  { name: 'Darts', slug: 'darts', description: 'Throwing small missiles at circular target', emoji: '🎯', color: 'red', term_count: 0 },

  // Creative Digital
  { name: 'Animation', slug: 'animation', description: 'Creating moving images and cartoons', emoji: '🎬', color: 'yellow', term_count: 0 },
  { name: 'Video editing', slug: 'video-editing', description: 'Post-production video content creation', emoji: '🎞️', color: 'black', term_count: 0 },
  { name: 'Podcasting', slug: 'podcasting', description: 'Audio content creation and broadcasting', emoji: '🎙️', color: 'red', term_count: 0 },

  // Collecting & Hobbies
  { name: 'Coin collecting', slug: 'coin-collecting', description: 'Numismatic hobby and currency study', emoji: '🪙', color: 'gold', term_count: 0 },
  { name: 'Stamp collecting', slug: 'stamp-collecting', description: 'Philatelic hobby and postal history', emoji: '📮', color: 'blue', term_count: 0 },
  { name: 'Model building', slug: 'model-building', description: 'Scale replica construction and detailing', emoji: '✈️', color: 'gray', term_count: 0 },

  // Outdoor Exploration
  { name: 'Rock climbing', slug: 'rock-climbing', description: 'Ascending natural rock formations', emoji: '🧗‍♀️', color: 'brown', term_count: 0 },
  { name: 'Mountaineering', slug: 'mountaineering', description: 'High-altitude climbing and expedition', emoji: '🏔️', color: 'white', term_count: 0 },
  { name: 'Orienteering', slug: 'orienteering', description: 'Navigation sport using map and compass', emoji: '🧭', color: 'green', term_count: 0 },

  // Combat Sports
  { name: 'Wrestling', slug: 'wrestling', description: 'Grappling combat sport', emoji: '🤼', color: 'blue', term_count: 0 },
  { name: 'Fencing', slug: 'fencing', description: 'Sword fighting sport with protective gear', emoji: '🤺', color: 'white', term_count: 0 },
  { name: 'Mixed martial arts', slug: 'mixed-martial-arts', description: 'Full-contact combat sport', emoji: '🥊', color: 'red', term_count: 0 },

  // Precision Sports
  { name: 'Shooting', slug: 'shooting', description: 'Marksmanship with firearms or air guns', emoji: '🎯', color: 'black', term_count: 0 },
  { name: 'Archery hunting', slug: 'archery-hunting', description: 'Bow hunting and outdoor pursuit', emoji: '🏹', color: 'brown', term_count: 0 },

  // Team Sports
  { name: 'Rugby', slug: 'rugby', description: 'Full-contact team sport with oval ball', emoji: '🏉', color: 'brown', term_count: 0 },
  { name: 'Cricket', slug: 'cricket', description: 'Bat and ball sport with wickets', emoji: '🏏', color: 'white', term_count: 0 },
  { name: 'Badminton', slug: 'badminton', description: 'Racquet sport with shuttlecock', emoji: '🏸', color: 'yellow', term_count: 0 },
  { name: 'Table tennis', slug: 'table-tennis', description: 'Indoor racquet sport on small table', emoji: '🏓', color: 'orange', term_count: 0 },

  // Winter Sports
  { name: 'Ice hockey', slug: 'ice-hockey', description: 'Team sport on ice with sticks and puck', emoji: '🏒', color: 'black', term_count: 0 },
  { name: 'Figure skating', slug: 'figure-skating', description: 'Artistic ice skating with jumps and spins', emoji: '⛸️', color: 'blue', term_count: 0 },
  { name: 'Curling', slug: 'curling', description: 'Ice sport with stones and brooms', emoji: '🥌', color: 'blue', term_count: 0 },

  // Extreme Sports
  { name: 'Skateboarding', slug: 'skateboarding', description: 'Riding and performing tricks on skateboards', emoji: '🛹', color: 'gray', term_count: 0 },
  { name: 'BMX', slug: 'bmx', description: 'Bicycle motocross racing and freestyle', emoji: '🚴‍♂️', color: 'yellow', term_count: 0 },
  { name: 'Parkour', slug: 'parkour', description: 'Movement discipline through urban environments', emoji: '🤸‍♂️', color: 'gray', term_count: 0 },

  // Intellectual Pursuits
  { name: 'Trivia', slug: 'trivia', description: 'Knowledge-based question and answer games', emoji: '🧠', color: 'purple', term_count: 0 },
  { name: 'Crosswords', slug: 'crosswords', description: 'Word puzzle solving', emoji: '📝', color: 'black', term_count: 0 },
  { name: 'Sudoku', slug: 'sudoku', description: 'Number placement logic puzzle', emoji: '🔢', color: 'blue', term_count: 0 },

  // Nature & Science
  { name: 'Meteorology', slug: 'meteorology', description: 'Weather observation and forecasting', emoji: '🌤️', color: 'blue', term_count: 0 },
  { name: 'Geology', slug: 'geology', description: 'Earth science and rock study', emoji: '🪨', color: 'brown', term_count: 0 },
  { name: 'Botany', slug: 'botany', description: 'Plant science and identification', emoji: '🌿', color: 'green', term_count: 0 },

  // Social Activities
  { name: 'Volunteering', slug: 'volunteering', description: 'Community service and charitable work', emoji: '🤝', color: 'blue', term_count: 0 },
  { name: 'Event planning', slug: 'event-planning', description: 'Organizing and coordinating gatherings', emoji: '🎉', color: 'rainbow', term_count: 0 },
  { name: 'Public speaking', slug: 'public-speaking', description: 'Presentation and communication skills', emoji: '🎤', color: 'red', term_count: 0 },

  // Traditional Crafts
  { name: 'Blacksmithing', slug: 'blacksmithing', description: 'Forging metal using hammer and anvil', emoji: '⚒️', color: 'black', term_count: 0 },
  { name: 'Leatherworking', slug: 'leatherworking', description: 'Crafting items from animal hide', emoji: '👜', color: 'brown', term_count: 0 },
  { name: 'Glassblowing', slug: 'glassblowing', description: 'Forming glass using breath and tools', emoji: '🫧', color: 'blue', term_count: 0 },

  // Food & Beverage
  { name: 'Baking', slug: 'baking', description: 'Preparing breads, cakes, and pastries', emoji: '🧁', color: 'pink', term_count: 0 },
  { name: 'Wine tasting', slug: 'wine-tasting', description: 'Evaluating and appreciating wines', emoji: '🍷', color: 'purple', term_count: 0 },
  { name: 'Coffee roasting', slug: 'coffee-roasting', description: 'Processing coffee beans for brewing', emoji: '☕', color: 'brown', term_count: 0 },
  { name: 'Brewing', slug: 'brewing', description: 'Making beer, mead, and fermented beverages', emoji: '🍺', color: 'amber', term_count: 0 },

  // Transportation Hobbies
  { name: 'Model trains', slug: 'model-trains', description: 'Scale railway modeling and operation', emoji: '🚂', color: 'green', term_count: 0 },
  { name: 'Remote control', slug: 'remote-control', description: 'Operating RC vehicles and aircraft', emoji: '📡', color: 'blue', term_count: 0 },
  { name: 'Sailing', slug: 'sailing', description: 'Wind-powered watercraft navigation', emoji: '⛵', color: 'blue', term_count: 0 },

  // Mind & Body
  { name: 'Tai chi', slug: 'tai-chi', description: 'Chinese martial art and moving meditation', emoji: '☯️', color: 'blue', term_count: 0 },
  { name: 'Qigong', slug: 'qigong', description: 'Chinese energy cultivation practice', emoji: '🌸', color: 'pink', term_count: 0 },
  { name: 'Acrobatics', slug: 'acrobatics', description: 'Gymnastic feats and aerial performance', emoji: '🤸', color: 'red', term_count: 0 },

  // Technology Hobbies
  { name: '3D modeling', slug: '3d-modeling', description: 'Creating digital three-dimensional objects', emoji: '🖥️', color: 'blue', term_count: 0 },
  { name: 'Electronics', slug: 'electronics', description: 'Circuit design and electrical engineering', emoji: '🔌', color: 'yellow', term_count: 0 },
  { name: 'Ham radio', slug: 'ham-radio', description: 'Amateur radio communication', emoji: '📻', color: 'red', term_count: 0 },

  // Outdoor Skills
  { name: 'Survival skills', slug: 'survival-skills', description: 'Wilderness self-reliance techniques', emoji: '🔥', color: 'orange', term_count: 0 },
  { name: 'Foraging', slug: 'foraging', description: 'Gathering wild plants and mushrooms', emoji: '🍄', color: 'green', term_count: 0 },
  { name: 'Bushcraft', slug: 'bushcraft', description: 'Outdoor skills and wilderness living', emoji: '🪵', color: 'brown', term_count: 0 },

  // Home & Garden Extended
  { name: 'Hydroponics', slug: 'hydroponics', description: 'Soilless plant cultivation methods', emoji: '🌱', color: 'green', term_count: 0 },
  { name: 'Beekeeping', slug: 'beekeeping', description: 'Honey bee maintenance and honey production', emoji: '🐝', color: 'yellow', term_count: 0 },
  { name: 'Composting', slug: 'composting', description: 'Organic waste recycling for soil', emoji: '🪱', color: 'brown', term_count: 0 },

  // Cultural Activities
  { name: 'Language learning', slug: 'language-learning', description: 'Acquiring foreign language skills', emoji: '🗣️', color: 'blue', term_count: 0 },
  { name: 'Cultural exchange', slug: 'cultural-exchange', description: 'International cultural sharing', emoji: '🌍', color: 'rainbow', term_count: 0 },
  { name: 'Genealogy', slug: 'genealogy', description: 'Family history research and documentation', emoji: '📜', color: 'brown', term_count: 0 },

  // Performance & Entertainment
  { name: 'Stand-up comedy', slug: 'stand-up-comedy', description: 'Solo comedic performance art', emoji: '🎤', color: 'yellow', term_count: 0 },
  { name: 'Improv', slug: 'improv', description: 'Spontaneous theatrical performance', emoji: '🎭', color: 'purple', term_count: 0 },
  { name: 'Puppetry', slug: 'puppetry', description: 'Manipulating puppet characters', emoji: '🎪', color: 'red', term_count: 0 },

  // Fashion & Style
  { name: 'Fashion design', slug: 'fashion-design', description: 'Creating clothing and accessories', emoji: '👗', color: 'pink', term_count: 0 },
  { name: 'Cosplay', slug: 'cosplay', description: 'Costume play and character portrayal', emoji: '🦸', color: 'rainbow', term_count: 0 },
  { name: 'Makeup artistry', slug: 'makeup-artistry', description: 'Cosmetic application and design', emoji: '💄', color: 'red', term_count: 0 },

  // Additional categories from original mock data
  { name: 'Photography', slug: 'photography', description: 'Capturing images with cameras and artistic techniques', emoji: '📷', color: '#9B59B6', term_count: 0 },
  { name: 'Hiking', slug: 'hiking', description: 'Walking and trekking in natural environments', emoji: '🥾', color: '#27AE60', term_count: 0 },
  { name: 'Yoga', slug: 'yoga', description: 'Physical, mental, and spiritual practices', emoji: '🧘', color: '#E74C3C', term_count: 0 },
  { name: 'Gaming', slug: 'gaming', description: 'Video games, board games, and competitive gaming', emoji: '🎮', color: '#3498DB', term_count: 0 },
  { name: 'Cooking', slug: 'cooking', description: 'Culinary arts, recipes, and food preparation', emoji: '👨‍🍳', color: '#F39C12', term_count: 0 },
  { name: 'Gardening', slug: 'gardening', description: 'Plant cultivation, landscaping, and horticulture', emoji: '🌱', color: '#2ECC71', term_count: 0 },
  { name: 'Music', slug: 'music', description: 'Musical performance, theory, and appreciation', emoji: '🎵', color: '#9B59B6', term_count: 0 }
]

export function getCategoryBySlugLocal(slug: string) {
  return allCategories.find(cat => cat.slug === slug)
}

export function getAllCategoriesLocal() {
  return allCategories
}