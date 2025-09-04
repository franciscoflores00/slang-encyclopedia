-- Add description column to categories table if it doesn't exist
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add history column to categories table if it doesn't exist
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS history TEXT;

-- Update Cycling category with description and history
UPDATE categories 
SET 
  description = 'Cycling is a thrilling and invigorating hobby that involves riding a bicycle for exercise, transportation, or recreation. It''s a versatile hobby that can be enjoyed both indoors and outdoors, as well as alone or with friends. Whether you''re cycling through scenic routes or challenging yourself with mountain biking trails, this hobby offers numerous benefits, including improved cardiovascular health, stress relief, and a sense of adventure. Cycling can also be a social hobby, as it provides opportunities to meet new people and participate in group rides or races. With the right equipment and training, anyone can enjoy the thrill of cycling and explore the world on two wheels.',
  history = 'Cycling has evolved from the first pedal-powered bicycle invented in the 1860s to become one of the world''s most popular recreational activities and competitive sports. Modern cycling encompasses road racing, mountain biking, BMX, track cycling, and recreational riding. The sport has developed a rich vocabulary covering everything from equipment and techniques to racing strategy and bike maintenance. Professional cycling gained international prominence through events like the Tour de France (established in 1903), creating terminology that has spread throughout the global cycling community.',
  updated_at = NOW()
WHERE slug = 'cycling';

-- Update Swimming category with history
UPDATE categories 
SET 
  history = 'Swimming as a competitive sport dates back to ancient civilizations, but modern competitive swimming began in the 19th century. The first swimming organization was formed in London in 1837, and swimming became part of the modern Olympic Games in 1896. The sport has developed four main competitive strokes (freestyle, backstroke, breaststroke, and butterfly) and encompasses pool swimming, open water swimming, synchronized swimming, and water polo. Swimming terminology has evolved to describe techniques, training methods, pool equipment, and race strategies used by swimmers worldwide.',
  updated_at = NOW()
WHERE slug = 'swimming';

-- Update Running category with history
UPDATE categories 
SET 
  history = 'Running is humanity''s most fundamental form of locomotion and has been practiced for thousands of years for hunting, communication, and warfare. Modern competitive running emerged in the 19th century with organized track and field events. The marathon, inspired by the ancient Greek messenger Pheidippides, became an Olympic event in 1896. Running has since diversified into numerous disciplines including sprints, middle distance, long distance, cross country, trail running, and ultramarathons. The running boom of the 1970s popularized jogging and recreational running, creating a rich vocabulary around training methods, gear, and racing strategies.',
  updated_at = NOW()
WHERE slug = 'running';

-- Update Basketball category with history
UPDATE categories 
SET 
  history = 'Basketball was invented in 1891 by Dr. James Naismith in Springfield, Massachusetts, as a winter activity for his students. The sport quickly spread across America and internationally, becoming one of the world''s most popular sports. Professional basketball leagues like the NBA have created a global audience and developed extensive terminology covering plays, positions, techniques, and strategies. The sport has evolved from peach baskets nailed to gymnasium balconies to high-tech arenas with shot clocks and three-point lines.',
  updated_at = NOW()
WHERE slug = 'basketball';

-- Update Astronomy category with history
UPDATE categories 
SET 
  history = 'Astronomy is one of humanity''s oldest sciences, dating back to ancient civilizations that tracked celestial movements for agriculture and navigation. Modern astronomy began with telescopes in the 17th century and has expanded to include radio astronomy, space exploration, and deep space observation. Amateur astronomy has flourished alongside professional research, creating a rich vocabulary covering equipment, observing techniques, celestial objects, and astrophotography.',
  updated_at = NOW()
WHERE slug = 'astronomy';