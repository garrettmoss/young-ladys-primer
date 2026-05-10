# Primer Overhaul: From Prototype to Living Library

## Context

The Primer is evolving from a single-story prototype into a multi-kingdom adaptive learning platform, inspired by the structure of Stephenson's Young Lady's Illustrated Primer: a library of self-contained kingdoms, each with its own tone and lessons, knit together by recurring symbols and a reader who grows through them.

Goals:
1. Establish a durable two-tier content model (Kingdom → Story) that can hold many worlds.
2. Demonstrate the Primer's potential with a new kingdom written at adaptive-first quality.
3. Build toward an AI layer that renders known story beats at the reader's level.
4. Create a portfolio piece demonstrating real AI model training skills.

The original dragon prototype is retained as a `legacy` kingdom — still visible in the library (marked as a prototype), still playable, but not converted forward to the adaptive content system. Each phase below is scoped to a single Claude session unless noted.

---

## Completed Work

### ✅ Phase 0a: `StoryArc` abstraction (2026-04-04)

First pass at giving arcs runtime significance. Added `StoryArc` interface and `src/content/arcs.ts` registry. Superseded by the Kingdom/Story split in Phase 1 — `StoryArc` became a deprecated alias for `Story`, and a new `Kingdom` layer was added on top.

### ✅ Phase 0b: Story-select screen (2026-04-04)

Added `content/core/story-select.ts` — an intermediate screen between welcome and individual stories that dynamically lists available stories. Superseded in Phase 4: the `welcome` page itself became the library, and `story-select.ts` was deleted.

### ✅ Phase 0c: Garden outline + western wall path prose (2026-04-10)

- Full story outline written: see [src/content/maps/garden-story.md](../src/content/maps/garden-story.md) for the Mermaid flow chart and node-by-node summaries (19 nodes total).
- `garden_entrance` tone-check node written and approved (2026-04-04).
- Western wall path written: 6 nodes (`western_wall`, `clearing_path`, `wall_lunch`, `lichen_grid`, `old_well`, `well_roots`) (2026-04-10).

**Known issue with the western wall prose**: written at Fruit-level (~150–200 words per node) rather than the short page-turner beats intended. An earlier session was asked to "split into 6 shorter pages" and instead produced 6 longer pages. This prose will be replaced, not trimmed — see Phase 2 below.

### ✅ Phase 0d: Adaptive content architecture design (2026-04-10)

Designed the Seed → Sprout → Bloom → Fruit adaptive content model. Theme is the heart, not decoration. See Phase 3 below for implementation.

### ✅ Phase 1: Kingdoms and Stories (2026-04-16)

Split the single-tier `StoryArc` concept into a two-tier Kingdom/Story model. A **Kingdom** is a self-contained world (tone, setting, lessons, puzzles); a **Story** is one narrative arc within a kingdom. Today's single-story-per-kingdom reality fits cleanly; future second stories slot in without a schema change.

**Delivered:**
- `Kingdom` and `Story` interfaces in `src/content/index.ts`. `StoryArc` kept as a deprecated type alias for `Story` (one migration cycle).
- New `src/content/kingdoms.ts` registry with `getAllKingdoms`, `getActiveKingdoms`, `getKingdomById`, `getStoryById`, `getKingdomForContentKey`, `getKingdomEntryPoints`.
- `dragonKingdom` (`status: 'legacy'`, story `adaptive: false`) and `gardenKingdom` (`status: 'active'`) exported from their respective story folders.
- Renames: `src/content/arcs.ts` removed; `garden-arc/` → `garden-story/`; `garden-arc.md` → `garden-story.md`.
- `story-select` and `validate-story-graph` updated to read from the kingdom registry.

Both kingdoms still playable with no prose changes. Pre-existing `garden_heart` placeholder error is unchanged (tracked for Phase 5).

---

## Phase 2: Rewrite Garden From Seed

**Status**: Not started
**Estimated effort**: 1 session
**Dependencies**: Phase 1

### The problem

Current garden prose (7 nodes: entrance + western wall path) is Fruit-length but wasn't written adaptive-first. It needs to be extracted down to beat + feeling skeletons, then rewritten starting from Seed.

### Approach

For each existing garden node:
1. Extract the **beat** (one sentence: what happens).
2. Extract the **feeling** (one sentence: why it matters).
3. Archive the current prose (keep in git history; not preserved in the file).
4. Rewrite from Seed up — this phase only gets to Seed + Sprout. Bloom and Fruit come in Phase 3b.

This is deliberately destructive to current prose. You've said you're not attached to it, and the discipline of Seed-first ("if the beat doesn't work in 4 sentences, the beat is wrong") is what we're trying to build.

This phase depends on Phase 3a (adaptive types) being wired up — so technically Phase 2 runs *after* Phase 3a. Keeping it numbered 2 because it's scoped to existing garden content; Phase 3b extends the same work to Bloom/Fruit and remaining nodes.

### Existing nodes to rewrite (all in garden kingdom)

1. `garden_entrance`
2. `western_wall`
3. `clearing_path`
4. `wall_lunch`
5. `lichen_grid`
6. `old_well`
7. `well_roots`

### Guardrails
- Seed first. Always. No exceptions.
- Beat + feeling must be explicit before any prose.
- One beat per node. If two things happen, it's two nodes.
- No expansion. This is a rewrite, not a rewrite-and-expand pass.

### Verification
- All 7 nodes have beat + feeling fields.
- All 7 nodes have Seed + Sprout renderings.
- Sprout word counts logged in the commit message.
- Garden playable end-to-end.
- `npm run validate-content` passes.

---

## Phase 3: Adaptive Content (Seed → Fruit)

**Status**: Designed (Phase 0d), implementation not started
**Estimated effort**: 2 sessions (types + POC, then remaining renderings)
**Dependencies**: Phase 1

### Core principle

Theme is the heart, not decoration. A 5-year-old and a 15-year-old experience the same beat and the same feeling — what changes is surface rendering (word count, vocabulary, detail density), not meaning.

### The Story Beat — universal unit of content

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

interface AdaptiveContent {
  seed: string;    // Age 4-6
  sprout: string;  // Age 7-9
  bloom: string;   // Age 10-12
  fruit: string;   // Age 13-16
}
```

The `beat` and `feeling` are the skeleton. They never change. They're written *first*, before any prose. They're also what the AI layer (Phase 6) uses as its anchor when generating adaptive renderings.

### Adaptive levels

| Level | Name | Target reader | Words/page | What changes |
|-------|------|---------------|-----------|--------------|
| 1 | **Seed** | Age 4-6 | 30-60 (3-5 sentences) | Simple words, 1-2 sensory details, action-focused. Bottom edge assumes read-aloud with an adult. |
| 2 | **Sprout** | Age 7-9 | 60-120 (1-2 short paragraphs) | Compound sentences, humor lands, some interiority. Reading-to-learn transition. |
| 3 | **Bloom** | Age 10-12 | 120-200 (2-3 paragraphs) | Fuller descriptions, subtext, character voice. Late middle childhood; early puberty often present. |
| 4 | **Fruit** | Age 13-16 | 200-350 (3-4 paragraphs) | Full voice, subtext carries theme, reader trusted. Adolescence; abstract reasoning available. |

Bands are anchored to cognitive transitions, not arbitrary ranges. The 7/10/13 boundaries are real shifts (independent reading → reading to learn → early adolescence). All bands are 3 years wide for clean math.

Constant across all levels: the beat, the feeling, the choices, thematic depth, sensory grounding (≥1 concrete detail per page), humor when present in the beat.

Scales up with level: word count, sentence complexity, sensory detail count, interior monologue, narrative aside, systems-thinking content, backstory depth.

### Writing for young women specifically

The Primer's audience is young women, and the bands above already account for it. Cognitive milestones track age, not gender, so the *boundaries* are the same as they'd be for a gender-neutral product. But the *content within* each band can trust slightly more emotional and social sophistication than a generic primer would, because:

- Girls hit puberty 1-2 years earlier on average than boys (now ~8-10 for first signs).
- Girls develop earlier theory of mind, emotional vocabulary, and social-cue reading.
- Girls outperform boys on reading at every age in basically every country (modest but consistent).

Practical implications:

- **Sprout** can lean into interiority and social nuance earlier than a mixed-audience product would.
- **Bloom** sits squarely on early puberty for many readers. If the Primer is a companion through that, Bloom needs to acknowledge it exists — body changes, identity, relational complexity — even if obliquely. Don't write Bloom as if it's just "older Sprout."
- **Fruit** can trust subtext and ambiguity at the lower edge of the band.

### Example: `western_wall`

**Beat**: She fights through brambles to reach a crumbling wall and meets a beetle that watches her.
**Feeling**: Hard work gets you to interesting places.

**Seed**:
> The wall was hidden behind prickly bushes. She pushed through and got scratched, but she made it. A big black beetle sat on the wall, watching her. "Hello," she said. The beetle didn't answer, but it didn't leave either.

**Sprout**:
> The wall was buried under thorny brambles so thick she had to push sideways to get through. She came out the other side scratched and breathing hard, with a leaf in her hair. The wall was old golden stone, warm in the sun. A fat black beetle sat on it watching her. She was fairly certain beetles didn't watch people, but this one was doing it anyway. Behind the brambles she could see an iron gate, rusted shut.

**Bloom**:
> The western wall was easy to find and hard to reach. Brambles had swallowed it — a century of thorns growing through the sandstone until it was more plant than stone. She had to turn sideways and push through with her arms up, which meant the thorns got her ribs instead. A fair trade, she decided, though her ribs disagreed.
>
> The wall was beautiful in the way old things left alone are beautiful. Warm sandstone, crumbling at the top, covered in silver-green lichen. A fat black beetle sat at eye level, watching her with unsettling focus. Behind the thickest brambles: an iron gate, rusted completely shut.

**Fruit**:
> The western wall was easy to find and hard to reach. Brambles had swallowed it — a century of thorns growing over and through the old sandstone until the wall was more plant than stone. She turned sideways and pushed through with her arms up, which meant the thorns got her ribs instead of her hands. A fair trade, she decided, though her ribs disagreed.
>
> She came through scratched and breathing hard, with a tear in her sleeve and a leaf in her hair she wouldn't find until later. The wall was beautiful the way old things left alone are beautiful — warm golden stone, crumbling where rain had worked it loose, covered in silver-green lichen that grew in oddly regular patches. A fat black beetle sat at eye level, watching her with the focused patience of someone who has been waiting a very long time and is not about to stop now. Behind the thickest brambles she could just make out an iron gate, rusted shut. The hinges had fused into solid lumps of orange.

### Implementation sub-phases

**Phase 3a — Types + renderer + legacy fallback (1 session):**
- Add `StoryBeat` and `AdaptiveContent` interfaces to `src/content/index.ts`.
- Build renderer that switches on `story.adaptive`: true → pick level from `AdaptiveContent`, false → use plain `content` field (dragon kingdom keeps working).
- Add level selector to reader settings (manual for now).
- Scope: garden kingdom only. Dragon kingdom renders via fallback path.

**Phase 3b — Fill in Bloom + Fruit for existing garden nodes (1 session):**
- After Phase 2 (Seed + Sprout for the 7 existing nodes), layer up to Bloom and Fruit.
- Not every node needs all four levels if the beat doesn't warrant it — be honest about when Fruit adds genuine value vs. just more words.

### Writing workflow (the discipline)

When writing new story nodes, always write in this order:
1. **Beat** — one sentence, what happens.
2. **Feeling** — one sentence, why it matters.
3. **Choices** — what the reader can do next.
4. **Seed** — the simplest rendering. If the beat doesn't work in 4 sentences, the beat is wrong.
5. **Sprout** → **Bloom** → **Fruit** — layer up from there.

### Open questions
- Auto-detect reader level (reading speed, choice patterns, time-on-page) or ask? Probably both — ask first, then adapt.
- Do choices themselves change at different levels? Probably not — same agency, different prose.
- Do some beats exist only at higher levels? (e.g., `lichen_grid` skipped for Seed readers.) Risks breaking confluence structure. Defer until there's data.

---

## Phase 4: Library as Opening Screen + Kingdom Hubs

**Status**: In progress. Structural refactor landed; polish + reflection page still open.
**Estimated effort**: 1 session (done) + follow-ups
**Dependencies**: Phase 1

### What shipped

The `welcome` page itself became the library — the opening screen lists every non-draft kingdom as a choice. There is no separate `library` key; `welcome` *is* the library. Legacy kingdoms appear inline with a `(prototype)` suffix. A cross-kingdom "Help me understand myself" option sits alongside the kingdom list (currently a placeholder — reflection may never be built out, but the slot is reserved).

Each kingdom gets a generated hub page at `hub_<kingdomId>`, produced by a single template in `src/content/core/kingdom-hub.ts`. The hub offers the standard three choices — "Tell me a story", "Teach me something new", "Show me a puzzle" — plus a "Choose a different kingdom" back-link to the library. Empty slots (e.g. garden kingdom has no lessons or puzzles yet) are rendered greyed out with a "(Coming soon)" suffix rather than hidden, so the reader sees the full shape of what a kingdom can hold.

Per-kingdom voice comes from an optional `Kingdom.hubIntro` field; kingdoms without one fall back to `description`.

### Delivered

| File | Change |
|------|--------|
| `src/content/core/welcome.ts` | Rewritten. Dynamically lists kingdoms from the registry; adds the cross-kingdom reflection option. |
| `src/content/core/kingdom-hub.ts` | New. `buildKingdomHub(kingdom)` template + `buildAllKingdomHubs()` helper; emits `__placeholder_<type>_<kingdomId>` actions for empty slots so `ChoiceButton` greys them out. |
| `src/content/core/story-select.ts` | Deleted. |
| `src/content/lessons/index.ts` | Deleted. The global `lesson_choice` menu went away — lessons now live only inside their kingdoms. |
| `src/content/puzzles/navigation.ts` | Deleted. Same reason — `puzzle_logic` menu replaced by per-kingdom hub routing. |
| `src/content/index.ts` | Registry spreads `welcomeContent` + `buildAllKingdomHubs()`; `Kingdom` gained optional `hubIntro`, `lessonEntry`, `puzzleEntry`. |
| `src/content/stories/{dragon,garden}-story/index.ts` | Short `hubIntro` strings added. |
| `src/YoungLadysPrimer.tsx` | Icon mapping derived from kingdom data (story entry points, lessons, puzzles) instead of a hardcoded switch; `UserStar` icon for reflection on the welcome page. |
| `scripts/validate-story-graph.ts` | Updated imports + `KNOWN_PLACEHOLDERS`/`PLACEHOLDER_PREFIXES` handling for the hub placeholder actions and for `reflection`. |
| `scripts/test-graph-builder.ts` | Updated imports to match. |

### Still open
- Reflection: currently a dead slot. Decide whether to write a simple static page or leave as "Coming soon" indefinitely.
- Visual polish on the library page (kingdom cards vs. plain choice buttons?).
- Per-kingdom icons on the library page (currently all `BookOpen`).

### Verification
- Library lists active kingdoms; legacy kingdoms appear inline with `(prototype)` suffix and remain playable.
- Adding a new kingdom to `src/content/kingdoms.ts` automatically produces a hub and a library entry — no other code changes needed.
- Empty story/lesson/puzzle slots render greyed with "(Coming soon)".
- `npm run validate-content` passes: 0 errors, 0 warnings.

---

## Phase 5: Cartographer's Garden — Remaining Nodes

**Status**: Outline complete (see [src/content/maps/garden-story.md](../src/content/maps/garden-story.md)). Entrance + western wall path nodes exist (will be rewritten in Phase 2). Eastern grove, map study, convergence, philosophical paths, and resolution not yet written.
**Estimated effort**: 2-3 sessions
**Dependencies**: Phases 1-3

### Remaining nodes (~12 of the 19 total)

Per the outline in [src/content/maps/garden-story.md](../src/content/maps/garden-story.md):

- **Eastern grove path** (3 nodes): `eastern_grove`, `root_network`, `listening_post`.
- **Map study path** (3 nodes): `study_map`, `cartographer_story`, `pattern_lesson`.
- **Convergence**: `garden_heart`.
- **Philosophical branch** (3 nodes): `decode_path`, `feel_path`, `tend_path`.
- **Resolution**: `garden_message`, `garden_ending`.

All new nodes written adaptive-first per the Phase 3 workflow (beat → feeling → Seed → Sprout → Bloom → Fruit). No Fruit-first drafts.

### Educational content
- Mycorrhizal networks ("the wood wide web") — in `root_network` and `listening_post`.
- Emergence and systems thinking — in `pattern_lesson`.
- Cartography as understanding relationships — woven through `study_map` and `cartographer_story`.
- Bloom-sequence pattern puzzle — to be designed.

### Content guideline alignment

| Guideline | How it's expressed |
|---|---|
| Embodiment | Outdoor arc: dirt, weather, clearing brush, getting tired and muddy. |
| Sensory grounding | Wet soil, warm stone, specific beetle buzzes, bread and cheese on a wall. |
| Breathing room | Slow work. Eating, watching clouds, waiting for dawn. |
| Plain narration | "The garden was larger than she expected, and wilder." |
| Intuition | Reader feels a hum below hearing, trusts it, it proves right. |
| Physical consequences | Thorns scratch, water is heavy, she sleeps badly on hard ground. |
| Humor | Garden "talks" via flower bloom patterns (beautiful but deeply impractical). A beetle keeps bringing the same pebble. |
| Darkness with brevity | The cartographer died alone, forgotten. One sentence. Story moves forward. |
| Feminine knowing | Final puzzle solved by recognizing a heartbeat rhythm in how the garden breathes. |

### Verification
- All nodes reachable from `garden_entrance`.
- All paths converge at `garden_heart`.
- No broken references or dead ends.
- All beats have at least Seed + Sprout rendered.

---

## Phase 6: Flow Visualizer + Kingdom Filtering

**Status**: Not started
**Estimated effort**: 2 sessions
**Dependencies**: Phases 1-5

### Known issues
- `HOME_VIEW_NODE_IDS` hardcoded to `['welcome', 'story_princess']` — breaks with filtered views.
- `contentFilter` prop defined in `StoryFlowVisualizerProps` but never implemented.
- Graph becomes cluttered with 30+ nodes across kingdoms.

### Changes

| File | Change |
|------|--------|
| `src/utils/graph-builder.ts` | Add `kingdomFilter?: Kingdom` parameter. Entry points dynamic from registry. |
| `src/components/flow-visualizer/StoryFlowVisualizer.tsx` | Kingdom selector (dropdown or tabs). Dynamic `HOME_VIEW_NODE_IDS` from selected kingdom. |
| `src/components/flow-visualizer/flow-constants.ts` | Add node type colors for ecology lessons. |
| `pages/dev/flow.tsx` | Add `?kingdom=garden` query param. |
| `scripts/validate-story-graph.ts` | Per-kingdom reachability validation. |

### Verification
- Each kingdom renders cleanly in isolation.
- "All Content" view still works.
- Kingdom selector updates viewport framing.
- URL query param works for direct linking.

---

## Phase 7: Expand ContentContext for AI Readiness

**Status**: Not started
**Estimated effort**: 1 session
**Dependencies**: Phase 5

Extend signal capture before building ML pipeline.

### Changes

| File | Change |
|------|--------|
| `src/content/index.ts` | Expand `ContentContext` with `choiceHistory`, `kingdomProgress`, `timeOnCurrentPage`, `choicePatterns`, `currentLevel` (Seed/Sprout/Bloom/Fruit). |
| `src/content/index.ts` | Add optional `category` field to `Choice` (`'compassion' \| 'logic' \| 'intuition' \| 'exploration'`). |
| `src/hooks/useReaderProfile.ts` | **New file**. Aggregates reader tendencies. Client-side only. |
| `src/hooks/useContentNavigation.ts` | Derive new signals from existing state. |
| Garden kingdom files | Tag choices with categories. |

### Verification
- Reader profile correctly aggregates choice patterns and reading level signals.
- Expanded context available to content functions.
- No performance impact.
- All existing content works (new fields optional).

---

## Phase 8: AI/ML Pipeline

**Status**: Not started
**Estimated effort**: Weeks to months (separate workstream)
**Dependencies**: Phases 3 + 5 complete (need adaptive content as training data)

### Approach

Fine-tune a small open-source model on the Primer's writing style so it can render known beats at inferred reader levels. NOT training from scratch. NOT generating new beats — rendering existing skeletons.

### Model & tooling
- **Model**: Llama 3.2 3B or Phi-3-mini (3.8B) — small, good creative writing, permissive license.
- **Method**: QLoRA fine-tuning via `unsloth`.
- **Training compute**: Google Colab Pro ($10/month) or RunPod ($0.20-0.50/hr).
- **Dev inference**: Ollama on Mac.
- **Prod inference**: RunPod serverless or vast.ai.

### Training data pipeline

The adaptive content format is the training data:

```
Input:  { beat, feeling, level: 'sprout', reader_context }
Output: the sprout-level prose
```

- `scripts/export-training-data.ts` — Exports adaptive content as instruction-tuning JSONL.
- Format: `{ instruction: "Render this beat at <level> for a reader who...", input: "<beat + feeling + context>", output: "<actual prose at that level>" }`.
- Each fully-rendered beat produces up to 4 training examples (one per level). Garden arc at ~19 nodes × 4 levels = ~76 examples. Workable for style-tuning.

### Integration architecture
```
[React App (GitHub Pages)]  →  POST /api/render-beat  →  [FastAPI on RunPod]  →  [Fine-tuned model]
         ↓ (fallback)
   [Static adaptive content — always works at the 4 named levels]
```

**Critical principle**: Static adaptive content is ALWAYS the fallback. The AI layer renders *between* the named levels, or *tailored* to specific reader context. It's an enhancement, never a requirement.

### About OpenClaw
OpenClaw is an AI **agent orchestration framework**, not a model training tool. Useful later for multi-step reasoning about reader adaptation. Don't invest until basic inference works.

### About "self-modifying" models
Maps to **DPO (Direct Preference Optimization)** — retraining with reader engagement signals. Phase 9 territory. Requires: working fine-tuned model + logged data from 100+ reader sessions.

### Learning path
1. Hugging Face NLP course + run inference with Ollama locally.
2. QLoRA concepts, fine-tune a toy model on Colab.
3. Fine-tune on Primer adaptive content, evaluate output quality.
4. Build FastAPI inference endpoint, deploy to RunPod.
5. Wire into React app with graceful fallback.

### Portfolio narrative
1. Built interactive educational app (React/Next.js).
2. Designed a content architecture (Kingdom → Story → Beat → AdaptiveContent) that doubles as a training data format.
3. Fine-tuned a 3B parameter model using QLoRA to render story beats at arbitrary reader levels.
4. Deployed inference as a serverless API with graceful fallback to static content.
5. *(stretch)* Built feedback loop where reader engagement improves the model.

---

## Execution Order

| Order | Phase | Sessions | Dependencies |
|-------|-------|----------|-------------|
| 1 | ✅ Phase 1: Kingdoms + Stories | 1 | None |
| 2 | Phase 3a: Adaptive types + renderer | 1 | Phase 1 |
| 3 | Phase 2: Rewrite garden from Seed | 1 | Phase 3a |
| 4 | Phase 4: Library screen | 1 | Phase 1 |
| 5 | Phase 3b: Bloom + Fruit for existing nodes | 1 | Phase 2 |
| 6 | Phase 5: Write remaining garden nodes | 2-3 | Phases 3b + 4 |
| 7 | Phase 6: Flow visualizer | 2 | Phases 1-5 |
| 8 | Phase 7: Context expansion | 1 | Phase 5 |
| 9 | Phase 8: ML pipeline | Ongoing | Phases 3 + 5 complete |
