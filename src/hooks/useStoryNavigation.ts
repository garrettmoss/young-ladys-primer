import { useState } from 'react';

interface NavigationHistoryItem {
  from: string;
  to: string;
  timestamp: Date;
}

interface StoryProgress {
  [key: string]: boolean;
}

export const useStoryNavigation = (initialStory: string = 'welcome') => {
  const [currentStory, setCurrentStory] = useState<string>(initialStory);
  const [storyProgress, setStoryProgress] = useState<StoryProgress>({});
  const [conversationHistory, setConversationHistory] = useState<NavigationHistoryItem[]>([]);

  const navigateToStory = (action: string): void => {
    setStoryProgress(prev => ({ ...prev, [currentStory]: true }));
    setCurrentStory(action);
    
    // Add to conversation history
    setConversationHistory(prev => [...prev, {
      from: currentStory,
      to: action,
      timestamp: new Date()
    }]);
  };

  const resetToWelcome = (): void => {
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