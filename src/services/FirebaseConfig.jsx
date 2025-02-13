// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAM5r__fiWTP_pEx-Ew-QO9dWosQbdTiA",
    authDomain: "aitripbot-f2614.firebaseapp.com",
    projectId: "aitripbot-f2614",
    storageBucket: "aitripbot-f2614.firebasestorage.app",
    messagingSenderId: "537248425979",
    appId: "1:537248425979:web:b3f00b1b3c5aecd4b70d5e",
    measurementId: "G-CTJ8QE5FE6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
