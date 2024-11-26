import { useEffect } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const LastActive: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, 'Users', currentUser.uid);
        updateDoc(userRef, {
          lastActive: serverTimestamp(),
        });
      }
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  return null; 
};

export default LastActive;