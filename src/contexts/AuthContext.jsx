import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // `initializing` tracks the initial auth state (onAuthStateChanged).
  // `actionLoading` tracks individual auth operations like signup/login so they
  // don't hide the whole app while running.
  const [initializing, setInitializing] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Accept optional role (string) and store it in the user's displayName.
  // Note: for structured metadata consider saving user profiles in Firestore.
  async function signup(email, password, role = '', username = '') {
    try {
      setError('');
      setActionLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // If a role or username was provided, attach it to the user's profile via displayName
      if ((role || username) && userCredential.user) {
        try {
          const displayName = username ? `${username} (${role})` : role;
          await updateProfile(userCredential.user, { displayName });
        } catch (profileErr) {
          // Non-fatal: profile update failed, but user is created. Log and continue.
          console.error('Failed to update user profile with role/username:', profileErr);
        }
      }

      // Add user to Firebase Realtime Database with the selected role and username
      const db = getDatabase();
      const encodedEmail = email.replace(/\./g, ","); // Replace '.' with ','
      const userRef = ref(db, `users/${encodedEmail}`); // Use encoded email as the path
      await set(userRef, { reason: role, username });

      return { success: true, user: userCredential.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  }

  async function login(identifier, password) {
    try {
      setError('');
      setActionLoading(true);
      
      if (identifier.includes('@')) {
        // Treat as email
        return await signInWithEmailAndPassword(auth, identifier, password);
      } else {
        // Treat as username
        const db = getDatabase();
        const userRef = ref(db, 'users');
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const users = snapshot.val();
          console.log('Fetched users:', users); // Debugging log

          const userEntry = Object.entries(users).find(([key, value]) => value.username === identifier);
          
          if (userEntry) {
            const email = userEntry[0].replace(',', '.');
            console.log('Resolved email for username:', email); // Debugging log

            // Attempt to log in with the resolved email and provided password
            return await signInWithEmailAndPassword(auth, email, password);
          } else {
            throw new Error('Username not found');
          }
        } else {
          throw new Error('No users found in the database');
        }
      }
    } catch (err) {
      console.error('Login error:', err.message); // Debugging log
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function logout() {
    try {
      setError('');
      setActionLoading(true);
      return await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function resetPassword(email) {
    try {
      setError('');
      setActionLoading(true);
      return await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    error,
    loading: actionLoading,
    initializing
  };

  // Always render children so components that call `useAuth()` don't get
  // an undefined context while the initial auth state is being determined.
  // Consumers can check `initializing` if they need to wait for auth to settle.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}