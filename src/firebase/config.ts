// === STEP 1: firebase/config.ts ===
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD45vxZuwuEES-AOuQ1TutfS_jTeKtCg3E",
  authDomain: "next-expense-tracker-21b90.firebaseapp.com",
  projectId: "next-expense-tracker-21b90",
  storageBucket: "next-expense-tracker-21b90.firebasestorage.app",
  messagingSenderId: "471032561782",
  appId: "1:471032561782:web:a34de437858beaab03df57"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
