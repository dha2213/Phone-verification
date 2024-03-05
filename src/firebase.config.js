 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn9pQBMpSZOEsem0vXsfFJew0RP38jnVI",
  authDomain: "phone-varification-808f0.firebaseapp.com",
  projectId: "phone-varification-808f0",
  storageBucket: "phone-varification-808f0.appspot.com",
  messagingSenderId: "252468219006",
  appId: "1:252468219006:web:cf59ceb0de9c8584569c2f",
  measurementId: "G-2NY59K1C48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);