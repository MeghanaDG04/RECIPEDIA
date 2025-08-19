// src/auth.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app ,firebaseConfig } from "./firebaseconfig";
console.log("Firebase Config:", firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // contains email, name, photoURL, uid
  } catch (error) {
    throw error;
  }
};
