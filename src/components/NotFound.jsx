import React from 'react';
import { Link } from 'react-router-dom';
import Particles from "../../components/Particles/Particles";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
            {/* Particles Background */}
            <Particles className="absolute inset-0 w-full h-full z-10" moveParticlesOnHover={true} />
            {/* UFO Image */}
            <img
                src="/img/ufo.png"
                alt="UFO"
                className="absolute top-10 left-10 w-32 animate-float"
            />

            {/* Planet 1 Image */}
            <img
                src="/img/planet-1.png"
                alt="Planet 1"
                className="absolute top-56 right-96 w-48 animate-spin-slow motion-safe:animate-pulse"
            />

            {/* Planet 2 Image */}
            <img
                src="/img/planet-2.png"
                alt="Planet 2"
                className="absolute bottom-14 left-96 w-96 animate-spin-slow motion-safe:animate-pulse"
            />

            {/* Astronaut Image */}
            <img
                src="/img/astronaut.png"
                alt="Astronaut"
                className="absolute bottom-10 right-28 w-96 animate-float motion-safe:animate-swing"
            />

            <h1 className="text-8xl font-extrabold mt-12 text-sky-400">404</h1>
            <p className="text-2xl mt-4 text-slate-300">We can't find the page you're looking for.</p>

            <Link
                to="/"
                className="mt-8 px-8 py-4 bg-sky-500 text-white text-lg rounded-full shadow-lg hover:bg-sky-400 transition-all"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;