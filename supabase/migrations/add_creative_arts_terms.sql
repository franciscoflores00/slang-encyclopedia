-- Comprehensive terms for creative arts: Violin, Singing, Stand-up Comedy, Poetry Writing, Tattooing
DO $$
DECLARE
    violin_id UUID;
    singing_id UUID;
    comedy_id UUID;
    poetry_id UUID;
    tattooing_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO violin_id FROM categories WHERE slug = 'violin';
    SELECT id INTO singing_id FROM categories WHERE slug = 'singing';
    SELECT id INTO comedy_id FROM categories WHERE slug = 'stand-up-comedy';
    SELECT id INTO poetry_id FROM categories WHERE slug = 'poetry-writing';
    SELECT id INTO tattooing_id FROM categories WHERE slug = 'tattooing';
    
    -- Insert Violin Terms
    INSERT INTO terms (id, name, slug, definition, difficulty, examples, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Bow', 'bow', 'Long rod with horsehair used to play violin strings', 'beginner', ARRAY['Hold the bow with relaxed grip', 'The bow needs rosin regularly'], NOW(), NOW()),
    (gen_random_uuid(), 'Rosin', 'rosin', 'Resin applied to bow hair for proper grip on strings', 'beginner', ARRAY['Apply rosin before each practice', 'Too much rosin creates scratchy sound'], NOW(), NOW()),
    (gen_random_uuid(), 'Bridge (Violin)', 'bridge-violin', 'Wooden piece supporting strings above soundboard', 'intermediate', ARRAY['The bridge position affects tone', 'Never move the bridge yourself'], NOW(), NOW()),
    (gen_random_uuid(), 'Sound Post', 'sound-post', 'Internal wooden dowel affecting violin resonance', 'advanced', ARRAY['Sound post adjustment requires expertise', 'The sound post fell during transport'], NOW(), NOW()),
    (gen_random_uuid(), 'Fingerboard', 'fingerboard', 'Smooth wooden surface where fingers press strings', 'beginner', ARRAY['Keep fingerboard clean and smooth', 'The fingerboard needs occasional planing'], NOW(), NOW()),
    (gen_random_uuid(), 'Chin Rest', 'chin-rest', 'Support piece for holding violin against jaw', 'beginner', ARRAY['Adjust chin rest for comfort', 'Different chin rest styles suit different necks'], NOW(), NOW()),
    (gen_random_uuid(), 'Shoulder Rest', 'shoulder-rest', 'Padded support attached under violin', 'beginner', ARRAY['Shoulder rests help with posture', 'Some players prefer no shoulder rest'], NOW(), NOW()),
    (gen_random_uuid(), 'First Position', 'first-position', 'Basic hand position on violin neck', 'beginner', ARRAY['Master first position thoroughly', 'Most beginner music uses first position'], NOW(), NOW()),
    (gen_random_uuid(), 'Shifting', 'shifting', 'Moving hand to different positions on fingerboard', 'intermediate', ARRAY['Smooth shifting takes practice', 'The shift to third position'], NOW(), NOW()),
    (gen_random_uuid(), 'Vibrato (Violin)', 'vibrato', 'Oscillating pitch technique for expression', 'advanced', ARRAY['Vibrato adds warmth to tone', 'Develop vibrato gradually'], NOW(), NOW()),
    (gen_random_uuid(), 'Double Stop', 'double-stop', 'Playing two notes simultaneously', 'advanced', ARRAY['Double stops require precise intonation', 'The double stop passage was challenging'], NOW(), NOW()),
    (gen_random_uuid(), 'Pizzicato', 'pizzicato', 'Plucking strings with finger instead of bow', 'intermediate', ARRAY['Pizzicato creates distinct articulation', 'The pizzicato section was delicate'], NOW(), NOW()),
    (gen_random_uuid(), 'Arco', 'arco', 'Playing with the bow after pizzicato', 'intermediate', ARRAY['Return to arco playing', 'The arco entrance was smooth'], NOW(), NOW()),
    (gen_random_uuid(), 'Sul Ponticello', 'sul-ponticello', 'Bowing near bridge for glassy tone', 'advanced', ARRAY['Sul ponticello creates eerie effects', 'The sul ponticello passage was haunting'], NOW(), NOW()),
    (gen_random_uuid(), 'Sul Tasto', 'sul-tasto', 'Bowing over fingerboard for soft tone', 'advanced', ARRAY['Sul tasto produces ethereal sound', 'Use sul tasto for gentle passages'], NOW(), NOW()),
    (gen_random_uuid(), 'Legato', 'legato', 'Smooth, connected playing style', 'intermediate', ARRAY['Practice legato bow changes', 'The legato phrasing was beautiful'], NOW(), NOW()),
    (gen_random_uuid(), 'Staccato', 'staccato', 'Short, detached playing style', 'intermediate', ARRAY['Crisp staccato articulation', 'The staccato notes danced'], NOW(), NOW()),
    (gen_random_uuid(), 'Spiccato', 'spiccato', 'Bounced bow technique off string', 'advanced', ARRAY['Spiccato requires bow control', 'The spiccato passage was light'], NOW(), NOW()),
    (gen_random_uuid(), 'Tremolo', 'tremolo', 'Rapid back-and-forth bowing motion', 'advanced', ARRAY['Tremolo builds dramatic tension', 'The tremolo created excitement'], NOW(), NOW()),
    (gen_random_uuid(), 'Harmonics', 'harmonics', 'High, flute-like tones created by light finger pressure', 'advanced', ARRAY['Natural harmonics ring clearly', 'The harmonic series fascinated her'], NOW(), NOW()),
    (gen_random_uuid(), 'Intonation', 'intonation', 'Accuracy of pitch and tuning', 'intermediate', ARRAY['Good intonation takes practice', 'Her intonation was spot-on'], NOW(), NOW()),
    (gen_random_uuid(), 'Bow Hold', 'bow-hold', 'Proper grip and position for holding bow', 'beginner', ARRAY['Correct bow hold is fundamental', 'Relax your bow hold'], NOW(), NOW()),
    (gen_random_uuid(), 'Open String', 'open-string', 'Playing string without finger pressure', 'beginner', ARRAY['Tune using open strings', 'The open G string resonated'], NOW(), NOW()),
    (gen_random_uuid(), 'Fine Tuners', 'fine-tuners', 'Small adjusters for precise string tuning', 'beginner', ARRAY['Use fine tuners for small adjustments', 'The E string fine tuner slipped'], NOW(), NOW()),
    (gen_random_uuid(), 'Mute', 'mute', 'Device placed on bridge to dampen sound', 'intermediate', ARRAY['Practice mute reduces volume', 'The mute created mysterious tone'], NOW(), NOW()),
    
    -- Insert Singing Terms
    (gen_random_uuid(), 'Diaphragm', 'diaphragm', 'Primary muscle used for breath support in singing', 'beginner', ARRAY['Breathe from your diaphragm', 'Diaphragm control improves power'], NOW(), NOW()),
    (gen_random_uuid(), 'Head Voice', 'head-voice', 'Upper register resonating in head cavity', 'intermediate', ARRAY['Access your head voice gently', 'Head voice feels light and floating'], NOW(), NOW()),
    (gen_random_uuid(), 'Chest Voice', 'chest-voice', 'Lower register resonating in chest cavity', 'beginner', ARRAY['Chest voice has rich, full tone', 'Don''t strain your chest voice'], NOW(), NOW()),
    (gen_random_uuid(), 'Mixed Voice', 'mixed-voice', 'Blended chest and head voice registers', 'advanced', ARRAY['Mixed voice allows seamless range', 'Developing mixed voice takes time'], NOW(), NOW()),
    (gen_random_uuid(), 'Vibrato (Singing)', 'vibrato-singing', 'Natural oscillation in sustained tones', 'intermediate', ARRAY['Healthy vibrato develops naturally', 'Too much vibrato sounds shaky'], NOW(), NOW()),
    (gen_random_uuid(), 'Falsetto', 'falsetto', 'Light, breathy upper register in male voices', 'intermediate', ARRAY['Falsetto creates ethereal quality', 'His falsetto was pure and clear'], NOW(), NOW()),
    (gen_random_uuid(), 'Belting', 'belting', 'Powerful singing in chest voice at high pitches', 'advanced', ARRAY['Belting requires proper technique', 'She belted that high note perfectly'], NOW(), NOW()),
    (gen_random_uuid(), 'Vocal Fry', 'vocal-fry', 'Low, creaky voice production', 'intermediate', ARRAY['Avoid excessive vocal fry', 'Vocal fry can indicate fatigue'], NOW(), NOW()),
    (gen_random_uuid(), 'Pitch (Singing)', 'pitch-singing', 'Highness or lowness of musical tone', 'beginner', ARRAY['Match the pitch accurately', 'Her pitch was perfectly centered'], NOW(), NOW()),
    (gen_random_uuid(), 'Range', 'range', 'Span from lowest to highest singable note', 'beginner', ARRAY['Extend your range gradually', 'His range spans three octaves'], NOW(), NOW()),
    (gen_random_uuid(), 'Warm-up (Singing)', 'warm-up-singing', 'Vocal exercises preparing voice for singing', 'beginner', ARRAY['Always warm up before performing', 'The warm-up routine was thorough'], NOW(), NOW()),
    (gen_random_uuid(), 'Cool-down (Singing)', 'cool-down-singing', 'Gentle exercises after singing session', 'beginner', ARRAY['Cool-down prevents vocal fatigue', 'Don''t skip your vocal cool-down'], NOW(), NOW()),
    (gen_random_uuid(), 'Breath Support', 'breath-support', 'Controlled use of air for sustained singing', 'intermediate', ARRAY['Breath support is fundamental', 'Strong breath support powers high notes'], NOW(), NOW()),
    (gen_random_uuid(), 'Resonance', 'resonance', 'Amplification of voice in body cavities', 'intermediate', ARRAY['Find your natural resonance', 'Good resonance projects the voice'], NOW(), NOW()),
    (gen_random_uuid(), 'Diction', 'diction', 'Clear pronunciation of words while singing', 'intermediate', ARRAY['Crisp diction conveys lyrics', 'Her diction was crystal clear'], NOW(), NOW()),
    (gen_random_uuid(), 'Phrasing', 'phrasing', 'Musical shaping of lyrical lines', 'advanced', ARRAY['Musical phrasing tells the story', 'His phrasing was deeply expressive'], NOW(), NOW()),
    (gen_random_uuid(), 'Dynamics', 'dynamics', 'Volume variations in vocal performance', 'intermediate', ARRAY['Use dynamics for expression', 'The dynamics created emotional impact'], NOW(), NOW()),
    (gen_random_uuid(), 'Vocal Cords', 'vocal-cords', 'Tissue folds producing voice in larynx', 'beginner', ARRAY['Protect your vocal cords', 'Hydration helps vocal cord health'], NOW(), NOW()),
    (gen_random_uuid(), 'Larynx', 'larynx', 'Voice box containing vocal cords', 'intermediate', ARRAY['Keep larynx relaxed while singing', 'The larynx houses vocal production'], NOW(), NOW()),
    (gen_random_uuid(), 'Passaggio', 'passaggio', 'Transition zone between vocal registers', 'advanced', ARRAY['Navigate the passaggio smoothly', 'The passaggio requires special technique'], NOW(), NOW()),
    (gen_random_uuid(), 'Vocal Break', 'vocal-break', 'Sudden register change or crack', 'intermediate', ARRAY['Avoid forcing through vocal breaks', 'The vocal break was noticeable'], NOW(), NOW()),
    (gen_random_uuid(), 'Riff', 'riff', 'Vocal embellishment with rapid note changes', 'advanced', ARRAY['Her riff was technically impressive', 'Practice riffs slowly first'], NOW(), NOW()),
    (gen_random_uuid(), 'Run', 'run', 'Fast sequence of notes on single syllable', 'advanced', ARRAY['The run showcased her agility', 'Vocal runs require precision'], NOW(), NOW()),
    (gen_random_uuid(), 'Melisma', 'melisma', 'Multiple notes sung on single syllable', 'advanced', ARRAY['The melisma was beautifully ornamented', 'Classical melismas require control'], NOW(), NOW()),
    (gen_random_uuid(), 'Vocal Fatigue', 'vocal-fatigue', 'Tiredness and strain in voice', 'beginner', ARRAY['Rest when experiencing vocal fatigue', 'Vocal fatigue signals overuse'], NOW(), NOW()),
    
    -- Insert Stand-up Comedy Terms
    (gen_random_uuid(), 'Bit', 'bit', 'Individual joke or comedic segment', 'beginner', ARRAY['That bit always gets laughs', 'Work on your strongest bits first'], NOW(), NOW()),
    (gen_random_uuid(), 'Set (Comedy)', 'set-comedy', 'Complete comedic performance of specific length', 'beginner', ARRAY['His five-minute set killed', 'Prepare a tight 20-minute set'], NOW(), NOW()),
    (gen_random_uuid(), 'Punchline', 'punchline', 'Climactic part of joke that creates laughter', 'beginner', ARRAY['The punchline was unexpected', 'Strong punchlines get big laughs'], NOW(), NOW()),
    (gen_random_uuid(), 'Setup', 'setup', 'Beginning part of joke establishing context', 'beginner', ARRAY['The setup was too long', 'Clear setups help punchlines land'], NOW(), NOW()),
    (gen_random_uuid(), 'Callback', 'callback', 'Reference to earlier joke or premise', 'intermediate', ARRAY['The callback brought the house down', 'Callbacks create cohesive sets'], NOW(), NOW()),
    (gen_random_uuid(), 'Tag', 'tag', 'Additional punchline extending original joke', 'intermediate', ARRAY['Add tags to milk more laughs', 'The tag was funnier than the original'], NOW(), NOW()),
    (gen_random_uuid(), 'Crowd Work', 'crowd-work', 'Improvised interaction with audience members', 'advanced', ARRAY['His crowd work was masterful', 'Crowd work can save a tough room'], NOW(), NOW()),
    (gen_random_uuid(), 'Heckler', 'heckler', 'Disruptive audience member interrupting performance', 'intermediate', ARRAY['Handle hecklers professionally', 'The heckler was quickly shut down'], NOW(), NOW()),
    (gen_random_uuid(), 'Bombing', 'bombing', 'Performing poorly with little audience response', 'intermediate', ARRAY['Every comic bombs sometimes', 'Bombing teaches you resilience'], NOW(), NOW()),
    (gen_random_uuid(), 'Killing', 'killing', 'Performing exceptionally well with strong audience response', 'intermediate', ARRAY['She was killing out there', 'That set was absolutely killing'], NOW(), NOW()),
    (gen_random_uuid(), 'Open Mic', 'open-mic', 'Performance opportunity for new or developing comics', 'beginner', ARRAY['Start at open mic nights', 'The open mic was packed'], NOW(), NOW()),
    (gen_random_uuid(), 'Bringer Show', 'bringer-show', 'Show requiring performers to bring audience members', 'intermediate', ARRAY['Avoid bringer shows when possible', 'The bringer show had no energy'], NOW(), NOW()),
    (gen_random_uuid(), 'Green Light', 'green-light', 'Audience signal showing engagement and enjoyment', 'intermediate', ARRAY['The green light meant keep going', 'She got the green light immediately'], NOW(), NOW()),
    (gen_random_uuid(), 'Red Light (Comedy)', 'red-light-comedy', 'Audience signal showing disengagement', 'intermediate', ARRAY['The red light came early', 'Pivot when you see red lights'], NOW(), NOW()),
    (gen_random_uuid(), 'Timing', 'timing', 'Rhythmic pacing of joke delivery', 'advanced', ARRAY['Comedy is all about timing', 'His timing was impeccable'], NOW(), NOW()),
    (gen_random_uuid(), 'Beat', 'beat', 'Pause allowing audience to process humor', 'intermediate', ARRAY['Hold the beat for effect', 'The beat made the joke land harder'], NOW(), NOW()),
    (gen_random_uuid(), 'Rule of Three', 'rule-of-three', 'Comedy structure with setup, reinforce, punchline', 'intermediate', ARRAY['The rule of three is classic structure', 'Use rule of three for reliable laughs'], NOW(), NOW()),
    (gen_random_uuid(), 'Premise', 'premise', 'Basic idea or concept underlying joke', 'intermediate', ARRAY['Strong premises generate multiple jokes', 'That premise has legs'], NOW(), NOW()),
    (gen_random_uuid(), 'Act Out', 'act-out', 'Physical demonstration within verbal joke', 'intermediate', ARRAY['The act out enhanced the story', 'Good act outs are economical'], NOW(), NOW()),
    (gen_random_uuid(), 'Callback Chain', 'callback-chain', 'Series of related callbacks throughout set', 'advanced', ARRAY['The callback chain was brilliant', 'Plan your callback chains carefully'], NOW(), NOW()),
    (gen_random_uuid(), 'Tight Five', 'tight-five', 'Five-minute set with only best material', 'intermediate', ARRAY['Polish your tight five', 'A tight five can book shows'], NOW(), NOW()),
    (gen_random_uuid(), 'Blue Material', 'blue-material', 'Explicit or adult-oriented comedy content', 'intermediate', ARRAY['Know your room before blue material', 'Her blue material was clever'], NOW(), NOW()),
    (gen_random_uuid(), 'Clean Comedy', 'clean-comedy', 'Family-friendly comedy without explicit content', 'beginner', ARRAY['Clean comedy opens more doors', 'His clean comedy was still edgy'], NOW(), NOW()),
    (gen_random_uuid(), 'Closer', 'closer', 'Strong final joke ending the set', 'intermediate', ARRAY['End with your best closer', 'The closer brought standing ovation'], NOW(), NOW()),
    (gen_random_uuid(), 'Opener (Comedy)', 'opener-comedy', 'First joke establishing tone and connection', 'intermediate', ARRAY['The opener sets the mood', 'Strong openers build confidence'], NOW(), NOW()),
    
    -- Insert Poetry Writing Terms
    (gen_random_uuid(), 'Meter', 'meter', 'Rhythmic pattern of stressed and unstressed syllables', 'intermediate', ARRAY['Iambic pentameter is common meter', 'The meter created musical flow'], NOW(), NOW()),
    (gen_random_uuid(), 'Rhyme Scheme', 'rhyme-scheme', 'Pattern of rhymes at end of lines', 'beginner', ARRAY['ABAB is a simple rhyme scheme', 'Experiment with different rhyme schemes'], NOW(), NOW()),
    (gen_random_uuid(), 'Free Verse', 'free-verse', 'Poetry without regular meter or rhyme', 'beginner', ARRAY['Free verse allows natural expression', 'Her free verse captured raw emotion'], NOW(), NOW()),
    (gen_random_uuid(), 'Blank Verse', 'blank-verse', 'Unrhymed iambic pentameter', 'advanced', ARRAY['Shakespeare used blank verse in plays', 'Blank verse feels conversational'], NOW(), NOW()),
    (gen_random_uuid(), 'Sonnet', 'sonnet', 'Fourteen-line poem with specific rhyme scheme', 'intermediate', ARRAY['The sonnet form is challenging', 'Italian and English sonnets differ'], NOW(), NOW()),
    (gen_random_uuid(), 'Haiku', 'haiku', 'Japanese three-line poem with 5-7-5 syllable pattern', 'beginner', ARRAY['Haiku captures single moments', 'The haiku evoked spring morning'], NOW(), NOW()),
    (gen_random_uuid(), 'Villanelle', 'villanelle', 'Complex form with repeated lines and rhymes', 'advanced', ARRAY['The villanelle requires precise repetition', 'Dylan Thomas mastered the villanelle'], NOW(), NOW()),
    (gen_random_uuid(), 'Metaphor', 'metaphor', 'Direct comparison between unlike things', 'beginner', ARRAY['Her metaphor was striking', 'Metaphors create vivid imagery'], NOW(), NOW()),
    (gen_random_uuid(), 'Simile', 'simile', 'Comparison using "like" or "as"', 'beginner', ARRAY['The simile clarified the image', 'Similes make abstract concrete'], NOW(), NOW()),
    (gen_random_uuid(), 'Alliteration', 'alliteration', 'Repetition of initial consonant sounds', 'beginner', ARRAY['Alliteration adds musical quality', 'The alliteration was playful'], NOW(), NOW()),
    (gen_random_uuid(), 'Assonance', 'assonance', 'Repetition of vowel sounds within words', 'intermediate', ARRAY['Assonance creates internal rhyme', 'The assonance was subtle but effective'], NOW(), NOW()),
    (gen_random_uuid(), 'Consonance', 'consonance', 'Repetition of consonant sounds within words', 'intermediate', ARRAY['Consonance provides texture', 'The consonance unified the stanza'], NOW(), NOW()),
    (gen_random_uuid(), 'Enjambment', 'enjambment', 'Line breaks that continue thought to next line', 'intermediate', ARRAY['Enjambment creates flow', 'The enjambment surprised readers'], NOW(), NOW()),
    (gen_random_uuid(), 'Caesura', 'caesura', 'Pause or break within line of poetry', 'advanced', ARRAY['The caesura created dramatic effect', 'Use caesura for emphasis'], NOW(), NOW()),
    (gen_random_uuid(), 'Volta', 'volta', 'Turning point or shift in poem', 'advanced', ARRAY['The volta changed the poem''s direction', 'Sonnets typically have a volta'], NOW(), NOW()),
    (gen_random_uuid(), 'Imagery', 'imagery', 'Vivid descriptive language appealing to senses', 'intermediate', ARRAY['Strong imagery engages readers', 'The imagery was hauntingly beautiful'], NOW(), NOW()),
    (gen_random_uuid(), 'Symbolism', 'symbolism', 'Use of objects to represent deeper meanings', 'intermediate', ARRAY['The symbolism was multilayered', 'Symbolism adds depth to poems'], NOW(), NOW()),
    (gen_random_uuid(), 'Personification', 'personification', 'Giving human qualities to non-human things', 'beginner', ARRAY['Personification brings objects alive', 'The personification was subtle'], NOW(), NOW()),
    (gen_random_uuid(), 'Synecdoche', 'synecdoche', 'Part representing whole or vice versa', 'advanced', ARRAY['All hands on deck uses synecdoche', 'Synecdoche creates efficient imagery'], NOW(), NOW()),
    (gen_random_uuid(), 'Metonymy', 'metonymy', 'Substituting associated word for actual thing', 'advanced', ARRAY['The crown for king is metonymy', 'Metonymy creates elegant substitution'], NOW(), NOW()),
    (gen_random_uuid(), 'Stanza', 'stanza', 'Group of lines forming unit of poem', 'beginner', ARRAY['Each stanza develops the theme', 'The final stanza was powerful'], NOW(), NOW()),
    (gen_random_uuid(), 'Couplet', 'couplet', 'Two consecutive rhyming lines', 'beginner', ARRAY['The couplet ended the poem', 'Heroic couplets use iambic pentameter'], NOW(), NOW()),
    (gen_random_uuid(), 'Quatrain', 'quatrain', 'Four-line stanza', 'beginner', ARRAY['Quatrains are very common', 'The quatrain rhymed ABAB'], NOW(), NOW()),
    (gen_random_uuid(), 'Refrain', 'refrain', 'Repeated line or phrase throughout poem', 'intermediate', ARRAY['The refrain unified the poem', 'Each stanza ended with the refrain'], NOW(), NOW()),
    (gen_random_uuid(), 'Anaphora', 'anaphora', 'Repetition of words at beginning of lines', 'intermediate', ARRAY['Anaphora creates powerful rhythm', 'The anaphora built intensity'], NOW(), NOW()),
    
    -- Insert Tattooing Terms
    (gen_random_uuid(), 'Needle', 'needle', 'Sharp point that punctures skin to deposit ink', 'beginner', ARRAY['Use fresh needles for each client', 'The needle configuration affects line quality'], NOW(), NOW()),
    (gen_random_uuid(), 'Machine', 'machine', 'Electric device powering tattoo needles', 'beginner', ARRAY['Tune your machine properly', 'Coil machines have different feel than rotary'], NOW(), NOW()),
    (gen_random_uuid(), 'Liner', 'liner', 'Machine setup for creating tattoo outlines', 'intermediate', ARRAY['The liner creates bold outlines', 'Adjust liner for different line weights'], NOW(), NOW()),
    (gen_random_uuid(), 'Shader', 'shader', 'Machine setup for filling and shading', 'intermediate', ARRAY['The shader fills large areas smoothly', 'Shader needles are grouped differently'], NOW(), NOW()),
    (gen_random_uuid(), 'Stencil', 'stencil', 'Transfer paper template for tattoo design', 'beginner', ARRAY['Apply stencil carefully', 'The stencil guides initial linework'], NOW(), NOW()),
    (gen_random_uuid(), 'Flash (Tattoo)', 'flash-tattoo', 'Pre-drawn tattoo designs displayed in shop', 'beginner', ARRAY['Flash art covers shop walls', 'Traditional flash never goes out of style'], NOW(), NOW()),
    (gen_random_uuid(), 'Custom Work', 'custom-work', 'Original tattoo design created for specific client', 'intermediate', ARRAY['Custom work costs more than flash', 'Her custom work was incredibly detailed'], NOW(), NOW()),
    (gen_random_uuid(), 'Line Work', 'line-work', 'Initial outlining phase of tattoo process', 'intermediate', ARRAY['Clean line work is essential', 'The line work took two hours'], NOW(), NOW()),
    (gen_random_uuid(), 'Shading', 'shading', 'Adding gradations and depth to tattoo', 'intermediate', ARRAY['Smooth shading requires practice', 'The shading brought the piece alive'], NOW(), NOW()),
    (gen_random_uuid(), 'Color Packing', 'color-packing', 'Saturating areas with solid color', 'intermediate', ARRAY['Color packing requires multiple passes', 'Consistent color packing prevents patchiness'], NOW(), NOW()),
    (gen_random_uuid(), 'Blowout', 'blowout', 'Ink spreading under skin creating fuzzy lines', 'advanced', ARRAY['Avoid blowouts with proper depth', 'The blowout ruined the fine details'], NOW(), NOW()),
    (gen_random_uuid(), 'Touch-up', 'touch-up', 'Minor corrections after initial healing', 'intermediate', ARRAY['Free touch-ups are standard', 'The touch-up perfected the piece'], NOW(), NOW()),
    (gen_random_uuid(), 'Healing', 'healing', 'Recovery process after getting tattooed', 'beginner', ARRAY['Proper healing preserves tattoo quality', 'Healing takes 2-4 weeks'], NOW(), NOW()),
    (gen_random_uuid(), 'Aftercare', 'aftercare', 'Instructions for tattoo care during healing', 'beginner', ARRAY['Follow aftercare instructions strictly', 'Good aftercare prevents infections'], NOW(), NOW()),
    (gen_random_uuid(), 'Ink', 'ink', 'Pigmented liquid deposited into skin', 'beginner', ARRAY['Quality ink lasts longer', 'Black ink holds best over time'], NOW(), NOW()),
    (gen_random_uuid(), 'Apprentice', 'apprentice', 'Student learning tattooing under master artist', 'intermediate', ARRAY['The apprentice practiced on pig skin', 'Apprenticeships last 1-3 years'], NOW(), NOW()),
    (gen_random_uuid(), 'Portfolio', 'portfolio', 'Collection of artist''s best tattoo work', 'intermediate', ARRAY['Review the artist''s portfolio carefully', 'Her portfolio showed consistent quality'], NOW(), NOW()),
    (gen_random_uuid(), 'Traditional Style', 'traditional-style', 'Classic American tattoo aesthetic with bold lines', 'intermediate', ARRAY['Traditional style uses limited colors', 'Sailor Jerry pioneered traditional style'], NOW(), NOW()),
    (gen_random_uuid(), 'Realism', 'realism', 'Photographic style achieving lifelike appearance', 'advanced', ARRAY['Realism requires exceptional skill', 'The portrait realism was stunning'], NOW(), NOW()),
    (gen_random_uuid(), 'Blackwork', 'blackwork', 'Tattoo style using only black ink', 'intermediate', ARRAY['Blackwork creates dramatic contrast', 'The blackwork mandala was intricate'], NOW(), NOW()),
    (gen_random_uuid(), 'Sleeve', 'sleeve', 'Large tattoo covering entire arm', 'advanced', ARRAY['The sleeve took multiple sessions', 'Full sleeves are major commitments'], NOW(), NOW()),
    (gen_random_uuid(), 'Cover-up', 'cover-up', 'New tattoo designed to hide existing one', 'advanced', ARRAY['Cover-ups require careful planning', 'The cover-up completely transformed the area'], NOW(), NOW()),
    (gen_random_uuid(), 'Session (Tattoo)', 'session-tattoo', 'Single appointment for tattoo work', 'beginner', ARRAY['The session lasted four hours', 'Large pieces require multiple sessions'], NOW(), NOW()),
    (gen_random_uuid(), 'Consultation', 'consultation', 'Initial meeting to discuss tattoo plans', 'beginner', ARRAY['Book a consultation first', 'The consultation covered placement and pricing'], NOW(), NOW()),
    (gen_random_uuid(), 'Placement', 'placement', 'Location on body where tattoo will be applied', 'intermediate', ARRAY['Placement affects design flow', 'Good placement follows body contours'], NOW(), NOW())
    ON CONFLICT (slug) DO NOTHING;
    
    -- Link terms to categories (Violin)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, violin_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('bow', 'rosin', 'bridge-violin', 'sound-post', 'fingerboard', 'chin-rest', 'shoulder-rest', 'first-position', 'shifting', 'vibrato', 'double-stop', 'pizzicato', 'arco', 'sul-ponticello', 'sul-tasto', 'legato', 'staccato', 'spiccato', 'tremolo', 'harmonics', 'intonation', 'bow-hold', 'open-string', 'fine-tuners', 'mute')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = violin_id);
    
    -- Link terms to categories (Singing)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, singing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('diaphragm', 'head-voice', 'chest-voice', 'mixed-voice', 'vibrato-singing', 'falsetto', 'belting', 'vocal-fry', 'pitch-singing', 'range', 'warm-up-singing', 'cool-down-singing', 'breath-support', 'resonance', 'diction', 'phrasing', 'dynamics', 'vocal-cords', 'larynx', 'passaggio', 'vocal-break', 'riff', 'run', 'melisma', 'vocal-fatigue')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = singing_id);
    
    -- Link terms to categories (Stand-up Comedy)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, comedy_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('bit', 'set-comedy', 'punchline', 'setup', 'callback', 'tag', 'crowd-work', 'heckler', 'bombing', 'killing', 'open-mic', 'bringer-show', 'green-light', 'red-light-comedy', 'timing', 'beat', 'rule-of-three', 'premise', 'act-out', 'callback-chain', 'tight-five', 'blue-material', 'clean-comedy', 'closer', 'opener-comedy')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = comedy_id);
    
    -- Link terms to categories (Poetry Writing)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, poetry_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('meter', 'rhyme-scheme', 'free-verse', 'blank-verse', 'sonnet', 'haiku', 'villanelle', 'metaphor', 'simile', 'alliteration', 'assonance', 'consonance', 'enjambment', 'caesura', 'volta', 'imagery', 'symbolism', 'personification', 'synecdoche', 'metonymy', 'stanza', 'couplet', 'quatrain', 'refrain', 'anaphora')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = poetry_id);
    
    -- Link terms to categories (Tattooing)
    INSERT INTO term_categories (id, term_id, category_id, is_primary, created_at)
    SELECT gen_random_uuid(), t.id, tattooing_id, true, NOW()
    FROM terms t 
    WHERE t.slug IN ('needle', 'machine', 'liner', 'shader', 'stencil', 'flash-tattoo', 'custom-work', 'line-work', 'shading', 'color-packing', 'blowout', 'touch-up', 'healing', 'aftercare', 'ink', 'apprentice', 'portfolio', 'traditional-style', 'realism', 'blackwork', 'sleeve', 'cover-up', 'session-tattoo', 'consultation', 'placement')
    AND NOT EXISTS (SELECT 1 FROM term_categories tc WHERE tc.term_id = t.id AND tc.category_id = tattooing_id);
    
END $$;