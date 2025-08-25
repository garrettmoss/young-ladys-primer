# Young Lady's Primer - Project Architecture

## Overview
This project follows a content-driven architecture that separates presentation logic from educational content, making it easy to maintain, expand, and organize stories, lessons, and interactive elements.

## File Structure

```
young-ladys-primer/
├── ARCHITECTURE.md                     # Project structure & development guide
├── README.md                          # Project overview and setup
├── package.json                       # Dependencies and scripts
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
├── 
├── src/
│   ├── YoungLadysPrimer.js           # Main UI component (rendering only)
│   ├── index.css                     # Global styles
│   │
│   ├── content/                      # All educational content
│   │   ├── index.js                  # Master content registry & utilities
│   │   │
│   │   ├── core/                     # Core navigation & system content
│   │   │   └── welcome.js            # Welcome screen & lesson navigation
│   │   │
│   │   ├── stories/                  # Interactive story content
│   │   │   └── dragon-story/         # Mechanical dragon story arc
│   │   │       ├── index.js          # Story collection export
│   │   │       └── *.js              # Individual story branches & scenes
│   │   │
│   │   ├── lessons/                  # Educational content modules
│   │   │   └── nanotechnology/       # Molecular science lessons
│   │   │       ├── index.js          # Lesson collection export
│   │   │       └── *.js              # Individual lesson modules
│   │   │
│   │   └── puzzles/                  # Interactive puzzles & challenges
│   │       └── index.js              # (Future: logic puzzles, etc.)
│   │
│   ├── hooks/                        # React hooks for shared logic
│   │   └── useStoryNavigation.js     # Story progression & history tracking
│   │
│   └── utils/                        # Utility functions (future expansion)
│
├── pages/                            # Next.js pages (auto-generated structure)
├── public/                           # Static assets
└── ARCHIVE/                          # Previous iterations & prototypes
```

## Architecture Principles

### 1. Separation of Concerns
- **UI Layer** (`YoungLadysPrimer.js`): Handles rendering, styling, user interactions
- **Content Layer** (`content/`): Contains all stories, lessons, dialogue
- **Logic Layer** (`hooks/`): Manages navigation, state, and business logic

### 2. Content Organization
- **Hierarchical Structure**: Content grouped by type (stories/lessons/puzzles)
- **Modular Design**: Each story arc or lesson series in its own folder
- **Function-Based Content**: Content can be static or dynamic (using reader name)

### 3. Scalability
- **Easy Content Addition**: New stories/lessons added without touching UI code
- **Branching Narratives**: Each story branch in separate files for clarity
- **Lazy Loading Ready**: Structure supports future code-splitting optimizations

## Content Format

### Story Structure
```javascript
export const storyName = {
  story_key: {
    title: "Story Title",
    content: (readerName) => `Story content with ${readerName}...`,
    choices: [
      { text: "Choice text", action: "next_story_key" },
      // ...
    ]
  }
};
```

### Content Registration
All content is registered in `src/content/index.js`:
```javascript
import { storyCollection } from './stories/story-name/index.js';
export const allContent = { ...storyCollection, ... };
```

## Adding New Content

### New Story Arc
1. Create folder: `src/content/stories/new-story-name/`
2. Create story files: `chapter1.js`, `chapter2.js`, etc.
3. Create index file: `src/content/stories/new-story-name/index.js`
4. Register in main content index: `src/content/index.js`

### New Lesson Series  
1. Create folder: `src/content/lessons/topic-name/`
2. Create lesson files following same pattern
3. Register in content system

### New Content Type
1. Create folder: `src/content/new-type/`
2. Follow established patterns for file structure
3. Update content registration system if needed

## Key Files Explained

### `src/YoungLadysPrimer.js`
- Main React component
- Handles UI rendering and user interactions
- Uses content system through `getStoryContent()`
- Delegates navigation to `useStoryNavigation` hook

### `src/content/index.js`  
- Central content registry
- Exports `allContent` object and utility functions
- `getStoryContent(storyKey, readerName)` - fetches and processes content
- `getAllStoryKeys()` - returns available story keys

### `src/hooks/useStoryNavigation.js`
- Manages current story state
- Tracks reading progress and history
- Provides navigation functions (`navigateToStory`, `resetToWelcome`)

## Benefits of This Architecture

1. **Maintainable**: Content creators can work independently of developers
2. **Organized**: Related content grouped together logically  
3. **Flexible**: Easy to add new story branches or lesson topics
4. **Testable**: Content and UI logic can be tested separately
5. **Collaborative**: Multiple people can work on different story arcs simultaneously
6. **Version Control Friendly**: Changes to stories don't conflict with UI changes

## Future Enhancements

- **Content Management**: Potential admin interface for non-technical content editing
- **Internationalization**: Structure supports multiple languages
- **Analytics**: Track popular story paths and learning outcomes
- **Dynamic Loading**: Code-splitting for large content collections
- **Content Validation**: Automated checks for story consistency and completeness