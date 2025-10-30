# Design System

## Visual-First Cognition

**Pattern:** Icon → Label → Action (left to right)

Interface elements mirror developmental stages of symbolic thinking - beginning with concrete visual symbols before progressing to abstract text.

**Why:**
- Young children process visual symbols before abstract text
- Icons provide universal understanding across reading levels
- Progression from concrete (image) to abstract (text) mirrors cognitive development
- Models the journey from visual to linguistic reasoning that the Primer itself embodies

**Examples:**
```
Settings: [Icon] Label: Value [Button]
Navigation: [Icon] Text Label
Buttons: [Icon] Button Text
```

## Color Philosophy

Maintain a "candlelit manuscript" aesthetic in both light and dark modes. Even dark mode uses warm amber/gold tones rather than cool grays, preserving the Victorian study atmosphere.

**Light Mode:**
- Amber/Gold: #d97706, #f59e0b, #fbbf24
- Parchment backgrounds: #f9f6f0, #f5f1e6, #ede8db

**Dark Mode:**
- Warm amber/gold: #fbbf24, #d97706
- Deep brown backgrounds: #1a1612, #2d2419, #1f1b15
- Cream text: #e5d5c1

## Icon Library

We use [lucide-react](https://lucide.dev/) for all icons - a beautiful, MIT-licensed icon library with extensive Victorian-era appropriate options.

### Victorian-Era Icons

Icons that fit the candlelit manuscript aesthetic:

**Literary/Manuscript:**
- `Scroll` - Empty scroll, interactive storytelling, co-creating narratives
- `ScrollText` - Ancient scrolls with text, fairy tale manuscripts
- `BookText` - Books with visible text, written narratives
- `BookOpen` - Open books, reading
- `BookMarked` - Bookmarks, saved progress
- `Feather` - Quill pens, writing implements
- `BookOpenText` - Open manuscript with text

**Scientific/Enlightenment:**
- `MoonStar` - Twilight magic, nocturnal learning, wonder and discovery
- `SunMoon` - Dawn/eclipse, dawning understanding, enlightenment
- `Lamp` - Gas lamps, enlightenment, learning
- `Microscope` - Scientific discovery, observation
- `Telescope` - Exploration, discovery
- `Brain` - Learning, knowledge, introspection
- `GraduationCap` - Formal education

**Mechanical/Industrial:**
- `Cog` - Gears, mechanical puzzles, industrial revolution
- `Compass` (drafting) - Precision, measurement
- `Key` - Unlocking mysteries, solutions
- `Lock` - Puzzles, challenges

**Navigation/Exploration:**
- `Compass` - Finding direction, navigation
- `Eye` - Observation, seeing clearly
- `Star` - Guidance, inner light, destiny
- `UserStar` - Personal identity, feeling special, self-worth

**Interface/Settings:**
- `Eclipse` - Day/night mode toggle
- `Settings` - Configuration
- `School` - Return to the Primer's beginning/welcome screen
- `Home` - (Not used - too domestic, Primer is more like school)
- `ChevronLeft` - Back navigation
- `ArrowRight` - Forward/continue

### Modern Icons

For contemporary UI patterns when Victorian alternatives don't serve the need:

- `Heart` - Emotional connection, favorites
- `Sparkles` - Magic, wonder, transformation
- `Puzzle` - Modern puzzle concept

### Fairy Tale Icons

For story and narrative contexts:

- `Castle` - Fairy tale settings, kingdoms
- `Crown` - Royalty, princess stories
- `Wand` - Magic, transformation
- `WandSparkles` - Magic wand with sparkle effects
- `Star` - Single star, wishes, achievements, North Star guidance
- `Sparkles` - Multiple sparkles with stars, constellations, wonder, magic
- `Sparkle` - Single sparkle/shine effect
- `MoonStar` - Crescent moon with star, twilight magic
- `Moon` - Crescent moon, night, dreams, sleep
- `CloudMoonRain` - Stormy nights, atmospheric weather
- `StarHalf` - Partial star, ratings, progress
- `CircleStar` - Star in a circle, contained magic
- `SquareStar` - Star in a square

### Current Usage

| Action | Icon | Context |
|--------|------|---------|
| Welcome header | `BookOpen` + `Sparkles` | Main title decoration |
| Tell me a story | `Scroll` | Interactive storytelling, co-creating narratives |
| Teach me something | `MoonStar` | Twilight magic, nocturnal learning |
| Show me a puzzle | `Cog` | Mechanical challenges |
| Help me understand myself | `UserStar` | Personal identity, feeling special, self-worth |
| Settings | `Settings` | Configuration panel |
| Dark mode toggle | `Eclipse` | Illumination settings |
| Reader name | `Feather` | Penning your name |
| Reading progress | `BookMarked` | Passages explored |
| Return to beginning | `School` | Back to the Primer's welcome screen |
| Back navigation | `ChevronLeft` | Previous page |

### Guidelines

**Size & Color:**
- Default size: `w-5 h-5` (20px)
- Default color: `text-amber-700`
- Header icons: `w-12 h-12` (BookOpen), `w-6 h-6` (Sparkles)

**Layout:**
- Always follow Icon → Label → Action pattern (left to right)
- Group icons with text using `flex items-center gap-3`
- Use `justify-between` on buttons to separate action icons

**Choosing New Icons:**
1. Prefer Victorian-era appropriate options (Literary, Scientific, Mechanical, Navigation)
2. Consider the Primer's setting: late Victorian/Industrial Revolution aesthetic
3. Avoid modern tech symbols (smartphones, wifi, etc.)
4. When in doubt, choose concrete over abstract (compass over heart)

## Implementation

See `src/index.css` for component styling patterns.
See `src/YoungLadysPrimer.tsx` for UI component structure.
