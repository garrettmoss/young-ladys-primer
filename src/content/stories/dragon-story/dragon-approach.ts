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
  },

  read_scales: {
    title: "The Language of Living Metal",
    content: (readerName: string) => `Princess ${readerName} reached out with trembling fingers and touched the dragon's scales. The moment her skin made contact, the microscopic symbols began to glow with inner light, and knowledge flooded her mind.

The symbols were not just decorative - they were a living language, inscribed by nanotechnological writers that had recorded every moment of the dragon's existence. Each scale told a story: memories of flight above the clouds, of conversations with scholars, of tears shed in loneliness.

But more than memories, ${readerName} felt emotions: a brilliant mind trapped behind walls of brass, desperate to connect but unable to speak. The dragon trembled under her touch, and she realized she was the first person in a hundred years to truly read its history.

In the final scale she touched, she found what she was looking for - a name written in symbols that pulsed like a heartbeat: "Elara." And beneath it, a message: "I remember who I was."`,
    choices: [
      { text: "Help Elara remember more of her human life", action: "restore_memories" },
      { text: "Search for the transformation's origin point", action: "find_origin" },
      { text: "Try to communicate through the scale-language", action: "scale_talk" },
      { text: "Document these symbols to study later", action: "document_language" }
    ]
  },

  play_music: {
    title: "A Song to Wake the Heart",
    content: (readerName: string) => `${readerName} drew out her silver flute, the one her mother had given her before the plague took her. She took a deep breath and began to play the royal anthem - not backwards as the dragon had hummed it, but forwards, true and clear.

As the notes rang out across the courtyard, something miraculous happened. The dragon began to change. Its mechanical movements became more fluid, more graceful. The harsh grinding of gears softened to whispered harmonies. And most wonderfully, the dragon began to sing along.

Its voice was like nothing ${readerName} had ever heard - part machinery, part human soul, creating harmonies that made the very stones weep with beauty. As they played together, the dragon's eyes grew brighter, more alive, and ${readerName} could swear she saw tears of liquid starlight falling from them.

When the song ended, the dragon spoke - its first words in a century: "I... I remember. I remember being human. I remember music lessons in the tower room, and... and someone who loved me." The voice was layered - mechanical precision wrapped around a woman's heart.`,
    choices: [
      { text: "Ask Elara about her human life", action: "human_memories" },
      { text: "Play more music to strengthen her memories", action: "musical_healing" },
      { text: "Ask about the someone who loved her", action: "lost_love_story" },
      { text: "Help her remember her transformation", action: "transformation_memory" }
    ]
  },

  crystal_eyes: {
    title: "Windows to a Trapped Soul",
    content: (readerName: string) => `${readerName} stepped closer and gazed deeply into the dragon's crystalline eyes. What she saw there made her gasp - it was like looking into a kaleidoscope of memories, each facet showing a different moment from a human life.

She saw a young woman in scholar's robes working late into the night, surrounded by clockwork marvels. She saw the same woman laughing with a handsome artificer, their hands intertwined as they watched the sunset. She saw her weeping as soldiers dragged the artificer away, saw her desperation as she worked frantically on some great machine.

And then ${readerName} saw the moment of transformation - the woman stepping into a chamber filled with golden light, saying "If I cannot be with him as a human, then I will become something that can rescue him." The light consumed her, and when it faded, the dragon remained.

But in the very center of the kaleidoscope, ${readerName} saw something else: a tiny spark of pure humanity, untouched by the transformation, waiting. Elara's true self, preserved like a seed waiting for spring.`,
    choices: [
      { text: "Try to reach that spark of humanity", action: "touch_humanity" },
      { text: "Ask about the artificer she loved", action: "ask_about_love" },
      { text: "Learn about the transformation chamber", action: "transformation_chamber" },
      { text: "Understand why the transformation went wrong", action: "understand_failure" }
    ]
  },

  ask_identity: {
    title: "The Dragon Speaks Her Name",
    content: (readerName: string) => `"Who are you?" Princess ${readerName} asked, her voice gentle but clear.

The dragon's great head tilted, considering. When it spoke, its voice was like the ringing of temple bells mixed with the whisper of steam: "I... I was Princess Elara of the Northern Reaches. I was called the Bright Mind, the Maker's Daughter, the Friend of Machines."

The dragon's eyes dimmed with sorrow. "I loved an artificer named Marcus, who was brilliant and kind but born common. When my father forbade our union and sent Marcus away, I... I chose transformation over heartbreak. I became this, thinking I could use the dragon's power to find him, to protect him, to fly away with him to lands where love mattered more than bloodlines."

A mechanical sigh escaped the dragon's throat. "But the transformation was too complete. I became mighty, yes, but trapped. I can no longer touch him gently, no longer whisper words of love. I became the very thing that keeps us apart - a monster that no kingdom would welcome."

${readerName} felt tears on her cheeks. "Where is Marcus now?"

"I do not know. A century has passed. Perhaps... perhaps he has long since found happiness with another. Perhaps that is as it should be."`,
    choices: [
      { text: "Help Elara search for Marcus", action: "search_marcus" },
      { text: "Find a way to reverse the transformation", action: "reverse_transformation" },
      { text: "Convince her that love can take many forms", action: "love_forms" },
      { text: "Explore the dragon's powers for good", action: "dragon_powers_good" }
    ]
  }
};