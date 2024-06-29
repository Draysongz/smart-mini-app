// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqUckuIQvu2e2vdYUNBfdZVT6vkmWBJJU",
  authDomain: "panda-6ebac.firebaseapp.com",
  projectId: "panda-6ebac",
  storageBucket: "panda-6ebac.appspot.com",
  messagingSenderId: "246165789858",
  appId: "1:246165789858:web:c477f5610c2615aa254bfb",
  measurementId: "G-V7KHS3H96K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)


export {
    app,
    db,
    auth
}