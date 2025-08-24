export const welcomeContent = {
  welcome: {
    title: "Welcome to Your Primer",
    content: () => `Greetings, young reader. I am your Primer, crafted with care to be your guide, teacher, and companion through the vast realms of knowledge and imagination.

Like the morning mist that reveals new landscapes as it lifts, each page you turn will unveil new mysteries to explore and wisdom to discover.

What would you like to learn about today?`,
    choices: [
      { text: "Tell me a story", action: "story_princess" },
      { text: "Teach me something new", action: "lesson_choice" },
      { text: "Show me a puzzle", action: "puzzle_logic" },
      { text: "Help me understand myself", action: "reflection" }
    ]
  },

  lesson_choice: {
    title: "What Shall We Explore?",
    content: () => `Knowledge is like a great garden, dear reader. Each path leads to different wonders. Some trails wind through the mathematics that govern the stars, others through the stories that shape our hearts.

Which garden path calls to you today?`,
    choices: [
      { text: "The Science of Small Things", action: "nano_lesson" },
      { text: "How Stories Shape Reality", action: "narrative_lesson" },
      { text: "The Art of Problem Solving", action: "logic_lesson" },
      { text: "Understanding People and Cultures", action: "social_lesson" }
    ]
  },

  tech_lesson: {
    title: "The Primer's Teaching",
    content: (readerName) => `"Ah," says the Primer, its pages glowing softly, "you wish to understand the mechanical dragon's nature. Let me teach you, dear ${readerName}, about the marriage of consciousness and clockwork.

In Princess ${readerName}'s world, every machine has three aspects:

First, the FORM - the physical structure, be it gears and springs or circuits of light. The dragon's form is magnificent: joints that move with impossible grace, scales that can feel the slightest change in air pressure, eyes that see in spectrums beyond human perception.

Second, the FUNCTION - the purpose it serves, the problems it solves. But what function does a dragon serve? Perhaps it is not what it does, but what it preserves that matters.

Third, and most mysterious, the FLOW - the animating force that gives it life. In crude machines, this is mere electricity or steam. But in the dragon, the flow is something more... it is consciousness itself, encoded in quantum states, existing in the spaces between the gears.

Understanding these three aspects, one might begin to see how to help a consciousness flow back from metal to flesh..."`,
    choices: [
      { text: "Learn more about the FORM", action: "learn_form" },
      { text: "Understand the FUNCTION deeply", action: "learn_function" },
      { text: "Master the mysteries of FLOW", action: "learn_flow" },
      { text: "Return to help the dragon", action: "dragon_pattern" }
    ]
  }
};