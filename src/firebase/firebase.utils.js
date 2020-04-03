import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB1IB_FAUMls9ATmW-W36V-EUjnEpYMlHg",
  authDomain: "crwn-db-18fdf.firebaseapp.com",
  databaseURL: "https://crwn-db-18fdf.firebaseio.com",
  projectId: "crwn-db-18fdf",
  storageBucket: "crwn-db-18fdf.appspot.com",
  messagingSenderId: "1085454823988",
  appId: "1:1085454823988:web:94e803e8a371d8501a9061",
  measurementId: "G-W7D4LY8MLK"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
