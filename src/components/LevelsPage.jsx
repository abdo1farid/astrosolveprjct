import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './LevelsPage.css';

function LevelsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[url('/public/exoplanets.jpg')] bg-cover bg-center bg-fixed overflow-hidden">
            <div className="min-h-screen bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-black/95 flex flex-col items-center relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="stars-small" />
                    <div className="stars-medium" />
                    <div className="stars-large" />
                </div>
                <Header />
                <div className="container mx-auto px-4 flex flex-col items-center justify-center flex-grow z-10">
                    <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-500 mb-4">
                        Space Adventure
                    </h1>
                    <p className="text-2xl text-blue-300 mb-10">Choose your mission, young explorer! 🚀</p>
                    
                    <div className="relative flex flex-row items-center justify-center gap-20 mt-20">
                        {/* Glowing connection line */}
                        <div className="absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2">
                            {/* Outer glow */}
                            <div className="absolute h-1 w-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 rounded-full blur-xl opacity-50" />
                            {/* Main line */}
                            <div className="absolute h-0.5 w-full bg-gradient-to-r from-purple-400 via-blue-300 to-cyan-200 rounded-full blur-sm" />
                            {/* Inner glow */}
                            <div className="absolute h-px w-full bg-white rounded-full blur-sm opacity-70" />
                            {/* Animated particles along the line */}
                            <div className="absolute h-2 w-2 bg-white rounded-full blur-sm animate-pulse-slide" 
                                style={{ animation: 'pulse-slide 3s linear infinite' }} />
                        </div>
                        
                        {/* Level 1 - Active */}
                        <div className="flex flex-col items-center gap-4 z-10">
                            <div
                                onClick={() => navigate('/solar-system-gate')}
                                className="group relative w-32 h-32 perspective-1000 cursor-pointer transition-transform hover:scale-110"
                            >
                                <div className="w-full h-full preserve-3d transform-style transition-transform duration-500 group-hover:rotate-y-180">
                                    <div className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)] ring-4 ring-purple-400 transform preserve-3d rotate-x-12 rotate-y-12 backface-hidden">
                                        <span className="text-white font-bold text-4xl">1</span>
                                        <img src="/public/planets/sun.png" alt="Solar System" className="absolute w-16 h-16 top-2 right-2 animate-spin-slow opacity-75" />
                                    </div>
                                    <div className="absolute w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl transform rotate-y-180 backface-hidden p-4">
                                        <span className="text-white text-center text-sm font-bold">Solar System Gate</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-bold text-lg">Solar System Gate</p>
                                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">Beginner</span>
                                </div>
                                <p className="text-purple-300 text-sm">Sort the planets!</p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                                        <svg className="w-4 h-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 01.894.553l2.447 4.955 5.47.796a1 1 0 01.554 1.706l-3.957 3.857.935 5.444a1 1 0 01-1.452 1.054L10 17.418l-4.89 2.57a1 1 0 01-1.452-1.054l.934-5.444-3.957-3.857a1 1 0 01.554-1.706l5.47-.796 2.447-4.955A1 1 0 0110 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-yellow-400 text-xs font-medium">100 XP</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Level 2 - Active */}
                        <div className="flex flex-col items-center gap-4 z-10">
                            <div
                                onClick={() => navigate('/telescope-challenge')}
                                className="group relative w-32 h-32 perspective-1000 cursor-pointer transition-transform hover:scale-110"
                            >
                                <div className="w-full h-full preserve-3d transform-style transition-transform duration-500 group-hover:rotate-y-180">
                                    <div className="absolute w-full h-full bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)] ring-4 ring-sky-400 transform preserve-3d rotate-x-12 rotate-y-12 backface-hidden">
                                        <span className="text-white font-bold text-4xl">2</span>
                                        <img src="/public/img/ufo.png" alt="Telescope" className="absolute w-16 h-16 top-2 right-2 animate-pulse opacity-75" />
                                    </div>
                                    <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-sky-700 rounded-2xl flex items-center justify-center shadow-xl transform rotate-y-180 backface-hidden p-4">
                                        <span className="text-white text-center text-sm font-bold">Find Hidden Planets</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-bold text-lg">Telescope Challenge</p>
                                    <span className="px-2 py-0.5 bg-sky-500/20 border border-sky-500/30 rounded-full text-xs text-sky-300">Intermediate</span>
                                </div>
                                <p className="text-sky-300 text-sm">Discover exoplanets!</p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                                        <svg className="w-4 h-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 01.894.553l2.447 4.955 5.47.796a1 1 0 01.554 1.706l-3.957 3.857.935 5.444a1 1 0 01-1.452 1.054L10 17.418l-4.89 2.57a1 1 0 01-1.452-1.054l.934-5.444-3.957-3.857a1 1 0 01.554-1.706l5.47-.796 2.447-4.955A1 1 0 0110 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-yellow-400 text-xs font-medium">250 XP</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Level 3 - Locked */}
                        <div className="flex flex-col items-center gap-4 z-10">
                            <div className="relative w-32 h-32 perspective-1000 filter grayscale opacity-75">
                                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-x-12 rotate-y-12">
                                    <span className="text-white font-bold text-4xl">3</span>
                                    <img src="/public/img/astronaut.png" alt="Mission" className="absolute w-16 h-16 top-2 right-2 opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl">🔒</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-400 font-bold text-lg">Space Mission</p>
                                    <span className="px-2 py-0.5 bg-gray-500/20 border border-gray-500/30 rounded-full text-xs text-gray-400">Advanced</span>
                                </div>
                                <p className="text-gray-500 text-sm">Coming soon!</p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-2 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full">
                                        <svg className="w-4 h-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 01.894.553l2.447 4.955 5.47.796a1 1 0 01.554 1.706l-3.957 3.857.935 5.444a1 1 0 01-1.452 1.054L10 17.418l-4.89 2.57a1 1 0 01-1.452-1.054l.934-5.444-3.957-3.857a1 1 0 01.554-1.706l5.47-.796 2.447-4.955A1 1 0 0110 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-400 text-xs font-medium">500 XP</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LevelsPage;