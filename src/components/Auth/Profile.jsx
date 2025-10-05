import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getDatabase, ref, update, get } from 'firebase/database';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
    const { currentUser } = useAuth();
    const user = currentUser;
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const [specialist, setSpecialist] = useState("");

    console.log("Current user:", user);

    useEffect(() => {
        if (user && user.email) {
            const encodedEmail = user.email.replace(/\./g, ","); // Replace '.' with ','
            const userPath = `users/${encodedEmail}/reason`;
            console.log("Querying Firebase path for reason:", userPath); // Debugging log
            const db = getDatabase();
            const userRef = ref(db, userPath);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const reason = snapshot.val();
                    console.log("Fetched reason from Firebase:", reason); // Debugging log
                    setSpecialist(reason || "No Specialist");
                } else {
                    console.log("No reason data found for the user in Firebase."); // Debugging log
                }
            }).catch((error) => {
                console.error("Error fetching reason:", error);
            });
        }
    }, [user]);

    const handleUsernameChange = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setMessage("Username cannot be empty.");
            return;
        }

        console.log("Username change initiated with:", username);
        console.log("Current user before update:", user);

        try {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.email.replace(".", ",")}`);

            // Ensure the username is updated in the Firebase Realtime Database
            await update(userRef, { username });

            // Update the displayName in Firebase Authentication
            await updateProfile(user, { displayName: username });

            // Update the currentUser in AuthContext
            user.displayName = username;

            setMessage("Username updated successfully.");
            setEditing(false);
        } catch (error) {
            console.error("Error updating username:", error);
            setMessage("Failed to update username. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-800/20 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500/20 to-slate-500/5 backdrop-blur-sm border border-sky-500/10 mb-4">
                            <span className="material-symbols-rounded text-4xl text-sky-400">account_circle</span>
                        </div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-300">
                            Profile
                        </h2>
                    </div>

                    {/* Profile Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/20">
                            <p className="text-slate-300/70 text-sm mb-1">Email</p>
                            <p className="text-sky-400 font-medium">{user?.email}</p>
                        </div>

                        <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/20">
                            <p className="text-slate-300/70 text-sm mb-1">Role</p>
                            <p className="text-sky-400 font-medium">{specialist}</p>
                        </div>

                        <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/20 flex items-center justify-between">
                            <div>
                                <p className="text-slate-300/70 text-sm mb-1">Username</p>
                                <p className="text-sky-400 font-medium">{user?.displayName?.split(" (")[0] || "No Username"}</p>
                            </div>
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                                >
                                    Change Username
                                </button>
                            ) : (
                                <form onSubmit={handleUsernameChange} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter new username"
                                        className="px-4 py-2 border border-slate-800 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Link
                                to="/"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl text-white font-medium shadow-lg shadow-sky-500/12 hover:shadow-sky-500/20 hover:scale-[1.02] transition-all duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
