/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [identifier, setIdentifier] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(identifier, formData.password);
            navigate('/'); // Redirect to home page after successful login
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden perspective-1000">
            {/* Floating particles */}
            <div className="absolute inset-0 w-full h-full">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 bg-sky-400/30 rounded-full animate-float-slow transform-gpu`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            filter: 'blur(1px)'
                        }}
                    ></div>
                ))}
            </div>

            {/* 3D Background elements */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-sky-500/30 to-slate-500/30 rounded-full mix-blend-overlay filter blur-[64px] animate-morph transform-gpu" />
                <div className="absolute bottom-0 -right-4 w-96 h-96 bg-gradient-to-br from-slate-300/30 to-sky-400/30 rounded-full mix-blend-overlay filter blur-[64px] animate-morph-delayed transform-gpu" />
            </div>

            {/* Card container */}
            <div className="relative p-8 rounded-2xl w-full max-w-md transform-gpu hover:translate-z-8 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-sky-600/10 rounded-2xl transform-gpu rotate-180 blur-[2px] group-hover:blur-[4px] transition-all duration-500"></div>

                <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-slate-700/50 group transform-gpu hover:scale-[1.02] transition-all duration-500">
                    <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 bg-clip-text text-transparent mb-2 animate-gradient-x">
                        Welcome Back
                    </h2>
                    <p className="text-lg text-center text-slate-300/80 mb-8">Login to your account</p>

                    {error && (
                        <div className="bg-red-500/10 text-red-200 p-4 rounded-xl mb-6 backdrop-blur-sm border border-red-500/20 animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="identifier" className="block text-sm font-medium text-slate-300 mb-2 transition-colors group-focus-within:text-sky-300">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 placeholder-slate-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 hover:bg-slate-800/40"
                                placeholder="Enter your email or username"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2 transition-colors group-focus-within:text-sky-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 placeholder-slate-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 hover:bg-slate-800/40"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 text-white py-3 px-4 rounded-xl font-medium overflow-hidden transform-gpu transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(56,189,248,0.18)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-3">
                        <p className="text-slate-200/80">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-sky-400 hover:text-sky-300 transition-colors duration-200 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                        <p className="text-slate-200/80">
                            <Link to="/forgot-password" className="text-sky-400 hover:text-sky-300 transition-colors duration-200 hover:underline">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
