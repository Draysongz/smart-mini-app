// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANMX7wwwinUSzuJP6Jzqzs4GkQqMMRDyQ",
  authDomain: "smart-e3c01.firebaseapp.com",
  projectId: "smart-e3c01",
  storageBucket: "smart-e3c01.appspot.com",
  messagingSenderId: "946111755795",
  appId: "1:946111755795:web:bdb0f43b25b00ebd6df1e6",
  measurementId: "G-K1N5CQGM0D"
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