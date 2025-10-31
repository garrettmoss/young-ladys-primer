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
│   ├── YoungLadysPrimer.tsx          # Main UI component (rendering only)
│   ├── index.css                     # Global styles
│   │
│   ├── content/                      # All educational content
│   │   ├── index.ts                  # Master content registry & utilities
│   │   │
│   │   ├── core/                     # Core navigation & system content
│   │   │   ├── welcome.ts            # Welcome screen & lesson navigation
│   │   │   └── settings.ts           # Settings interface content
│   │   │
│   │   ├── maps/                     # Story flow visualizations
│   │   │   └── dragon-story.md       # Dragon story flowchart (Mermaid)
│   │   │
│   │   ├── stories/                  # Interactive story content
│   │   │   └── dragon-story/         # Mechanical dragon story arc
│   │   │       ├── index.ts          # Story collection export
│   │   │       ├── princess-meeting.ts
│   │   │       ├── dragon-approach.ts
│   │   │       ├── dragon-pattern.ts
│   │   │       └── dragon-engineers.ts
│   │   │
│   │   ├── lessons/                  # Educational content modules
│   │   │   ├── index.ts              # Lesson registry
│   │   │   └── nanotechnology/       # Molecular science lessons
│   │   │       ├── index.ts
│   │   │       └── molecular-communication.ts
│   │   │
│   │   └── puzzles/                  # Interactive puzzles & challenges
│   │       ├── index.ts              # Puzzle registry
│   │       ├── molecular-lock.ts     # Molecular lock puzzle
│   │       └── navigation.ts         # Navigation puzzle
│   │
│   ├── hooks/                        # React hooks for shared logic
│   │   └── useStoryNavigation.ts     # Story progression & history tracking
│   │
│   └── utils/                        # Utility functions
│
├── pages/                            # Next.js pages (auto-generated structure)
├── public/                           # Static assets
└── ARCHIVE/                          # Previous iterations & prototypes
```

## Architecture Principles

### 1. Separation of Concerns
- **UI Layer** (`YoungLadysPrimer.tsx`): Handles rendering, styling, user interactions
- **Content Layer** (`content/`): Contains all stories, lessons, puzzles, dialogue
- **Logic Layer** (`hooks/`): Manages navigation, state, and business logic

### 2. Content Organization
- **Hierarchical Structure**: Content grouped by type (stories/lessons/puzzles)
- **Modular Design**: Each story arc or lesson series in its own folder
- **Function-Based Content**: Content can be static or dynamic (using reader name)

### 3. Scalability
- **Easy Content Addition**: New stories/lessons added without touching UI code
- **Branching Narratives**: Each story branch in separate files for clarity
- **Lazy Loading Ready**: Structure supports future code-splitting optimizations

### 4. Story Flow Maps
- **Visual Documentation**: Mermaid diagrams in `src/content/maps/` visualize story structure
- **Dual Purpose**: Developer planning tool now, reader navigation feature later
- **Branch Analysis**: Identify choice overload, convergence points, and flow issues

## Content Format

### Story Structure
Content functions use a **ContentContext object** for personalization, enabling scalable addition of new variables without changing function signatures:

```typescript
export const storyName = {
  story_key: {
    title: "Story Title",
    content: ({ readerName }: { readerName: string }) => `Story content with ${readerName}...`,
    choices: [
      { text: "Choice text", action: "next_story_key" },
      // ...
    ]
  }
};
```

**Context Destructuring Pattern:**
- Functions destructure only the variables they need from ContentContext
- Static content can use empty arrow functions: `content: () => "Static text"`
- Future adaptive variables (readingLevel, choiceHistory, etc.) can be added without changing existing content

### Content Registration
All content is registered in `src/content/index.js`:
```javascript
import { storyCollection } from './stories/story-name/index.js';
export const allContent = { ...storyCollection, ... };
```

## Content Design Guidelines

### Choice Architecture
To prevent choice overload and maintain narrative containment, follow these principles:

**Choice Count Per Node:**
- **2-3 choices maximum** for most story nodes
- **1 choice** is acceptable for narrative flow nodes (not every page needs branching)
- **4 choices only** when explicitly offering the three core interaction types + story branch

**Three Core Interaction Types:**
Every story should offer opportunities for readers to:
1. **Progress the story** - Advance the narrative (1-2 options per node)
2. **Enter a lesson** - Explore educational content related to the story
3. **Trigger a puzzle** - Engage with interactive challenges

**Typical Node Patterns:**

*Pattern A: Linear Flow*
```javascript
choices: [
  { text: "Continue", action: "next_scene" }
]
```
Use for: Short transitional pages, cliffhangers, moments of reflection

*Pattern B: Story Branch*
```javascript
choices: [
  { text: "Approach cautiously", action: "cautious_path" },
  { text: "Rush forward bravely", action: "brave_path" }
]
```
Use for: Meaningful character choices, different story outcomes

*Pattern C: Story + Learning*
```javascript
choices: [
  { text: "Examine the mechanism", action: "next_scene" },
  { text: "Ask the Primer about nanotechnology", action: "nano_lesson_1" }
]
```
Use for: Introducing educational opportunities alongside story progression

*Pattern D: Full Interaction Menu*
```javascript
choices: [
  { text: "Talk to the dragon", action: "dragon_dialogue" },
  { text: "Study the dragon's pattern", action: "observation_path" },
  { text: "Learn about mechanical dragons", action: "dragon_lesson" },
  { text: "Solve the scale puzzle", action: "scale_puzzle" }
]
```
Use for: Major decision points, hub locations, story climaxes

### Branching Strategy
- **Converge thoughtfully**: Branches should eventually merge at meaningful points
- **Avoid exponential explosion**: Not every node needs to branch; use linear segments
- **Make choices matter**: Each branch should feel distinct, not just cosmetic
- **Narrative flow nodes**: Use single-choice pages to pace the story and prevent fatigue

### Content Length
- **Short pages for single choices**: 1-2 paragraphs
- **Medium pages for branches**: 2-3 paragraphs to establish context
- **Longer pages for major moments**: 3-4 paragraphs for climactic scenes or resolutions

## Story Flow Maps

Story flow maps live in `src/content/maps/` using Mermaid diagram syntax. These serve dual purposes:

### Current Purpose: Developer Documentation
- **Visualize structure**: See the entire story arc at a glance
- **Identify problems**: Spot choice overload, exponential branching, missing convergence
- **Plan refactoring**: Map out how to reduce choices and create better narrative flow
- **Track implementation**: Color-coded nodes show what's complete vs. stub references

### Future Purpose: Reader Feature Data
- **Interactive Table of Contents**: Show readers their progress through the story
- **3D Navigation Map**: Treasure Planet-style visualization of story paths (Phase 1+ goal)
- **Progress Tracking**: Highlight completed paths and available branches

### Reading Mermaid Diagrams
- **View in**: GitHub, VS Code (with Mermaid extension), or any Mermaid-compatible viewer
- **Green nodes**: Fully implemented content with complete text and choices
- **Pink nodes**: Stub references (choice targets that aren't written yet)
- **Arrows**: Show story progression paths from one node to another

### Current Maps
- `dragon-story.md` - Complete flowchart of the mechanical dragon story arc

### Creating New Maps
When adding a new story arc, create a corresponding map file:
```bash
src/content/maps/your-story-name.md
```

Use this template:
```markdown
# Your Story Name Flow Map

## Current Structure

\`\`\`mermaid
graph TD
    start[entry_node<br/>Entry Point Title]
    start --> choice1[Choice 1 Node]
    start --> choice2[Choice 2 Node]

    classDef implemented fill:#90EE90
    classDef stub fill:#FFB6C6

    class start,choice1 implemented
    class choice2 stub
\`\`\`

## Analysis
[Notes about branching, issues, etc.]
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

### `src/YoungLadysPrimer.tsx`
- Main React component with TypeScript
- Handles UI rendering and user interactions
- Uses content system through `getStoryContent()`
- Delegates navigation to `useStoryNavigation` hook

### `src/content/index.ts`
- Central content registry
- Exports `allContent` object and utility functions
- `getStoryContent(storyKey, context)` - fetches and processes content with ContentContext
- `getAllStoryKeys()` - returns available story keys
- Defines `ContentContext` interface for future-proof personalization

### `src/hooks/useStoryNavigation.js`
- Manages current story state
- Tracks reading progress and navigation history
- Provides navigation functions (`navigateToStory`, `resetToWelcome`, `goBack`)
- Supports back navigation with localStorage persistence

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