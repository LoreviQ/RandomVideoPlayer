import { useEffect } from "react";

interface KeyboardControls {
    onArrowRight?: () => void;
    onArrowLeft?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
}
export const useKeyboardControls = (controls: KeyboardControls) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowRight":
                    controls.onArrowRight?.();
                    break;
                case "ArrowLeft":
                    controls.onArrowLeft?.();
                    break;
                case " ":
                    controls.onSpace?.();
                    break;
                case "Escape":
                    controls.onEscape?.();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [controls]);
};
