import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAGIEwODDiLk-J1oJn2muXLUN7Rc_AQk9U",
    authDomain: "swoop-in.firebaseapp.com",
    databaseURL: "https://swoop-in-default-rtdb.firebaseio.com",
    projectId: "swoop-in",
    storageBucket: "swoop-in.appspot.com",
    messagingSenderId: "619793829994",
    appId: "1:619793829994:web:2b2eb270ae5ad1e5a5fa13",
    measurementId: "G-FKM9RLTND3"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };
