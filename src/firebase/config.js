// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3QaJ89SQ2gudDJrP8PGSWVQ-O68yfsfo",
  authDomain: "astrosolve-1803d.firebaseapp.com",
  projectId: "astrosolve-1803d",
  storageBucket: "astrosolve-1803d.firebasestorage.app",
  messagingSenderId: "1044790680293",
  appId: "1:1044790680293:web:addb70b586f862d22b120c",
  measurementId: "G-RR6EV8CLL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth so other modules can import it
export const auth = getAuth(app);
export default app;