// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVsc5FI4H3rxz86rgeQoDNFX0sxpA-o9U",
  authDomain: "prepup-5750e.firebaseapp.com",
  projectId: "prepup-5750e",
  storageBucket: "prepup-5750e.firebasestorage.app",
  messagingSenderId: "846720731200",
  appId: "1:846720731200:web:05115f6ed62061af34f7a5",
  measurementId: "G-XW8RNQRVMX"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)