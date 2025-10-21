export const dragonPatternStories = {
  dragon_pattern: {
    title: "The Code in the Dance",
    content: (readerName: string) => `Princess ${readerName} watched from the palace tower with her father's finest telescope, sketching the dragon's movements in her journal.

Three steps forward, two to the left, pause, then a graceful turn... She began to see it wasn't random at all. It was binary! The dragon was trying to communicate.

"01001000 01100101 01101100 01110000" - step by step, the dragon spelled out its message in the ancient language of machines.

"Help," ${readerName} whispered, understanding flooding through her. This was no monster - this was someone trapped inside a mechanical shell, crying out to be freed.

But how does one free someone from such a prison?`,
    choices: [
      { text: "Try to communicate back in binary", action: "binary_talk" },
      { text: "Research ancient transformation curses", action: "curse_research" }
    ]
  },

  binary_talk: {
    title: "A Digital Dialogue",
    content: (readerName: string) => `${readerName} had an idea. She ordered the palace guards to light torches on the battlements - on for 1, off for 0. Slowly, carefully, she spelled out her message to the dragon: "01001001 00100000 01101000 01100101 01100001 01110010" - "I hear."

The dragon stopped its pacing. Its eyes flashed brighter, and it began a new dance, more complex than before. This time, it wasn't just speaking in binary - it was writing equations in the air with its movements, mathematical proofs that described the nature of its imprisonment.

As ${readerName} translated, she realized the dragon was teaching her. It was showing her the algorithm of its own curse, the formula that bound flesh to steel. And hidden within the mathematical proof was something else - a name, repeated over and over in the numbers: "Elara."

The dragon - Elara - had found a way to hide her identity within the very curse that trapped her.`,
    choices: [
      { text: "Learn more about Elara", action: "elara_revealed" }
    ]
  },

  curse_research: {
    title: "Tales of Transformation",
    content: (readerName: string) => `In the dustiest corner of the library, ${readerName} found a book bound in scales that shimmered like oil on water: "The Chronicle of Changed Ones."

The book told of an age when the boundary between flesh and metal was thin, when artificers could weave consciousness into clockwork. But with this power came a terrible price - those who delved too deep into the mechanical mysteries risked losing their humanity entirely.

One story stood out: the tale of Princess Elara the Curious, who had lived a century ago. She had been brilliant beyond measure, speaking to machines as easily as to people. But she had fallen in love with a common artificer, and when her father forbade their union, she had tried to use the mechanical arts to transform herself into something that could fly away.

The transformation had worked too well. She became the dragon, magnificent and powerful, but unable to return to human form. Her artificer love had spent his remaining years trying to undo what she had done, leaving behind only cryptic notes about "the key of remembered humanity."

At the bottom of the page, in different ink, someone had written: "She still waits."`,
    choices: [
      { text: "The dragon must be Elara", action: "elara_revealed" }
    ]
  },

  reader_choice: {
    title: "The Primer Listens",
    content: (readerName: string) => `The story pauses, the words on the page shimmering like morning dew.

"Dear reader," the Primer speaks directly to you, "${readerName}, you have observed much. Princess ${readerName} stands at a crossroads, and perhaps your wisdom can guide her path.

Think carefully: You have learned that Elara transformed herself for love, lost everything, and has been alone for a century. The princess has knowledge, courage, and compassion.

But solutions born from wisdom often come from unexpected directions. What would you have her do? Sometimes the answer is not in forcing a lock, but in understanding why it was closed. Not in breaking a spell, but in fulfilling its true purpose.

What matters most - the magic, the mystery, or the heart that beats within the metal?"

The Primer awaits your insight...`,
    choices: [
      { text: "She should show Elara she is not alone", action: "show_compassion" },
      { text: "She should unite technology and magic", action: "unite_forces" },
      { text: "She should trust in the power of story", action: "power_story" },
      { text: "She should seek understanding first", action: "seek_understanding" }
    ]
  },

  show_compassion: {
    title: "The Heart's Answer",
    content: (readerName: string) => `Following the reader's wisdom, Princess ${readerName} chose the path of compassion. She approached Elara not as a problem to be solved, but as a being in pain who needed understanding.

"Elara," she said softly, "you are not alone anymore. For a century you have carried this burden by yourself, but I am here now. You don't have to be strong for everyone. You don't have to solve everything alone."

The dragon's great form shuddered, and for the first time in a hundred years, Elara wept. Not tears of water, but tears of liquid light that fell like stars to the courtyard stones.

"I tried to save him," Elara whispered, her voice breaking with mechanical sobs. "I became this thinking I could be strong enough to change the world. But I only trapped myself in a cage of my own making."

${readerName} placed her hand on the dragon's snout. "Sometimes the bravest thing isn't transforming yourself to fight the world. Sometimes it's letting yourself be vulnerable enough to let the world change you. And sometimes... sometimes it's accepting help."

In that moment of shared humanity, something magical happened. The dragon's scales began to shimmer with new light, not the harsh gleam of metal, but the warm glow of hope rekindled.`,
    choices: [
      { text: "Help Elara find peace with her past", action: "find_peace" },
      { text: "Work together to help others", action: "find_peace" }
    ]
  },

  unite_forces: {
    title: "Science and Magic as One",
    content: (readerName: string) => `Inspired by the reader's insight, Princess ${readerName} realized that the answer lay not in choosing between technology and magic, but in uniting them as they were meant to be united.

She returned to Elara with both the ancient tools of transformation and the modern understanding of consciousness transfer. But more than that, she brought the recognition that the dragon's dilemma was not a problem of either science or magic - it was a problem that required both.

"Elara," she said, her voice filled with certainty, "your transformation wasn't a failure of magic or a triumph of technology. It was what happens when science and wonder work together - but without wisdom to guide them."

She began to weave together the old ways and the new: using molecular principles to harmonize with the dragon's quantum consciousness patterns, while speaking the ancient words of change that honored the magical aspects of transformation.

As technology and magic flowed together in harmony, something unprecedented happened. The dragon began to change - not back to human form, but into something new. A being that was both mechanical and magical, both dragon and woman, embodying the best of all possibilities.

"I feel... whole," Elara whispered in wonder. "For the first time in a century, I feel whole."`,
    choices: [
      { text: "Explore what this means for the kingdom", action: "find_peace" },
      { text: "Help others caught between worlds", action: "find_peace" }
    ]
  },

  power_story: {
    title: "The Song of Becoming",
    content: (readerName: string) => `Trusting in the reader's wisdom about the power of story and song, Princess ${readerName} approached Elara with neither tools nor spells, but with the most powerful force of all: narrative.

"Elara," she said, sitting beside the great dragon, "tell me your story. Not the facts, not the history - tell me the story of your heart."

And so the dragon began to speak, and as she spoke, her words became music, and her music became magic. She told of a young woman who loved too fiercely, who dreamed too boldly, who dared too much. She sang of transformation not as trap, but as choice. She wove words about love that transcends form, about identity that goes deeper than flesh or scale.

As the story unfolded, something remarkable happened. The dragon's form began to shift, not according to any spell or mechanism, but according to the story she was telling. Because stories, ${readerName} realized, were the most fundamental technology of all - the technology of meaning itself.

And in that telling, in that singing, in that weaving of narrative, Elara found what she had lost: the ability to choose who she wanted to be, moment by moment, story by story.

"I am not trapped," she sang, her voice now fully her own. "I am the author of my own becoming."`,
    choices: [
      { text: "Help Elara write her next chapter", action: "find_peace" },
      { text: "Learn the art of story-transformation", action: "find_peace" }
    ]
  },

  seek_understanding: {
    title: "The Wisdom of Patience",
    content: (readerName: string) => `Following the reader's counsel to seek understanding before action, Princess ${readerName} chose the path of deep listening. Instead of rushing to solve or fix or change, she simply... stayed. She sat with Elara day after day, learning her rhythms, understanding her moods, discovering the person within the dragon.

Through patient observation, ${readerName} began to understand something profound: Elara's transformation had not been a mistake or a tragedy. It had been exactly what she needed to become - not forever, but for this time, for this purpose.

"You became the dragon," ${readerName} said one morning as they watched the sunrise together, "because you needed to learn something that could only be learned in this form. You needed to understand power, and loneliness, and what it means to be truly other."

Elara's great head nodded slowly. "Yes. I have learned that strength without connection is hollow. That power without purpose is meaningless. That transformation without wisdom is just... change for its own sake."

"And now?" ${readerName} asked gently.

"Now," Elara said with growing clarity, "I understand what I truly want. Not to go back to who I was, not to stay as I am, but to become who I am meant to be - someone who uses what I have learned to help others navigate their own transformations."

Understanding, it turned out, was the key to every lock.`,
    choices: [
      { text: "Help Elara become a guide for others", action: "find_peace" },
      { text: "Explore the wisdom Elara has gained", action: "find_peace" }
    ]
  },

  find_peace: {
    title: "A New Beginning",
    content: (readerName: string) => `And so Princess ${readerName} and the dragon Elara began a new chapter together.

Elara remained in her dragon form - not as a curse, but as a choice. She had learned that transformation was not about escaping who you are, but about becoming more fully yourself. The mechanical dragon was no longer a prison but a possibility - one form among many that Elara could inhabit as she wished.

Together, they created the Academy of Transformations, where those caught between forms, between identities, between worlds could come to learn that there was no "wrong" way to be. That change was not betrayal but growth. That love - whether for another person or for knowledge or for justice - was always worth the risk.

Marcus's memory lived on not in grief, but in the work they did. Every person helped, every transformation guided, was a tribute to a love that had been powerful enough to reshape reality itself.

${readerName} had learned that sometimes the greatest power was not in having all the answers, but in asking the right questions. Not in fixing everything, but in standing witness to pain and offering compassion.

And the Primer glowed with pride, for its pupil had learned the most important lesson of all: that knowledge without wisdom is merely information, but wisdom tempered by compassion could change the world.

The End... for now.`,
    choices: [
      { text: "Begin a new adventure", action: "welcome" }
    ]
  }
};
