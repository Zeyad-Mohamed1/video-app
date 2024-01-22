import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBMPplGR5XfnZ8U6rja1AR7LbTKxGGUwyE",
    authDomain: "video-tube-1cf9a.firebaseapp.com",
    projectId: "video-tube-1cf9a",
    storageBucket: "video-tube-1cf9a.appspot.com",
    messagingSenderId: "451452221276",
    appId: "1:451452221276:web:a51fb248fdc94dc0d83399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;