// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, TwitterAuthProvider, getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const TwitterProvider = new TwitterAuthProvider()
