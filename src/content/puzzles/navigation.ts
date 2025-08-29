export const puzzleNavigation = {
  puzzle_logic: {
    title: "Choose Your Challenge",
    content: (readerName: string) => `The Primer's surface shimmers with intricate patterns of light, each one representing a different kind of challenge to stretch your mind and test your understanding.

"Every great discovery begins with a puzzle, ${readerName}," the Primer explains. "Scientists are puzzle-solvers at heart - they see mysteries in the world and work to unravel them through observation, experimentation, and careful thinking.

These challenges will test not just what you know, but how you think. Are you ready?"`,
    choices: [
      { text: "The Molecular Lock - A nanotechnology mystery", action: "molecular_lock" },
      { text: "Return to the main menu", action: "welcome" }
    ]
  }
};