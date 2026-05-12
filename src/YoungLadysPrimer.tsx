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
import { Scroll, MoonStar, Cog, Castle, UserStar } from 'lucide-react';
import { getContent, Choice, ContentContext } from './content/index';
import { getKingdomById } from './content/kingdoms';
import { useContentNavigation } from './hooks/useContentNavigation';
import { useHydration } from './hooks/useHydration';
import { useReaderPreferences } from './hooks/useReaderPreferences';
import { Header, Footer, NameInputModal, ChoiceButton, NavigationButtons, SettingsPanel } from './components';

function YoungLadysPrimer() {
  // Hydration state for SSR compatibility
  const isHydrated = useHydration();

  // Reader preferences (name, dark mode, and related UI state)
  const {
    readerName,
    setReaderName,
    isDarkMode,
    readerLevel,
    showNameInput,
    setShowNameInput,
    settingsNameInput,
    setSettingsNameInput,
    isEditingName,
    setIsEditingName,
    readerAgeInput,
    setReaderAgeInput,
    readerStartAge,
    readerStartDate,
    currentAge,
    handleNameSubmit,
    handleChooseLater,
    handleDarkModeToggle,
    handleReaderLevelSelect,
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
  // Also guard reader name and dark mode with hydration check to prevent SSR mismatch
  const effectiveReaderName = isHydrated ? (readerName || 'Aria') : 'Aria';
  const effectiveDarkMode = isHydrated ? isDarkMode : false;
  const effectiveReaderLevel = isHydrated ? readerLevel : 'fruit';

  // Build context object for content personalization
  const contentContext: ContentContext = {
    readerName: effectiveReaderName,
    currentLevel: effectiveReaderLevel,
  };

  const currentContent = getContent(contentKey, contentContext) || getContent('welcome', contentContext)!;

  // Event Handlers: User interaction callbacks

  /**
   * Icon for a choice on the welcome (library) page — Castle for kingdoms,
   * UserStar for the cross-kingdom reflection option.
   */
  const getWelcomeIcon = (action: string) => {
    if (action === 'reflection') return UserStar;
    return Castle;
  };

  /**
   * Icon for a choice on a kingdom hub page. Matches the action against the
   * kingdom's story entry points, lessons, and puzzles; also recognizes the
   * placeholder actions emitted when a kingdom hasn't filled a slot yet.
   */
  const getHubIcon = (kingdomId: string, action: string) => {
    if (action === 'welcome') return Castle;
    if (action.startsWith('__placeholder_story_')) return Scroll;
    if (action.startsWith('__placeholder_lesson_')) return MoonStar;
    if (action.startsWith('__placeholder_puzzle_')) return Cog;
    const kingdom = getKingdomById(kingdomId);
    if (!kingdom) return null;
    if (kingdom.stories.some(s => s.entryPoint === action)) return Scroll;
    if (kingdom.lessons.includes(action)) return MoonStar;
    if (kingdom.puzzles.includes(action)) return Cog;
    return null;
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
    <div className={`primer-container ${effectiveDarkMode ? 'dark-mode' : ''}`}>
      <div className="primer-content">
        {/* Ornate Header */}
        <Header contentKey={contentKey} isDarkMode={effectiveDarkMode} />

        {/* Name Input Modal */}
        <NameInputModal
          showNameInput={showNameInput}
          readerName={readerName}
          setReaderName={setReaderName}
          readerAgeInput={readerAgeInput}
          setReaderAgeInput={setReaderAgeInput}
          onSubmit={handleNameSubmit}
          onChooseLater={handleChooseLater}
        />

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
              <div className="story-text" dangerouslySetInnerHTML={{ __html: currentContent.content }}>
              </div>
            </div>

            {/* Settings page */}
            {contentKey === 'settings' && (
              <SettingsPanel
                readerName={readerName}
                settingsNameInput={settingsNameInput}
                setSettingsNameInput={setSettingsNameInput}
                isEditingName={isEditingName}
                isDarkMode={effectiveDarkMode}
                readerLevel={effectiveReaderLevel}
                readerStartAge={readerStartAge}
                readerStartDate={readerStartDate}
                currentAge={currentAge}
                contentProgressCount={Object.keys(contentProgress).length}
                onEditNameClick={handleEditNameClick}
                onSettingsNameSave={handleSettingsNameSave}
                onCancelNameEdit={handleCancelNameEdit}
                onDarkModeToggle={handleDarkModeToggle}
                onReaderLevelSelect={handleReaderLevelSelect}
              />
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
                {(contentKey === 'welcome' || contentKey.startsWith('hub_')) && (
                  <p className="choice-prompt">
                    Choose your path, dear reader...
                  </p>
                )}
                {currentContent.choices.map((choice: Choice, index: number) => {
                  // Special actions that don't need story content
                  const isSpecialAction = choice.action === 'change-name';
                  const isActionAvailable = isSpecialAction || getContent(choice.action, contentContext);
                  let IconComponent = null;
                  if (contentKey === 'welcome') {
                    IconComponent = getWelcomeIcon(choice.action);
                  } else if (contentKey.startsWith('hub_')) {
                    IconComponent = getHubIcon(contentKey.slice(4), choice.action);
                  }

                  return (
                    <ChoiceButton
                      key={index}
                      choice={choice}
                      icon={IconComponent}
                      isAvailable={!!isActionAvailable}
                      onClick={() => handleChoice(choice.action)}
                    />
                  );
                })}
              </div>
            )}

            {/* Navigation buttons - only show when not on welcome page */}
            {contentKey !== 'welcome' && (
              <NavigationButtons
                hasChoices={!!(currentContent.choices && currentContent.choices.length > 0)}
                canGoBack={canGoBack()}
                onBack={goBack}
                onReturnToBeginning={resetToWelcome}
              />
            )}
          </div>
        </div>

        {/* Footer with Victorian flourish */}
        <Footer
          readerName={effectiveReaderName}
          onSettingsClick={handleSettingsClick}
          onDevToolsClick={() => navigateToContent('debug')}
          isDevelopment={process.env.NODE_ENV === 'development'}
        />
      </div>
    </div>
  );
}

export default YoungLadysPrimer;