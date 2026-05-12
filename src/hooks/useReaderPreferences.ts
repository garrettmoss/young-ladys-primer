import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AdaptiveLevel, levelForAge } from '../content';

/**
 * The Primer models three distinct things about the reader, intentionally
 * decoupled so they can evolve independently:
 *
 *   readerStartAge   — age at onboarding. Anchor. Never changes.
 *   readerStartDate  — ISO date (YYYY-MM-DD) of onboarding. Combined with
 *                      start age, lets us derive current age as time passes.
 *   readerLevel      — active adaptive tier. Initially derived from start
 *                      age, but the reader (or future adaptive engine) may
 *                      shift it freely without touching the start values.
 *
 * `currentAge` is derived, not stored — if start age and start date exist,
 * we add elapsed full years. This way a reader who joins at 6 will see the
 * Primer treat them as 7 once a year has passed, even if their level has
 * been manually overridden.
 */
interface ReaderPreferences {
  readerName: string;
  setReaderName: (name: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  readerLevel: AdaptiveLevel;
  setReaderLevel: (level: AdaptiveLevel) => void;
  handleReaderLevelSelect: (level: AdaptiveLevel) => void;
  readerStartAge: number | null;
  readerStartDate: string | null;
  currentAge: number | null;
  showNameInput: boolean;
  setShowNameInput: (show: boolean) => void;
  settingsNameInput: string;
  setSettingsNameInput: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (isEditing: boolean) => void;
  readerAgeInput: string;
  setReaderAgeInput: (age: string) => void;
  handleNameSubmit: () => void;
  handleChooseLater: () => void;
  handleDarkModeToggle: () => void;
  handleEditNameClick: () => void;
  handleSettingsNameSave: () => void;
  handleCancelNameEdit: () => void;
}

export const MIN_READER_AGE = 4;
export const MAX_READER_AGE = 16;

/**
 * Compute full years elapsed between an ISO date string and today.
 * Returns 0 for invalid or future dates.
 */
function yearsSince(isoDate: string): number {
  const start = new Date(isoDate);
  if (Number.isNaN(start.getTime())) return 0;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Custom hook for managing reader preferences (name, dark mode, etc.)
 * Handles localStorage persistence and provides convenient methods for common operations
 */
export function useReaderPreferences(): ReaderPreferences {
  // Core preferences stored in localStorage
  const [readerName, setReaderName] = useLocalStorage<string>('young-ladys-primer-reader-name', '');
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('young-ladys-primer-dark-mode', false);
  const [readerLevel, setReaderLevel] = useLocalStorage<AdaptiveLevel>('young-ladys-primer-reader-level', 'seed');
  const [readerStartAge, setReaderStartAge] = useLocalStorage<number | null>('young-ladys-primer-reader-start-age', null);
  const [readerStartDate, setReaderStartDate] = useLocalStorage<string | null>('young-ladys-primer-reader-start-date', null);

  // UI state for name input and editing
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [settingsNameInput, setSettingsNameInput] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [readerAgeInput, setReaderAgeInput] = useState<string>('');

  // Re-prompt if either name or start age is missing. The two are set
  // together at onboarding, so a missing start age means an incomplete
  // setup (e.g. a pre-age-tracking install).
  useEffect(() => {
    if (!readerName || readerStartAge == null) {
      setShowNameInput(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentAge: number | null =
    readerStartAge != null && readerStartDate
      ? readerStartAge + yearsSince(readerStartDate)
      : null;

  /**
   * Handle name input submission - saves name and closes modal
   */
  const handleNameSubmit = (): void => {
    const trimmedName = readerName.trim();
    if (!trimmedName) return;
    const parsedAge = parseInt(readerAgeInput, 10);
    if (!Number.isFinite(parsedAge) || parsedAge < MIN_READER_AGE || parsedAge > MAX_READER_AGE) return;
    setReaderName(trimmedName);
    setReaderStartAge(parsedAge);
    setReaderStartDate(todayIso());
    setReaderLevel(levelForAge(parsedAge));
    setShowNameInput(false);
  };

  /**
   * Handle "choose later" - sets default name 'Aria' and closes modal.
   * Start age is left unset; level stays at its default ('seed'). The
   * reader can fill these in later via Settings.
   */
  const handleChooseLater = (): void => {
    setReaderName('Aria');
    setShowNameInput(false);
  };

  const handleDarkModeToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  /**
   * Manual level override from Settings. Intentionally does NOT touch
   * readerStartAge — the start age is the anchor, the level is the dial.
   */
  const handleReaderLevelSelect = (level: AdaptiveLevel): void => {
    setReaderLevel(level);
  };

  const handleEditNameClick = (): void => {
    setSettingsNameInput(readerName);
    setIsEditingName(true);
  };

  const handleSettingsNameSave = (): void => {
    const trimmedName = settingsNameInput.trim();
    if (trimmedName) {
      setReaderName(trimmedName);
      setIsEditingName(false);
    }
  };

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
    readerStartAge,
    readerStartDate,
    currentAge,
    showNameInput,
    setShowNameInput,
    settingsNameInput,
    setSettingsNameInput,
    isEditingName,
    setIsEditingName,
    readerAgeInput,
    setReaderAgeInput,
    handleNameSubmit,
    handleChooseLater,
    handleDarkModeToggle,
    handleEditNameClick,
    handleSettingsNameSave,
    handleCancelNameEdit,
  };
}
