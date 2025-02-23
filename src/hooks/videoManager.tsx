import { useState, useEffect, useCallback } from "react";
import { WeightedVideo } from "../types/weights";
interface VideoManagementConfig {
    weightedVideos: WeightedVideo[];
}
interface VideoManagementReturn {
    currentVideoURL: string;
    next: () => void;
    prev: () => void;
}
export const useVideoManagement = ({
    weightedVideos
}: VideoManagementConfig): VideoManagementReturn => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentVideoURL, setCurrentVideoURL] = useState<string>(URL.createObjectURL(weightedVideos[currentVideoIndex].file));

    // Update video when index changes
    useEffect(() => {
        const wrappedIndex = currentVideoIndex % weightedVideos.length;
        setCurrentVideoURL(URL.createObjectURL(weightedVideos[wrappedIndex].file));
    }, [currentVideoIndex, weightedVideos]);

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