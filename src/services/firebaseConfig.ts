import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCYiFAM5w6096HHaRtvWKjUIzM50C4u1kk",
  authDomain: "remarkform-3d065.firebaseapp.com",
  databaseURL: "https://remarkform-3d065-default-rtdb.firebaseio.com",
  projectId: "remarkform-3d065",
  storageBucket: "remarkform-3d065.firebasestorage.app",
  messagingSenderId: "782468369081",
  appId: "1:782468369081:web:cc5f3ce8d5895f93186968",
  measurementId: "G-PNSLZ1SRP8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
