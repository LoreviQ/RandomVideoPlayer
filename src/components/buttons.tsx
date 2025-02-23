interface ActionButtonProps {
    onClick: () => void;
    label: string;
    colour: string;
}
export function ActionButton({ onClick, label, colour }: ActionButtonProps) {
    return (
        <button
            className={`w-full py-2 px-4 ${colour} text-white rounded-lg hover:bg-${colour}-700 transition`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

