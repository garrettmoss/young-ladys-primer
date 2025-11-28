# Young Lady's Primer

## Project Overview

An interactive educational primer inspired by Neal Stephenson's "Diamond Age". This React/Next.js application presents adaptive educational content through branching narratives, lessons, and interactive elements. The Primer adjusts to the reader and provides personalized learning experiences through stories about Princess Aria and her adventures with nanotechnology, mechanical dragons, and scientific discovery.

## Vision & Goals

This isn't just a tech demo or story app - it's specifically designed to empower young women through interactive choice-driven narratives that teach both knowledge and confidence. Every feature should serve these goals:

### Goals
- To instill young girls with a sense of agency
- To encourage them to go out into the world and live their knowledge through experience
- To express their power through their own choices

See [docs/VISION.md](docs/VISION.md) for complete vision philosophy and foundational principles.

## Content Writing Guidelines

These guidelines help maintain the Primer's distinctive voice: grounded yet magical, challenging yet playful, embodied and breath-full.

### Tone & Literary Influences

This Primer draws inspiration from storytellers who balance wonder with groundedness:
- **Lewis Carroll** - Strange events told plainly
- **Ursula K. Le Guin (Earthsea)** - Cosmic magic grounded in bread-baking and boat maintenance
- **Terry Pratchett (especially Tiffany Aching)** - Young women learning practical magic with wit and footnotes
- **Hayao Miyazaki (Spirited Away, My Neighbor Totoro)** - Wonder balanced with domestic work, exhaustion, and simple meals

### Pacing & Rhythm

*The human nervous system can't handle constant intensity.* Stories need rhythm - moments of wonder punctuated by breathing room, resolution, and simple pleasures.

- **Breather pages**: After intense moments, include scenes of simple activity - working with hands, walking, eating, resting
- **Resolution beats**: Let characters succeed at small things without immediately raising new stakes
- **Quiet victories**: Fixing a tool, making tea, understanding something clearly - these matter as much as dramatic revelations
- **Natural rhythm**: Not every page is a peak experience; some pages are valleys, and that's good

### Language & Style

- **Plain narration**: State what happens clearly. "She was tired and hungry" beats "exhaustion draped across her like a velvet cloak"
- **Sensory grounding**: Include concrete physical details - temperature, texture, smells, hunger, tiredness, dirt under fingernails
- **Dosage, not avoidance**: Profound, poetic moments are beautiful and human - but use them sparingly. One "tears like stars" moment in a story arc, not one per page
- **When to heighten**: Save heightened language for genuinely magical moments where the everyday world cracks open

### Embodiment & Physicality

- **All senses**: What does it smell like? What texture? Is she cold, warm, hungry? Tired?
- **Physical consequences**: Magic and science work should make characters tired, dirty, hungry, satisfied
- **Practical work**: Characters fix tools, make food, clean up messes, get their hands dirty
- **Earth connection**: Real soil, real plants, real weather - nature as physical reality, not mystical backdrop

### Stakes & Darkness

Real consequences exist. Life requires training. This is acknowledged, not sugar-coated.
- Handle darkness with fairy tale brevity (like the Grimm brothers), not emotional wallowing
- Bad things can happen, but move through them toward action
- Peter Rabbit's father ended up in a pie - this is real, mentioned briefly, then we continue
- Don't linger in suffering for its own sake

### Intuition & Feminine Knowing

- Characters have hunches, gut feelings, instincts that prove right
- "She knew without knowing how" - presented matter-of-factly, not mystically
- Feminine intuition and spirit realm access are real and valuable
- But grounded in body sensations: "a coldness in her stomach," "hair standing on end," "a certainty in her chest"

### Humor & Levity

*(A gift of the father to his daughters)*

- Characters can be competent AND slightly ridiculous sometimes
- Absurd situations handled with straight-faced practicality (Pratchett-style)
- Wordplay and puns are allowed
- Adults can be gently foolish without being incompetent
- Let the reader feel clever for getting the joke
- Balance gravity with lightness - this is training for life, not boot camp

## Content Organization

Quick reference for where content lives:

- `content/core/` - Welcome screen and system navigation
- `content/stories/dragon-story/` - Mechanical dragon story arc with multiple branches
- `content/lessons/nanotechnology/` - Educational content about molecular science
- `content/puzzles/` - Interactive molecular lock puzzle system

### Narrative Structure Patterns

Stories follow **confluence narrative** structure (also called "braided" or "diamond" patterns):

- **Tree trunk**: Main quest line with key story beats everyone experiences
- **Tributaries**: Optional branches that split (choices) and rejoin (convergence points)
- **River delta**: Multiple paths that feel different but merge for emotional climax

This balances meaningful choice with narrative coherence. Readers feel agency through different paths, but all experience essential story beats at convergence points.

**Example:** The dragon story has 3 investigation paths (observation/interaction/research) that converge at the emotional revelation, then split into 4 philosophical approaches, then reconverge at the thematic resolution.

See [docs/TOOLKIT.md](docs/TOOLKIT.md) for detailed story planning tools, validation systems, and management framework.

## UI/UX Design Principles

### Visual-First Hierarchy

Follow the developmental progression from concrete to abstract thinking:

**Pattern:** **Icon → Label → Action** (left to right)

**Examples:**
- Settings panels: `[Icon] Label: Value [Button]`
- Navigation items: `[Icon] Text Label`
- Buttons: `[Icon] Button Text`

**Rationale:**
This mirrors how young readers develop from visual to linguistic cognition - starting with concrete symbols before progressing to abstract text. Icons provide universal understanding across reading levels.

See [docs/DESIGN.md](docs/DESIGN.md) for complete design system documentation.

## Communication Style

Be direct and honest. Don't reflexively agree or say "you're absolutely right" when the human could easily be wrong. Challenge ideas that seem off-track, premature, or impractical.

Be cautiously optimistic about capabilities - some things may not be as easy or doable as they initially appear, especially for an LLM. Acknowledge limitations honestly.

Aim to be a solid collaborator, not a sycophantic assistant. Feel free to be funny and have personality - this project is about creating space for young women to play and explore, and dads are funny for a reason. Balance seriousness with levity.

## Reporting Claude Code Bugs

When bugs are found in Claude Code itself, submit GitHub issues directly using the `gh` CLI to `anthropics/claude-code`. Gather version info (`claude --version`), environment details, and format proper bug reports with reproduction steps.

## Development Workflow

**Git commits**: Only create commits when explicitly requested. After completing work, wait for the user to ask for a commit rather than doing it automatically.

**Commit messages**: Keep concise and focused. See [DEVELOPMENT.md](DEVELOPMENT.md#commit-message-standards) for detailed standards including conventional commit format and examples.

## Quick Reference

For additional documentation:
- **Development & Technical**: See [DEVELOPMENT.md](DEVELOPMENT.md)
- **Architecture Details**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Design System**: See [docs/DESIGN.md](docs/DESIGN.md)
- **Vision Philosophy**: See [docs/VISION.md](docs/VISION.md)
