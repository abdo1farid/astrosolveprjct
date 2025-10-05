import { useState, useEffect } from 'react';

const StartupAnimation = ({ onComplete }) => {
    const [textComplete, setTextComplete] = useState(false);
    const [pixelating, setPixelating] = useState(false);
    const text = "SolarPredict";

    useEffect(() => {
        setTimeout(() => {
            setTextComplete(true);
            setTimeout(() => {
                setPixelating(true);
                setTimeout(onComplete, 1000);
            }, 1000);
        }, 2000);
    }, []);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950 transition-all duration-1000
            ${pixelating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="relative">
                <h1 className="text-6xl font-bold text-transparent">
                    {text.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`inline-block bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text
                                transition-all duration-300 animate-fade-in
                                ${textComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
                {textComplete && (
                    <div className="absolute -bottom-6 left-0 w-full">
                        <div className="h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 animate-expand" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartupAnimation;
