export function ProgressBar({ currentTicks, totalTicks }: { currentTicks: number; totalTicks: number }) {
    return (
        <div className="absolute bottom-0 w-full h-2 bg-blue-950/50">
            <div
                className="h-full bg-blue-700"
                style={{
                    width: `${(currentTicks / totalTicks) * 100}%`, // Start from 0%
                }}
            />
        </div>
    );
}
