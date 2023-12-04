// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Cu-GWrg_rvsCuaK97LYjrCWqiYSFFV4",
  authDomain: "mind-care-b5645.firebaseapp.com",
  projectId: "mind-care-b5645",
  storageBucket: "mind-care-b5645.appspot.com",
  messagingSenderId: "787729662770",
  appId: "1:787729662770:web:86ee0c09231f54934d8d2b",
  measurementId: "G-PZF7S3ZX2K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);

export { firebaseApp };
