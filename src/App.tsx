import { AppProvider } from "./contexts/AppContext";
import Settings from "./pages/Settings";
import Playlist from "./pages/Playlist";
import { useApp } from "./contexts/AppContext";

function AppContent() {
    const { runApp, selectedFolder } = useApp();

    if (runApp && selectedFolder) {
        return <Playlist />;
    }
    return <Settings />;
}

export default function App() {
    return (
        <AppProvider>
            <div className="bg-custom-dark">
                <AppContent />
            </div>
        </AppProvider>
    );
}
