# Slang Encyclopedia

A comprehensive web application for slang and industry-specific vocabulary, built with Next.js and Supabase.

## Features

- 🔍 **Search functionality** - Find terms quickly with fuzzy matching
- 📚 **Category browsing** - Explore terms by industry/hobby categories  
- 📖 **Detailed term pages** - Complete definitions with examples, etymology, and related terms
- 🏷️ **Difficulty levels** - Terms marked as beginner, intermediate, or advanced
- 🔗 **Related terms** - Discover connected vocabulary
- 📱 **Responsive design** - Works great on desktop and mobile
- 🌙 **Dark mode support** - Automatic theme switching

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Ready for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd slang-encyclopedia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
- In your Supabase project dashboard, go to SQL Editor
- Run the SQL script from `lib/database.sql`

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Schema

The app uses three main tables:

- **categories** - Sport/hobby categories (cycling, running, etc.)
- **terms** - Vocabulary terms with definitions, examples, and metadata
- **term_relations** - Many-to-many relationships between related terms
- **contributions** - User-submitted content (for future features)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── category/[slug]/    # Category browse pages
│   ├── term/[id]/         # Individual term pages
│   ├── search/            # Search results page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility functions and configs
│   ├── database.sql       # Database schema
│   └── supabase.ts       # Supabase client setup
└── types/                # TypeScript type definitions
```

## Sample Data

The database includes sample terms from:
- 🚴‍♂️ Cycling (bonk, cadence)
- 🏃‍♂️ Running (negative split)  
- 🏊‍♂️🚴‍♀️🏃‍♂️ Triathlon (brick workout)

## Contributing

This project is designed to be easily extensible:

1. **Adding new categories**: Insert into the `categories` table
2. **Adding new terms**: Use the `terms` table with proper category relationships
3. **Linking related terms**: Use the `term_relations` table

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Future Enhancements

- User authentication and contributions
- Vote/rating system for term quality
- Advanced search filters
- Term of the day feature
- Pronunciation audio
- API endpoints for mobile apps# hobbipedia
# slang-encyclopedia
