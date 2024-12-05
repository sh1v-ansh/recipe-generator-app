import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB5BmUx4kWe2-l74_7goCEPF3UPvCd3JPk",
    authDomain: "recipe-gen-app-ff3d8.firebaseapp.com",
    projectId: "recipe-gen-app-ff3d8",
    storageBucket: "recipe-gen-app-ff3d8.firebasestorage.app",
    messagingSenderId: "860499699875",
    appId: "1:860499699875:web:1b1e7229f327019001b716",
    measurementId: "G-KB1DWVGES4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics, signInWithPopup};