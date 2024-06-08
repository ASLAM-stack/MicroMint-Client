// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJV_wfV5nufOcXMPbOoQILzZNpPQFH_jc",
    authDomain: "micromint-c399d.firebaseapp.com",
    projectId: "micromint-c399d",
    storageBucket: "micromint-c399d.appspot.com",
    messagingSenderId: "590767107393",
    appId: "1:590767107393:web:6b22ec69a8b3f4968905c0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;