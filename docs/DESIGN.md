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

## Implementation

See `src/index.css` for component styling patterns.
See `src/YoungLadysPrimer.tsx` for UI component structure.
