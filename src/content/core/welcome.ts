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
  }
};