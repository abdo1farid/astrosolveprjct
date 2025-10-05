import { useState } from 'react';
import Modal from './Modal';

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const features = [
        {
            id: 1,
            title: "NASA Dataset Integration",
            description: "Seamlessly ingest publicly available Kepler, K2, and TESS catalogs for training and analysis.",
            fullDescription: "Import and harmonize exoplanet catalogs from NASA missions (Kepler, K2, TESS). Our ingestion pipeline standardizes features like orbital period, transit duration, and planet radius, and prepares datasets for training and exploration.",
            icon: "public"
        },
        {
            id: 2,
            title: "Exoplanet Classification",
            description: "Machine learning models that classify observations as confirmed, candidate, or false positive.",
            fullDescription: "Train and evaluate classification models (Random Forest, XGBoost, or TF models) that weigh features such as transit depth, duration, and stellar parameters to predict whether a signal is a true exoplanet, a candidate, or a false positive.",
            icon: "science"
        },
        {
            id: 3,
            title: "Interactive Analysis",
            description: "Visualize light curves, model explanations, and prediction confidence with interactive tools.",
            fullDescription: "Explore light curve plots, feature importance, and per-sample prediction scores. Upload new observations or tweak preprocessing settings and immediately see how predictions and model explanations change.",
            icon: "insights"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden" id="features">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                            Key Features
                        </span>
                    </h2>
                <p className="text-slate-300/70 max-w-2xl mx-auto">
                        Discover how our advanced features can help you maximize your solar energy production
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div 
                            key={feature.id}
                                className="group bg-slate-900/30 backdrop-blur-sm border border-slate-800/20 rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-rounded text-2xl text-white">
                                        {feature.icon}
                                    </span>
                                </div>
                                    <h3 className="text-xl font-semibold text-slate-300 mb-3">
                                    {feature.title}
                                </h3>
                                    <p className="text-slate-300/70 mb-6">
                                    {feature.description}
                                </p>
                                <button
                                    onClick={() => setSelectedFeature(feature)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 rounded-xl transition-all duration-300"
                                >
                                    <span>Learn More</span>
                                    <span className="material-symbols-rounded text-xl">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedFeature}
                onClose={() => setSelectedFeature(null)}
                title={selectedFeature?.title}
                size="default"
            >
                {selectedFeature && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center">
                                <span className="material-symbols-rounded text-2xl text-white">
                                    {selectedFeature.icon}
                                </span>
                            </div>
                        </div>
                            <p className="text-slate-200/90 leading-relaxed">
                            {selectedFeature.fullDescription}
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedFeature(null)}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-xl transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Features;
