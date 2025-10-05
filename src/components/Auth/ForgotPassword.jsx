import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            setError("");
            setLoading(true);
            await resetPassword(email);
            setIsTransitioning(true);
            // Smooth transition to success state
            setTimeout(() => {
                setShowSuccess(true);
                setIsTransitioning(false);
            }, 300);
        } catch (err) {
            setError(
                err.code === 'auth/user-not-found' ? "No account found with this email" :
                err.code === 'auth/invalid-email' ? "Invalid email address" :
                "Failed to send reset email. Please try again."
            );
            setIsTransitioning(false);
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="max-w-md w-full p-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-sky-500/10 blur-3xl animate-pulse"></div>
                    <div className="relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/20 shadow-xl">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-sky-400 animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-sky-400">Check Your Email</h2>
                            <p className="text-center text-slate-200/80">
                                We've sent password reset instructions to:
                                <span className="block font-medium text-sky-400 mt-2">{email}</span>
                            </p>
                            <Link 
                                to="/login"
                                className="px-6 py-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 
                                hover:bg-sky-500/20 transition-all duration-300"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 
        via-slate-900 to-slate-950 transition-opacity duration-300 
        ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1/2 h-1/2 bg-sky-500/10 rounded-full blur-3xl -top-1/4 -right-1/4 animate-blob"></div>
                <div className="absolute w-1/2 h-1/2 bg-sky-500/10 rounded-full blur-3xl -bottom-1/4 -left-1/4 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-md w-full p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-sky-500/10 rounded-3xl blur-xl"></div>
                <div className={`relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl 
                border border-slate-800/50 shadow-xl transition-all duration-300
                ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                    <h2 className="text-3xl font-bold text-center mb-2">
                        <span className="bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
                            Forgot Password?
                        </span>
                    </h2>
                    <p className="text-slate-300/60 text-center mb-8">
                        Enter your email to receive reset instructions
                    </p>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 
                                text-slate-100 placeholder:text-slate-500/50
                                focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent
                                transition-all duration-300"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400
                            text-white font-medium shadow-lg shadow-sky-500/12
                            hover:shadow-sky-500/20 transform hover:-translate-y-0.5
                            transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                "Send Reset Instructions"
                            )}
                        </button>

                        <div className="text-center">
                            <Link to="/login" className="text-sky-400 hover:text-sky-300 text-sm transition-colors duration-300">
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
