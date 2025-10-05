import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, get } from "firebase/database";
import Header from './Header';

const UploadPage = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Model1");
    const [loading, setLoading] = useState(true); // Start with loading true
    const [predictions, setPredictions] = useState(null);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [role, setRole] = useState("");

    // Check user role on component mount
    useEffect(() => {
        const checkUserRole = async () => {
            if (!currentUser) {
                navigate('/login');
                return;
            }

            try {
                const db = getDatabase();
                const userRef = ref(db, `users/${currentUser.email.replace(".", ",")}`);
                const snapshot = await get(userRef);
                
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setRole(data.reason || "");
                    
                    // If not a scientist, redirect to home
                    if (data.reason !== "Scientist") {
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error checking user role:", error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        checkUserRole();
    }, [currentUser, navigate]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setLoading(true);
        setError(null);
        setPredictions(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setPredictions(data.prediction);
                
                // If server provided CSV content, use it for download
                if (data.csv_content) {
                    // Create and trigger download
                    const blob = new Blob([data.csv_content], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.name.replace('.csv', '_predictions.csv');
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }
            } else {
                setError(data.error || 'Failed to get predictions');
            }
        } catch (err) {
            setError('Error connecting to the server: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

        const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    const handleDownloadCSV = () => {
        // Create CSV content
        const headers = ['Row', 'Prediction'];
        const rows = predictions.map((pred, index) => [
            index + 1,
            pred
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'predictions.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex flex-col items-center">
            <Header />
            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
                </div>
            ) : role === "Scientist" ? (
                <div className="mt-40 text-center max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold text-sky-400">
                            {selectedModel === "Model2" ? "Upload your .fits file to Model2" : "Upload your CSV file to the Model1"}
                        </h1>
                        <select
                            value={selectedModel}
                            onChange={handleModelChange}
                            className="ml-4 px-4 py-2 bg-slate-800 text-sky-400 border border-sky-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="Model1">Model1</option>
                        </select>
                    </div>

                    <div className="mt-6 bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-lg">
                        <p className="text-lg font-medium">
                            <p className="text-lg font-medium">It must be a CSV file.</p>
                            <p className="text-lg font-medium">It must have 21 columns.</p>
                        </p>
                    </div>

                    {!predictions && (
                <>
                    <div className="flex-grow flex items-center justify-center">
                        <div className="w-96 h-48 border-4 mt-28 border-dashed border-sky-500 rounded-lg flex flex-col items-center justify-center bg-slate-800/50 shadow-lg">
                            <input
                                type="file"
                                accept={selectedModel === "Model2" ? ".fits" : ".csv"}
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                <span className="material-symbols-rounded text-6xl text-sky-400">upload</span>
                                <p className="text-sky-400 mt-2 text-lg font-medium">
                                    {selectedModel === "Model2" ? "Click to upload .fits" : "Click to upload CSV"}
                                </p>
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className={`mb-8 px-8 py-3 bg-gradient-to-r mt-28 from-sky-500 to-sky-600 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Upload'}
                    </button>
                </>
            )}

            {error && (
                <div className="mb-8 p-4 bg-red-500/20 border border-red-500 text-red-500 rounded-lg">
                    {error}
                </div>
            )}

            {predictions && (
                <div className="mt-8 mb-24 w-full max-w-4xl px-4">
                    <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border-2 border-sky-500">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <div className="text-center sm:text-left">
                                <h3 className="text-3xl font-bold text-sky-400 mb-2">Prediction Results</h3>
                                <p className="text-gray-400">Found {predictions.length} predictions from your data</p>
                            </div>
                            <button
                                onClick={handleDownloadCSV}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center gap-2 hover:scale-105 transform transition-all duration-200 shadow-lg"
                            >
                                <span className="material-symbols-rounded">download</span>
                                Download Results
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto rounded-xl border border-sky-500/20">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-sky-500/10">
                                        <th className="py-4 px-6 text-sky-400 font-bold">Row</th>
                                        <th className="py-4 px-6 text-sky-400 font-bold">Prediction</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-500/10">
                                    {predictions
                                        .slice(0, showAll ? predictions.length : 10)
                                        .map((prediction, index) => (
                                            <tr key={index} className="hover:bg-sky-500/5 transition-colors">
                                                <td className="py-4 px-6 text-white font-medium">#{index + 1}</td>
                                                <td className="py-4 px-6">
                                                    <span className="text-gray-300 font-mono bg-slate-800/50 px-3 py-1 rounded">
                                                        {prediction}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {predictions.length > 10 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 rounded-lg transition-colors inline-flex items-center gap-2"
                                    >
                                        {showAll ? (
                                            <>
                                                <span className="material-symbols-rounded text-lg">expand_less</span>
                                                Show Less
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-rounded text-lg">expand_more</span>
                                                Show More ({predictions.length - 10} more rows)
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-red-500 text-xl">Access Denied - Scientists Only</div>
                </div>
            )}
        </div>
    );
};

export default UploadPage;