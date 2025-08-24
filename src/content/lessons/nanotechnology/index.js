import { molecularCommunication } from './molecular-communication.js';

export const nanotechnologyLessons = {
  nano_lesson: {
    title: "The Science of Small Things",
    content: (readerName) => `Imagine, if you will, that you could shrink yourself smaller than the tiniest ant, smaller than a grain of sand, smaller even than a single cell...

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
  
  ...molecularCommunication
};