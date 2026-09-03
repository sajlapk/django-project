// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDXSmtUkkMncYIUgbAR58CHtxbRpfSyJJM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "discipl-3edfb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "discipl-3edfb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "discipl-3edfb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "310319463382",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:310319463382:web:217daa1e918fb982934277",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-NQLY3GWM71",
};

if (!firebaseConfig.apiKey) {
  console.error(
    "Firebase Error: VITE_FIREBASE_API_KEY is missing or undefined. " +
    "Please create a .env or .env.local file in the root directory with your Firebase configuration parameters."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== "undefined" && firebaseConfig.measurementId ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, auth, analytics, db };