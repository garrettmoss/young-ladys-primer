export const dragonApproachStories = {
  dragon_approach: {
    title: "A Brave Meeting",
    content: ({ readerName }: { readerName: string }) => `Against all advice from the court, Princess ${readerName} descended from the palace, her toolkit hidden beneath her cloak. The mechanical dragon's great head turned toward her as she approached, gears whirring and steam hissing softly.

Up close, she could see the intricate brass plates that formed its scales, each one engraved with microscopic symbols. The dragon lowered its massive head until it was level with hers, and in its crystalline eyes, she saw something impossible - a reflection not of herself, but of another young woman, trapped behind the glass.

The dragon's jaw opened slightly, and from within came not a roar, but a soft, musical chime - like a music box playing a lullaby. ${readerName} recognized it immediately: it was the royal anthem, but played backwards.

This dragon knew the palace. Perhaps... it had once called it home.`,
    choices: [
      { text: "Touch the dragon's scales to read the symbols", action: "read_scales" },
      { text: "Play the anthem forwards on your flute", action: "play_music" }
    ]
  },

  read_scales: {
    title: "The Language of Living Metal",
    content: ({ readerName }: { readerName: string }) => `Princess ${readerName} reached out with trembling fingers and touched the dragon's scales. The moment her skin made contact, the microscopic symbols began to glow with inner light, and knowledge flooded her mind.

The symbols were not just decorative - they were a living language, inscribed by nanotechnological writers that had recorded every moment of the dragon's existence. Each scale told a story: memories of flight above the clouds, of conversations with scholars, of tears shed in loneliness.

But more than memories, ${readerName} felt emotions: a brilliant mind trapped behind walls of brass, desperate to connect but unable to speak. The dragon trembled under her touch, and she realized she was the first person in a hundred years to truly read its history.

In the final scale she touched, she found what she was looking for - a name written in symbols that pulsed like a heartbeat: "Elara." And beneath it, a message: "I remember who I was."`,
    choices: [
      { text: "Learn more about Elara", action: "elara_revealed" }
    ]
  },

  play_music: {
    title: "A Song to Wake the Heart",
    content: ({ readerName }: { readerName: string }) => `${readerName} drew out her silver flute, the one her mother had given her before the plague took her. She took a deep breath and began to play the royal anthem - not backwards as the dragon had hummed it, but forwards, true and clear.

As the notes rang out across the courtyard, something miraculous happened. The dragon began to change. Its mechanical movements became more fluid, more graceful. The harsh grinding of gears softened to whispered harmonies. And most wonderfully, the dragon began to sing along.

Its voice was like nothing ${readerName} had ever heard - part machinery, part human soul, creating harmonies that made the very stones weep with beauty. As they played together, the dragon's eyes grew brighter, more alive, and ${readerName} could swear she saw tears of liquid starlight falling from them.

When the song ended, the dragon spoke - its first words in a century: "I... I remember. I remember being human. I remember music lessons in the tower room, and... and someone who loved me. My name is Elara." The voice was layered - mechanical precision wrapped around a woman's heart.`,
    choices: [
      { text: "Learn more about Elara's past", action: "elara_revealed" }
    ]
  }
};
