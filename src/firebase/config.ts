import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQKnUcvQts8is4fi3P0SzfBq3x3TP-QBI",
  authDomain: "tests-et-formulaires.firebaseapp.com",
  projectId: "tests-et-formulaires",
  storageBucket: "tests-et-formulaires.firebasestorage.app",
  messagingSenderId: "642338536067",
  appId: "1:642338536067:web:19ebce02dfba9cde9cf9b6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
