import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLnGj14z6Sd4eC6rE8Qw8dtlwyWjMe0tY",
  authDomain: "planar-abode-0szp9.firebaseapp.com",
  projectId: "planar-abode-0szp9",
  storageBucket: "planar-abode-0szp9.firebasestorage.app",
  messagingSenderId: "683443942804",
  appId: "1:683443942804:web:8904ad5703bfb34cbacb81",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
