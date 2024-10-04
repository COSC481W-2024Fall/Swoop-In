import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config.js";  

async function addUser(userID, email, password) {
  try {
    const docRef = await setDoc(doc(db, "Users", userID), {
      email: email,         
      password: password,  
    });
    console.log("User added with ID: ", userID); 
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}
addUser("UID3", "tomcruz@emich.edu", "roar");
addUser("UID5", "Hatim@emich.edu", "pipe")