export const dragonApproachStories = {
  dragon_approach: {
    title: "A Brave Meeting",
    content: (readerName: string) => `Against all advice from the court, Princess ${readerName} descended from the palace, her toolkit hidden beneath her cloak. The mechanical dragon's great head turned toward her as she approached, gears whirring and steam hissing softly.

Up close, she could see the intricate brass plates that formed its scales, each one engraved with microscopic symbols. The dragon lowered its massive head until it was level with hers, and in its crystalline eyes, she saw something impossible - a reflection not of herself, but of another young woman, trapped behind the glass.

The dragon's jaw opened slightly, and from within came not a roar, but a soft, musical chime - like a music box playing a lullaby. ${readerName} recognized it immediately: it was the royal anthem, but played backwards.

This dragon knew the palace. Perhaps... it had once called it home.`,
    choices: [
      { text: "Touch the dragon's scales to read the symbols", action: "read_scales" },
      { text: "Play the anthem forwards on your flute", action: "play_music" },
      { text: "Look deeper into the crystal eyes", action: "crystal_eyes" },
      { text: "Ask 'Who are you?'", action: "ask_identity" }
    ]
  }
};