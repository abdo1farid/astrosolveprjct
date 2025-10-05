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
                        <div className="absolute top-1/2 left-[15%] right-[15%] h-4 bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 rounded-full blur-sm transform -translate-y-1/2 z-0" />
                        
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
                            <div className="space-y-1">
                                <p className="text-white font-bold text-lg">Solar System Gate</p>
                                <p className="text-purple-300 text-sm">Sort the planets!</p>
                            </div>
                        </div>

                        {/* Level 2 - Locked */}
                        <div className="flex flex-col items-center gap-4 z-10">
                            <div className="relative w-32 h-32 perspective-1000 filter grayscale opacity-75">
                                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-x-12 rotate-y-12">
                                    <span className="text-white font-bold text-4xl">2</span>
                                    <img src="/public/img/ufo.png" alt="Telescope" className="absolute w-16 h-16 top-2 right-2 opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl">🔒</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-400 font-bold text-lg">Telescope Challenge</p>
                                <p className="text-gray-500 text-sm">Coming soon!</p>
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
                            <div className="space-y-1">
                                <p className="text-gray-400 font-bold text-lg">Space Mission</p>
                                <p className="text-gray-500 text-sm">Coming soon!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LevelsPage;