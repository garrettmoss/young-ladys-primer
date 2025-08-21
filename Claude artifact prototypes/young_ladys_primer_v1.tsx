import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, User, Settings } from 'lucide-react';

const YoungLadysPrimer = () => {
  const [currentStory, setCurrentStory] = useState('welcome');
  const [readerName, setReaderName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-gold-400 mr-3" style={{color: '#ffd700'}} />
            <Sparkles className="w-8 h-8 text-purple-300" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-2">
            A Young Lady's Illustrated Primer
          </h1>
          <p className="text-purple-200 text-lg italic">
            "A book that adapteth itself to the mind of its reader"
          </p>
        </div>

        {/* Name Input Modal */}
        {showNameInput && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4">
              <div className="text-center mb-6">
                <User className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-gray-800 mb-2">
                  Welcome, Young Reader
                </h2>
                <p className="text-gray-600">
                  By what name would you like the Primer to know you?
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={readerName}
                  onChange={(e) => setReaderName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                />
                <button
                  onClick={handleNameSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
                >
                  Begin My Journey
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white border-opacity-20">
          <h2 className="text-3xl font-serif text-white mb-6 text-center">
            {currentContent.title}
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none mb-8">
            <div className="text-gray-100 leading-relaxed text-lg whitespace-pre-line font-serif">
              {currentContent.content}
            </div>
          </div>

          {/* Choices */}
          {currentContent.choices && (
            <div className="space-y-3">
              <p className="text-purple-200 text-center mb-4 italic">
                Choose your path, dear reader...
              </p>
              {currentContent.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice.action)}
                  className="w-full text-left p-4 bg-purple-700 bg-opacity-30 hover:bg-opacity-50 text-white rounded-lg transition-all duration-200 border border-purple-500 border-opacity-30 hover:border-opacity-60 flex items-center justify-between group"
                >
                  <span className="font-medium">{choice.text}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-purple-300 text-sm">
          <p className="mb-2">
            {readerName && `Crafted especially for ${readerName} • `}
            Your adaptive learning companion
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span>Progress: {Object.keys(storyProgress).length} paths explored</span>
            <Settings className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungLadysPrimer;