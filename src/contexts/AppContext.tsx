import React, { createContext, useContext, useState } from "react";
import type { SelectedFolder } from "../types/preferences";
import { useFileManager } from "../hooks/fileManager";

interface AppContextType {
    selectedFolder: SelectedFolder | null;
    videoFiles: File[];
    runApp: boolean;
    setRunApp: React.Dispatch<React.SetStateAction<boolean>>;
    handleFolderSelect: () => Promise<void>;
    handleFileSelect: () => void;
    isDragging: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [runApp, setRunApp] = useState(false);
    const { selectedFolder, videoFiles, isDragging, handleFolderSelect, handleFileSelect } =
        useFileManager(runApp);

    return (
        <AppContext.Provider
            value={{
                selectedFolder,
                videoFiles,
                runApp,
                setRunApp,
                handleFolderSelect,
                handleFileSelect,
                isDragging,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
