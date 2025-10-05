/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

const Solutions = () => {
    // Team members - use local/public placeholder image when specific avatars are not available
    const teams = [
        { name: "Abderrahmane Farid", title: "Software & Hardware", avatar: "/profile/abderrahmane-farid.jpeg" },
        { name: "Abderrahmane CHAHEDI ", title: "Software", avatar: "/profile/abderrahmane-chahdi.jpg" },
        { name: "Adam AACHRINE", title: "Software", avatar: "/profile/adam-aachrine.jpeg" },
        { name: "Souhayb AMAMRAN", title: "3D/Architecture", avatar: "/profile/souhayb-amamran.jpeg" },
        { name: "Marwa FARHAT", title: "Hardware", avatar: "/profile/marwa-farhat.jpeg" },
        { name: "Abderrahman EL GHAZOUI", title: "Hardware", avatar: "/profile/abderrahman-el-ghazoui.jpeg" },
    ];

    return (
        <section id="team" className="py-24 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950"></div>

            <div className="container relative">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                            Our Team
                        </span>
                    </h2>
                    <p className="text-slate-300/80">
                        Meet the people behind the project — engineers, designers and makers.
                    </p>
                </div>

                {/* Teams flex-wrap centered */}
                <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-6xl">
                    {teams.map(({ avatar, name, title }) => (
                        <div
                            key={name}
                            className="w-full sm:w-1/2 lg:w-1/4 p-2"
                        >
                            <div className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/30 to-slate-900/20 backdrop-blur-sm border border-slate-800/20 hover:border-sky-500/30 transition-all duration-300 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 flex items-center justify-center bg-slate-800">
                                    <img
                                        src={avatar}
                                        alt={`${name} avatar`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/AstroSolve.png'; }}
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-sky-300 mb-1">
                                    {name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Solutions;