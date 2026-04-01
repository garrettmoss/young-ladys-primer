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

**Status**: Not started
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

**Status**: Not started
**Estimated effort**: 1 session
**Dependencies**: Phase 1

### Changes

| File | Change |
|------|--------|
| `src/content/core/welcome.ts` | Rewrite to generate choices dynamically from the arc registry (one choice per arc + existing lesson/puzzle/settings options) |
| `src/content/index.ts` | Update `getContent()` welcome special-case to call arc-aware builder |
| `src/YoungLadysPrimer.tsx` | Replace hardcoded `getWelcomeIcon` with arc-based icon lookup |
| `src/hooks/useContentNavigation.ts` | Optional: add arc-level progress tracking (% of arc's nodes visited) |

### Verification
- Welcome screen dynamically lists all registered arcs
- Adding a new arc to the registry automatically adds it to welcome
- Existing navigation and progress tracking unaffected

---

## Phase 3: New Story Arc — "The Cartographer's Garden"

**Status**: Not started
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
