import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG1mW_qv26QJvkWerKTNExnfNXbIv0hss",
  authDomain: "research-hub-71210.firebaseapp.com",
  projectId: "research-hub-71210",
  storageBucket: "research-hub-71210.appspot.com",
  messagingSenderId: "980724334706",
  appId: "1:980724334706:web:d1bf25f408bd96b03d02eb",
  measurementId: "G-E6N8LBYZQ2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyDsqj11GAtdcdx9PfSjxIS4unc1gGCQa48",
//   authDomain: "researchgrant1-71f01.firebaseapp.com",
//   projectId: "researchgrant1-71f01",
//   storageBucket: "researchgrant1-71f01.appspot.com",
//   messagingSenderId: "803973048863",
//   appId: "1:803973048863:web:880bce9f6c9b80b903032a",
//   // measurementId: "G-12T2P4GDK0"
// };

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebase };