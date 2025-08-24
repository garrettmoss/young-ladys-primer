export const dragonPatternStories = {
  dragon_pattern: {
    title: "The Code in the Dance",
    content: (readerName) => `Princess ${readerName} watched from the palace tower with her father's finest telescope, sketching the dragon's movements in her journal.

Three steps forward, two to the left, pause, then a graceful turn... She began to see it wasn't random at all. It was binary! The dragon was trying to communicate.

"01001000 01100101 01101100 01110000" - step by step, the dragon spelled out its message in the ancient language of machines.

"Help," ${readerName} whispered, understanding flooding through her. This was no monster - this was someone trapped inside a mechanical shell, crying out to be freed.

But how does one free someone from such a prison?`,
    choices: [
      { text: "Learn about the dragon's construction", action: "dragon_tech" },
      { text: "Try to communicate back in binary", action: "binary_talk" },
      { text: "Seek the old stories about such curses", action: "curse_research" },
      { text: "What would you do, dear reader?", action: "reader_choice" }
    ]
  },

  dragon_tech: {
    title: "The Anatomy of Wonder",
    content: (readerName) => `In the palace library's restricted section, ${readerName} found the ancient text she sought: "The Mechanical Mysteries of Living Steel."

The dragon, she learned, was not built but grown - assembled by millions of tiny machines called assemblers, each no larger than a grain of sand. These assemblers could rearrange matter at the smallest level, turning carbon into diamond-hard scales, and spinning copper into neural pathways that could hold a consciousness.

But the most remarkable discovery was the power source: a heart of crystallized starlight, a gem that existed in seven dimensions simultaneously. Such hearts were said to be unbreakable by any earthly means.

Yet the book mentioned one exception - they could be unmade by the same frequency of love that created them. For these hearts were made not just with science, but with deep emotion. Someone had loved this dragon into being.`,
    choices: [
      { text: "Search for the frequency of love", action: "frequency_love" },
      { text: "Study the assembler machines more closely", action: "study_assemblers" },
      { text: "Find who created this dragon with such love", action: "find_creator" },
      { text: "Examine the dragon's heart directly", action: "examine_heart" }
    ]
  },

  binary_talk: {
    title: "A Digital Dialogue",
    content: (readerName) => `${readerName} had an idea. She ordered the palace guards to light torches on the battlements - on for 1, off for 0. Slowly, carefully, she spelled out her message to the dragon: "01001001 00100000 01101000 01100101 01100001 01110010" - "I hear."

The dragon stopped its pacing. Its eyes flashed brighter, and it began a new dance, more complex than before. This time, it wasn't just speaking in binary - it was writing equations in the air with its movements, mathematical proofs that described the nature of its imprisonment.

As ${readerName} translated, she realized the dragon was teaching her. It was showing her the algorithm of its own curse, the formula that bound flesh to steel. And hidden within the mathematical proof was something else - a name, repeated over and over in the numbers: "Elara."

The dragon - Elara - had found a way to hide her identity within the very curse that trapped her.`,
    choices: [
      { text: "Solve the algorithm to break the curse", action: "solve_algorithm" },
      { text: "Signal back 'Elara, I know your name'", action: "signal_name" },
      { text: "Study the mathematical proof for weaknesses", action: "study_proof" },
      { text: "Ask Elara to teach you more", action: "learn_more" }
    ]
  },

  curse_research: {
    title: "Tales of Transformation",
    content: (readerName) => `In the dustiest corner of the library, ${readerName} found a book bound in scales that shimmered like oil on water: "The Chronicle of Changed Ones."

The book told of an age when the boundary between flesh and metal was thin, when artificers could weave consciousness into clockwork. But with this power came a terrible price - those who delved too deep into the mechanical mysteries risked losing their humanity entirely.

One story stood out: the tale of Princess Elara the Curious, who had lived a century ago. She had been brilliant beyond measure, speaking to machines as easily as to people. But she had fallen in love with a common artificer, and when her father forbade their union, she had tried to use the mechanical arts to transform herself into something that could fly away.

The transformation had worked too well. She became the dragon, magnificent and powerful, but unable to return to human form. Her artificer love had spent his remaining years trying to undo what she had done, leaving behind only cryptic notes about "the key of remembered humanity."

At the bottom of the page, in different ink, someone had written: "She still waits."`,
    choices: [
      { text: "Search for the artificer's notes", action: "artificer_notes" },
      { text: "Find the key of remembered humanity", action: "humanity_key" },
      { text: "Learn about Princess Elara's lost love", action: "lost_love" },
      { text: "Discover what 'She still waits' means", action: "still_waits" }
    ]
  },

  reader_choice: {
    title: "The Primer Listens",
    content: (readerName) => `The story pauses, the words on the page shimmering like morning dew. 

"Dear reader," the Primer speaks directly to you, "${readerName}, you have observed much. Princess ${readerName} stands at a crossroads, and perhaps your wisdom can guide her path.

Think carefully: You have learned that the dragon speaks in binary, crying for help. You know it moves in patterns, like a dance or a code. The princess has tools, knowledge, and courage.

But solutions born from wisdom often come from unexpected directions. What would you have her do? Sometimes the answer is not in forcing a lock, but in understanding why it was closed. Not in breaking a spell, but in fulfilling its true purpose.

What matters most - the magic, the mystery, or the heart that beats within the metal?"

The Primer awaits your insight...`,
    choices: [
      { text: "She should show the dragon it is not alone", action: "show_compassion" },
      { text: "She should unite technology and magic", action: "unite_forces" },
      { text: "She should trust in the power of story and song", action: "power_story" },
      { text: "She should seek to understand before acting", action: "seek_understanding" }
    ]
  }
};