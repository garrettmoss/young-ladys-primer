import { useState } from 'react';

export const useStoryNavigation = (initialStory = 'welcome') => {
  const [currentStory, setCurrentStory] = useState(initialStory);
  const [storyProgress, setStoryProgress] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);

  const navigateToStory = (action) => {
    setStoryProgress(prev => ({ ...prev, [currentStory]: true }));
    setCurrentStory(action);
    
    // Add to conversation history
    setConversationHistory(prev => [...prev, {
      from: currentStory,
      to: action,
      timestamp: new Date()
    }]);
  };

  const resetToWelcome = () => {
    setCurrentStory('welcome');
  };

  return {
    currentStory,
    storyProgress,
    conversationHistory,
    navigateToStory,
    resetToWelcome
  };
};