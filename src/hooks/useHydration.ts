import { useState, useEffect } from 'react';

/**
 * Custom hook to track whether the component has hydrated on the client
 * Useful for SSR safety when you need to conditionally render based on client-side state
 * @returns true after the first client-side render, false during SSR or before hydration
 */
export function useHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
