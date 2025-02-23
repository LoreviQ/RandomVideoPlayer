import { useState, useEffect, useCallback } from "react";

interface VideoManagementConfig {
    videoFiles: File[];
}
interface VideoManagementReturn {
    currentVideoURL: string;
    next: () => void;
    prev: () => void;
}
export const useVideoManagement = ({
    videoFiles
}: VideoManagementConfig): VideoManagementReturn => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentVideoURL, setCurrentVideoURL] = useState<string>(URL.createObjectURL(videoFiles[currentVideoIndex]));

    // Update video when index changes
    useEffect(() => {
        const wrappedIndex = currentVideoIndex % videoFiles.length;
        setCurrentVideoURL(URL.createObjectURL(videoFiles[wrappedIndex]));
    }, [currentVideoIndex, videoFiles]);

    const next = useCallback(() => {
        setCurrentVideoIndex((prev) => (prev + 1));
    }, [currentVideoIndex]);

    const prev = useCallback(() => {
        setCurrentVideoIndex((prev) => (prev - 1));
    }, [currentVideoIndex]);

    return {
        currentVideoURL,
        next,
        prev,
    };
};