import { useState, useRef } from 'react';
// My Hooks
import { useKeyboardControls } from "../hooks/keyboard";
// My Contexts
import { useApp } from "../contexts/AppContext";

export default function Playlist() {
    const { videoFiles, setRunApp } = useApp();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Custom hook for enabling keyboard controls
    useKeyboardControls({
        onEscape: () => setRunApp(false),
        onSpace: () => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause(),
        onArrowRight: () => handleNextVideo(),
        onArrowLeft: () => handlePrevVideo(),
    });

    const handleNextVideo = () => {
        if (currentVideoIndex < videoFiles.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
        }
    };

    const handlePrevVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(prev => prev - 1);
        }
    };

    const handleVideoEnd = () => {
        handleNextVideo();
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen overflow-hidden relative bg-black">
            {videoFiles.length > 0 ? (
                    <video
                        ref={videoRef}
                        className="max-h-screen max-w-full"
                        src={URL.createObjectURL(videoFiles[currentVideoIndex])}
                        controls
                        autoPlay
                        onEnded={handleVideoEnd}
                    />
            ) : (
                <p className="text-white">No videos in playlist</p>
            )}
        </div>
    );
}