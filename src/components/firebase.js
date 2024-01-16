// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr0qpO4Aayi68on0SrGp4Kxfeo-Zpqboo",
  authDomain: "netflixgpt-b6b91.firebaseapp.com",
  projectId: "netflixgpt-b6b91",
  storageBucket: "netflixgpt-b6b91.appspot.com",
  messagingSenderId: "127939479817",
  appId: "1:127939479817:web:4e0c1fe54bc9133305abd8",
  measurementId: "G-QZBT632E4Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
