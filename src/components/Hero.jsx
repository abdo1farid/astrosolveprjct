/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import { ButtonOutline, ButtonPrimary } from "./Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Particles from '../../components/Particles/Particles'
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, get } from "firebase/database";

const Hero = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [offsetY, setOffsetY] = useState(0)
    const [role, setRole] = useState("");
    
    const handleScroll = () => setOffsetY(window.pageYOffset)
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const userRef = ref(db, `users/${currentUser.email.replace(".", ",")}`);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setRole(data.reason || "");
                }
            }).catch((error) => {
                console.error("Error fetching role:", error);
            });
        }
    }, [currentUser]);

    const isScientist = role === "Scientist";
    const isChild = role === "Child";

    console.log("Current user:", currentUser);
    console.log("Display name:", currentUser?.displayName);
    console.log("Is Scientist:", isScientist);
    console.log("Is Child:", isChild);

    return (
        <section id="home" className="pt-28 lg:pt-36 relative min-h-screen overflow-hidden flex items-center justify-center">
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-morph"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-morph delay-1000"></div>
            </div>
            
            {/* Background image and overlay */}
            <div 
                className="absolute inset-0 z-0" 
                style={{
                    backgroundImage: "url('/AstroSolve.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${offsetY * 0.5}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-950/60 backdrop-blur-0"></div>
                {/* Particles canvas sits above the image but behind content; enable hover interaction */}
                <Particles className="absolute inset-0 opacity-70" moveParticlesOnHover={true} particleHoverFactor={1.2} />
                {/* Animated grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>
            </div>

            {/* Content */}            
            <div className="container relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex items-center gap-3 justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
                            <div className="relative flex items-center gap-1.5 text-sky-300 text-sm tracking-wide bg-slate-900/50 px-4 py-2 rounded-full border border-sky-500/10 backdrop-blur-3xl">
                                <span className="relative w-2 h-2">
                                                <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping"></span>
                                                <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping"></span>
                                                <span className="relative block w-2 h-2 rounded-full bg-sky-400"></span>
                                </span>
                                AstroSolve
                            </div>
                        </div>
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-bold mx-auto mt-5 mb-8 lg:mb-10">
                        <span className="inline-block animate-fade-in [animation-delay:200ms]">Discover new worlds with</span>{' '}
                        <span className="inline-block animate-fade-in [animation-delay:800ms] bg-gradient-to-r from-sky-400 to-sky-300 text-transparent bg-clip-text">AI</span>
                    </h2>

                    <div className="flex items-center gap-4 justify-center animate-fade-in [animation-delay:1000ms]">
                        {currentUser ? (
                            isScientist ? (
                                <button
                                    onClick={() => navigate('/upload')}
                                    className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl text-white font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
                                >
                                    <span className="relative z-10">Upload CSV</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                                </button>
                            ) : isChild ? (
                                <button
                                    onClick={() => navigate('/levels')}
                                    className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl text-white font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
                                >
                                    <span className="relative z-10">Go To MiniGame</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                                </button>
                            ) : null
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl text-white font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10">Login</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                            </button>
                        )}

                        <a
                            href="#about"
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-transparent rounded-xl text-sky-300 font-medium border border-sky-500/30 hover:border-sky-500/50 hover:scale-105 transition-all duration-300"
                        >
                            <span>About Us</span>
                            <span className="material-symbols-rounded text-xl flex items-center justify-center w-6 h-6 group-hover:translate-y-1 transition-transform">arrow_downward</span>
                            <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
