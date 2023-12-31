// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_TESLA_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_TESLA_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_TESLA_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_TESLA_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_TESLA_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_TESLA_APP_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };
