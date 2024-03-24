// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE58Xrh5OTg5otiAE3g6aMxvQmaRTT5WU",
  authDomain: "gatetestseries-ee964.firebaseapp.com",
  projectId: "gatetestseries-ee964",
  storageBucket: "gatetestseries-ee964.appspot.com",
  messagingSenderId: "833501024272",
  appId: "1:833501024272:web:31c906651c5671fd7e3a95",
  measurementId: "G-77S051D81W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
