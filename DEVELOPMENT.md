# Development Guide

## Development Commands

- `npm run dev` - Start development server (http://localhost:3000/young-ladys-primer)
- `npm run build` - Build for production
- `npm run export` - Build static export with .nojekyll
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run start` - Start production server
- `npm run lint` - Run linting

**Development Workflow:**
- Keep the dev server running during active development (don't kill it between tasks)
- The dev server auto-reloads on file changes
- Only stop it when explicitly finishing a development session

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

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed file structure and development guidelines.

## Technical Stack

- React 18 with Next.js 14
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for state management

## Adding New Content

### New Story Arc
1. Create folder in `src/content/stories/new-story/`
2. Add story files
3. Create index.js
4. Register in main content index

### New Lesson Series
1. Create folder in `src/content/lessons/topic/`
2. Follow same pattern as story arcs
3. Register in content index

### Story Format
Each story exports object with:
- `title` - Story page title
- `content` - Function that returns story text (can use reader's name)
- `choices` - Array of choice objects with text and target page IDs

## Versioning

This project follows **semantic versioning (semver)**: MAJOR.MINOR.PATCH

- **MAJOR** (1.x.x): Breaking changes or major feature overhauls
  - Complete UI redesign, fundamental architecture changes, new target age groups
- **MINOR** (x.1.x): New features that don't break existing functionality
  - New story arcs, new educational topics, major new features (save/load, audio)
- **PATCH** (x.x.1): Bug fixes, small improvements, content additions
  - New story branches within existing arcs, ESLint setup, minor fixes

**Current version:** Check `package.json`

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

## Project Management

### Next Steps / TODO

- Add more dragon story branches and lesson content
- Expand puzzle system with additional challenges
- Consider adding save/load functionality for longer reading sessions
- Explore audio narration for accessibility

### Maintaining Documentation

Periodically review and clean up documentation files when:
- Several major features have been completed (check git history)
- "Next Steps/TODO" items are mostly done
- "Key Features" no longer reflects current capabilities
- Implementation details in any section become outdated

Keep documentation focused on what's actively relevant for ongoing development, not project history.
