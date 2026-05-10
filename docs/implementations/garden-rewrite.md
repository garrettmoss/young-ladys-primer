# Garden Rewrite — Beat + Feeling Skeletons

## Purpose

This doc holds the **beat + feeling** skeletons for the 7 existing garden nodes (entrance + western wall path), extracted from the current Fruit-level prose before that prose is replaced.

Per [OVERHAUL-PLAN.md](../OVERHAUL-PLAN.md) Phase 2, the existing prose is going to be deleted. Before it is, we extract the irreducible parts — what happens, why it matters — so the rewrite from Seed up has a faithful skeleton to work from.

**Definitions** (from [OVERHAUL-PLAN.md:115-131](../OVERHAUL-PLAN.md#L115-L131)):
- **beat** — one sentence, what happens. Level-agnostic.
- **feeling** — one sentence, why it matters. The theme expressed.

These two fields are the spine of every node and never change between Seed/Sprout/Bloom/Fruit renderings.

## Review checklist for these skeletons

Before any prose gets written:
- [ ] Each beat is genuinely one thing happening. (If two things, it's two nodes.)
- [ ] Each feeling expresses a piece of the kingdom's theme: *understanding means seeing connections, not just things.*
- [ ] The 6 western-wall beats still flow as a sequence — each one earns the next.
- [ ] Nothing in the existing prose is load-bearing that isn't captured here. (If something gets cut and we miss it, it's gone.)

## Next steps after review

1. You sign off (or revise) these skeletons.
2. Follow-up session: introduce `StoryBeat` / `AdaptiveContent` types (Phase 3a), then write Seed + Sprout for these 7 nodes (Phase 2). Bloom and Fruit come later (Phase 3b).
3. Same beat + feeling discipline applied to the unwritten paths (eastern grove, map study, convergence, philosophical paths, resolution) when they get written.

---

## The 7 nodes

### `garden_entrance` — The Map Inside the Primer

- **beat**: A folded map appears between pages of the Primer she's read before, smelling of soil, with a note saying the garden has been waiting long enough.
- **feeling**: Some invitations find you before you know you were looking for them.

---

### `western_wall` — The Overgrown Wall

- **beat**: She fights through brambles to reach a crumbling sandstone wall and finds a beetle watching her and a rusted iron gate behind the thorns.
- **feeling**: Hard work gets you to interesting places.

---

### `clearing_path` — Clearing the Brambles

- **beat**: She spends a long, sweaty stretch tearing ivy and sawing thorns until the gate finally grinds open.
- **feeling**: Some things should take a long time — it's how you know they matter.

---

### `wall_lunch` — Bread, Cheese, and a Beetle

- **beat**: She rests on the wall with bread and cheese and watches a beetle pick up a pebble, carry it three inches, set it down, and repeat — undiscouraged.
- **feeling**: Patience without progress is still a kind of work worth respecting.

---

### `lichen_grid` — The Pattern on the Wall

- **beat**: Looking closer, she sees the lichen grows in a deliberate silver-and-green grid — a map legend built into the wall itself.
- **feeling**: The world has instructions in it for anyone patient enough to notice.

---

### `old_well` — The Well

- **beat**: Past the gate she finds a dry well with spiral steps carved inside and climbs down into the cool dark.
- **feeling**: Curiosity has to be willing to go where the light shrinks.

---

### `well_roots` — What Grows Below

- **beat**: Halfway down she finds hundreds of warm, pale roots breaking through the well wall, all pointing toward the garden's center, pulsing with a slow rhythm she can feel in her chest — and the beetle, which has followed her down, sets its pebble at the bottom step as if marking the way.
- **feeling**: Something has been working here for a very long time, and it has been waiting for someone to notice.

---

## Level-gating candidates

Some beats in this story may not exist for all readers — see [OVERHAUL-PLAN.md:193](../OVERHAUL-PLAN.md#L193) for the original "do some beats exist only at higher levels?" question. The answer we've landed on: **yes, and that's the point**. Different readers should get genuinely different stories that are each cohesive, not the same story dumbed down.

Mechanism (to be added in Phase 3a): a `minLevel?: AdaptiveLevel` field on `StoryBeat`. The renderer filters out choices that lead to nodes the reader can't access. The reader sees fewer doors, never a locked door.

Safety rail: a content-validator check that fails if `minLevel` is set on a node whose predecessor has only one outgoing choice — that would create an unreachable path for lower-level readers and break the story flow.

### Probable gates on the western wall path

- **`lichen_grid`** — Bloom+ candidate. The "world has instructions in it" beat is abstract and rewards close attention. Skippable: `wall_lunch → old_well` flows fine without it. Cost: Seed/Sprout readers miss a piece of the kingdom's theme. Probably worth it — they get the same theme delivered more concretely at `well_roots`.

### Probable gates on unwritten paths

- **Map-study path entirely** (`study_map → cartographer_story → pattern_lesson`) — Bloom+ candidate. Iris's backstory, the cartographer's notes, and the emergence lesson are heavy on abstraction and reading-density. A Seed reader at `garden_entrance` would see only 2 of the 3 path choices. Requires that the convergence at `garden_heart` doesn't *depend* on having taken the map-study path — needs verification when those nodes get written.
- **Eastern grove path** — likely available to all levels, but `listening_post`'s "she knew without knowing how" intuition beat may need a more concrete Seed rendering rather than gating.

### When to actually decide

Defer real gating decisions until Seed + Sprout for the western wall exist. Once we've written down to Seed for one path, we'll have a feel for which beats genuinely don't translate down vs. which just need a different rendering. Gate based on evidence, not guesses.

---

## Notes on the extraction

A few judgment calls worth flagging:

- **`well_roots` is doing a lot.** Three things happen: she touches the roots, she feels the pulse, the beetle places its pebble. By the "one beat per node" rule, this is arguably 2 or 3 nodes. I kept it as one because the three moments are tightly braided — the roots, the pulse, and the beetle's gesture all say the same thing. But this is the most likely candidate to split when we write Seed; if 4 sentences can't hold it, that's the signal.

- **The beetle is a through-line, not a beat.** It appears in `western_wall`, `wall_lunch`, `lichen_grid` (cameo), and `well_roots`. Its presence is sensory continuity, not the beat itself. Don't let it eat the page.

- **The cartographer is absent from this path.** Iris's name and story live entirely on the map-study path. The western wall path implies her work (the planted lichen, the carved steps) without naming her. That's intentional — keep it that way in the rewrite.
