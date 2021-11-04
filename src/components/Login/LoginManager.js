import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase.config";

export const firebaseInitialize = () => {
  return initializeApp(firebaseConfig);
};

export const handleGoogleSignIn = (res) => {
  const GoogleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, GoogleProvider).then((res) =>
    handleResponse(res)
  );
};

const handleResponse = (res) => {
  const { displayName, email, photoURL } = res.user;
  const SignInUser = {
    IsSignIn: true,
    name: displayName,
    email: email,
    photo: photoURL,
  };
  return SignInUser;
};
