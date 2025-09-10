export const dragonEngineersStories = {
  dragon_engineers: {
    title: "The Council of Makers",
    content: (readerName: string) => `Princess ${readerName} summoned the palace's finest engineers and artificers to the great hall. Master Cogsworth, ancient and wise, examined her sketches through his many-lensed spectacles.

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
  },

  queens_workshop: {
    title: "The Chamber of Wonders",
    content: (readerName: string) => `Deep beneath the palace, in chambers forgotten by all but the oldest servants, ${readerName} discovered the Artificer Queen's workshop. The door stood ajar, as if she had just stepped out for a moment.

Inside, the workshop was a wonderland of impossible machines. Clockwork birds that sang with human voices perched on shelves beside music boxes that played melodies from dreams. In the center stood the Queen's greatest creation: a transformation chamber, its crystalline walls still humming with residual power.

But what caught ${readerName}'s attention was the workbench, covered with blueprints and notes written in a familiar hand. The drawings showed the progression of a great work: sketches of dragons, calculations for consciousness transfer, and most tellingly, a series of self-portraits showing a woman's gradual transformation from flesh to scale.

At the bottom of the final blueprint, she found words that made her gasp: "For love, I will become the thing I have always been in my heart - powerful enough to protect what I cherish most."

On the workbench lay one final item: a small, unfinished clockwork heart, still warm to the touch.`,
    choices: [
      { text: "Study the transformation chamber", action: "study_chamber" },
      { text: "Examine the clockwork heart", action: "clockwork_heart" },
      { text: "Read all the Queen's notes and blueprints", action: "read_blueprints" },
      { text: "Test if the workshop's magic still works", action: "test_workshop_magic" }
    ]
  },

  protocol_research: {
    title: "The Science of Souls",
    content: (readerName: string) => `In the royal library's most restricted section, ${readerName} found the Protocol of Transformation - not in books, but etched into plates of living metal that whispered their secrets when touched.

The Protocol revealed a truth that made her shiver: consciousness was not trapped in flesh, but was a pattern that could be written into any sufficiently complex system. The Artificer Queen had discovered how to encode a human soul into the quantum matrices of her machines.

But transformation was not simple translation - it was art. Each consciousness required a unique vessel, shaped by personality, dreams, and deepest desires. The Queen had built her dragon form not randomly, but as an expression of her innermost self: powerful, protective, capable of flight, but also inherently lonely.

The plates revealed the reversal process too: to return consciousness to flesh, one needed not just technical skill, but deep understanding of the person trapped within. The reversal required someone who truly knew the transformed being - their hopes, fears, loves, and dreams.

Most importantly, the transformed being had to want to return. Without that desire, the strongest magic would fail.`,
    choices: [
      { text: "Learn to read consciousness patterns", action: "read_consciousness" },
      { text: "Understand Elara's deepest desires", action: "understand_elara" },
      { text: "Discover what Elara truly wants now", action: "elara_true_desire" },
      { text: "Find someone who truly knew Elara", action: "find_true_friend" }
    ]
  },

  gather_tools: {
    title: "The Instruments of Change",
    content: (readerName: string) => `Master Cogsworth led ${readerName} through the palace's deepest vaults, where the ancient tools of the transformation arts were kept. Each implement was a masterpiece of both science and magic.

"The Resonance Tuner," he explained, lifting a crystalline device that hummed with inner light, "attunes consciousness to its proper frequency. The Memory Prism captures and preserves the essential self. And this..." He reverently touched a small silver needle. "The Thread of Intent, which can weave souls back into flesh."

But the most important tool was not an object at all - it was knowledge. "The greatest artificers knew that transformation was not about forcing change," Master Cogsworth whispered, "but about revealing what already exists within. Every human contains the seed of what they might become. Every dragon holds the memory of what they once were."

As they gathered the ancient tools, ${readerName} felt their weight - not just physical, but emotional. These were instruments that could reshape reality itself, but they could only be used by someone pure of purpose and clear of heart.

"Remember, Princess," Master Cogsworth warned, "these tools will amplify your intentions. If you approach the dragon with fear, fear is what you'll create. Approach with love, and love becomes possible."`,
    choices: [
      { text: "Practice using the tools safely", action: "practice_tools" },
      { text: "Prepare your mind and heart for the task", action: "prepare_heart" },
      { text: "Return to Elara with the tools", action: "return_with_tools" },
      { text: "Seek additional guidance from Master Cogsworth", action: "more_guidance" }
    ]
  },

  queen_history: {
    title: "The Truth of Princess Elara",
    content: (readerName: string) => `Master Cogsworth led ${readerName} to the palace archives, where he pulled out a hidden ledger bound in scales that shimmered like moonlight on water.

"The true story of Princess Elara was hidden," he began, "because it was considered too dangerous - a tale of forbidden love that led to transformation beyond imagining."

The ledger revealed that Elara had been more than just the Artificer Queen - she had been ${readerName}'s own great-great-grandmother, a princess who had given up her throne for love. Her beloved Marcus had been a common clockmaker's son, brilliant but penniless.

"When the king forbade their marriage," Master Cogsworth continued, "Marcus was not just sent away - he was imprisoned in the Crystal Dungeons, sentenced to life for 'corrupting a princess.' Elara spent months trying to rescue him legally, but the law was absolute."

The ledger's final entry, written in Elara's own hand, made ${readerName}'s heart break: "If justice will not free my love, then I will become something beyond the reach of kingdoms and kings. I will become a creature of the sky, and I will carry Marcus away from this world that cannot accept our hearts."

"But she never found him," Master Cogsworth finished sadly. "By the time her transformation was complete, Marcus had died in the dungeons, waiting for a rescue that came too late."`,
    choices: [
      { text: "Tell Elara the truth about Marcus", action: "reveal_marcus_truth" },
      { text: "Find Marcus's grave to bring Elara closure", action: "find_marcus_grave" },
      { text: "Help Elara honor Marcus's memory properly", action: "honor_marcus" },
      { text: "Focus on helping Elara find new purpose", action: "new_purpose_elara" }
    ]
  }
};