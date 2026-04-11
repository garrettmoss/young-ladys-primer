# Primer Overhaul: Multi-Arc Architecture + AI Integration

## Context

The Primer is evolving from a single-story prototype into a multi-arc adaptive learning platform. Goals:
1. Demonstrate the Primer's potential with a second, richer story arc
2. Architect the app for multiple self-contained story arcs
3. Build toward an AI layer that adapts content based on reader behavior
4. Create a portfolio piece demonstrating real AI model training skills

The existing dragon story stays intact. Each phase is designed to be tackled in a separate Claude session.

---

## Phase 1: Story Arc Abstraction

**Status**: Complete (2026-04-04)
**Estimated effort**: 1 session
**Dependencies**: None

Currently "story arcs" are just folder groupings with no runtime significance. Everything lives in one flat `allContent` map. Before adding a second arc, we need a formal concept of what an arc IS.

### Changes

| File | Change |
|------|--------|
| `src/content/index.ts` | Add `StoryArc` interface: `{ id, title, description, entryPoint, contentKeys[], lessons[], puzzles[], icon, status }` |
| `src/content/arcs.ts` | **New file**. Arc registry with array of arcs + lookup helpers (`getArcById`, `getArcForContentKey`) |
| `src/content/stories/dragon-story/index.ts` | Export `dragonArc` metadata alongside existing content collection |
| `scripts/validate-story-graph.ts` | Make `ENTRY_POINTS` dynamic from arc registry instead of hardcoded |

The flat `allContent` map stays unchanged. The arc registry is metadata layered on top — purely additive, zero breaking changes.

### Verification
- `npm run build` succeeds
- `npm run validate-content` passes
- Dragon story fully playable, no regressions

---

## Phase 2: Welcome Screen + Arc Selection

**Status**: Complete (2026-04-04)
**Estimated effort**: 1 session
**Dependencies**: Phase 1

### Revised approach

Instead of rewriting the welcome screen to embed arcs directly, we kept welcome basically the same and added a new `story_select` intermediate screen. "Tell me a story" now links to `story_select`, which dynamically lists all available arcs from the registry. This is simpler, keeps the welcome page clean, and scales naturally as arcs are added.

### Changes

| File | Change |
|------|--------|
| `src/content/core/story-select.ts` | **New file**. Story selection screen that dynamically lists available arcs from the registry |
| `src/content/core/welcome.ts` | "Tell me a story" action changed from `story_princess` to `story_select` |
| `src/content/index.ts` | Import and register `storySelectContent` in the content registry |
| `src/YoungLadysPrimer.tsx` | Update `getWelcomeIcon` case from `story_princess` to `story_select` |
| `scripts/validate-story-graph.ts` | Register `storySelectContent` in the validation graph |

### Verification
- Welcome screen unchanged except "Tell me a story" goes to arc selection
- Arc selection dynamically lists all registered arcs with `status: 'available'`
- Adding a new arc to the registry automatically adds it to the selection screen
- Existing navigation and progress tracking unaffected

---

## Phase 2.5: Adaptive Content Architecture

**Status**: Design phase (2026-04-10)
**Estimated effort**: 1-2 sessions (types + proof of concept)
**Dependencies**: Phase 1 (arc structure), informs Phase 3 writing and Phase 6 AI

### The Problem

We've been writing story content at a single level — adult literary fiction length and complexity. The Primer should adapt to the reader. A 5-year-old and a 15-year-old should both experience the same story arc, the same beats, the same themes — but rendered at their level.

### Core Principle: Theme Is the Heart, Not Decoration

Thematic depth lives at every level, not just the highest. A 5-year-old doesn't need to be told "this is about persistence" — they watch the beetle carry its pebble and something lands. Good myths work this way: the theme is always present, always felt, never requiring explanation. What changes between levels is surface rendering (word count, vocabulary, detail density), not meaning.

### The Story Beat — Universal Unit of Content

Every story node is built on a **beat**: one thing happens, one feeling lands.

```typescript
interface StoryBeat {
  id: string;
  title: string;
  beat: string;      // What happens — 1 sentence, level-agnostic
  feeling: string;   // Why it matters — 1 sentence, the theme expressed
  choices: Choice[];
  content: AdaptiveContent;
}
```

The `beat` and `feeling` are the skeleton. They never change. They're what we write *first* — before any prose. They're also what the AI (Phase 6) uses as its anchor when generating adaptive renderings.

### Adaptive Content Levels

Each beat gets rendered at multiple levels. The names use a garden metaphor (because why not):

| Level | Name | Target reader | Word count per page | What changes |
|-------|------|--------------|--------------------|----|
| 1 | **Seed** | Age 4-6 | 30-60 words (3-5 sentences) | Simple words, 1-2 sensory details, action-focused |
| 2 | **Sprout** | Age 7-9 | 60-120 words (1-2 short paragraphs) | Compound sentences, humor lands, some interiority |
| 3 | **Bloom** | Age 10-13 | 120-200 words (2-3 paragraphs) | Fuller descriptions, subtext, character voice emerges |
| 4 | **Fruit** | Age 14-17 | 200-350 words (3-4 paragraphs) | Full character voice, subtext carries theme, reader trusted to find the meaning herself |

What stays constant across ALL levels:
- The beat (what happens)
- The feeling (why it matters)  
- The choices offered
- Thematic depth (always there, expressed through action and image, not exposition)
- Sensory grounding (at least 1 concrete detail per page at every level)
- Humor (when present in a beat, it's present at every level — just simpler or richer)

What scales UP with level:
- Word count and sentence complexity
- Number of sensory details
- Interior monologue / character voice
- Narrative aside and commentary
- Systems-thinking content (emergence, networks)
- Backstory and worldbuilding depth

### Example: `western_wall` at Each Level

**Beat**: She fights through brambles to reach a crumbling wall and meets a beetle that watches her.
**Feeling**: Hard work gets you to interesting places.

**Seed** (age 4-6):
> The wall was hidden behind prickly bushes. She pushed through and got scratched, but she made it. A big black beetle sat on the wall, watching her. "Hello," she said. The beetle didn't answer, but it didn't leave either.

**Sprout** (age 7-9):
> The wall was buried under thorny brambles so thick she had to push sideways to get through. She came out the other side scratched and breathing hard, with a leaf in her hair. The wall was old golden stone, warm in the sun. A fat black beetle sat on it watching her. She was fairly certain beetles didn't watch people, but this one was doing it anyway. Behind the brambles she could see an iron gate, rusted shut.

**Bloom** (age 10-13):
> The western wall was easy to find and hard to reach. Brambles had swallowed it — a century of thorns growing through the sandstone until it was more plant than stone. She had to turn sideways and push through with her arms up, which meant the thorns got her ribs instead. A fair trade, she decided, though her ribs disagreed.
>
> The wall was beautiful in the way old things left alone are beautiful. Warm sandstone, crumbling at the top, covered in silver-green lichen. A fat black beetle sat at eye level, watching her with unsettling focus. Behind the thickest brambles: an iron gate, rusted completely shut.

**Fruit** (age 14-17):
> The western wall was easy to find and hard to reach. Brambles had swallowed it — a century of thorns growing over and through the old sandstone until the wall was more plant than stone. She turned sideways and pushed through with her arms up, which meant the thorns got her ribs instead of her hands. A fair trade, she decided, though her ribs disagreed.
>
> She came through scratched and breathing hard, with a tear in her sleeve and a leaf in her hair she wouldn't find until later. The wall was beautiful the way old things left alone are beautiful — warm golden stone, crumbling where rain had worked it loose, covered in silver-green lichen that grew in oddly regular patches. A fat black beetle sat at eye level, watching her with the focused patience of someone who has been waiting a very long time and is not about to stop now. Behind the thickest brambles she could just make out an iron gate, rusted shut. The hinges had fused into solid lumps of orange.

### Implementation Strategy

**Phase 1 — Types and proof of concept:**
- Add `StoryBeat` and `AdaptiveContent` interfaces to content types
- Rewrite `garden_entrance` + `western_wall` as adaptive beats (all 4 levels)
- Build level selector into reader settings (manual for now)
- Render the appropriate level based on setting

**Phase 2 — Convert existing content:**
- Extract beat/feeling skeletons from all written garden-arc nodes
- Write Seed and Sprout levels for each (Bloom/Fruit already mostly exist)
- Dragon story arc: archive (not converting — will be replaced eventually with a new arc written adaptive-first)

**Phase 3 — AI bridge (connects to Phase 6):**
- The beat + feeling skeleton becomes the prompt anchor for AI generation
- AI doesn't generate from scratch — it *renders* a known skeleton at an inferred level
- Reader profiling (Phase 5) feeds level selection
- Eventually: AI generates levels between the named ones, fine-tuned to the specific reader

### Content Writing Workflow (Updated)

When writing new story nodes, always write in this order:
1. **Beat** — one sentence, what happens
2. **Feeling** — one sentence, why it matters
3. **Choices** — what the reader can do next
4. **Seed** — the simplest rendering (this forces clarity)
5. **Sprout** → **Bloom** → **Fruit** — layer up from there

Writing Seed first is the discipline. If the beat doesn't work in 4 sentences, the beat is wrong.

### Open Questions

- Should the Primer detect reader level automatically (reading speed, choice patterns, time-on-page) or ask directly? Probably both — ask at first, then adapt.
- Do choices themselves change at different levels? (Probably not — same agency, different prose.)
- Should some beats *only* exist at higher levels? (e.g., `lichen_grid` might not appear for Seed readers — the path could be shorter.) This risks breaking the confluence structure though.
- How does the dragon story arc retrofit? It was written at Fruit level. Extracting skeletons retroactively is doable but tedious.

---

## Phase 3: New Story Arc — "The Cartographer's Garden"

**Status**: In progress — outline complete, tone check (`garden_entrance`) written and approved (2026-04-04). Western wall path written (6 nodes) at roughly Fruit level (2026-04-10), needs trimming pass. Adaptive content architecture designed (2026-04-10) — lower levels still needed. Dragon story arc to be archived and replaced.
**Estimated effort**: 3-5 sessions (outline → tone check → writing in batches)
**Dependencies**: Phase 1 (for arc metadata), but prose writing can start any time

### Concept

The reader finds an old map folded inside the Primer — a map of an abandoned garden on the kingdom's edge. The garden was engineered by a long-dead cartographer who mapped the invisible connections between living things. Its plants, insects, and soil form a biological computer that's been running a single calculation for a hundred years. The garden is waking up and the reader must figure out what it's trying to say.

### Content guideline alignment

| Guideline | How it's expressed |
|---|---|
| **Embodiment** | Entire arc is outdoors: dirt, weather, clearing brush, getting tired and muddy |
| **Sensory grounding** | Wet soil, warm stone, specific beetle buzzes, bread and cheese on a wall |
| **Breathing room** | Clearing paths is slow work. Scenes of eating, watching clouds, waiting for dawn |
| **Plain narration** | "The garden was larger than she expected, and wilder. Brambles had eaten the western wall." |
| **Intuition** | Reader feels a hum below hearing, trusts it, it proves right |
| **Physical consequences** | Thorns scratch, water is heavy, she sleeps badly on hard ground |
| **Humor** | Garden "talks" via flower bloom patterns (beautiful but deeply impractical). A beetle keeps bringing the same pebble. |
| **Darkness with brevity** | The cartographer died alone, forgotten. One sentence. Story moves forward. |
| **Feminine knowing** | Final puzzle solved by recognizing a heartbeat rhythm in how the garden breathes |

### Educational content
- Mycorrhizal networks ("the wood wide web")
- Emergence and systems thinking (simple rules create complex behavior)
- Cartography as understanding relationships
- Bloom-sequence pattern puzzle

### Arc structure (~15-18 nodes, confluence pattern)

```
garden_entrance (3 choices)
├── western_wall path (clearing, beetle humor, old well) ──┐
├── eastern_grove path (following map, root network, listening) ──┤──→ garden_heart
└── study_map path (cartographer's story, pattern lesson) ──┘     (convergence)
                                                                      │
                                                               3 philosophical choices
                                                     ┌─────────┼─────────┐
                                                  decode     feel      tend
                                                     └─────────┼─────────┘
                                                          garden_message
                                                               │
                                                          garden_ending
```

### File structure
```
src/content/stories/garden-arc/       — Story nodes (5-6 files + index)
src/content/lessons/ecology/          — Mycorrhizal networks, emergence
src/content/puzzles/bloom-sequence.ts — Flower pattern puzzle
src/content/maps/garden-arc.md        — Mermaid flow documentation
```

### Writing strategy (managing token cost)
1. **Outline first** — structure + one-paragraph summaries per node (cheap, validates shape)
2. **Tone check** — Write `garden_entrance` fully, review against guidelines before continuing
3. **Batch by path** — Western wall (3 nodes), eastern grove (3 nodes), map study (3 nodes), convergence + ending (4-5 nodes)
4. **Validate continuously** — Run `npm run validate-content` after each batch

### Verification
- All nodes reachable from `garden_entrance`
- All paths converge at `garden_heart`
- No broken references or dead ends
- Content reads naturally and follows writing guidelines

---

## Phase 4: Flow Visualizer Fixes + Arc Filtering

**Status**: Not started
**Estimated effort**: 2 sessions
**Dependencies**: Phases 1-3

### Known issues
- `HOME_VIEW_NODE_IDS` hardcoded to `['welcome', 'story_princess']` — breaks with filtered views
- `contentFilter` prop defined in `StoryFlowVisualizerProps` but never implemented
- Graph becomes cluttered with 30+ nodes from two arcs

### Changes

| File | Change |
|------|--------|
| `src/utils/graph-builder.ts` | Add `arcFilter?: StoryArc` parameter to `contentRegistryToFlowGraph()`, make entry points dynamic |
| `src/components/flow-visualizer/StoryFlowVisualizer.tsx` | Add arc selector dropdown/tabs, dynamic `HOME_VIEW_NODE_IDS` from selected arc |
| `src/components/flow-visualizer/flow-constants.ts` | Add node type colors for ecology lessons |
| `pages/dev/flow.tsx` | Add `?arc=dragon-story` query param support |
| `scripts/validate-story-graph.ts` | Per-arc reachability validation |

### Verification
- Each arc renders cleanly in isolation
- "All Content" view still works
- Arc selector updates viewport framing to selected arc's entry point
- URL query param works for direct linking

---

## Phase 5: Expand ContentContext for AI Readiness

**Status**: Not started
**Estimated effort**: 1 session
**Dependencies**: Phase 3 (for tagging new choices)

Before building any ML pipeline, extend the signal capture within the existing static system.

### Changes

| File | Change |
|------|--------|
| `src/content/index.ts` | Expand `ContentContext` with `choiceHistory`, `arcProgress`, `timeOnCurrentPage`, `choicePatterns` |
| `src/content/index.ts` | Add optional `category` field to `Choice` interface (`'compassion' | 'logic' | 'intuition' | 'exploration'`) |
| `src/hooks/useReaderProfile.ts` | **New file**. Aggregates reader tendencies from navigation data. Purely client-side. |
| `src/hooks/useContentNavigation.ts` | Derive new signals from existing state |
| Garden arc content files | Tag choices with categories from the start |

### Verification
- Reader profile hook correctly aggregates choice patterns
- Expanded context available to content functions
- No performance impact from signal tracking
- All existing content still works (new fields are optional)

---

## Phase 6: AI/ML Pipeline

**Status**: Not started
**Estimated effort**: Weeks to months (separate workstream)
**Dependencies**: Phase 3 complete (need content for training data)

### Approach

Fine-tune a small open-source model on the Primer's writing style so it can generate new content nodes that match the tone. NOT training from scratch.

### Model & tooling
- **Model**: Llama 3.2 3B or Phi-3-mini (3.8B) — small, good creative writing, permissive license
- **Method**: QLoRA fine-tuning via `unsloth` library
- **Training compute**: Google Colab Pro ($10/month) or RunPod ($0.20-0.50/hr)
- **Dev inference**: Ollama on Mac (free, no GPU needed)
- **Prod inference**: RunPod serverless or vast.ai

### Training data pipeline
- `scripts/export-training-data.ts` — New script. Exports all Primer content as instruction-tuning JSONL
- Format: `{ instruction: "Write a Primer story node given [reader state]", input: "[context]", output: "[actual content]" }`
- ~35-50 training examples from dragon + garden arcs (small but workable for style-tuning)

### Integration architecture
```
[React App (GitHub Pages)]  →  POST /api/adapt-content  →  [FastAPI on RunPod]  →  [Fine-tuned model]
         ↓ (fallback)
   [Static content — always works]
```

**Critical principle**: Static content is ALWAYS the fallback. The AI layer is an enhancement, never a requirement.

### About OpenClaw
OpenClaw is an AI **agent orchestration framework**, not a model training tool. Useful later for multi-step reasoning about reader adaptation. Don't invest until basic inference is working.

### About "self-modifying" models
Maps to **DPO (Direct Preference Optimization)** — retraining with reader engagement signals. This is Phase 7 territory. Requires: a working fine-tuned model + logged data from 100+ reader sessions.

### Learning path
1. Hugging Face NLP course (free) + run inference with Ollama locally
2. QLoRA concepts, fine-tune a toy model on Colab
3. Fine-tune on Primer content, evaluate output quality
4. Build FastAPI inference endpoint, deploy to RunPod
5. Wire into React app with graceful fallback

### Portfolio narrative
1. Built interactive educational app (React/Next.js)
2. Designed data pipeline converting narrative content into ML training data
3. Fine-tuned a 3B parameter model using QLoRA to match a specific literary style
4. Deployed inference as a serverless API with graceful fallback
5. *(stretch)* Built feedback loop where reader engagement improves the model

---

## Execution Order

| Order | Phase | Sessions | Dependencies |
|-------|-------|----------|-------------|
| 1 | Phase 1: Arc abstraction | 1 | None |
| 2 | Phase 3 outline: Garden arc structure (no prose) | 1 | Can parallel with Phase 1 |
| 3 | Phase 2: Welcome screen | 1 | Phase 1 |
| 4 | Phase 3 writing: Garden arc prose | 3-4 | Phase 1 + outline |
| 5 | Phase 4: Flow visualizer fixes | 2 | Phases 1-3 |
| 6 | Phase 5: Context expansion | 1 | Phase 3 |
| 7 | Phase 6: ML pipeline | Ongoing | Phase 3 complete |
