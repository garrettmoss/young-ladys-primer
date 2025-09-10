/**
 * Young Lady's Primer - Main Application Component
 * 
 * An interactive educational primer inspired by Neal Stephenson's "Diamond Age".
 * This React component presents adaptive educational content through branching 
 * narratives designed to empower young women with agency, knowledge, and confidence.
 * 
 * Key Features:
 * - Victorian manuscript-style UI with ornate decorations
 * - Personalized content using reader's name
 * - Branching interactive narratives with choice-driven progression
 * - Story progress tracking and navigation history
 * - Responsive design with elegant animations
 * 
 * Architecture:
 * - Pure UI rendering component (no business logic)
 * - Content fetched from modular content system
 * - State management handled by custom navigation hook
 * - TypeScript for compile-time safety and better developer experience
 */

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, Feather, Home, ChevronLeft } from 'lucide-react';
import { getStoryContent, Choice } from './content/index';
import { useStoryNavigation } from './hooks/useStoryNavigation';

const YoungLadysPrimer: React.FC = () => {
  // UI State: Reader's name and name input modal visibility
  const [readerName, setReaderName] = useState<string>('Aria'); // Default name, can be customized
  const [showNameInput, setShowNameInput] = useState<boolean>(false); // Controls name input modal
  const [isHydrated, setIsHydrated] = useState<boolean>(false); // Track hydration status for SSR compatibility
  
  // Navigation State: Managed by custom hook for separation of concerns
  const {
    currentStory,     // Current story/page identifier (string)
    storyProgress,    // Object tracking which stories have been visited
    navigateToStory,  // Function to move to a new story
    resetToWelcome,   // Function to return to the welcome screen
    goBack,           // Function to navigate back to previous story
    canGoBack         // Boolean indicating if back navigation is possible
  } = useStoryNavigation();

  // Hydration Effect: Ensure consistent rendering between server and client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Content Resolution: Fetch story content with personalization
  // During SSR, always use 'welcome' to prevent hydration mismatch
  // After hydration, use the actual currentStory from localStorage
  const storyKey = isHydrated ? currentStory : 'welcome';
  const currentContent = getStoryContent(storyKey, readerName) || getStoryContent('welcome', readerName)!;

  // Event Handlers: User interaction callbacks
  
  /**
   * Handle story choice selection - navigates to new story branch
   * @param action - The story identifier to navigate to
   */
  const handleChoice = (action: string) => {
    navigateToStory(action);
  };

  /**
   * Handle name input submission - closes modal if name is valid
   */
  const handleNameSubmit = (): void => {
    if (readerName.trim()) {
      setShowNameInput(false);
    }
  };

  // === RENDER: Victorian Manuscript-Style UI ===

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
              <div className="story-text whitespace-pre-line" dangerouslySetInnerHTML={{ __html: currentContent.content }}>
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
                {currentContent.choices.map((choice: Choice, index: number) => (
                  <button
                    key={index}
                    onClick={() => getStoryContent(choice.action) ? handleChoice(choice.action) : null}
                    disabled={!getStoryContent(choice.action)}
                    className={`choice-button group ${getStoryContent(choice.action) ? '' : 'disabled'}`}
                  >
                    <span className="font-medium relative z-10" style={{ letterSpacing: '0.02em' }}>
                      {choice.text}
                      {!getStoryContent(choice.action) && <span className="text-sm italic ml-2">(Coming soon)</span>}
                    </span>
                    {getStoryContent(choice.action) && (
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
                    )}
                    {getStoryContent(choice.action) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent 
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    )}
                  </button>
                ))}
                
                {/* Navigation buttons - only show when not on welcome page and after hydration */}
                {isHydrated && currentStory !== 'welcome' && (
                  <>
                    <div className="flex items-center justify-center my-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                      <span className="text-amber-600/40 mx-3 text-sm">or</span>
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                    </div>
                    
                    {/* Back button - only show when back navigation is possible */}
                    {canGoBack() && (
                      <button
                        onClick={goBack}
                        className="home-button group mb-3"
                      >
                        <ChevronLeft className="home-button-icon" />
                        <span className="home-button-text">
                          Go Back
                        </span>
                        <div className="home-button-shimmer"></div>
                      </button>
                    )}
                    
                    {/* Home button */}
                    <button
                      onClick={resetToWelcome}
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
              {isHydrated ? Object.keys(storyProgress).length : 0} passages explored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungLadysPrimer;