# Young Lady's Primer

## Project Overview
An interactive educational primer inspired by Neal Stephenson's "Diamond Age". This React/Next.js application presents adaptive educational content through branching narratives, lessons, and interactive elements. The Primer adjusts to the reader and provides personalized learning experiences through stories about Princess Aria and her adventures with nanotechnology, mechanical dragons, and scientific discovery.

See `README.md` for more detailed goals and intentions. For example:

## Vision
This isn't just a tech demo or story app - it's specifically designed to empower young women through interactive choice-driven narratives that teach both knowledge and confidence. Every feature should serve these goals:
### Goals
- To instill young girls with a sense of agency 
- To encourage them to go out into the world and live their knowledge through experience
- To express their power through their own choices

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run linting (needs ESLint setup)

## Current Architecture
Content-driven architecture with clear separation of concerns:
- **UI Layer**: `src/YoungLadysPrimer.js` handles rendering and user interactions only
- **Content Layer**: `src/content/` contains all stories, lessons, and educational material
- **Logic Layer**: `src/hooks/` manages navigation, state, and business logic

See `ARCHITECTURE.md` for detailed file structure and development guidelines.

## Key Features
- Branching interactive narratives
- Personalized content using reader's name
- Modular content system for easy expansion
- Story progress tracking with localStorage persistence
- Navigation history across browser sessions
- Responsive Victorian manuscript-style design

## Important Notes
- Default reader name is 'Aria' (changed from 'Nell')
- Content uses function-based templates for personalization: `content: (readerName) => template`
- All story branches organized by theme in separate folders
- Main component focuses purely on UI rendering
- Navigation handled by `useStoryNavigation` custom hook

## Content Organization
- `content/core/` - Welcome screen and system navigation
- `content/stories/dragon-story/` - Mechanical dragon story arc with multiple branches
- `content/lessons/nanotechnology/` - Educational content about molecular science
- `content/puzzles/` - Interactive challenges (future expansion)

## Recent Changes
- Refactored monolithic component to separate content from rendering
- Created organized content system with stories/lessons/puzzles structure
- Added useStoryNavigation hook for state management
- Simplified name handling by using 'Aria' as default
- Added comprehensive ARCHITECTURE.md documentation

## Adding New Content
1. **New Story Arc**: Create folder in `src/content/stories/new-story/`, add story files, create index.js, register in main content index
2. **New Lesson Series**: Create folder in `src/content/lessons/topic/`, follow same pattern
3. **Story Format**: Each story exports object with `title`, `content` function, and `choices` array

## Next Steps / TODO
- Add more dragon story branches (engineering paths, curse research, etc.)
- Implement puzzle system with logic challenges
- Add lesson content for other scientific topics
- Consider adding save/load functionality for longer reading sessions
- Add story completion tracking and achievements
- Explore audio narration for accessibility

## Versioning
This project follows **semantic versioning (semver)**: MAJOR.MINOR.PATCH

- **MAJOR** (1.x.x): Breaking changes or major feature overhauls
  - Complete UI redesign, fundamental architecture changes, new target age groups
- **MINOR** (x.1.x): New features that don't break existing functionality  
  - New story arcs, new educational topics, major new features (save/load, audio)
- **PATCH** (x.x.1): Bug fixes, small improvements, content additions
  - New story branches within existing arcs, ESLint setup, minor fixes

**Current version:** 1.0.0 (check `package.json`)

**When to bump versions:**
- Adding story branches = patch (1.0.1)
- Adding puzzles system = minor (1.1.0) 
- Major UI overhaul = major (2.0.0)

## Code Documentation Standards
This project maintains high documentation standards to ensure readability and maintainability. All code should be self-documenting through comprehensive comments and clear naming.

See `src/YoungLadysPrimer.tsx` for an example of proper file-level documentation, function comments, and inline explanations.

## Technical Stack
- React 18 with Next.js 14
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for state management