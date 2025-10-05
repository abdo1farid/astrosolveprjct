/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import { useEffect, useRef } from 'react';
import Particles from '../../components/Particles/Particles';

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: 'data_object',
            title: 'NASA Datasets',
            description: 'Access to comprehensive solar and environmental datasets from NASA.'
        },
        {
            icon: 'model_training',
            title: 'AI-Powered Predictions',
            description: 'Advanced machine learning models for accurate solar output forecasting.'
        },
        {
            icon: 'monitoring',
            title: 'Interactive Visualizations',
            description: 'Continuous monitoring and analysis of solar panel performance.'
        },
        {
            icon: 'insights',
            title: 'Data Analytics',
            description: 'Comprehensive data analysis for optimized energy production.'
        }
    ];

    return (
        <section id="about" className="section overflow-hidden">
            <div className="container" ref={containerRef}>
                <div className="relative">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 to-transparent rounded-3xl" />
                    <Particles className="absolute inset-0 opacity-25" moveParticlesOnHover={true} particleHoverFactor={1.0} />
                    <div className="absolute inset-0">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    {/* Content container */}
                    <div className="relative p-8 md:p-12 backdrop-blur-sm rounded-3xl border border-slate-800/20">
                        {/* Section header */}
                        <div className="text-center mb-12">
                            <h2 className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-300 mb-4">
                                <span className="material-symbols-rounded text-sky-400">eco</span>
                                About AstroSolve
                            </h2>
                            <p className="text-slate-300/70 max-w-2xl mx-auto">
                                Building AI models trained on NASA Kepler, K2, and TESS datasets to discover and classify exoplanets, with an interactive web interface for researchers to upload, explore, and refine data-driven discoveries.
                            </p>
                        </div>

                        {/* Main content following AstroSolve */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-6">
                                <p className="text-slate-200/90 leading-relaxed">
                                    Your challenge is to build an AI/ML model trained on NASA s open-source exoplanet datasets—such as those from Kepler, K2, and TESS missions—to analyze data and identify new exoplanets. The project should feature a web interface for user interaction, enabling scientists and researchers to explore, upload, or manually enter data.
                                </p>
                                <p className="text-slate-200/90 leading-relaxed">
                                    Consider how variables like orbital period, transit duration, and planetary radius affect classification as confirmed exoplanet, candidate, or false positive. Experiment with data processing techniques to optimize model accuracy. The interface can allow users to contribute new data, which may be used to update and refine the model, supporting collaborative discovery and research.
                                </p>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-sky-500/10 rounded-2xl -z-10 blur-xl group-hover:blur-2xl transition-all duration-500" />
                                <img 
                                    src="/exoplanets.jpg" 
                                    alt="Solar Panels" 
                                    className="rounded-2xl w-full h-full object-cover border border-slate-800/20 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group relative p-6 rounded-2xl border border-slate-800/20 bg-gradient-to-br from-slate-900/50 to-transparent backdrop-blur-sm hover:from-slate-900/70 transition-colors duration-300"
                                >
                                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="material-symbols-rounded text-3xl text-sky-400 mb-4">{feature.icon}</span>
                                        <h3 className="text-lg font-semibold text-slate-300 mb-2">{feature.title}</h3>
                                        <p className="text-slate-300/70 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
