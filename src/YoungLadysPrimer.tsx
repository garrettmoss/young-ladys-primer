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

import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Feather, School, ChevronLeft, Settings, Eclipse, BookMarked, Scroll, MoonStar, Cog, UserStar, Bug } from 'lucide-react';
import { getContent, Choice, ContentContext } from './content/index';
import { useContentNavigation } from './hooks/useContentNavigation';
import { useHydration } from './hooks/useHydration';
import { useReaderPreferences } from './hooks/useReaderPreferences';

const YoungLadysPrimer: React.FC = () => {
  // Hydration state for SSR compatibility
  const isHydrated = useHydration();

  // Reader preferences (name, dark mode, and related UI state)
  const {
    readerName,
    setReaderName,
    isDarkMode,
    showNameInput,
    setShowNameInput,
    settingsNameInput,
    setSettingsNameInput,
    isEditingName,
    setIsEditingName,
    handleNameSubmit,
    handleChooseLater,
    handleDarkModeToggle,
    handleEditNameClick,
    handleSettingsNameSave,
    handleCancelNameEdit,
  } = useReaderPreferences();

  // Navigation State: Managed by custom hook for separation of concerns
  const {
    currentContent: currentContentKey,  // Current content identifier (string)
    contentProgress,                     // Object tracking which content has been visited
    navigateToContent,                   // Function to move to new content
    resetToWelcome,                      // Function to return to the welcome screen
    goBack,                              // Function to navigate back to previous content
    canGoBack                            // Boolean indicating if back navigation is possible
  } = useContentNavigation();

  // Content Resolution: Fetch content with personalization
  // During SSR, always use 'welcome' to prevent hydration mismatch
  // After hydration, use the actual currentContentKey from localStorage
  const contentKey = isHydrated ? currentContentKey : 'welcome';
  // Also guard reader name with hydration check to prevent SSR mismatch
  const effectiveReaderName = isHydrated ? (readerName || 'Aria') : 'Aria';

  // Build context object for content personalization
  const contentContext: ContentContext = {
    readerName: effectiveReaderName
    // Future variables like readingLevel, choiceHistory, etc. can be added here
  };

  const currentContent = getContent(contentKey, contentContext) || getContent('welcome', contentContext)!;

  // Event Handlers: User interaction callbacks

  /**
   * Get icon component for welcome page choices
   * @param action - The choice action identifier
   * @returns Icon component or null
   */
  const getWelcomeIcon = (action: string) => {
    switch(action) {
      case 'story_princess': return Scroll;
      case 'lesson_choice': return MoonStar;
      case 'puzzle_logic': return Cog;
      case 'reflection': return UserStar;
      default: return null;
    }
  };

  /**
   * Handle story choice selection - navigates to new story branch
   * @param action - The story identifier to navigate to
   */
  const handleChoice = (action: string) => {
    if (action === 'change-name') {
      setShowNameInput(true);
    } else if (action === 'debug_confirm_clear_all') {
      // Debug action: Clear all localStorage and reload
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.reload();
      }
    } else if (action === 'debug_confirm_reset_user') {
      // Debug action: Clear user data but preserve preferences
      if (typeof window !== 'undefined') {
        const darkMode = localStorage.getItem('young-ladys-primer-dark-mode');
        localStorage.clear();
        if (darkMode) {
          localStorage.setItem('young-ladys-primer-dark-mode', darkMode);
        }
        window.location.reload();
      }
    } else {
      navigateToContent(action);
    }
  };

  /**
   * Handle settings button click - navigate to settings page
   */
  const handleSettingsClick = (): void => {
    setIsEditingName(false); // Reset edit mode when entering settings
    navigateToContent('settings');
  };

  // === RENDER: Victorian Manuscript-Style UI ===

  return (
    <div className={`primer-container ${isDarkMode ? 'dark-mode' : ''}`}>
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

          {contentKey === 'welcome' && (
            <p className="subtitle">
              "A book that adapts itself to the mind of its reader"
            </p>
          )}

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
                  <div className="space-y-3">
                    <button
                      onClick={handleNameSubmit}
                      className="submit-button"
                    >
                      Begin Your Journey
                    </button>
                    <button
                      onClick={handleChooseLater}
                      className="w-full py-2 px-4 border border-amber-300/40 text-amber-700 bg-transparent hover:bg-amber-50/20
                               transition-all duration-200 rounded-md font-serif text-sm italic"
                    >
                      I shall choose later
                    </button>
                  </div>
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

            {/* Settings page name display/editor */}
            {contentKey === 'settings' && (
              <div className="space-y-4 mt-6">
                {/* Reader Name Setting */}
                <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
                  {!isEditingName ? (
                    // Static display mode
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Feather className="w-5 h-5 text-amber-700" />
                        <div>
                          <strong className="text-amber-900">Reader Name:</strong>
                          <span className="ml-2 text-amber-800">{readerName}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleEditNameClick}
                        className="py-1 px-4 text-sm bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors font-serif"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    // Edit mode
                    <div className="flex items-center gap-3">
                      <strong className="text-amber-900 whitespace-nowrap">Reader Name:</strong>
                      <input
                        type="text"
                        value={settingsNameInput}
                        onChange={(e) => setSettingsNameInput(e.target.value)}
                        placeholder="Enter your name..."
                        className="name-input flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleSettingsNameSave()}
                      />
                      <button
                        onClick={handleSettingsNameSave}
                        className="py-2 px-4 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition-colors font-serif whitespace-nowrap"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelNameEdit}
                        className="py-2 px-4 border border-amber-300 text-amber-700 bg-transparent rounded hover:bg-amber-50/20 transition-colors font-serif whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Illumination Setting */}
                <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eclipse className="w-5 h-5 text-amber-700" />
                      <div>
                        <strong className="text-amber-900">Illumination:</strong>
                        <span className="ml-2 text-amber-800">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleDarkModeToggle}
                      className="py-1 px-4 text-sm bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors font-serif"
                    >
                      Toggle
                    </button>
                  </div>
                </div>

                {/* Reading Progress */}
                <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
                  <div className="flex items-center gap-3">
                    <BookMarked className="w-5 h-5 text-amber-700" />
                    <div>
                      <strong className="text-amber-900">Reading Progress:</strong>
                      <span className="ml-2 text-amber-800">{Object.keys(contentProgress).length} passages explored</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Decorative separator */}
            <div className="decorative-separator">
              <div className="separator-line"></div>
              <span className="separator-symbol">✦</span>
              <div className="separator-line"></div>
            </div>

            {/* Choices with manuscript style */}
            {currentContent.choices && currentContent.choices.length > 0 && (
              <div className="space-y-3 mt-6">
                {contentKey === 'welcome' && (
                  <p className="choice-prompt">
                    Choose your path, dear reader...
                  </p>
                )}
                {currentContent.choices.map((choice: Choice, index: number) => {
                  // Special actions that don't need story content
                  const isSpecialAction = choice.action === 'change-name';
                  const isActionAvailable = isSpecialAction || getContent(choice.action, contentContext);
                  const IconComponent = contentKey === 'welcome' ? getWelcomeIcon(choice.action) : null;

                  return (
                    <button
                      key={index}
                      onClick={() => isActionAvailable ? handleChoice(choice.action) : null}
                      disabled={!isActionAvailable}
                      className={`choice-button group ${isActionAvailable ? '' : 'disabled'}`}
                    >
                      <div className="flex items-center gap-3">
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-amber-700" />
                        )}
                        <span className="font-medium relative z-10" style={{ letterSpacing: '0.02em' }}>
                          {choice.text}
                          {!isActionAvailable && <span className="text-sm italic ml-2">(Coming soon)</span>}
                        </span>
                      </div>
                      {isActionAvailable && (
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation buttons - only show when not on welcome page */}
            {contentKey !== 'welcome' && (
              <div className="space-y-3 mt-6">
                {currentContent.choices && currentContent.choices.length > 0 && (
                  <div className="flex items-center justify-center my-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                    <span className="text-amber-600/40 mx-3 text-sm">or</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
                  </div>
                )}

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
                  </button>
                )}

                {/* Home button */}
                <button
                  onClick={resetToWelcome}
                  className="home-button group"
                >
                  <School className="home-button-icon" />
                  <span className="home-button-text">
                    Return to the Beginning
                  </span>
                </button>
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
            {effectiveReaderName && `Crafted for ${effectiveReaderName} • `}
            Anno Domini MMXXV
          </p>
          <div className="footer-stats">
            <button
              onClick={handleSettingsClick}
              className="footer-stat hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Open settings"
            >
              <Settings className="w-5 h-5" />
              <span className="text-lg">Settings</span>
            </button>
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => navigateToContent('debug')}
                className="footer-stat hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Open debug tools"
              >
                <Bug className="w-5 h-5" />
                <span className="text-lg">Debug</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungLadysPrimer;