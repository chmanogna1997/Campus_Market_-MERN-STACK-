// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAZFSWtR90O--CuGJJLVCNmWfrcTXaY6dA",
  authDomain: "campus-market-48b1a.firebaseapp.com",
  projectId: "campus-market-48b1a",
  storageBucket: "campus-market-48b1a.appspot.com",
  messagingSenderId: "56350526848",
  appId: "1:56350526848:web:6ac00543b74f84cf878565",
  measurementId: "G-R6VKJK17XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)