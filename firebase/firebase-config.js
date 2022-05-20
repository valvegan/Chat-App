// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const myFirebaseConfig = {
    apiKey: "AIzaSyD3ijyHpQJigfK7yiqU9826oYzpzSVS0l0",
    authDomain: "chat-app-5946a.firebaseapp.com",
    projectId: "chat-app-5946a",
    storageBucket: "chat-app-5946a.appspot.com",
    messagingSenderId: "1019093805895",
    appId: "1:1019093805895:web:16ef963dddfea4b030fa62",
    measurementId: "G-GLH8R7BVW9"
};

export const app = initializeApp(myFirebaseConfig)
//firestone reference
export const db = getFirestore(app)

// Get a reference to the Firebase auth object
export const auth = getAuth();

