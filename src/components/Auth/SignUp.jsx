/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "", // Added username field
        agreement: false // Added agreement field
    });

    // Add role selection to form data
    const roles = [
        'Scientist',
        'High School Student',
        'University Student',
        'Child',
        'General Public',
        'Other'
    ];

    // initialize with empty role
    if (!formData.role) formData.role = '';

    const passwordStrength = useMemo(() => {
        const password = formData.password;
        if (!password) return { score: 0, message: "" };

        const checks = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        const score = Object.values(checks).filter(Boolean).length;
        
        const messages = {
            0: { text: "Very Weak", color: "red-500" },
            1: { text: "Weak", color: "red-400" },
            2: { text: "Fair", color: "yellow-500" },
            3: { text: "Good", color: "green-400" },
            4: { text: "Strong", color: "green-500" },
            5: { text: "Very Strong", color: "green-600" }
        };

        return {
            score,
            checks,
            ...messages[score]
        };
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(""); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (!formData.username) {
            return setError("Username is required");
        }

        if (passwordStrength.score < 3) {
            return setError("Please choose a stronger password");
        }

        if (!formData.role) {
            return setError('Please select why you are creating an account');
        }

        if (!formData.agreement) {
            return setError('You must agree to the terms to create an account');
        }

        try {
            setError("");
            setLoading(true);
            const result = await signup(formData.email, formData.password, formData.role, formData.username); // Pass username to signup
            if (result && result.success) {
                navigate("/");
            } else {
                setError(result?.error || 'Failed to create account');
            }
        } catch (err) {
            setError("Failed to create an account. Please try again.");
        } finally {
            setLoading(false);
        }
    };    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden perspective-1000">
            {/* Floating particles */}
            <div className="absolute inset-0 w-full h-full">
                {[...Array(20)].map((_, i) => (
                    <div key={i} 
                         className="absolute w-2 h-2 bg-sky-400/30 rounded-full animate-float-slow transform-gpu"
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
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-sky-500/30 to-slate-500/30 rounded-full mix-blend-overlay filter blur-[64px] animate-morph transform-gpu"></div>
                <div className="absolute bottom-0 -right-4 w-96 h-96 bg-gradient-to-br from-slate-300/30 to-sky-400/30 rounded-full mix-blend-overlay filter blur-[64px] animate-morph-delayed transform-gpu"></div>
            </div>

            <div className="relative p-8 rounded-2xl w-full max-w-5xl transform-gpu hover:translate-z-8 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-sky-600/10 rounded-2xl transform-gpu rotate-180 blur-[2px] group-hover:blur-[4px] transition-all duration-500"></div>
                
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-slate-700/50">
                    <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 bg-clip-text text-transparent mb-2 animate-gradient-x">
                        Create Account
                    </h2>
                    
                    {error && (
                        <div className="bg-red-500/10 text-red-200 p-4 rounded-xl mb-6 backdrop-blur-sm border border-red-500/20 animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                        {/* Username Field */}
                        <div className="col-span-1 md:col-span-2 group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2 transition-colors group-focus-within:text-sky-300">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 
                                placeholder-slate-500/50 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50
                                hover:bg-slate-800/40"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 
                                placeholder-slate-500/50 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50
                                hover:bg-slate-800/40"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 transition-colors group-focus-within:text-sky-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 
                                placeholder-slate-500/50 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50
                                hover:bg-slate-800/40"
                                placeholder="Enter your email"
                            />
                        </div>


                        {/* Confirm Password Field */}
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2 transition-colors group-focus-within:text-sky-300">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 
                                placeholder-slate-500/50 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50
                                hover:bg-slate-800/40"
                                placeholder="Confirm your password"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
                                Why are you creating an account?
                            </label>
                            <div className="relative">
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 pr-10"
                                >
                                    <option value="" disabled>Choose one...</option>
                                    {roles.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>

                                {/* Custom arrow */}
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sky-300">
                                    <span className="material-symbols-rounded text-[18px]">expand_more</span>
                                </span>
                            </div>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="group/input transform-gpu transition-all duration-300 hover:translate-z-4">
                            <label className="flex items-center text-sm font-medium text-slate-300">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    name="agreement"
                                    checked={formData.agreement || false}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        agreement: e.target.checked
                                    }))}
                                    required
                                    className="mr-2 w-4 h-4 text-sky-400 bg-slate-800 border-slate-700 rounded focus:ring-sky-500 focus:ring-2"
                                />
                                I agree to create an account and allow uploading and downloading files.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 text-white 
                            py-3 px-4 rounded-xl font-medium overflow-hidden
                            transform-gpu transition-all duration-300
                            hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]
                            active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                            before:via-white/20 before:to-transparent before:translate-x-[-200%] 
                            hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-200/80">
                            Already have an account?{" "}
                            <Link to="/login" className="text-sky-400 hover:text-sky-300 transition-colors duration-200 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;