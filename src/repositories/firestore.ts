import { firebaseConfig } from "@/firebase.credentials";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
