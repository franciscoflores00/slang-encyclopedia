-- Comprehensive terms for craft and technical hobbies: Woodworking, Wine Making, Wine Tasting, Web Design, Bartending
DO $$
DECLARE
    woodworking_id UUID;
    winemaking_id UUID;
    winetasting_id UUID;
    webdesign_id UUID;
    bartending_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO woodworking_id FROM categories WHERE slug = 'woodworking';
    SELECT id INTO winemaking_id FROM categories WHERE slug = 'wine-making';
    SELECT id INTO winetasting_id FROM categories WHERE slug = 'wine-tasting';
    SELECT id INTO webdesign_id FROM categories WHERE slug = 'web-design';
    SELECT id INTO bartending_id FROM categories WHERE slug = 'bartending';
    
    -- Insert Woodworking Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Grain', 'grain', 'Direction and pattern of wood fibers', 'beginner', ARRAY['Work with the grain for smooth cuts', 'The grain pattern was beautiful'], NOW(), NOW()),
    (gen_random_uuid(), 'Crosscut', 'crosscut', 'Cut made perpendicular to wood grain', 'beginner', ARRAY['Use crosscut saw for accurate cuts', 'The crosscut was clean and straight'], NOW(), NOW()),
    (gen_random_uuid(), 'Rip Cut', 'rip-cut', 'Cut made parallel to wood grain', 'beginner', ARRAY['Rip cuts follow the grain direction', 'The rip cut split the board lengthwise'], NOW(), NOW()),
    (gen_random_uuid(), 'Mortise', 'mortise', 'Rectangular hole cut to receive tenon', 'intermediate', ARRAY['The mortise must fit snugly', 'Chisel out the mortise carefully'], NOW(), NOW()),
    (gen_random_uuid(), 'Tenon', 'tenon', 'Projecting piece fitting into mortise', 'intermediate', ARRAY['Cut the tenon to exact dimensions', 'The tenon locks into the mortise'], NOW(), NOW()),
    (gen_random_uuid(), 'Dovetail', 'dovetail', 'Strong interlocking joint resembling dove''s tail', 'advanced', ARRAY['Dovetail joints are incredibly strong', 'Hand-cut dovetails show craftsmanship'], NOW(), NOW()),
    (gen_random_uuid(), 'Dado', 'dado', 'Rectangular groove cut across wood grain', 'intermediate', ARRAY['The dado holds the shelf securely', 'Cut dados with router or saw'], NOW(), NOW()),
    (gen_random_uuid(), 'Rabbet', 'rabbet', 'Step-like recess cut along edge', 'intermediate', ARRAY['The rabbet joint is simple and strong', 'Use router to cut consistent rabbets'], NOW(), NOW()),
    (gen_random_uuid(), 'Biscuit Joint', 'biscuit-joint', 'Connection using oval wooden biscuits', 'intermediate', ARRAY['Biscuit joints align boards perfectly', 'The biscuit joiner makes quick work'], NOW(), NOW()),
    (gen_random_uuid(), 'Chamfer', 'chamfer', 'Angled cut along edge or corner', 'beginner', ARRAY['Chamfer the edges for comfort', 'The chamfer adds decorative detail'], NOW(), NOW()),
    (gen_random_uuid(), 'Bevel', 'bevel', 'Angled cut across face or edge', 'beginner', ARRAY['Set the saw for a 45-degree bevel', 'The bevel creates compound angles'], NOW(), NOW()),
    (gen_random_uuid(), 'Kerf', 'kerf', 'Width of material removed by saw blade', 'intermediate', ARRAY['Account for kerf in measurements', 'The thin kerf blade saves material'], NOW(), NOW()),
    (gen_random_uuid(), 'Planing', 'planing', 'Smoothing and sizing wood with plane', 'intermediate', ARRAY['Planing creates perfectly flat surfaces', 'The hand plane left beautiful shavings'], NOW(), NOW()),
    (gen_random_uuid(), 'Sanding', 'sanding', 'Smoothing wood surface with abrasive', 'beginner', ARRAY['Start sanding with coarse grit', 'Progressive sanding removes scratches'], NOW(), NOW()),
    (gen_random_uuid(), 'Finish', 'finish', 'Protective and decorative coating', 'intermediate', ARRAY['The finish enhances the wood grain', 'Oil finish penetrates the wood'], NOW(), NOW()),
    (gen_random_uuid(), 'Stain', 'stain', 'Coloring agent for wood', 'beginner', ARRAY['Test stain on scrap wood first', 'The stain darkened the pine'], NOW(), NOW()),
    (gen_random_uuid(), 'Glue-up', 'glue-up', 'Process of joining pieces with adhesive', 'intermediate', ARRAY['The glue-up requires perfect timing', 'Clamp pressure distributes glue evenly'], NOW(), NOW()),
    (gen_random_uuid(), 'Clamp', 'clamp', 'Tool applying pressure during glue-up', 'beginner', ARRAY['Use enough clamps for even pressure', 'C-clamps are versatile and strong'], NOW(), NOW()),
    (gen_random_uuid(), 'Jig', 'jig', 'Guide tool for repeatable cuts or operations', 'advanced', ARRAY['The jig ensures identical pieces', 'Build jigs for complex operations'], NOW(), NOW()),
    (gen_random_uuid(), 'Template', 'template', 'Pattern for tracing or routing', 'intermediate', ARRAY['The template speeds production', 'Use template with bearing-guided bit'], NOW(), NOW()),
    (gen_random_uuid(), 'Pocket Hole', 'pocket-hole', 'Angled hole for hidden screw connection', 'intermediate', ARRAY['Pocket holes create strong joints', 'The pocket hole jig is indispensable'], NOW(), NOW()),
    (gen_random_uuid(), 'Hardwood', 'hardwood', 'Dense wood from deciduous trees', 'beginner', ARRAY['Oak is a popular hardwood', 'Hardwoods require sharp tools'], NOW(), NOW()),
    (gen_random_uuid(), 'Softwood', 'softwood', 'Wood from coniferous evergreen trees', 'beginner', ARRAY['Pine is an affordable softwood', 'Softwoods work easily'], NOW(), NOW()),
    (gen_random_uuid(), 'Figure', 'figure', 'Decorative grain patterns in wood', 'intermediate', ARRAY['Birdseye maple has beautiful figure', 'The figure adds value to lumber'], NOW(), NOW()),
    (gen_random_uuid(), 'End Grain', 'end-grain', 'Cross-section showing cut ends of fibers', 'intermediate', ARRAY['End grain requires different techniques', 'Seal end grain before staining'], NOW(), NOW()),
    
    -- Insert Wine Making Terms
    (gen_random_uuid(), 'Must', 'must', 'Crushed grapes before or during fermentation', 'beginner', ARRAY['The must had perfect sugar levels', 'Fresh must smells incredible'], NOW(), NOW()),
    (gen_random_uuid(), 'Fermentation', 'fermentation', 'Process converting sugars to alcohol', 'beginner', ARRAY['Primary fermentation takes 5-7 days', 'Temperature affects fermentation speed'], NOW(), NOW()),
    (gen_random_uuid(), 'Yeast', 'yeast', 'Microorganisms converting sugar to alcohol', 'beginner', ARRAY['Wild yeast creates unpredictable results', 'Commercial yeast ensures consistency'], NOW(), NOW()),
    (gen_random_uuid(), 'Brix', 'brix', 'Measurement of sugar content in grapes', 'intermediate', ARRAY['Harvest at 24 degrees Brix', 'Brix determines potential alcohol'], NOW(), NOW()),
    (gen_random_uuid(), 'Malolactic', 'malolactic', 'Secondary fermentation softening acidity', 'advanced', ARRAY['Malolactic fermentation adds creaminess', 'Block malolactic for crisp whites'], NOW(), NOW()),
    (gen_random_uuid(), 'Racking', 'racking', 'Transferring wine off sediment', 'intermediate', ARRAY['Rack the wine carefully to avoid sediment', 'Multiple rackings clarify the wine'], NOW(), NOW()),
    (gen_random_uuid(), 'Lees', 'lees', 'Dead yeast and sediment after fermentation', 'intermediate', ARRAY['Sur lie aging adds complexity', 'Fine lees contribute to mouthfeel'], NOW(), NOW()),
    (gen_random_uuid(), 'Sulfites', 'sulfites', 'Preservatives preventing oxidation and spoilage', 'intermediate', ARRAY['Add sulfites to protect the wine', 'Natural sulfites form during fermentation'], NOW(), NOW()),
    (gen_random_uuid(), 'Clarification', 'clarification', 'Process of removing particles and sediment', 'intermediate', ARRAY['Clarification improves wine appearance', 'Fining agents aid clarification'], NOW(), NOW()),
    (gen_random_uuid(), 'Filtration', 'filtration', 'Removing particles through filter media', 'advanced', ARRAY['Filtration polishes the final wine', 'Coarse filtration removes large particles'], NOW(), NOW()),
    (gen_random_uuid(), 'Crush', 'crush', 'Breaking grape skins to release juice', 'beginner', ARRAY['Gentle crush preserves delicate flavors', 'The crush determines extraction'], NOW(), NOW()),
    (gen_random_uuid(), 'Press (Wine)', 'press-wine', 'Extracting juice from crushed grapes', 'intermediate', ARRAY['Press gently to avoid harsh tannins', 'The bladder press works efficiently'], NOW(), NOW()),
    (gen_random_uuid(), 'Maceration', 'maceration', 'Skin contact extracting color and tannins', 'advanced', ARRAY['Extended maceration deepens color', 'Cold maceration preserves aromatics'], NOW(), NOW()),
    (gen_random_uuid(), 'Tannins', 'tannins', 'Compounds providing structure and astringency', 'intermediate', ARRAY['Grape tannins come from skins and seeds', 'Oak adds different tannin character'], NOW(), NOW()),
    (gen_random_uuid(), 'Punch Down', 'punch-down', 'Submerging grape cap during fermentation', 'intermediate', ARRAY['Punch down twice daily', 'The punch down tool breaks up the cap'], NOW(), NOW()),
    (gen_random_uuid(), 'Cap', 'cap', 'Layer of skins floating during red fermentation', 'intermediate', ARRAY['The cap forms naturally', 'Keep the cap moist for extraction'], NOW(), NOW()),
    (gen_random_uuid(), 'Barrel Aging', 'barrel-aging', 'Storing wine in oak containers', 'advanced', ARRAY['Barrel aging adds complexity', 'New barrels contribute more oak flavor'], NOW(), NOW()),
    (gen_random_uuid(), 'Topping', 'topping', 'Filling containers to prevent oxidation', 'intermediate', ARRAY['Top up barrels monthly', 'Topping prevents unwanted air exposure'], NOW(), NOW()),
    (gen_random_uuid(), 'Blending', 'blending', 'Combining different wines for balance', 'advanced', ARRAY['Blending creates complexity', 'Trial blends determine ratios'], NOW(), NOW()),
    (gen_random_uuid(), 'Vintage', 'vintage', 'Year grapes were harvested', 'beginner', ARRAY['2020 was an exceptional vintage', 'Vintage variation affects wine character'], NOW(), NOW()),
    (gen_random_uuid(), 'Terroir', 'terroir', 'Environmental factors affecting grape character', 'advanced', ARRAY['Terroir expresses sense of place', 'Soil contributes to terroir'], NOW(), NOW()),
    (gen_random_uuid(), 'Cold Soak', 'cold-soak', 'Pre-fermentation extraction at low temperature', 'advanced', ARRAY['Cold soak enhances color', 'The cold soak lasted three days'], NOW(), NOW()),
    (gen_random_uuid(), 'Degassing', 'degassing', 'Removing carbon dioxide from wine', 'intermediate', ARRAY['Degassing prevents fizzy wine', 'Stir gently to release CO2'], NOW(), NOW()),
    (gen_random_uuid(), 'Hydrometer', 'hydrometer', 'Tool measuring specific gravity and sugar', 'beginner', ARRAY['Use hydrometer to track fermentation', 'The hydrometer reading was 1.090'], NOW(), NOW()),
    (gen_random_uuid(), 'Acid Test', 'acid-test', 'Measuring acidity levels in wine', 'intermediate', ARRAY['Balance is key in acid testing', 'The acid test showed proper levels'], NOW(), NOW()),
    
    -- Insert Wine Tasting Terms
    (gen_random_uuid(), 'Nose', 'nose', 'Aroma and bouquet of wine', 'beginner', ARRAY['The nose was intense and complex', 'Swirl to release the nose'], NOW(), NOW()),
    (gen_random_uuid(), 'Bouquet', 'bouquet', 'Complex aromas from aging and development', 'intermediate', ARRAY['The bouquet showed tertiary aromas', 'Aged wines develop beautiful bouquet'], NOW(), NOW()),
    (gen_random_uuid(), 'Palate', 'palate', 'Taste and mouthfeel of wine', 'beginner', ARRAY['The palate was rich and full', 'The palate confirmed the nose'], NOW(), NOW()),
    (gen_random_uuid(), 'Finish (Wine)', 'finish-wine', 'Lingering taste after swallowing', 'intermediate', ARRAY['The finish was long and elegant', 'Great wines have persistent finish'], NOW(), NOW()),
    (gen_random_uuid(), 'Body', 'body', 'Weight and fullness of wine in mouth', 'beginner', ARRAY['This wine has medium body', 'Full body comes from extraction'], NOW(), NOW()),
    (gen_random_uuid(), 'Tannins (Tasting)', 'tannins-tasting', 'Astringent compounds creating drying sensation', 'intermediate', ARRAY['The tannins were firm but ripe', 'Young tannins can be harsh'], NOW(), NOW()),
    (gen_random_uuid(), 'Acidity', 'acidity', 'Tartness and freshness in wine', 'intermediate', ARRAY['Good acidity provides structure', 'The acidity was bright and balanced'], NOW(), NOW()),
    (gen_random_uuid(), 'Balance (Wine)', 'balance-wine', 'Harmony between wine components', 'advanced', ARRAY['Perfect balance defines great wine', 'The balance improved with age'], NOW(), NOW()),
    (gen_random_uuid(), 'Complexity', 'complexity', 'Multiple layers of flavors and aromas', 'advanced', ARRAY['The complexity unfolded slowly', 'Age develops complexity'], NOW(), NOW()),
    (gen_random_uuid(), 'Minerality', 'minerality', 'Stone or earth-like characteristics', 'advanced', ARRAY['The minerality reflected the terroir', 'Chablis shows classic minerality'], NOW(), NOW()),
    (gen_random_uuid(), 'Legs', 'legs', 'Droplets running down glass after swirling', 'beginner', ARRAY['The legs indicated higher alcohol', 'Thick legs suggest glycerol'], NOW(), NOW()),
    (gen_random_uuid(), 'Decanting', 'decanting', 'Pouring wine into separate container', 'intermediate', ARRAY['Decanting aerates and separates sediment', 'Young wines benefit from decanting'], NOW(), NOW()),
    (gen_random_uuid(), 'Breathing', 'breathing', 'Allowing wine to oxidize and open up', 'intermediate', ARRAY['Let the wine breathe before serving', 'Breathing improves tight wines'], NOW(), NOW()),
    (gen_random_uuid(), 'Vintage (Tasting)', 'vintage-tasting', 'Year grapes were harvested', 'beginner', ARRAY['Great vintages age gracefully', 'The vintage showed its character'], NOW(), NOW()),
    (gen_random_uuid(), 'Varietal', 'varietal', 'Wine made primarily from single grape type', 'beginner', ARRAY['This varietal Pinot shows typicity', 'Varietal character was clear'], NOW(), NOW()),
    (gen_random_uuid(), 'Blend', 'blend', 'Wine combining multiple grape varieties', 'intermediate', ARRAY['The blend was expertly crafted', 'Bordeaux is a traditional blend'], NOW(), NOW()),
    (gen_random_uuid(), 'Terroir (Tasting)', 'terroir-tasting', 'Taste expression of vineyard environment', 'advanced', ARRAY['The terroir was unmistakable', 'Great wines express their terroir'], NOW(), NOW()),
    (gen_random_uuid(), 'Oak', 'oak', 'Flavor and texture from barrel aging', 'intermediate', ARRAY['The oak was well-integrated', 'New oak can overwhelm delicate wines'], NOW(), NOW()),
    (gen_random_uuid(), 'Fruit Forward', 'fruit-forward', 'Wine emphasizing fruit flavors', 'beginner', ARRAY['This wine is very fruit forward', 'New World styles tend toward fruit forward'], NOW(), NOW()),
    (gen_random_uuid(), 'Earthy', 'earthy', 'Flavors reminiscent of soil or forest floor', 'intermediate', ARRAY['The wine had earthy undertones', 'Burgundy often shows earthy character'], NOW(), NOW()),
    (gen_random_uuid(), 'Spicy', 'spicy', 'Flavors suggesting pepper or warm spices', 'beginner', ARRAY['Syrah can be quite spicy', 'The spicy notes were prominent'], NOW(), NOW()),
    (gen_random_uuid(), 'Crisp', 'crisp', 'Fresh, clean taste with good acidity', 'beginner', ARRAY['Sauvignon Blanc is typically crisp', 'The wine was refreshingly crisp'], NOW(), NOW()),
    (gen_random_uuid(), 'Smooth', 'smooth', 'Texture without harsh or rough elements', 'beginner', ARRAY['The tannins were remarkably smooth', 'Age creates smooth integration'], NOW(), NOW()),
    (gen_random_uuid(), 'Dry', 'dry', 'Wine with little or no residual sugar', 'beginner', ARRAY['Most table wines are dry', 'The wine finished completely dry'], NOW(), NOW()),
    (gen_random_uuid(), 'Sweet', 'sweet', 'Wine with noticeable residual sugar', 'beginner', ARRAY['Dessert wines are typically sweet', 'The wine had pleasant sweetness'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Insert Web Design Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Responsive', 'responsive', 'Design adapting to different screen sizes', 'intermediate', ARRAY['Responsive design works on all devices', 'The site is fully responsive'], NOW(), NOW()),
    (gen_random_uuid(), 'Wireframe', 'wireframe', 'Basic layout structure without visual design', 'beginner', ARRAY['Start with wireframes for layout', 'The wireframe shows content hierarchy'], NOW(), NOW()),
    (gen_random_uuid(), 'Mockup', 'mockup', 'Visual representation of final design', 'beginner', ARRAY['The mockup looks exactly like the final site', 'Present mockups to clients first'], NOW(), NOW()),
    (gen_random_uuid(), 'Prototype', 'prototype', 'Interactive model showing functionality', 'intermediate', ARRAY['The prototype demonstrates user flow', 'Test prototypes with real users'], NOW(), NOW()),
    (gen_random_uuid(), 'User Experience', 'user-experience', 'Overall experience of using website', 'intermediate', ARRAY['Good UX keeps users engaged', 'User experience drives conversions'], NOW(), NOW()),
    (gen_random_uuid(), 'User Interface', 'user-interface', 'Visual elements users interact with', 'intermediate', ARRAY['The UI is clean and intuitive', 'UI design affects usability'], NOW(), NOW()),
    (gen_random_uuid(), 'Typography', 'typography', 'Art and technique of arranging text', 'intermediate', ARRAY['Typography affects readability', 'Good typography guides the eye'], NOW(), NOW()),
    (gen_random_uuid(), 'Color Palette', 'color-palette', 'Selected colors used throughout design', 'beginner', ARRAY['The color palette reflects the brand', 'Limit your color palette for cohesion'], NOW(), NOW()),
    (gen_random_uuid(), 'Grid System', 'grid-system', 'Framework for organizing layout elements', 'intermediate', ARRAY['Grid systems create visual harmony', 'Bootstrap uses a 12-column grid'], NOW(), NOW()),
    (gen_random_uuid(), 'White Space', 'white-space', 'Empty space around design elements', 'intermediate', ARRAY['White space improves readability', 'Don''t be afraid of white space'], NOW(), NOW()),
    (gen_random_uuid(), 'Hierarchy', 'hierarchy', 'Arrangement showing relative importance', 'intermediate', ARRAY['Visual hierarchy guides attention', 'Use size and color for hierarchy'], NOW(), NOW()),
    (gen_random_uuid(), 'Navigation', 'navigation', 'System for moving through website', 'beginner', ARRAY['Clear navigation is essential', 'The navigation is intuitive'], NOW(), NOW()),
    (gen_random_uuid(), 'Call to Action', 'call-to-action', 'Element prompting user to take action', 'beginner', ARRAY['Place CTAs strategically', 'The call to action stands out'], NOW(), NOW()),
    (gen_random_uuid(), 'Landing Page', 'landing-page', 'Single page designed for specific purpose', 'intermediate', ARRAY['Landing pages focus on one goal', 'The landing page converts well'], NOW(), NOW()),
    (gen_random_uuid(), 'Above the Fold', 'above-the-fold', 'Content visible without scrolling', 'intermediate', ARRAY['Important content goes above the fold', 'Above the fold space is premium'], NOW(), NOW()),
    (gen_random_uuid(), 'Accessibility', 'accessibility', 'Design usable by people with disabilities', 'advanced', ARRAY['Accessibility is a legal requirement', 'Good accessibility helps everyone'], NOW(), NOW()),
    (gen_random_uuid(), 'SEO', 'seo', 'Optimization for search engine rankings', 'intermediate', ARRAY['SEO brings organic traffic', 'Design affects SEO performance'], NOW(), NOW()),
    (gen_random_uuid(), 'Load Time', 'load-time', 'Time required for page to fully display', 'intermediate', ARRAY['Fast load times improve user experience', 'Optimize images for better load times'], NOW(), NOW()),
    (gen_random_uuid(), 'Conversion Rate', 'conversion-rate', 'Percentage of visitors completing desired action', 'advanced', ARRAY['Good design improves conversion rates', 'Track conversion rate changes'], NOW(), NOW()),
    (gen_random_uuid(), 'A/B Testing', 'ab-testing', 'Comparing two versions to see which performs better', 'advanced', ARRAY['A/B test different button colors', 'A/B testing reveals user preferences'], NOW(), NOW()),
    (gen_random_uuid(), 'Breadcrumbs', 'breadcrumbs', 'Navigation showing user''s location path', 'intermediate', ARRAY['Breadcrumbs help user orientation', 'E-commerce sites need breadcrumbs'], NOW(), NOW()),
    (gen_random_uuid(), 'Sidebar', 'sidebar', 'Vertical column alongside main content', 'beginner', ARRAY['The sidebar contains navigation', 'Sidebars work well for blogs'], NOW(), NOW()),
    (gen_random_uuid(), 'Footer', 'footer', 'Bottom section of webpage', 'beginner', ARRAY['Footers contain secondary information', 'The footer includes contact details'], NOW(), NOW()),
    (gen_random_uuid(), 'Header (Web)', 'header-web', 'Top section of webpage', 'beginner', ARRAY['Headers contain site identity', 'The header stays visible while scrolling'], NOW(), NOW()),
    (gen_random_uuid(), 'Favicon', 'favicon', 'Small icon displayed in browser tab', 'beginner', ARRAY['The favicon represents your brand', 'Upload favicon in multiple sizes'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Insert Bartending Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Jigger', 'jigger', 'Double-sided measuring tool for spirits', 'beginner', ARRAY['Use a jigger for accurate pours', 'The jigger measures 1 oz and 2 oz'], NOW(), NOW()),
    (gen_random_uuid(), 'Muddler', 'muddler', 'Tool for crushing fruits and herbs', 'beginner', ARRAY['Muddle gently to release oils', 'The wooden muddler works best'], NOW(), NOW()),
    (gen_random_uuid(), 'Shaker', 'shaker', 'Container for mixing drinks with ice', 'beginner', ARRAY['Shake vigorously for 10-15 seconds', 'Boston shakers are professional standard'], NOW(), NOW()),
    (gen_random_uuid(), 'Strainer', 'strainer', 'Tool preventing ice from entering the glass', 'beginner', ARRAY['Use a strainer for smooth cocktails', 'Hawthorne strainers are most common'], NOW(), NOW()),
    (gen_random_uuid(), 'Double Strain', 'double-strain', 'Using two strainers for ultra-smooth cocktails', 'intermediate', ARRAY['Double strain removes all particles', 'Use fine mesh for double straining'], NOW(), NOW()),
    (gen_random_uuid(), 'Neat', 'neat', 'Spirit served without ice or mixers', 'beginner', ARRAY['He ordered whiskey neat', 'Neat spirits show pure flavor'], NOW(), NOW()),
    (gen_random_uuid(), 'On the Rocks', 'on-the-rocks', 'Served over ice cubes', 'beginner', ARRAY['Scotch on the rocks please', 'Ice dilutes and chills the spirit'], NOW(), NOW()),
    (gen_random_uuid(), 'Up', 'up', 'Chilled but served without ice', 'intermediate', ARRAY['Martini up is the classic preparation', 'Up drinks are strained into chilled glasses'], NOW(), NOW()),
    (gen_random_uuid(), 'Straight Up', 'straight-up', 'Chilled and strained, no garnish', 'intermediate', ARRAY['Vodka straight up is very clean', 'Straight up means no additions'], NOW(), NOW()),
    (gen_random_uuid(), 'Dirty', 'dirty', 'With olive brine added', 'intermediate', ARRAY['Dirty martini uses olive juice', 'Extra dirty has more brine'], NOW(), NOW()),
    (gen_random_uuid(), 'Dry (Cocktail)', 'dry-cocktail', 'Less sweet vermouth in cocktail', 'intermediate', ARRAY['Dry martini uses minimal vermouth', 'Dry cocktails are less sweet'], NOW(), NOW()),
    (gen_random_uuid(), 'Wet', 'wet', 'More sweet vermouth in cocktail', 'intermediate', ARRAY['Wet martini has extra vermouth', 'Wet Manhattan is sweeter'], NOW(), NOW()),
    (gen_random_uuid(), 'Perfect', 'perfect', 'Equal parts sweet and dry vermouth', 'advanced', ARRAY['Perfect Manhattan balances vermouths', 'Perfect cocktails are well-balanced'], NOW(), NOW()),
    (gen_random_uuid(), 'Float', 'float', 'Layer ingredient on top of drink', 'intermediate', ARRAY['Float cream on Irish coffee', 'Pour slowly over spoon to float'], NOW(), NOW()),
    (gen_random_uuid(), 'Rinse', 'rinse', 'Coating glass interior with spirit', 'advanced', ARRAY['Rinse glass with absinthe', 'Rinse adds aromatic layer'], NOW(), NOW()),
    (gen_random_uuid(), 'Express', 'express', 'Releasing citrus oils over drink', 'intermediate', ARRAY['Express lemon peel over martini', 'Express oils add fresh aroma'], NOW(), NOW()),
    (gen_random_uuid(), 'Rim', 'rim', 'Coating glass edge with salt or sugar', 'beginner', ARRAY['Rim margarita glass with salt', 'Use lime juice to make rim stick'], NOW(), NOW()),
    (gen_random_uuid(), 'Build (Cocktail)', 'build-cocktail', 'Constructing drink directly in serving glass', 'beginner', ARRAY['Build the drink over ice', 'Simple drinks are built not shaken'], NOW(), NOW()),
    (gen_random_uuid(), 'Stir', 'stir', 'Mixing method for spirit-forward cocktails', 'intermediate', ARRAY['Stir martinis don''t shake them', 'Stirring maintains clarity'], NOW(), NOW()),
    (gen_random_uuid(), 'Shake', 'shake', 'Vigorous mixing method with ice', 'beginner', ARRAY['Shake drinks with citrus', 'Shaking aerates and chills'], NOW(), NOW()),
    (gen_random_uuid(), 'Garnish', 'garnish', 'Decorative and aromatic final touch', 'beginner', ARRAY['Garnish adds visual appeal', 'The garnish should complement flavors'], NOW(), NOW()),
    (gen_random_uuid(), 'Twist', 'twist', 'Citrus peel garnish expressing oils', 'intermediate', ARRAY['Lemon twist adds bright aroma', 'Express the twist over the drink'], NOW(), NOW()),
    (gen_random_uuid(), 'Back', 'back', 'Chaser or side drink', 'beginner', ARRAY['Beer back with whiskey shot', 'Water back helps pace drinking'], NOW(), NOW()),
    (gen_random_uuid(), 'Call', 'call', 'Drink ordered with specific brand', 'beginner', ARRAY['Call drink costs more than well', 'Tanqueray gin is a call'], NOW(), NOW()),
    (gen_random_uuid(), 'Well', 'well', 'House brand spirits', 'beginner', ARRAY['Well drinks use house brands', 'Well spirits are most affordable'], NOW(), NOW()),
    (gen_random_uuid(), 'Top Shelf', 'top-shelf', 'Premium spirits', 'intermediate', ARRAY['Top shelf whiskey costs more', 'Top shelf indicates quality'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Woodworking)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, woodworking_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('grain', 'crosscut', 'rip-cut', 'mortise', 'tenon', 'dovetail', 'dado', 'rabbet', 'biscuit-joint', 'chamfer', 'bevel', 'kerf', 'planing', 'sanding', 'finish', 'stain', 'glue-up', 'clamp', 'jig', 'template', 'pocket-hole', 'hardwood', 'softwood', 'figure', 'end-grain')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = woodworking_id);
    
    -- Link terms to categories (Wine Making)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, winemaking_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('must', 'fermentation', 'yeast', 'brix', 'malolactic', 'racking', 'lees', 'sulfites', 'clarification', 'filtration', 'crush', 'press-wine', 'maceration', 'tannins', 'punch-down', 'cap', 'barrel-aging', 'topping', 'blending', 'vintage', 'terroir', 'cold-soak', 'degassing', 'hydrometer', 'acid-test')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = winemaking_id);
    
    -- Link terms to categories (Wine Tasting)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, winetasting_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('nose', 'bouquet', 'palate', 'finish-wine', 'body', 'tannins-tasting', 'acidity', 'balance-wine', 'complexity', 'minerality', 'legs', 'decanting', 'breathing', 'vintage-tasting', 'varietal', 'blend', 'terroir-tasting', 'oak', 'fruit-forward', 'earthy', 'spicy', 'crisp', 'smooth', 'dry', 'sweet')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = winetasting_id);
    
    -- Link terms to categories (Web Design)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, webdesign_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('responsive', 'wireframe', 'mockup', 'prototype', 'user-experience', 'user-interface', 'typography', 'color-palette', 'grid-system', 'white-space', 'hierarchy', 'navigation', 'call-to-action', 'landing-page', 'above-the-fold', 'accessibility', 'seo', 'load-time', 'conversion-rate', 'ab-testing', 'breadcrumbs', 'sidebar', 'footer', 'header-web', 'favicon')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = webdesign_id);
    
    -- Link terms to categories (Bartending)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, bartending_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('jigger', 'muddler', 'shaker', 'strainer', 'double-strain', 'neat', 'on-the-rocks', 'up', 'straight-up', 'dirty', 'dry-cocktail', 'wet', 'perfect', 'float', 'rinse', 'express', 'rim', 'build-cocktail', 'stir', 'shake', 'garnish', 'twist', 'back', 'call', 'well', 'top-shelf')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = bartending_id);
    
END $$;