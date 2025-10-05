import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import './TelescopeChallenge.css';

const TelescopeChallenge = () => {
    const [gameState, setGameState] = useState('intro'); // intro, playing, success, complete
    const [selectedStar, setSelectedStar] = useState(null);
    const [zoomedStar, setZoomedStar] = useState(null);
    const [showPlanet, setShowPlanet] = useState(false);
    const [showBadge, setShowBadge] = useState(false);
    const [muted, setMuted] = useState(false);
    
    // Sound effects
    const [playPing] = useSound('/sfx/good-6081.mp3', { volume: 0.5 });
    const [playBuzz] = useSound('/sfx/wrong-answer-129254.mp3', { volume: 0.3 });

    // Stars configuration
    const stars = [
        { id: 1, color: '#FFD700', size: 24, position: { x: '20%', y: '30%' }, hasPlanet: false },
        { id: 2, color: '#FF4500', size: 28, position: { x: '40%', y: '60%' }, hasPlanet: false },
        { id: 3, color: '#87CEEB', size: 26, position: { x: '60%', y: '25%' }, hasPlanet: true },
        { id: 4, color: '#FFFFFF', size: 22, position: { x: '80%', y: '45%' }, hasPlanet: false },
        { id: 5, color: '#FFA07A', size: 25, position: { x: '30%', y: '70%' }, hasPlanet: false }
    ];

    // Handle telescope click
    const handleTelescopeClick = () => {
        if (gameState === 'intro') {
            setGameState('playing');
        }
    };

    // Handle star selection
    const handleStarClick = (starId) => {
        const selectedStar = stars.find(star => star.id === starId);
        setSelectedStar(starId);
        
        if (selectedStar.hasPlanet) {
            playPing();
            setShowPlanet(true);
            setTimeout(() => {
                setGameState('success');
                setShowBadge(true);
            }, 2000);
        } else {
            playBuzz();
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            {/* Background stars */}
            <div className="absolute inset-0">
                <div className="stars-background"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
            </div>

            {/* Main game container */}
            <div className="container mx-auto relative z-10 px-4 py-8">
                {/* Game header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-sky-400 mb-4">The Telescope Challenge</h2>
                    <p className="text-xl text-gray-300">Find the star with a hidden exoplanet!</p>
                </div>

                {/* Game scene */}
                <div className="relative aspect-video bg-slate-800/30 rounded-xl overflow-hidden border border-sky-500/20 backdrop-blur-sm">
                    {/* Telescope */}
                    <motion.div 
                        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={handleTelescopeClick}
                    >
                        <img 
                            src="/planets/compass.png" 
                            alt="Telescope" 
                            className="w-32 h-32 object-contain"
                        />
                    </motion.div>

                    {/* Stars */}
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute cursor-pointer"
                            style={{
                                left: star.position.x,
                                top: star.position.y,
                            }}
                            animate={{
                                opacity: star.hasPlanet && gameState === 'playing' ? [1, 0.5, 1] : 1
                            }}
                            transition={{
                                repeat: star.hasPlanet && gameState === 'playing' ? Infinity : 0,
                                duration: 4
                            }}
                            onClick={() => handleStarClick(star.id)}
                        >
                            <div 
                                className="star-twinkle"
                                style={{
                                    width: star.size,
                                    height: star.size,
                                    backgroundColor: star.color,
                                    borderRadius: '50%',
                                    boxShadow: `0 0 ${star.size}px ${star.size/2}px ${star.color}`
                                }}
                            />
                        </motion.div>
                    ))}

                    {/* Planet transit animation */}
                    {showPlanet && (
                        <motion.div
                            className="absolute"
                            style={{
                                left: stars.find(s => s.hasPlanet).position.x,
                                top: stars.find(s => s.hasPlanet).position.y,
                            }}
                            initial={{ x: '-50px', opacity: 0 }}
                            animate={{ x: '50px', opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <div className="w-6 h-6 bg-slate-800 rounded-full" />
                        </motion.div>
                    )}
                </div>

                {/* Game messages */}
                <AnimatePresence>
                    {gameState === 'intro' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center mt-8"
                        >
                            <p className="text-gray-300 text-xl">
                                Click the telescope to start searching for exoplanets!
                            </p>
                        </motion.div>
                    )}

                    {gameState === 'playing' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center mt-8"
                        >
                            <p className="text-gray-300 text-xl">
                                Watch carefully! Which star's light dims? Click on it to check!
                            </p>
                        </motion.div>
                    )}

                    {gameState === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mt-8"
                        >
                            <h3 className="text-3xl font-bold text-sky-400 mb-4">
                                Amazing! You just found an exoplanet! 🌟
                            </h3>
                            <p className="text-gray-300 text-xl mb-6">
                                That's called the transit method! It's one of the ways we find planets light-years away.
                            </p>
                            {showBadge && (
                                <div className="space-y-4">
                                    <div className="inline-block p-6 bg-slate-800/50 rounded-full border-2 border-sky-500 shadow-lg">
                                        <span className="text-4xl">🔭</span>
                                        <p className="text-sky-400 font-bold mt-2">Star Observer</p>
                                    </div>
                                    <button 
                                        onClick={() => window.location.href = '/levels/3'}
                                        className="block mx-auto mt-8 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl text-xl font-semibold hover:scale-105 transform transition-all duration-200"
                                    >
                                        Next Mission: Build Your Exoplanet 🌈
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TelescopeChallenge;