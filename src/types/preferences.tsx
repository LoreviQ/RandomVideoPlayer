export type SelectedFolder = {
    name: string;
    items: number;
    totalSize: number;
    dirHandle: FileSystemDirectoryHandle | null;
};

export type UserPreferences = {
    // Practice mode preferences
    mute: boolean;
};

export const DEFAULT_PREFERENCES: UserPreferences = {
    mute: false,
};
