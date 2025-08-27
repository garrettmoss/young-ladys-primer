export const lessonNavigation = {
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
  }
};