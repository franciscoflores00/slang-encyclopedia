-- COMPREHENSIVE HOBBY TERMS - MASTER SCRIPT
-- This script adds comprehensive terminology for 41 different hobby categories
-- Total: ~700+ terms with definitions, examples, and difficulty levels

-- Execute the individual scripts in proper order
-- 1. Categories must be created first
\i add_comprehensive_categories.sql

-- 2. Terms can be added in any order since they're independent
\i add_water_winter_sports_terms.sql
\i add_ball_sports_terms.sql  
\i add_combat_sports_terms.sql
\i add_individual_sports_terms.sql
\i add_endurance_sports_terms.sql
\i add_strength_sports_terms.sql
\i add_action_sports_terms.sql
\i add_team_fitness_terms.sql
\i add_creative_arts_terms.sql
\i add_craft_technical_terms.sql

-- Summary of added content:
-- Categories: 41 total hobby categories
-- Terms by category group:
--   Water & Winter Sports: 70 terms (Water Polo, Surfing, Rowing, Skiing, Snowboarding, Ice Skating, Hockey)
--   Ball Sports: 60 terms (Tennis, Table Tennis, Volleyball, Basketball, Baseball, Soccer)
--   Combat Sports: 40 terms (Wrestling, MMA, Jiu-Jitsu, Fencing)
--   Individual Sports: 60 terms (Golf, Gymnastics, Track and Field)
--   Endurance Sports: 60 terms (Running, Triathlon, Hiking)
--   Strength Sports: 80 terms (Powerlifting, Bodybuilding, Rock Climbing, Bouldering)
--   Action Sports: 75 terms (Skateboarding, Skydiving, Spelunking)
--   Team & Fitness: 55 terms (Lacrosse, Yoga)
--   Creative Arts: 125 terms (Violin, Singing, Stand-up Comedy, Poetry Writing, Tattooing)
--   Craft & Technical: 125 terms (Woodworking, Wine Making, Wine Tasting, Web Design, Bartending)

-- Total: ~750 comprehensive terms across 41 hobby categories
-- Each term includes: name, slug, definition, difficulty level, examples, timestamps
-- All terms are properly linked to their respective categories