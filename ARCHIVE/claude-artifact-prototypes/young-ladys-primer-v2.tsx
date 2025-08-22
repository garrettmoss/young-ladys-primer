import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, User, Settings, Feather, Moon, Sun } from 'lucide-react';

const YoungLadysPrimer = () => {
  const [currentStory, setCurrentStory] = useState('welcome');
  const [readerName, setReaderName] = useState('Nell');
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
      content: `In a land where great machines hummed beneath crystal spires, there lived a princess named ${readerName ? readerName : 'Aria'} who was unlike any other.

While other royals studied etiquette and embroidery, she spent her days in the palace workshop, learning the secret languages that commanded the tiny machines - the mites and assemblers that built their world.

One day, a great mechanical dragon appeared at the kingdom's borders, its scales gleaming like polished steel, steam rising from its nostrils. The people were afraid, but Princess ${readerName ? readerName : 'Aria'} noticed something curious...

The dragon's movements followed a pattern, like a complex dance or perhaps... a code.`,
      imageUrl: null, // Placeholder for: "Victorian woodcut illustration of a mechanical dragon with gears and steam, black ink on cream paper, detailed cross-hatching, style of Gustave Doré"
      choices: [
        { text: "Study the dragon's pattern", action: "dragon_pattern" },
        { text: "Approach the dragon carefully", action: "dragon_approach" },
        { text: "Gather the palace engineers", action: "dragon_engineers" },
        { text: "Ask the Primer to explain the technology", action: "tech_lesson" }
      ]
    },
    dragon_pattern: {
      title: "The Code in the Dance",
      content: `Princess ${readerName ? readerName : 'Aria'} watched from the palace tower with her father's finest telescope, sketching the dragon's movements in her journal.

Three steps forward, two to the left, pause, then a graceful turn... She began to see it wasn't random at all. It was binary! The dragon was trying to communicate.

"01001000 01100101 01101100 01110000" - step by step, the dragon spelled out its message in the ancient language of machines.

"Help," ${readerName ? readerName : 'Aria'} whispered, understanding flooding through her. This was no monster - this was someone trapped inside a mechanical shell, crying out to be freed.

But how does one free someone from such a prison?`,
      imageUrl: null, // Placeholder for: "19th century etching of a princess in a tower observing through a telescope, fine line work, sepia tones, Victorian book illustration"
      choices: [
        { text: "Learn about the dragon's construction", action: "dragon_tech" },
        { text: "Try to communicate back in binary", action: "binary_talk" },
        { text: "Seek the old stories about such curses", action: "curse_research" },
        { text: "What would you do, dear reader?", action: "reader_choice" }
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

The people in Princess ${readerName ? readerName : 'Aria'}'s world learned to speak to these tiny dancers, to ask them to build castles of diamond and weave cloth from spider silk stronger than steel.`,
      illustration: (
        <svg viewBox="0 0 200 150" className="w-full max-w-sm mx-auto mb-6">
          {/* Molecular structure illustration */}
          <g transform="translate(100,75)">
            {/* Central hexagon (benzene ring style) */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 6;
              const x = Math.cos(angle) * 30;
              const y = Math.sin(angle) * 30;
              const nextAngle = ((i + 1) % 6 * Math.PI * 2) / 6;
              const nextX = Math.cos(nextAngle) * 30;
              const nextY = Math.sin(nextAngle) * 30;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="5" fill="none" stroke="#8b7355" strokeWidth="1.5"/>
                  <line x1={x} y1={y} x2={nextX} y2={nextY} stroke="#8b7355" strokeWidth="1"/>
                  {/* Smaller attached molecules */}
                  {i % 2 === 0 && (
                    <>
                      <circle cx={x * 1.5} cy={y * 1.5} r="3" fill="none" stroke="#8b7355" strokeWidth="1" opacity="0.6"/>
                      <line x1={x} y1={y} x2={x * 1.5} y2={y * 1.5} stroke="#8b7355" strokeWidth="0.5" opacity="0.6"/>
                    </>
                  )}
                </g>
              );
            })}
            {/* Decorative electron paths */}
            <ellipse cx="0" cy="0" rx="45" ry="20" fill="none" stroke="#8b7355" strokeWidth="0.3" 
                     strokeDasharray="2,4" opacity="0.5" transform="rotate(30)"/>
            <ellipse cx="0" cy="0" rx="45" ry="20" fill="none" stroke="#8b7355" strokeWidth="0.3" 
                     strokeDasharray="2,4" opacity="0.5" transform="rotate(-30)"/>
          </g>
        </svg>
      ),
      choices: [
        { text: "How do you talk to molecules?", action: "molecular_talk" },
        { text: "Show me more about nanotechnology", action: "nano_deep" },
        { text: "Return to the dragon story", action: "story_princess" },
        { text: "Ask me a question about what I've learned", action: "quiz_nano" }
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
    <div className="min-h-screen relative" style={{
      background: `linear-gradient(180deg, #f9f6f0 0%, #f5f1e6 50%, #ede8db 100%)`,
      backgroundAttachment: 'fixed'
    }}>
      {/* Vintage paper texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(139, 115, 85, 0.05) 2px,
          rgba(139, 115, 85, 0.05) 4px
        )`,
        mixBlendMode: 'multiply'
      }}></div>

      <div className="max-w-4xl mx-auto relative z-10 p-4">
        {/* Ornate Header */}
        <div className="text-center mb-8 pt-8">
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent w-32"></div>
            <div className="mx-4 relative">
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="w-6 h-6 text-yellow-400" 
                         style={{ 
                           filter: 'drop-shadow(0 0 3px rgba(250, 204, 21, 0.5))' 
                         }} />
              </div>
              <BookOpen className="w-12 h-12 text-amber-700 relative z-10" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent w-32"></div>
          </div>
          
          <h1 className="mb-3 relative">
            <span className="text-5xl font-serif text-amber-800"
                  style={{
                    fontFamily: 'Baskerville, "Palatino Linotype", Palatino, "Century Schoolbook", serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.05em'
                  }}>
              A Young Lady's
            </span>
            <br />
            <span className="text-6xl font-serif text-amber-900"
                  style={{
                    fontFamily: 'Baskerville, "Palatino Linotype", Palatino, "Century Schoolbook", serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.1em',
                    fontWeight: 'bold'
                  }}>
              Illustrated Primer
            </span>
          </h1>
          
          <p className="text-amber-700/80 text-lg italic mt-4" style={{
            fontFamily: 'Baskerville, "Palatino Linotype", serif',
            letterSpacing: '0.02em'
          }}>
            "A book that adapteth itself to the mind of its reader"
          </p>
          
          {/* Decorative flourish */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-amber-600/60 text-2xl">❦</span>
          </div>
        </div>

        {/* Name Input Modal */}
        {showNameInput && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative max-w-md mx-4">
              {/* Ornate border frame */}
              <div className="absolute -inset-4 border-2 border-amber-700/20 rounded-lg"></div>
              <div className="absolute -inset-2 border border-amber-600/20 rounded-lg"></div>
              
              <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 rounded-lg p-8 
                          shadow-2xl border border-amber-600/30">
                <div className="text-center mb-6">
                  <div className="mb-4 relative inline-block">
                    <Feather className="w-16 h-16 text-amber-700" />
                  </div>
                  <h2 className="text-3xl font-serif text-amber-900 mb-3"
                      style={{
                        fontFamily: 'Baskerville, "Palatino Linotype", serif',
                        letterSpacing: '0.05em',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                      }}>
                    Welcome, Young Reader
                  </h2>
                  <p className="text-amber-700/90 leading-relaxed" style={{
                    fontFamily: 'Baskerville, serif'
                  }}>
                    By what name shall the Primer know thee?
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={readerName}
                    onChange={(e) => setReaderName(e.target.value)}
                    placeholder="Inscribe thy name..."
                    className="w-full p-3 bg-white/70 border border-amber-600/30 rounded text-amber-900 
                             placeholder-amber-600/40 focus:outline-none focus:border-amber-600/50 
                             focus:shadow-[0_0_10px_rgba(217,119,6,0.1)]"
                    style={{
                      fontFamily: 'Baskerville, serif',
                      letterSpacing: '0.02em'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="w-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 
                             text-amber-50 py-3 px-4 rounded transition-all font-semibold
                             hover:from-amber-600 hover:to-amber-600 hover:shadow-lg
                             border border-amber-700/50"
                    style={{
                      fontFamily: 'Baskerville, serif',
                      letterSpacing: '0.05em',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    Begin Thy Journey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Manuscript Page */}
        <div className="relative">
          {/* Page corners decoration */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-amber-700/20 rounded-tl-lg"></div>
          <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-amber-700/20 rounded-tr-lg"></div>
          <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-amber-700/20 rounded-bl-lg"></div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-amber-700/20 rounded-br-lg"></div>
          
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50/95 to-amber-50/90 rounded-lg p-10 
                        shadow-xl border border-amber-600/20 relative overflow-hidden"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
                 boxShadow: 'inset 0 0 20px rgba(217, 119, 6, 0.05), 0 10px 40px rgba(0,0,0,0.1)'
               }}>
            
            {/* Title with illuminated first letter */}
            <h2 className="text-4xl font-serif text-amber-900 mb-8 text-center relative"
                style={{
                  fontFamily: 'Baskerville, "Palatino Linotype", serif',
                  letterSpacing: '0.05em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
              <span className="inline-block">
                <span className="text-6xl text-amber-800 align-top"
                      style={{
                        fontFamily: 'Baskerville, serif',
                        textShadow: '2px 2px 3px rgba(0,0,0,0.1)',
                        fontWeight: 'bold',
                        lineHeight: '0.7',
                        verticalAlign: 'bottom',
                        display: 'inline-block',
                        marginRight: '2px'
                      }}>
                  {currentContent.title[0]}
                </span>
                {currentContent.title.slice(1)}
              </span>
            </h2>
            
            {/* Illustration if present */}
            {currentContent.illustration && (
              <div className="mb-6" style={{ filter: 'sepia(0.2)' }}>
                {currentContent.illustration}
              </div>
            )}
            
            {/* Image placeholder or actual image */}
            {currentContent.imageUrl !== undefined && (
              <div className="mb-6 mx-auto max-w-md">
                {currentContent.imageUrl ? (
                  <img 
                    src={currentContent.imageUrl} 
                    alt={currentContent.title}
                    className="w-full rounded border-2 border-amber-700/20"
                    style={{ filter: 'sepia(0.3) contrast(1.1)' }}
                  />
                ) : (
                  <div className="bg-amber-100/20 border-2 border-dashed border-amber-700/30 rounded p-8 text-center">
                    <div className="text-amber-700/50 text-sm italic">
                      [Illustration placeholder - Victorian woodcut style]
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Story content with vintage typography */}
            <div className="mb-8">
              <div className="text-amber-900/90 leading-loose text-lg whitespace-pre-line"
                   style={{
                     fontFamily: 'Baskerville, "Book Antiqua", "Palatino Linotype", serif',
                     textAlign: 'justify',
                     textIndent: '2em',
                     letterSpacing: '0.01em',
                     lineHeight: '1.8'
                   }}>
                {currentContent.content}
              </div>
            </div>

            {/* Decorative separator */}
            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-full"></div>
              <span className="text-amber-600/50 mx-4 text-xl">✦</span>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-full"></div>
            </div>

            {/* Choices with manuscript style */}
            {currentContent.choices && (
              <div className="space-y-3 mt-6">
                <p className="text-amber-800/80 text-center mb-4 italic text-lg"
                   style={{
                     fontFamily: 'Baskerville, serif',
                     letterSpacing: '0.02em'
                   }}>
                  Choose thy path, dear reader...
                </p>
                {currentContent.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice.action)}
                    className="w-full text-left p-4 bg-gradient-to-r from-amber-100/40 to-yellow-100/40 
                             hover:from-amber-100/60 hover:to-yellow-100/60 
                             text-amber-900 rounded transition-all duration-300 
                             border border-amber-600/20 hover:border-amber-600/30 
                             flex items-center justify-between group relative overflow-hidden"
                    style={{
                      boxShadow: '1px 1px 4px rgba(0,0,0,0.05)',
                      fontFamily: 'Baskerville, serif'
                    }}
                  >
                    <span className="font-medium relative z-10" style={{ letterSpacing: '0.02em' }}>
                      {choice.text}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent 
                                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Victorian flourish */}
        <div className="text-center text-amber-700/70 text-sm mt-8 mb-4">
          <div className="flex items-center justify-center mb-2">
            <span className="text-xl">❦</span>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent w-20 mx-2"></div>
            <span className="text-xl">❦</span>
          </div>
          <p className="mb-2" style={{
            fontFamily: 'Baskerville, serif',
            letterSpacing: '0.05em'
          }}>
            {readerName && `Crafted for ${readerName} • `}
            Anno Domini MMXXV
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span style={{ fontFamily: 'Baskerville, serif' }}>
              {Object.keys(storyProgress).length} passages explored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungLadysPrimer;