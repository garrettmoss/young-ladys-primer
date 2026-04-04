# The Cartographer's Garden — Arc Outline

This document is Step 1 of the writing strategy: structure + one-paragraph summaries per node. No prose yet — just validating the shape.

## Core Theme

**Maps don't just describe the world — they reveal relationships you couldn't see without them.** The cartographer mapped living connections (fungal networks, insect routes, water flow) and built a garden that computes through biology. The reader learns that understanding a system means understanding how its parts relate, not just what they are.

## Confluence Structure

```mermaid
graph TD
    %% Entry
    garden_entrance[garden_entrance<br/>The Map Inside the Primer<br/>3 CHOICES]

    %% Three investigation paths
    garden_entrance --> western_wall[western_wall<br/>The Overgrown Wall<br/>1 choice]
    garden_entrance --> eastern_grove[eastern_grove<br/>Following the Map<br/>1 choice]
    garden_entrance --> study_map[study_map<br/>The Cartographer's Notes<br/>1 choice]

    %% Western wall path (physical work, humor)
    western_wall --> clearing_path[clearing_path<br/>Clearing the Brambles<br/>1 choice]
    clearing_path --> old_well[old_well<br/>The Well and the Beetle<br/>1 choice]

    %% Eastern grove path (intuition, listening)
    eastern_grove --> root_network[root_network<br/>The Threads Below<br/>1 choice]
    root_network --> listening_post[listening_post<br/>What the Trees Are Saying<br/>1 choice]

    %% Map study path (knowledge, cartographer's story)
    study_map --> cartographer_story[cartographer_story<br/>Iris of the Hundred Maps<br/>1 choice]
    cartographer_story --> pattern_lesson[pattern_lesson<br/>LESSON: Emergence<br/>1 choice]

    %% CONVERGENCE
    old_well --> garden_heart[garden_heart<br/>The Heart of the Garden<br/>3 CHOICES]
    listening_post --> garden_heart
    pattern_lesson --> garden_heart

    %% Philosophical choices
    garden_heart --> decode_path[decode_path<br/>Read the Calculation<br/>1 choice]
    garden_heart --> feel_path[feel_path<br/>Listen With Your Body<br/>1 choice]
    garden_heart --> tend_path[tend_path<br/>Tend What's Growing<br/>1 choice]

    %% Final convergence
    decode_path --> garden_message[garden_message<br/>What the Garden Says<br/>1 choice]
    feel_path --> garden_message
    tend_path --> garden_message

    garden_message --> garden_ending[garden_ending<br/>A Living Map<br/>THE END]

    %% Styling
    classDef entry fill:#FFD700
    classDef converge fill:#4ECDC4
    classDef lesson fill:#95E1D3
    classDef puzzle fill:#F38181
    classDef ending fill:#AA96DA

    class garden_entrance entry
    class garden_heart converge
    class pattern_lesson lesson
    class garden_ending ending
```

## Node Summaries

### Entry

**`garden_entrance` — The Map Inside the Primer** (3 choices)
The reader turns a page and finds a folded map pressed between the Primer's pages — old, hand-drawn, stained with soil. It shows a walled garden on the kingdom's edge with strange annotations: arrows between trees, dotted lines underground, tiny numbers next to flower beds. A note in faded ink reads: *"If you are reading this, the garden has been waiting long enough."* The reader chooses how to begin: go to the garden and start at its crumbling western wall, follow the map's marked path to the eastern grove, or study the map's margins for clues about who made it.

### Western Wall Path (physical work, humor, embodiment)

**`western_wall` — The Overgrown Wall** (1 choice → clearing_path)
The western wall is half-collapsed, buried under a century of brambles and ivy. The reader pushes through thorny growth to reach it. The wall is warm sandstone, crumbling, covered in lichen that grows in oddly regular patterns. It's hard work. Thorns scratch her arms. A fat black beetle sits on the wall watching her, motionless, as if supervising. She finds a rusted iron gate behind the brambles, jammed shut.

**`clearing_path` — Clearing the Brambles** (1 choice → old_well)
Slow, sweaty work. The reader clears brush, pulls ivy, and pries the gate open with a flat rock. Breather page: she sits on the wall, eats bread and cheese she packed, watches clouds. The beetle is still there. It picks up a small pebble in its mandibles and carries it three inches, sets it down, walks back. Picks up the same pebble. Carries it three inches. Sets it down. She realizes the lichen patterns on the wall aren't random — they're a grid. Like a map legend.

**`old_well` — The Well and the Beetle** (1 choice → garden_heart)
Behind the gate she finds a dry well with a spiral staircase carved inside. At the bottom, roots have broken through the walls — hundreds of pale threads reaching into the dark, all converging toward the garden's center. She can feel a low vibration through the stone, almost like a pulse. The beetle has followed her. It places its pebble on the top step with what she can only describe as determination. Something about the rhythm of the roots reminds her of breathing.

### Eastern Grove Path (intuition, listening, mycorrhizal networks)

**`eastern_grove` — Following the Map** (1 choice → root_network)
The map marks a path through a grove of old oaks on the garden's east side. The reader follows it and finds the trees are enormous — far older than a hundred years. The map has symbols she doesn't recognize drawn between them, like a web. Underfoot, the ground feels spongy, warm. When she kneels and presses her ear to the soil, she hears something. Not sound exactly. A hum below hearing, felt in her teeth and breastbone. She trusts it and follows where it's strongest.

**`root_network` — The Threads Below** (1 choice → listening_post)
Where the hum is strongest, a fallen tree has exposed the root network — and it's extraordinary. White fungal threads connect every root to every other root in a web so dense it looks woven. The reader recognizes it from lessons: mycorrhizal networks, the "wood wide web." But this one has been *shaped*. Someone trained these connections, guided them into patterns. The threads pulse faintly, rhythmically. Information is moving. The trees are talking, and someone built them a language.

**`listening_post` — What the Trees Are Saying** (1 choice → garden_heart)
At the center of the grove, a stone bench sits in a clearing where five root networks converge. The map calls this point *"the listening post."* When the reader sits, she can feel the pulse clearly — a slow rhythm like a heartbeat, but it shifts. It's not repetitive. It's *processing*. She sits for a long time, watching light move through leaves, feeling the rhythm change. She falls half-asleep. When she wakes, she knows something she didn't before — which direction the garden's center is, though no path is visible. She knew without knowing how.

### Map Study Path (knowledge, cartographer backstory, emergence lesson)

**`study_map` — The Cartographer's Notes** (1 choice → cartographer_story)
The reader studies the map's margins instead of rushing to the garden. The cartographer's handwriting fills every edge — measurements, observations, questions. *"The beetles carry calcium. Why?"* *"Root junction 7 redirected overnight — who told it to?"* *"I think it's counting something."* The notes grow more excited, then more tired, then sparse. The last entry: *"It won't finish in my lifetime. But it will finish."* No name. Just a small drawing of a beetle carrying a pebble.

**`cartographer_story` — Iris of the Hundred Maps** (1 choice → pattern_lesson)
The Primer knows who made the map. Her name was Iris. She was a cartographer who mapped trade routes until she realized the most important routes weren't roads — they were the invisible connections between living things. She spent forty years mapping a single garden, discovering that its ecology was computing something through emergence: millions of simple interactions producing complex behavior no single organism intended. Iris died alone in a cottage at the garden's edge. One sentence. The story moves forward. She left a hundred maps, each showing a different layer of the same place. The reader holds one of them.

**`pattern_lesson` — LESSON: Emergence and Systems Thinking** (1 choice → garden_heart)
Educational content about emergence: how simple rules create complex behavior. Ant colonies, flocking birds, weather patterns, brain cells. No single ant knows the colony's plan. No single neuron holds a thought. The lesson connects to the garden: Iris realized the mycorrhizal network, the beetle routes, the bloom timing, and the water flow were all parts of one system — a biological computer running a calculation through emergence. The reader learns that a map of relationships reveals more than a map of things.

### Convergence

**`garden_heart` — The Heart of the Garden** (3 choices)
All three paths lead here: the physical center of the garden, a circular clearing where every root network, every beetle path, every water channel converges. The ground hums. Flowers bloom in rings, opening and closing in sequence — a visible wave moving outward from the center like a slow heartbeat. It's beautiful and strange. The garden has been running its calculation for a hundred years, and it's almost done. The reader can feel it in her chest. The reader must decide how to receive the garden's message: try to decode the pattern logically, listen with her body and trust her intuition, or simply tend the garden and let it finish its work.

### Philosophical Paths

**`decode_path` — Read the Calculation** (1 choice → garden_message)
The reader works methodically. She counts bloom sequences, maps beetle movements, measures the pulse timing. She uses what she learned from Iris's notes and the emergence lesson. Slowly, a pattern emerges — not in any single measurement, but in how they relate. The garden is mapping *itself*: every connection, every relationship, every dependency. Iris asked it to answer one question: *What does a living system need to sustain itself?* The answer is encoded in the bloom sequence. It takes patience and careful work, but the reader decodes it.

**`feel_path` — Listen With Your Body** (1 choice → garden_message)
The reader sits in the clearing and breathes. She matches her breathing to the garden's pulse. She stops trying to understand and starts feeling. The hum resolves into something almost like meaning — not words, but a knowing. The garden isn't communicating *to* her; she's part of the system now, another node in the network. She feels what it feels: the slow satisfaction of roots finding water, the patient work of beetles building soil, the quiet conversation between fungi and trees. The answer to Iris's question arrives as a feeling in her chest, not a thought in her head. She knows it the way she knows her own heartbeat.

**`tend_path` — Tend What's Growing** (1 choice → garden_message)
The reader doesn't try to decode or feel. She pulls weeds. She clears a clogged water channel. She moves a stone that's blocking a beetle path. Practical work with dirty hands. As she tends the garden, the bloom sequence accelerates — the rings pulse faster, the hum deepens. The garden responds to care the way any living thing does. By tending it, she becomes part of its answer. Iris's question wasn't abstract: *What does a living system need to sustain itself?* Someone willing to get their hands dirty.

### Resolution

**`garden_message` — What the Garden Says** (1 choice → garden_ending)
However the reader arrived — through logic, intuition, or care — the garden completes its calculation. The bloom sequence reaches the center and every flower opens at once. A brief, ordinary silence. Then the garden relaxes into something that feels like rest. The answer to a hundred years of computation is simple, the way important things usually are: a living system sustains itself through relationship. Not any single connection, but the web of all of them. Iris knew this. She built a garden that could prove it. The beetle sets down its pebble one last time.

**`garden_ending` — A Living Map** (THE END)
The reader leaves the garden carrying Iris's map — but she sees it differently now. It's not a picture of a place. It's a picture of relationships. The Primer's pages glow gently. The reader has learned something that can't be unlearned: that understanding means seeing connections, not just things. That sometimes the most important work is slow and dirty and quiet. That a garden can think, if you give it enough time. She folds the map carefully and tucks it back between the Primer's pages, where someone else might find it someday.

---

## Node Count & Structure

**Total: 16 nodes**

| Section | Nodes | Choice count |
|---------|-------|-------------|
| Entry | 1 | 3 choices |
| Western wall path | 3 | 1 choice each |
| Eastern grove path | 3 | 1 choice each |
| Map study path | 3 | 1 choice each |
| Convergence | 1 | 3 choices |
| Philosophical paths | 3 | 1 choice each |
| Resolution | 2 | 1 choice / end |

**Educational content:**
- Lesson: 1 (emergence/systems thinking)
- Puzzle: bloom-sequence (to be designed, Phase 3 later batch)

**Content guidelines checklist:**
- ✅ Embodiment: dirt, weather, physical work throughout
- ✅ Sensory grounding: beetle texture, warm stone, soil smell, bread and cheese
- ✅ Breathing room: clearing_path is a dedicated breather page
- ✅ Plain narration: "The garden was larger than she expected, and wilder."
- ✅ Intuition: listening_post, feel_path — knowing without knowing how
- ✅ Physical consequences: thorns scratch, she's tired and sweaty, sleeps badly
- ✅ Humor: the beetle and its pebble (running gag), impractical flower communication
- ✅ Darkness with brevity: Iris died alone — one sentence, move on
- ✅ Feminine knowing: heartbeat rhythm, felt in chest/breastbone, trusted and proved right
