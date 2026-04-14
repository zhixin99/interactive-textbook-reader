import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAx3A1pplLOOwQ8gF_1gLWURh6bpdIJP3w",
    authDomain: "interactive-textbook-reader.firebaseapp.com",
    projectId: "interactive-textbook-reader",
    storageBucket: "interactive-textbook-reader.firebasestorage.app",
    messagingSenderId: "780590349188",
    appId: "1:780590349188:web:81c0cc7d40e29bb0087bd1",
    measurementId: "G-Z5W6MSX90Q"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app