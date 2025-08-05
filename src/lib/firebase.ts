// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "apiKey": "AIzaSyDNKm_-a-CsBOgezDytK95takKapk850i8",
  "authDomain": "trendai-153rz.firebaseapp.com",
  "projectId": "trendai-153rz",
  "storageBucket": "trendai-153rz.firebasestorage.app",
  "messagingSenderId": "107288427614",
  "appId": "1:107288427614:web:a88147991aee598f0ac8cf",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
