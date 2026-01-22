import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogsite-6d24a.firebaseapp.com",
  projectId: "blogsite-6d24a",
  storageBucket: "blogsite-6d24a.firebasestorage.app",
  messagingSenderId: "197554032760",
  appId: "1:197554032760:web:fcdac922c19a7509fb1d8d",
  measurementId: "G-3NMC3BDMJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app