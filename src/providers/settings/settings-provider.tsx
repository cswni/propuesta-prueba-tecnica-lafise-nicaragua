import { useState, type ReactNode } from 'react';
import { SettingsContext } from './settings-context.tsx';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  const toggleFullWidth = () => setIsFullWidth((prev) => !prev);

  return (
    <SettingsContext.Provider value={{ isFullWidth, toggleFullWidth }}>
      {children}
    </SettingsContext.Provider>
  );
};
