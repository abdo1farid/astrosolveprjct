import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './DropZone';

const ItemType = {
    PLANET: 'planet',
};

const SolarSystemGate = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [sortedPlanets, setSortedPlanets] = useState([]);
    const [shuffledPlanets, setShuffledPlanets] = useState([]);
    const [sunZoneColor, setSunZoneColor] = useState('bg-gray-700');
    const [exoZoneColor, setExoZoneColor] = useState('bg-gray-700');

    // Shuffle function
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Initialize shuffled planets
    useEffect(() => {
        setShuffledPlanets(shuffleArray(planets));
    }, []);

    // Create audio elements for sound effects
    const correctSound = new Audio('/sfx/good-6081.mp3');
    const wrongSound = new Audio('/sfx/wrong-answer-129254.mp3');

    const planets = [
        { name: 'Mercury', type: 'solar', image: './planets/mercury.png' },
        { name: 'Venus', type: 'solar', image: './planets/venus.png' },
        { name: 'Earth', type: 'solar', image: './planets/earth.png' },
        { name: 'Mars', type: 'solar', image: './planets/mars.png' },
        { name: 'Zyra-1', type: 'exo', image: './planets/zyra-1.png' },
        { name: 'Crystalis', type: 'exo', image: './planets/crystalis.png' },
    ];

    const handleDrop = (item, zone) => {
        console.log('Handling drop:', { item, zone });
        
        // Get the current planet details from the dragged item
        const droppedPlanet = item;
        
        // Check for exoplanets (Zyra-1 or Crystalis)
        if (droppedPlanet.name === 'Zyra-1' || droppedPlanet.name === 'Crystalis') {
            if (zone === 'exo') {
                // Correct drop in exoplanet zone
                correctSound.play();
                setExoZoneColor('bg-green-500');
                setSortedPlanets(prev => [...prev, droppedPlanet.name]);
                // Reshuffle remaining cards
                setShuffledPlanets(prev => shuffleArray(prev.filter(p => p.name !== droppedPlanet.name)));
                setTimeout(() => {
                    setExoZoneColor('bg-gray-700');
                }, 500);
            } else {
                // Wrong drop in sun zone
                wrongSound.play();
                setSunZoneColor('bg-red-500');
                setTimeout(() => setSunZoneColor('bg-gray-700'), 500);
            }
        }
        // Check for solar system planets
        else if (['Earth', 'Mars', 'Mercury', 'Venus'].includes(droppedPlanet.name)) {
            if (zone === 'sun') {
                // Correct drop in sun zone
                correctSound.play();
                setSunZoneColor('bg-green-500');
                setSortedPlanets(prev => [...prev, droppedPlanet.name]);
                // Reshuffle remaining cards
                setShuffledPlanets(prev => shuffleArray(prev.filter(p => p.name !== droppedPlanet.name)));
                setTimeout(() => {
                    setSunZoneColor('bg-gray-700');
                }, 500);
            } else {
                // Wrong drop in exoplanet zone
                wrongSound.play();
                setExoZoneColor('bg-red-500');
                setTimeout(() => setExoZoneColor('bg-gray-700'), 500);
            }
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {/* Welcome Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 max-w-2xl w-full relative transform transition-all animate-scale-in border-4 border-yellow-400 shadow-2xl">
                        {/* Close button */}
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-white hover:text-yellow-400 text-2xl font-bold transition-colors duration-200"
                        >
                            ×
                        </button>

                        <div className="flex flex-col items-center space-y-6">
                            {/* Image */}
                            <div className="w-full max-w-md overflow-hidden rounded-xl border-4 border-blue-400 shadow-lg">
                                <img 
                                    src="/solarsystemkids.png" 
                                    alt="Solar System Adventure" 
                                    className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Story Text */}
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">Welcome Space Explorer! 🚀</h2>
                                <p className="text-white text-lg leading-relaxed">
                                    Get ready for an amazing adventure through our Solar System! Your mission is to help sort the planets into their correct zones.
                                </p>
                                <p className="text-white text-lg leading-relaxed">
                                    Can you tell which planets belong to our Solar System and which ones are mysterious exoplanets from far away? Drag each planet to its correct zone to unlock the next mission!
                                </p>
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl font-bold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 animate-pulse-slow"
                            >
                                Start Your Mission! 🌎
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black flex flex-col items-center justify-center relative overflow-hidden">
                {/* Animated stars background */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-twinkle absolute rounded-full bg-white"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                animationDelay: `${Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
                
                <h1 className="text-5xl font-extrabold text-yellow-400 mb-10 animate-bounce-slow text-center px-4 py-2 rounded-xl bg-blue-900/50 border-2 border-yellow-400 shadow-lg shadow-yellow-400/20">
                    🚀 The Solar System Gate 🌟
                </h1>

                {/* Drop Zones with Images */}
                <div className="flex justify-between items-center w-full px-8 md:px-20 gap-4">
                    <div className={`flex flex-col items-center p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 ${sunZoneColor} border-4 border-orange-400 animate-pulse-slow`}>
                        <DropZone title="Sun Zone" onDrop={handleDrop} image="/public/planets/sun.png" zone="sun" />
                    </div>
                    <div className={`flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 ${exoZoneColor} border-4 border-blue-400 animate-pulse-slow`}>
                        <DropZone title="Exoplanet Zone" onDrop={handleDrop} image="/public/planets/compass.png" zone="exo" />
                    </div>
                </div>

                {/* Planet Cards Stack */}
                <div className="relative h-48 w-48 mt-10">
                    {shuffledPlanets.filter(planet => !sortedPlanets.includes(planet.name)).map((planet, index, array) => (
                        <div
                            key={planet.name}
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                            style={{
                                zIndex: array.length - index,
                                transform: `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 20}deg)`,
                                filter: `brightness(${100 - (array.length - index - 1) * 10}%)`,
                            }}
                        >
                            <PlanetCard planet={planet} />
                        </div>
                    ))}
                </div>

                {/* Navigation Button */}
                {sortedPlanets.length === planets.length && (
                    <button
                        onClick={() => navigate('/next-mission')}
                        className="mt-10 px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transform transition-all duration-300 border-4 border-white animate-bounce-slow"
                    >
                        🚀 Next Mission: The Telescope Challenge 🔭
                    </button>
                )}
            </div>
        </DndProvider>
    );
};

// Ensure PlanetCard uses the drag-and-drop API
function PlanetCard({ planet }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.PLANET,
        item: { ...planet },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`w-32 h-32 bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex flex-col items-center justify-center rounded-xl shadow-xl cursor-grab active:cursor-grabbing transform hover:scale-110 hover:rotate-0 transition-all duration-300 border-2 border-indigo-400 ${isDragging ? 'opacity-50 scale-105 rotate-0' : ''} hover:z-50`}
        >
            <div className="relative w-20 h-20 animate-spin-slow">
                <img src={planet.image} alt={planet.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-2 text-lg font-bold text-yellow-300 text-center">{planet.name}</p>
        </div>
    );
}

export default SolarSystemGate;