export const dragonEngineersStories = {
  dragon_engineers: {
    title: "The Council of Makers",
    content: (readerName) => `Princess ${readerName} summoned the palace's finest engineers and artificers to the great hall. Master Cogsworth, ancient and wise, examined her sketches through his many-lensed spectacles.

"Your Highness," he wheezed, his voice like rustling parchment, "this is no ordinary mechanical beast. These patterns you've recorded - they match the work of the legendary Artificer Queen, who vanished a hundred years ago."

The other engineers gasped. The Artificer Queen had been the greatest maker of their age, creator of wonders beyond imagining. But she had disappeared one night, leaving only her workshop full of half-finished marvels.

"If this dragon is her work," continued Master Cogsworth, "then it may contain her greatest secret - the Protocol of Transformation, which could turn living beings into machines and back again."

${readerName} felt her heart race. Could the dragon itself be the lost Queen?`,
    choices: [
      { text: "Visit the Artificer Queen's abandoned workshop", action: "queens_workshop" },
      { text: "Research the Protocol of Transformation", action: "protocol_research" },
      { text: "Gather the ancient tools needed for the reversal", action: "gather_tools" },
      { text: "Learn more about the Artificer Queen's disappearance", action: "queen_history" }
    ]
  }
};