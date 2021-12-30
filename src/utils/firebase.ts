import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRNk9RoeDJ3HdxOVIsRgTYmnO1zrlfJVk",
    authDomain: "restaurant-app-ad505.firebaseapp.com",
    projectId: "restaurant-app-ad505",
    storageBucket: "restaurant-app-ad505.appspot.com",
    messagingSenderId: "923880518320",
    appId: "1:923880518320:web:bae74fe9108a3f0318c175",
    measurementId: "G-JRSVE4FR2Q",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
};
export const db = getFirestore(app);