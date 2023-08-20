import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBzVnknilW72KYnGGZl4ccqrKiyCx7Fie4",
  authDomain: "react-auth-13dd3.firebaseapp.com",
  projectId: "react-auth-13dd3",
  storageBucket: "react-auth-13dd3.appspot.com",
  messagingSenderId: "616169584756",
  appId: "1:616169584756:web:e7007006e1dc50e2857921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
