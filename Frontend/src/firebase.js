// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-job-tracker.firebaseapp.com",
    projectId: "mern-job-tracker",
    storageBucket: "mern-job-tracker.appspot.com",
    messagingSenderId: "954981350725",
    appId: "1:954981350725:web:b9a64a8b65349cc168122c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;