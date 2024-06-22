// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp9po1V1rY5s89xzTO4Pn7EyBmgibumz4",
  authDomain: "barni-coin.firebaseapp.com",
  projectId: "barni-coin",
  storageBucket: "barni-coin.appspot.com",
  messagingSenderId: "55776397498",
  appId: "1:55776397498:web:ab037732877d70d6cc5a83",
  measurementId: "G-YGKW596RY3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export { app }
