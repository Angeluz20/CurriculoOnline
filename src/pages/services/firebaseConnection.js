import firebase from "firebase";
import 'firebase/firebase-firestore'
import 'firebase/auth'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDzjlUuv7OTu88PCifZiSXq5YGbdpljASU",
    authDomain: "meucurriculoonline-8c9b3.firebaseapp.com",
    databaseURL: "https://meucurriculoonline-8c9b3-default-rtdb.firebaseio.com",
    projectId: "meucurriculoonline-8c9b3",
    storageBucket: "meucurriculoonline-8c9b3.appspot.com",
    messagingSenderId: "764250081867",
    appId: "1:764250081867:web:9a5249c3a4d83abd219bce"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export default firebase;
