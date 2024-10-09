import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config.js";  

async function getUserByID(userID) {
  try {
    const docRef = doc(db, "Users", userID);
    const docSnap = await getDoc(docRef);     

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());  
    } else {
      console.log("No user!");
    }
  } catch (e) {
    console.error("Error retrieving user:", e);
  }
}
getUserByID("UID2");