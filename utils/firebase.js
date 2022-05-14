import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
import { getDatabase } from "firebase/database";
//import {...} from "firebase/firestore";
import { getFunctions } from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9qTRk01Eo-C0OEHnfvoDYQrGjI6fLCDg",
    authDomain: "kerry-logistics-cargo-tracking.firebaseapp.com",
    databaseURL: "https://kerry-logistics-cargo-tracking-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kerry-logistics-cargo-tracking",
    storageBucket: "kerry-logistics-cargo-tracking.appspot.com",
    messagingSenderId: "561386564609",
    appId: "1:561386564609:web:567ae6b00590dd665da400",
    measurementId: "G-QL1WE7RNMY"
  };

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const functions = getFunctions(app);