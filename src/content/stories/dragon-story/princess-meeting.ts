export const storyPrincessMeeting = {
  story_princess: {
    title: "The Princess and the Mechanical Dragon",
    content: ({ readerName }: { readerName: string }) => `In a land where great machines hummed beneath crystal spires, there lived a princess named ${readerName} who was unlike any other.

While other royals studied etiquette and embroidery, she spent her days in the palace workshop, learning the secret languages that commanded the tiny machines - the mites and assemblers that built their world.

One day, a great mechanical dragon appeared at the kingdom's borders, its scales gleaming like polished steel, steam rising from its nostrils. The people were afraid, but Princess ${readerName} noticed something curious...

The dragon's movements followed a pattern, like a complex dance or perhaps... a code.`,
    choices: [
      { text: "Study the dragon's pattern", action: "dragon_pattern" },
      { text: "Approach the dragon carefully", action: "dragon_approach" },
      { text: "Gather the palace engineers", action: "dragon_engineers" },
      { text: "Ask the Primer about nanotechnology", action: "molecular_talk" }
    ]
  },

  elara_revealed: {
    title: "The Truth Unveiled",
    content: ({ readerName }: { readerName: string }) => `Princess ${readerName} stepped back, her mind reeling with all she had learned.

The mechanical dragon was Princess Elara - her own great-great-grandmother. She had transformed herself to rescue Marcus, the artificer she loved. But the transformation had been too complete, too perfect. By the time she could fly, Marcus had died in the Crystal Dungeons, waiting for a rescue that came too late.

For a century, Elara had remained in this form - powerful, magnificent, and utterly alone. Neither human enough to grieve properly, nor dragon enough to forget.

"Now you know," Elara's mechanical voice whispered, each word resonating like a temple bell. "Now you understand why I dance these patterns at the kingdom's edge, why I wait and watch. I am a warning and a wonder - what happens when love and brilliance move faster than wisdom."

${readerName} felt tears on her cheeks. "Grandmother," she whispered, "you've been alone for so long."

"Not alone anymore," Elara said gently. "You found me. You understood. That is more than I dared hope for in a hundred years."

The Primer's pages glowed softly, waiting. This was ${readerName}'s moment to choose not just what to do, but who to become in the face of such profound loss and longing.`,
    choices: [
      { text: "Consider how to help Elara heal", action: "reader_choice" }
    ]
  }
};