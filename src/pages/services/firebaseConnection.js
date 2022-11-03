import firebase from "firebase";
import 'firebase/firebase-firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD7N-Wh1VJWbBeDTvyqB-glSiD19QA6zcc",
    authDomain: "bd-curriculo-9701b.firebaseapp.com",
    projectId: "bd-curriculo-9701b",
    storageBucket: "bd-curriculo-9701b.appspot.com",
    messagingSenderId: "244682831380",
    appId: "1:244682831380:web:474edf63ea75256ce69901"
  };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export default firebase;
