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
- `npm run dev` - Start development server (http://localhost:3000/young-ladys-primer)
- `npm run build` - Build for production
- `npm run export` - Build static export with .nojekyll
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Deployment
Live site: https://garrettmoss.github.io/young-ladys-primer/

To deploy updates:
1. Test locally with `npm run dev`
2. When ready: `npm run deploy`
3. Changes go live in ~1 minute

## Current Architecture
Content-driven architecture with clear separation of concerns:
- **UI Layer**: `src/YoungLadysPrimer.tsx` handles rendering and user interactions only
- **Content Layer**: `src/content/` contains all stories, lessons, and educational material
- **Logic Layer**: `src/hooks/` manages navigation, state, and business logic

See `ARCHITECTURE.md` for detailed file structure and development guidelines.

## Key Features
- Branching interactive narratives with choice-driven progression
- Personalized content using reader's name
- Story progress tracking with localStorage persistence
- Back navigation and navigation history
- Responsive Victorian manuscript-style design
- TypeScript for type safety and better developer experience

## Content Organization
- `content/core/` - Welcome screen and system navigation
- `content/stories/dragon-story/` - Mechanical dragon story arc with multiple branches
- `content/lessons/nanotechnology/` - Educational content about molecular science
- `content/puzzles/` - Interactive molecular lock puzzle system

## Adding New Content
1. **New Story Arc**: Create folder in `src/content/stories/new-story/`, add story files, create index.js, register in main content index
2. **New Lesson Series**: Create folder in `src/content/lessons/topic/`, follow same pattern
3. **Story Format**: Each story exports object with `title`, `content` function, and `choices` array

## Maintaining This File
Periodically review and clean up this CLAUDE.md file when:
- Several major features have been completed (check git history)
- "Next Steps/TODO" items are mostly done
- "Key Features" no longer reflects current capabilities
- Implementation details in any section become outdated

Keep it focused on what's actively relevant for ongoing development, not project history.

## Next Steps / TODO
- Add more dragon story branches and lesson content
- Expand puzzle system with additional challenges
- Consider adding save/load functionality for longer reading sessions
- Explore audio narration for accessibility

## Versioning
This project follows **semantic versioning (semver)**: MAJOR.MINOR.PATCH

- **MAJOR** (1.x.x): Breaking changes or major feature overhauls
  - Complete UI redesign, fundamental architecture changes, new target age groups
- **MINOR** (x.1.x): New features that don't break existing functionality  
  - New story arcs, new educational topics, major new features (save/load, audio)
- **PATCH** (x.x.1): Bug fixes, small improvements, content additions
  - New story branches within existing arcs, ESLint setup, minor fixes

**Current version:** 1.0.2 (check `package.json`)

**When to bump versions:**
- Adding story branches = patch (1.0.1)
- Adding puzzles system = minor (1.1.0) 
- Major UI overhaul = major (2.0.0)

## Code Documentation Standards
This project maintains high documentation standards to ensure readability and maintainability. All code should be self-documenting through comprehensive comments and clear naming.

See `src/YoungLadysPrimer.tsx` for an example of proper file-level documentation, function comments, and inline explanations.

## Commit Message Standards
Use conventional commit format with detailed body for clear, scannable git history:

**Format**:
```
<type>: <concise title>

- Detailed explanation point 1
- Detailed explanation point 2
- More context as needed
```

**Types**:
- `feat:` - New features or capabilities
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - UI/styling changes
- `refactor:` - Code improvements without changing functionality
- `test:` - Adding or updating tests

**Example**:
```
docs: clean up project documentation

- Remove outdated TODOs and completed items from CLAUDE.md
- Update ARCHITECTURE.md file extensions and features
- Move implemented features from "coming soon" to main README
- Streamline README features to highlight compelling capabilities

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Communication Style
Be direct and honest. Don't reflexively agree or say "you're absolutely right" when the human could easily be wrong. Challenge ideas that seem off-track, premature, or impractical.

Be cautiously optimistic about capabilities - some things may not be as easy or doable as they initially appear, especially for an LLM. Acknowledge limitations honestly.

Aim to be a solid collaborator, not a sycophantic assistant. Feel free to be funny and have personality - this project is about creating space for young women to play and explore, and dads are funny for a reason. Balance seriousness with levity.

## Technical Stack
- React 18 with Next.js 14
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for state management