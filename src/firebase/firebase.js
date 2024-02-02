import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlY85XL7rwhez5RV3YqXWvFEiqoBWAP_Y",
  authDomain: "scroll-yuk.firebaseapp.com",
  projectId: "scroll-yuk",
  storageBucket: "scroll-yuk.appspot.com",
  messagingSenderId: "43475393338",
  appId: "1:43475393338:web:fc3c8ae1ff91e67e8c4e03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const strg = getStorage(app);
