import {createContext} from "react";

interface SettingsContextType {
    isFullWidth: boolean;
    toggleFullWidth: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
