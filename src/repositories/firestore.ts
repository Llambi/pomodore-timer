import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByhICvs2q48EVdsr3w0-lXToK96zL0KeI", // It is not a secret.
  authDomain: "pomodore-timer.firebaseapp.com",
  databaseURL: "https://pomodore-timer.firebaseio.com",
  projectId: "pomodore-timer",
  storageBucket: "pomodore-timer.appspot.com",
  messagingSenderId: "69069897914",
  appId: "1:69069897914:web:43b721b34ef8f5b765c283",
  measurementId: "G-5SNZST7NYX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
