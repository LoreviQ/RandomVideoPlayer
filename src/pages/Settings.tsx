import { ActionButton } from "../components/buttons";
import { formatFileSize } from "../utils/formatters";
import { useApp } from "../contexts/AppContext";
import { DragAndDropOverlay, Hero } from "../components/style";
import { WeightedVideo } from "../types/weights";

export default function Settings({}) {
    const { selectedFolder, handleFolderSelect, handleFileSelect, isDragging, setRunApp } = useApp();

    const runApp = () => {
        if (!selectedFolder) {
            alert("Please select a folder first");
            return;
        }
        setRunApp(true);
    };

    return (
        <>
            {isDragging && <DragAndDropOverlay />}
            <div className="w-screen flex justify-center px-6">
                <div className="w-full h-screen max-w-2xl p-6 flex flex-col">
                    <div className="flex-grow space-y-4">
                        <Hero />
                        {"showDirectoryPicker" in window ? (
                            <ActionButton onClick={handleFolderSelect} label="Select Folder" colour="bg-blue-600" />
                        ) : (
                            <ActionButton onClick={handleFileSelect} label="Select Files" colour="bg-blue-600" />
                        )}
                        <FolderDetails />
                        <hr className="border-gray-700" />
                        <VideoList />
                        <ActionButton onClick={runApp} label="Start" colour="bg-green-700" />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

function FolderDetails() {
    const { selectedFolder } = useApp();
    if (!selectedFolder) {
        return (
            <div className="text-gray-400">
                <p>{`No ${"showDirectoryPicker" in window ? "folder" : "files"} selected`}</p>
                <p> Click the button, or drag and drop</p>
            </div>
        );
    }
    return (
        <div>
            <p className="text-white font-medium">{selectedFolder.name}</p>
            <p className="text-white text-sm">
                {selectedFolder.items} items • {formatFileSize(selectedFolder.totalSize)}
            </p>
        </div>
    );
}

function VideoList() {
    const { weightedVideos } = useApp();

    if (weightedVideos.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            <div className="grid grid-cols-[1fr,100px] gap-4 mb-2 font-medium text-gray-300">
                <div>Video</div>
                <div>Weight</div>
            </div>
            <div className="space-y-2">
                {weightedVideos.map((weightedVideo: WeightedVideo) => (
                    <div key={weightedVideo.file.name} className="grid grid-cols-[1fr,100px] gap-4 items-center">
                        <div className="text-gray-400 truncate" title={weightedVideo.file.name}>
                            {weightedVideo.file.name}
                        </div>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={weightedVideo.weight}
                            onChange={(e) => weightedVideo.changeWeight(e.target.value)}
                            className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Footer() {
    const version = import.meta.env.VITE_GIT_SHA || "X";
    return (
        <div className="flex justify-between text-sm text-white items-center text-center">
            <div>
                Contact:{" "}
                <a href="mailto:oliver.tj@oliver.tj" className="hover:underline">
                    oliver.tj@oliver.tj
                </a>
            </div>
            <div>
                <a href="https://ko-fi.com/O4O61AQHEB" target="_blank" rel="noopener noreferrer">
                    <img 
                        src="/images/support_me_on_kofi_dark.webp"
                        alt="Support me on Ko-fi" 
                        width="178"
                        height="36"
                        loading="lazy"
                        className="h-9"
                    />
                </a>
            </div>
            <div>Version 1.0.{version}</div>
        </div>
    );
}
