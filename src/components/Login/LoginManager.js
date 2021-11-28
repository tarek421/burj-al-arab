import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
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

export const handleFacebookSignIn = (res) => {
  const FacebookProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, FacebookProvider).then((result) =>
    handleResponse(res)
  );
};

export const CreateUserWithEmailPassword = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    UpdateUserName(name);
    handleResponse(res);
  });
};

export const signInWithEmailPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
  .then((res) => handleResponse(res));
};

const UpdateUserName = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name,
  });
};

const handleResponse = (res) => {
  const { displayName, email, photoURL } = res.user;
  const SignInUser = {
    IsSignIn: true,
    name: displayName,
    email: email,
    photo: photoURL || "https://i.ibb.co/5GzXkwq/user.png",
  };
  return SignInUser;
};
