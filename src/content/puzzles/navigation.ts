export const puzzleNavigation = {
  puzzle_logic: {
    title: "Choose Your Challenge",
    content: ({ readerName }: { readerName: string }) => `Every great discovery begins with a puzzle, ${readerName}. Scientists are puzzle-solvers at heart — they see mysteries in the world and work to unravel them through observation, experimentation, and careful thinking.

These challenges will test not just what you know, but how you think.`,
    choices: [
      { text: "The Molecular Lock", action: "molecular_lock" }
    ]
  }
};