import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AdaptiveLevel } from '../content';

interface ReaderPreferences {
  readerName: string;
  setReaderName: (name: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  readerLevel: AdaptiveLevel;
  setReaderLevel: (level: AdaptiveLevel) => void;
  handleReaderLevelSelect: (level: AdaptiveLevel) => void;
  showNameInput: boolean;
  setShowNameInput: (show: boolean) => void;
  settingsNameInput: string;
  setSettingsNameInput: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (isEditing: boolean) => void;
  handleNameSubmit: () => void;
  handleChooseLater: () => void;
  handleDarkModeToggle: () => void;
  handleEditNameClick: () => void;
  handleSettingsNameSave: () => void;
  handleCancelNameEdit: () => void;
}

/**
 * Custom hook for managing reader preferences (name, dark mode, etc.)
 * Handles localStorage persistence and provides convenient methods for common operations
 */
export function useReaderPreferences(): ReaderPreferences {
  // Core preferences stored in localStorage
  const [readerName, setReaderName] = useLocalStorage<string>('young-ladys-primer-reader-name', '');
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('young-ladys-primer-dark-mode', false);
  const [readerLevel, setReaderLevel] = useLocalStorage<AdaptiveLevel>('young-ladys-primer-reader-level', 'fruit');

  // UI state for name input and editing
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [settingsNameInput, setSettingsNameInput] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // On mount, check if we need to show name input for first-time users
  useEffect(() => {
    if (!readerName) {
      setShowNameInput(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - readerName is intentionally excluded

  /**
   * Handle name input submission - saves name and closes modal
   */
  const handleNameSubmit = (): void => {
    const trimmedName = readerName.trim();
    if (trimmedName) {
      setReaderName(trimmedName);
      setShowNameInput(false);
    }
  };

  /**
   * Handle "choose later" - sets default name 'Aria' and closes modal
   */
  const handleChooseLater = (): void => {
    const defaultName = 'Aria';
    setReaderName(defaultName);
    setShowNameInput(false);
  };

  /**
   * Handle dark mode toggle
   */
  const handleDarkModeToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  /**
   * Direct-select handler for the level radio group in settings. Thin
   * wrapper around setReaderLevel so the parent component imports one
   * handler name consistent with the rest of the hook's surface.
   */
  const handleReaderLevelSelect = (level: AdaptiveLevel): void => {
    setReaderLevel(level);
  };

  /**
   * Handle edit button click in settings - enter edit mode
   */
  const handleEditNameClick = (): void => {
    setSettingsNameInput(readerName);
    setIsEditingName(true);
  };

  /**
   * Handle saving name from settings page inline editor
   */
  const handleSettingsNameSave = (): void => {
    const trimmedName = settingsNameInput.trim();
    if (trimmedName) {
      setReaderName(trimmedName);
      setIsEditingName(false);
    }
  };

  /**
   * Handle cancel button click - exit edit mode without saving
   */
  const handleCancelNameEdit = (): void => {
    setIsEditingName(false);
    setSettingsNameInput('');
  };

  return {
    readerName,
    setReaderName,
    isDarkMode,
    setIsDarkMode,
    readerLevel,
    setReaderLevel,
    handleReaderLevelSelect,
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
  };
}
