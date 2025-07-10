// Firebase config and Firestore setup
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAH-9HvHQg4TzNDwakgWf2HgiEbqDEW4Uk",
  authDomain: "mekyek-connect-us.firebaseapp.com",
  projectId: "mekyek-connect-us",
  storageBucket: "mekyek-connect-us.appspot.com",
  messagingSenderId: "116791087643",
  appId: "1:116791087643:web:44c2d5db634594b6845ebe",
  measurementId: "G-N2SNHMRMXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
