export const storyPrincessMeeting = {
  story_princess: {
    title: "The Princess and the Mechanical Dragon",
    content: (readerName) => `In a land where great machines hummed beneath crystal spires, there lived a princess named ${readerName} who was unlike any other.

While other royals studied etiquette and embroidery, she spent her days in the palace workshop, learning the secret languages that commanded the tiny machines - the mites and assemblers that built their world.

One day, a great mechanical dragon appeared at the kingdom's borders, its scales gleaming like polished steel, steam rising from its nostrils. The people were afraid, but Princess ${readerName} noticed something curious...

The dragon's movements followed a pattern, like a complex dance or perhaps... a code.`,
    choices: [
      { text: "Study the dragon's pattern", action: "dragon_pattern" },
      { text: "Approach the dragon carefully", action: "dragon_approach" },
      { text: "Gather the palace engineers", action: "dragon_engineers" },
      { text: "Ask the Primer to explain the technology", action: "tech_lesson" }
    ]
  }
};