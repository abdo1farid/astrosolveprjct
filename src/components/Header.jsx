/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import Navbar from "./Navbar";

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = navOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [navOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-slate-950 to-slate-900/0 backdrop-blur-3xl">
            <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
                <h1>
                    <Link 
                        to="/" 
                        className="text-xl font-bold text-sky-300 hover:text-sky-200 transition-colors"
                        onClick={() => setNavOpen(false)}
                    >
                        AstroSolve
                    </Link>
                </h1>

                <div className="relative md:justify-self-center">
                    <Navbar navOpen={navOpen} onNavToggle={setNavOpen} />
                </div>

                {/* <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen((s) => !s)}
                                aria-expanded={userMenuOpen}
                                aria-haspopup="true"
                                title={currentUser.email}
                                className="inline-flex items-center justify-center p-2 bg-slate-900/30 rounded-full hover:bg-slate-900/40 transition-colors text-sky-300"
                            >
                                <span className="material-symbols-rounded text-2xl">account_circle</span>
                            </button>

                            <div className={`absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-md border border-slate-800/20 rounded-xl shadow-xl z-50 transition-all ${userMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                                <div className="p-4">
                                    <div className="text-slate-300 text-sm truncate">{currentUser.displayName || "No Username"}</div>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="w-full text-left px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors"
                                        >
                                            Go To Profile
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="material-symbols-rounded">person</span>
                            <span className="text-sm">Guest</span>
                        </div>
                    )}
                </div> */}
            </div>
        </header>
    );
}

export default Header;