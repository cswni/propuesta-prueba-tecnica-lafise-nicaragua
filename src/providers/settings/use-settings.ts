import { useContext } from 'react';

import { SettingsContext } from '@/providers/settings/settings-context';

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
