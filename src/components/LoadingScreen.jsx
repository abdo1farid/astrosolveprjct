import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress < 100) {
                setProgress(prev => Math.min(prev + Math.random() * 25, 100));
            } else {
                onComplete();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [progress, onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
            <div className="w-64 space-y-4">
                <div className="relative h-2 bg-slate-900/50 rounded-full overflow-hidden">
                    <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-center text-slate-200 text-sm font-medium">
                    Loading AstroSolve...
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
