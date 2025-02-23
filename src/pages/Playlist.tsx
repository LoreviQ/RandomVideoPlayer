import { useRef } from 'react';
// My Hooks
import { useKeyboardControls } from "../hooks/keyboard";
import { useVideoManagement } from "../hooks/videoManager";
// My Contexts
import { useApp } from "../contexts/AppContext";

export default function Playlist() {
    const { videoFiles, setRunApp } = useApp();
    const videoRef = useRef<HTMLVideoElement>(null);

    // Video Management Hook
    const { currentVideoURL, next, prev } = useVideoManagement({ videoFiles });

    // Custom hook for enabling keyboard controls
    useKeyboardControls({
        onEscape: () => setRunApp(false),
        onSpace: () => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause(),
        onArrowRight: () => next(),
        onArrowLeft: () => prev(),
    });

    return (
        <div className="flex flex-col justify-center items-center h-screen overflow-hidden relative bg-black">
            {videoFiles.length > 0 ? (
                <video
                    ref={videoRef}
                    className="max-h-screen max-w-full"
                    src={currentVideoURL}
                    controls
                    autoPlay
                    onEnded={next}
                    />
            ) : (
                <p className="text-white">No videos in playlist</p>
            )}
        </div>
    );
}