export const molecularLockPuzzle = {
  molecular_lock: {
    title: "The Molecular Lock",
    content: (readerName: string) => `${readerName} discovers a sealed vault within the Artificer Queen's workshop, its entrance protected by an intricate lock that shimmers with shifting molecular patterns.

The lock displays three ornate chambers, each requiring a specific molecular arrangement to open.

<div class="separator-line"></div>

The Primer's voice whispers softly: <em>"This lock guards the Queen's most precious knowledge. Each chamber tests understanding of molecular principles she used in her transformations. Observe carefully..."</em>

<strong>CHAMBER ONE - The Temperature Challenge</strong>

The first chamber reveals three identical water molecules, yet each behaves quite differently:

• Molecule A - vibrates slowly, staying close to its neighbors
• Molecule B - bounces around at medium speed
• Molecule C - zips around wildly, bouncing far from others

Which molecular state holds the key to unlocking this chamber?`,
    choices: [
      { text: "Choose Molecule A (slow vibration)", action: "chamber_one_ice" },
      { text: "Choose Molecule B (medium speed)", action: "chamber_one_liquid" },
      { text: "Choose Molecule C (fast movement)", action: "chamber_one_steam" },
      { text: "Study the lock more carefully", action: "lock_hint_one" }
    ]
  },

  chamber_one_ice: {
    title: "The First Key Turns",
    content: (readerName: string) => `Excellent reasoning, ${readerName}! The slow-moving molecules form ice - the most structured state of water. The chamber recognizes this principle of molecular order and clicks open with a crystalline chime.

<div class="separator-line"></div>

<strong>CHAMBER TWO - The Bond Puzzle</strong>

The second chamber displays four different atomic arrangements, each glowing with ethereal light:

• Pattern A - Atoms linked in long, flexible chains
• Pattern B - Atoms arranged in flat, hexagonal sheets  
• Pattern C - Atoms bonded in three-dimensional pyramids
• Pattern D - Individual atoms floating separately

<em>An ancient inscription appears in flowing script:</em>

<em>"Choose the pattern that gives the dragon's scales their legendary strength."</em>`,
    choices: [
      { text: "Pattern A - Flexible chains", action: "chamber_two_polymer" },
      { text: "Pattern B - Hexagonal sheets", action: "chamber_two_graphene" },
      { text: "Pattern C - 3D pyramids", action: "chamber_two_diamond" },
      { text: "Pattern D - Separate atoms", action: "chamber_two_gas" },
      { text: "Ask the Primer for guidance", action: "lock_hint_two" }
    ]
  },

  chamber_one_liquid: {
    title: "Not Quite Right",
    content: (readerName: string) => `The lock shimmers but doesn't open. ${readerName} realizes that while liquid water is important, this particular chamber seems to want the most ordered state of matter.`,
    choices: [
      { text: "Try Molecule A (slow vibration)", action: "chamber_one_ice" },
      { text: "Try Molecule C (fast movement)", action: "chamber_one_steam" },
      { text: "Study the patterns again", action: "lock_hint_one" }
    ]
  },

  chamber_one_steam: {
    title: "Too Much Energy",
    content: (readerName: string) => `The chamber glows briefly but the lock remains sealed. ${readerName} considers that perhaps this chamber values structure over chaos.`,
    choices: [
      { text: "Try Molecule A (slow vibration)", action: "chamber_one_ice" },
      { text: "Try Molecule B (medium speed)", action: "chamber_one_liquid" },
      { text: "Think about molecular order", action: "lock_hint_one" }
    ]
  },

  lock_hint_one: {
    title: "The Primer's Wisdom",
    content: (readerName: string) => `"Think about when water is most organized, ${readerName}," the Primer suggests. "The ancient builders valued order and structure. When do molecules arrange themselves in the most predictable, organized way?"`,
    choices: [
      { text: "Choose the slow-vibrating molecules", action: "chamber_one_ice" },
      { text: "Choose the medium-speed molecules", action: "chamber_one_liquid" },
      { text: "Choose the fast-moving molecules", action: "chamber_one_steam" }
    ]
  },

  chamber_two_graphene: {
    title: "Strength Through Structure",
    content: (readerName: string) => `Brilliant deduction, ${readerName}! The hexagonal sheets represent graphene - carbon atoms arranged in perfect hexagons, creating material stronger than steel yet flexible like fabric. The second chamber opens with a harmonic resonance.

<div class="separator-line"></div>

<strong>CHAMBER THREE - The Communication Challenge</strong>

The final chamber presents a molecular mystery. Four molecules pulse with different colors:

• Red Molecule - Absorbs all colors except red
• Blue Molecule - Absorbs red and green light
• Green Molecule - Absorbs red and blue light  
• Clear Molecule - Absorbs ultraviolet light

<em>The question appears in shimmering letters:</em>

<em>"Which molecule would plants choose to capture energy from sunlight?"</em>`,
    choices: [
      { text: "Red Molecule", action: "chamber_three_red" },
      { text: "Blue Molecule", action: "chamber_three_blue" },
      { text: "Green Molecule", action: "chamber_three_green" },
      { text: "Clear Molecule", action: "chamber_three_clear" },
      { text: "Consider what plants need", action: "lock_hint_three" }
    ]
  },

  chamber_two_polymer: {
    title: "Flexibility Has Its Place",
    content: (readerName: string) => `The chamber acknowledges the flexibility of polymer chains, but something stronger is needed for dragon scales. ${readerName} thinks about what could be even more robust.`,
    choices: [
      { text: "Try the hexagonal sheets", action: "chamber_two_graphene" },
      { text: "Try the 3D pyramids", action: "chamber_two_diamond" },
      { text: "Consider what makes materials strong", action: "lock_hint_two" }
    ]
  },

  chamber_two_diamond: {
    title: "Too Rigid",
    content: () => `While diamond is incredibly hard, the lock seems to want something that combines strength with flexibility - essential for dragon scales that must bend in flight.`,
    choices: [
      { text: "Try the hexagonal sheets", action: "chamber_two_graphene" },
      { text: "Try the flexible chains", action: "chamber_two_polymer" },
      { text: "Think about balance", action: "lock_hint_two" }
    ]
  },

  chamber_two_gas: {
    title: "No Structure",
    content: () => `Individual atoms provide no structural strength at all. You realize the challenge requires understanding how atoms work together.`,
    choices: [
      { text: "Try the hexagonal sheets", action: "chamber_two_graphene" },
      { text: "Try the flexible chains", action: "chamber_two_polymer" },
      { text: "Try the 3D pyramids", action: "chamber_two_diamond" }
    ]
  },

  lock_hint_two: {
    title: "Strength and Flexibility",
    content: (readerName: string) => `"Dragon scales must be both strong and flexible, ${readerName}," the Primer explains. "Think about how carbon atoms can arrange themselves in flat sheets - strong like diamond, but able to slide past each other like fabric."`,
    choices: [
      { text: "Choose the hexagonal sheets", action: "chamber_two_graphene" },
      { text: "Choose the 3D pyramids", action: "chamber_two_diamond" },
      { text: "Choose the flexible chains", action: "chamber_two_polymer" }
    ]
  },

  chamber_three_green: {
    title: "The Vault Opens",
    content: (readerName: string) => `Perfect! ${readerName} understands that plants appear green because chlorophyll absorbs red and blue light for energy, reflecting only green light back to our eyes. The molecular lock recognizes this wisdom about how molecules communicate with light.

<div class="separator-line"></div>

<strong>The Vault Opens</strong>

With a deep, resonant hum, all three chambers align and the vault door swings open. Inside, ${readerName} discovers not gold or jewels, but something far more valuable: a collection of crystalline memory devices containing the accumulated knowledge of generations of molecular engineers.

The Primer glows warmly:

<em>"You have demonstrated understanding of molecular behavior, structural engineering, and the language of light. These are the foundations upon which all nanotechnology is built. This is the knowledge Princess Elara used to master her transformation."</em>`,
    choices: [
      { text: "Study the molecular engineering archives", action: "molecular_talk" },
      { text: "Return to examine the transformation chamber", action: "queens_workshop" },
      { text: "Share these discoveries with Master Cogsworth", action: "dragon_engineers" },
      { text: "Use this knowledge to understand Elara", action: "elara_revealed" }
    ]
  },

  chamber_three_red: {
    title: "Not Quite",
    content: (readerName: string) => `The red molecule only reflects red light - it's not capturing much energy for the plant. ${readerName} thinks about what colors plants actually use.`,
    choices: [
      { text: "Try the blue molecule", action: "chamber_three_blue" },
      { text: "Try the green molecule", action: "chamber_three_green" },
      { text: "Consider what plants look like", action: "lock_hint_three" }
    ]
  },

  chamber_three_blue: {
    title: "Close, But Not Complete",
    content: () => `This molecule captures some useful energy, but plants need to capture more of the sun's spectrum for maximum efficiency.`,
    choices: [
      { text: "Try the green molecule", action: "chamber_three_green" },
      { text: "Try the clear molecule", action: "chamber_three_clear" },
      { text: "Think about plant colors", action: "lock_hint_three" }
    ]
  },

  chamber_three_clear: {
    title: "Invisible Energy",
    content: () => `While UV absorption is important for protection, it's not the primary way plants capture energy from visible sunlight.`,
    choices: [
      { text: "Try the green molecule", action: "chamber_three_green" },
      { text: "Try the blue molecule", action: "chamber_three_blue" },
      { text: "Consider visible light", action: "lock_hint_three" }
    ]
  },

  lock_hint_three: {
    title: "The Color of Life",
    content: (readerName: string) => `"Think about why plants appear green to your eyes, ${readerName}," the Primer suggests. "What they reflect is different from what they absorb. Plants are green because they use other colors for energy."`,
    choices: [
      { text: "The green molecule", action: "chamber_three_green" },
      { text: "The red molecule", action: "chamber_three_red" },
      { text: "The blue molecule", action: "chamber_three_blue" }
    ]
  }
};