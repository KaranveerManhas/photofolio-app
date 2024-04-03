// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmRBzXQIKP4qGjPT1jv6AsbeoLE9jvghs",
  authDomain: "photofolio-aa1ea.firebaseapp.com",
  projectId: "photofolio-aa1ea",
  storageBucket: "photofolio-aa1ea.appspot.com",
  messagingSenderId: "1070908043276",
  appId: "1:1070908043276:web:bf1552e582da5476117e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app);
export const db = getFirestore(app);