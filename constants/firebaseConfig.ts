import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// DingsJuice Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeb-2Fzty1PT2GOxrJL0ZUoOCScMy-QoA",
    authDomain: "dingsjuice.firebaseapp.com",
    projectId: "dingsjuice",
    storageBucket: "dingsjuice.firebasestorage.app",
    messagingSenderId: "905783267177",
    appId: "1:905783267177:web:268890fb22e22ee033b7f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
