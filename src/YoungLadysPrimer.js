import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, User, Settings, Feather, Moon, Sun, Home } from 'lucide-react';

const YoungLadysPrimer = () => {
  const [currentStory, setCurrentStory] = useState('welcome');
  const [readerName, setReaderName] = useState('Aria');
  const [showNameInput, setShowNameInput] = useState(false);
  const [storyProgress, setStoryProgress] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);

  const stories = {
    welcome: {
      title: "Welcome to Your Primer",
      content: `Greetings, young reader. I am your Primer, crafted with care to be your guide, teacher, and companion through the vast realms of knowledge and imagination.

Like the morning mist that reveals new landscapes as it lifts, each page you turn will unveil new mysteries to explore and wisdom to discover.

What would you like to learn about today?`,
      choices: [
        { text: "Tell me a story", action: "story_princess" },
        { text: "Teach me something new", action: "lesson_choice" },
        { text: "Show me a puzzle", action: "puzzle_logic" },
        { text: "Help me understand myself", action: "reflection" }
      ]
    },
    story_princess: {
      title: "The Princess and the Mechanical Dragon",
      content: `In a land where great machines hummed beneath crystal spires, there lived a princess named ${readerName} who was unlike any other.

While other royals studied etiquette and embroidery, she spent her days in the palace workshop, learning the secret languages that commanded the tiny machines - the mites and assemblers that built their world.

One day, a great mechanical dragon appeared at the kingdom's borders, its scales gleaming like polished steel, steam rising from its nostrils. The people were afraid, but Princess ${readerName} noticed something curious...

The dragon's movements followed a pattern, like a complex dance or perhaps... a code.`,
      choices: [
        { text: "Study the dragon's pattern", action: "dragon_pattern" },
        { text: "Approach the dragon carefully", action: "dragon_approach" },
        { text: "Gather the palace engineers", action: "dragon_engineers" },
        { text: "Ask the Primer to explain the technology", action: "tech_lesson" }
      ]
    },
    dragon_pattern: {
      title: "The Code in the Dance",
      content: `Princess ${readerName} watched from the palace tower with her father's finest telescope, sketching the dragon's movements in her journal.

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
    dragon_approach: {
      title: "A Brave Meeting",
      content: `Against all advice from the court, Princess ${readerName} descended from the palace, her toolkit hidden beneath her cloak. The mechanical dragon's great head turned toward her as she approached, gears whirring and steam hissing softly.

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
    dragon_engineers: {
      title: "The Council of Makers",
      content: `Princess ${readerName} summoned the palace's finest engineers and artificers to the great hall. Master Cogsworth, ancient and wise, examined her sketches through his many-lensed spectacles.

"Your Highness," he wheezed, his voice like rustling parchment, "this is no ordinary mechanical beast. These patterns you've recorded - they match the work of the legendary Artificer Queen, who vanished a hundred years ago."

The other engineers gasped. The Artificer Queen had been the greatest maker of their age, creator of wonders beyond imagining. But she had disappeared one night, leaving only her workshop full of half-finished marvels.

"If this dragon is her work," continued Master Cogsworth, "then it may contain her greatest secret - the Protocol of Transformation, which could turn living beings into machines and back again."

${readerName} felt her heart race. Could the dragon itself be the lost Queen?`,
      choices: [
        { text: "Visit the Artificer Queen's abandoned workshop", action: "queens_workshop" },
        { text: "Research the Protocol of Transformation", action: "protocol_research" },
        { text: "Gather the ancient tools needed for the reversal", action: "gather_tools" },
        { text: "Learn more about the Artificer Queen's disappearance", action: "queen_history" }
      ]
    },
    dragon_tech: {
      title: "The Anatomy of Wonder",
      content: `In the palace library's restricted section, ${readerName} found the ancient text she sought: "The Mechanical Mysteries of Living Steel."

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
      content: `${readerName} had an idea. She ordered the palace guards to light torches on the battlements - on for 1, off for 0. Slowly, carefully, she spelled out her message to the dragon: "01001001 00100000 01101000 01100101 01100001 01110010" - "I hear."

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
      content: `In the dustiest corner of the library, ${readerName} found a book bound in scales that shimmered like oil on water: "The Chronicle of Changed Ones."

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
      content: `The story pauses, the words on the page shimmering like morning dew. 

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
    },
    tech_lesson: {
      title: "The Primer's Teaching",
      content: `"Ah," says the Primer, its pages glowing softly, "you wish to understand the mechanical dragon's nature. Let me teach you, dear ${readerName}, about the marriage of consciousness and clockwork.

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
    },
    lesson_choice: {
      title: "What Shall We Explore?",
      content: `Knowledge is like a great garden, dear reader. Each path leads to different wonders. Some trails wind through the mathematics that govern the stars, others through the stories that shape our hearts.

Which garden path calls to you today?`,
      choices: [
        { text: "The Science of Small Things", action: "nano_lesson" },
        { text: "How Stories Shape Reality", action: "narrative_lesson" },
        { text: "The Art of Problem Solving", action: "logic_lesson" },
        { text: "Understanding People and Cultures", action: "social_lesson" }
      ]
    },
    nano_lesson: {
      title: "The Science of Small Things",
      content: `Imagine, if you will, that you could shrink yourself smaller than the tiniest ant, smaller than a grain of sand, smaller even than a single cell...

You would enter the realm of the very small - the nanoscale, where molecules dance and atoms join hands to build everything you see around you. 

In this world, a single drop of water would be an ocean of dancing molecules, each one spinning and tumbling in patterns more complex than any ballet.

The people in Princess ${readerName}'s world learned to speak to these tiny dancers, to ask them to build castles of diamond and weave cloth from spider silk stronger than steel.`,
      choices: [
        { text: "How do you talk to molecules?", action: "molecular_talk" },
        { text: "Show me more about nanotechnology", action: "nano_deep" },
        { text: "Return to the dragon story", action: "story_princess" },
        { text: "Ask me a question about what I've learned", action: "quiz_nano" }
      ]
    },
    molecular_talk: {
      title: "The Language of Atoms",
      content: `"To speak to molecules," the Primer explains, "one must first understand that they are always listening, always dancing, always responding to the world around them.

In ${readerName}'s kingdom, the artificers discovered that molecules respond to three kinds of messages:

HEAT - making them dance faster or slower, like playing different tempos on a drum. When water molecules dance slowly, they lock arms and become ice. When they dance wildly, they fly apart as steam.

LIGHT - certain colors of light are like songs that only specific molecules can hear. Green plants listen to red and blue light, transforming it into the energy of life itself.

ELECTRICITY - the most precise language of all. With tiny electrical whispers, one can ask a single molecule to fold into a new shape, like origami made of atoms.

But here's the secret the ancients discovered: molecules don't just listen - they also speak. Every chemical reaction is a conversation, every crystal that forms tells a story of how its atoms prefer to arrange themselves.

The mechanical dragon's scales, for instance, are made of carbon atoms holding hands in perfect hexagons, whispering strength to each other in bonds harder than diamond."`,
      choices: [
        { text: "Learn to read molecular messages", action: "read_molecules" },
        { text: "Practice the three languages", action: "practice_languages" },
        { text: "Discover what the dragon's scales are saying", action: "scale_messages" },
        { text: "Return to explore other paths", action: "nano_lesson" }
      ]
    }
  };

  const handleChoice = (action) => {
    setStoryProgress({...storyProgress, [currentStory]: true});
    setCurrentStory(action);
    
    // Add to conversation history
    setConversationHistory(prev => [...prev, {
      from: currentStory,
      to: action,
      timestamp: new Date()
    }]);
  };

  const handleNameSubmit = () => {
    if (readerName.trim()) {
      setShowNameInput(false);
    }
  };

  const currentContent = stories[currentStory] || stories.welcome;

  return (
    <div className="primer-container">
      <div className="primer-content">
        {/* Ornate Header */}
        <div className="primer-header">
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="decorative-line"></div>
            <div className="header-icon-container">
              <div className="sparkle-animation">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <BookOpen className="book-icon" />
            </div>
            <div className="decorative-line"></div>
          </div>
          
          <h1 className="main-title">
            <span className="title-line-1">
              A Young Lady's
            </span>
            <br />
            <span className="title-line-2">
              Illustrated Primer
            </span>
          </h1>
          
          <p className="subtitle">
            "A book that adapts itself to the mind of its reader"
          </p>
          
          {/* Decorative flourish */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-amber-600/60 text-2xl">❦</span>
          </div>
        </div>

        {/* Name Input Modal */}
        {showNameInput && (
          <div className="modal-overlay">
            <div className="modal-container">
              {/* Ornate border frame */}
              <div className="modal-border-outer"></div>
              <div className="modal-border-inner"></div>
              
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-icon">
                    <Feather className="w-16 h-16 text-amber-700" />
                  </div>
                  <h2 className="modal-title">
                    Welcome, Young Reader
                  </h2>
                  <p className="modal-subtitle">
                    By what name shall the Primer know you?
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={readerName}
                    onChange={(e) => setReaderName(e.target.value)}
                    placeholder="Enter your name..."
                    className="name-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="submit-button"
                  >
                    Begin Your Journey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Manuscript Page */}
        <div className="relative">
          {/* Page corners decoration */}
          <div className="page-corner page-corner-tl"></div>
          <div className="page-corner page-corner-tr"></div>
          <div className="page-corner page-corner-bl"></div>
          <div className="page-corner page-corner-br"></div>
          
          <div className="manuscript-page p-10">
            
            {/* Title with illuminated first letter */}
            <h2 className="primer-title text-4xl font-serif text-amber-900 mb-8 text-center relative">
              <span className="inline-block">
                <span className="illuminated-letter">
                  {currentContent.title[0]}
                </span>
                {currentContent.title.slice(1)}
              </span>
            </h2>
            
            {/* Story content with vintage typography */}
            <div className="mb-8">
              <div className="story-text whitespace-pre-line">
                {currentContent.content}
              </div>
            </div>

            {/* Decorative separator */}
            <div className="decorative-separator">
              <div className="separator-line"></div>
              <span className="separator-symbol">✦</span>
              <div className="separator-line"></div>
            </div>

            {/* Choices with manuscript style */}
            {currentContent.choices && (
              <div className="space-y-3 mt-6">
                <p className="choice-prompt">
                  Choose your path, dear reader...
                </p>
                {currentContent.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => stories[choice.action] ? handleChoice(choice.action) : null}
                    disabled={!stories[choice.action]}
                    className={`choice-button group ${stories[choice.action] ? '' : 'disabled'}`}
                  >
                    <span className="font-medium relative z-10" style={{ letterSpacing: '0.02em' }}>
                      {choice.text}
                      {!stories[choice.action] && <span className="text-sm italic ml-2">(Coming soon)</span>}
                    </span>
                    {stories[choice.action] && (
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
                    )}
                    {stories[choice.action] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent 
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    )}
                  </button>
                ))}
                
                {/* Home button - only show when not on welcome page */}
                {currentStory !== 'welcome' && (
                  <>
                    <div className="flex items-center justify-center my-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                      <span className="text-amber-600/40 mx-3 text-sm">or</span>
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                    </div>
                    <button
                      onClick={() => setCurrentStory('welcome')}
                      className="home-button group"
                    >
                      <Home className="home-button-icon" />
                      <span className="home-button-text">
                        Return to the Beginning
                      </span>
                      <div className="home-button-shimmer"></div>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Victorian flourish */}
        <div className="primer-footer">
          <div className="footer-decoration">
            <span className="footer-flourish">❦</span>
            <div className="footer-line"></div>
            <span className="footer-flourish">❦</span>
          </div>
          <p className="footer-text">
            {readerName && `Crafted for ${readerName} • `}
            Anno Domini MMXXV
          </p>
          <div className="footer-stats">
            <span className="footer-stat">
              {Object.keys(storyProgress).length} passages explored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungLadysPrimer;