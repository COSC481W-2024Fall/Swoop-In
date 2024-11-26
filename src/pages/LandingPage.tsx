import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import {auth, db} from '../firebase-config';
import Footer from '../componets/Footer';
import { collection, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';


interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
}

const LandingPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState(0)
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? ""; 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthorization = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate('/');
        return;
      }

      if (currentUser.uid !== user_uid) {
        navigate(`/LandingPage/${currentUser.uid}`, { replace: true });
      } else {
        await fetchProfiles();
      }
    };


    const fetchProfiles = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const snapshot = await getDocs(usersCollection);
        const userUIDs = snapshot.docs.map((doc) => doc.id);
        
        const filter = userUIDs.filter((uid) => uid !== user_uid);

        const profiles: Profile[] = [];

        for (const uid of filter) {
          const userDoc = await getDoc(doc(db, "Users", uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            profiles.push({
              id: uid,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              imageUrl: userData.images?.[0] || "/default-profile.png",
              bio: userData.bio || "",
            });
          }
        }





        setProfiles(profiles);

      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please try again later.");

      }
    };

    checkUserAuthorization();
  }, [user_uid, navigate]);


  const swiperoni = async (action: 'like' | 'dislike') => {
    if (profiles.length === 0) return;

    const currProf = profiles[currentProfile];
    try {
      const userDocRef = doc(db, 'Users', user_uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const swipes = userData.swipes || {};

        if (action === 'like') {
          const updatedRight = [...(swipes.right || []), currProf.id];
          await updateDoc(userDocRef, {
            'swipes.right': updatedRight,
          });
        } else if (action === 'dislike') {
          const updatedLeft = [...(swipes.left || []), currProf.id];
          await updateDoc(userDocRef, {
            'swipes.left': updatedLeft,
          });
        }
      }

      setCurrentProfile((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error('Error swiping:', error);
      setError('Failed to save swipe. Please try again.');
    }
  };

  if (currentProfile >= profiles.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Swoop In</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <p className="text-center text-lg font-semibold">
            No more profiles available. Check back later!
          </p>
        </main>
        <Footer user_uid={user_uid} />
      </div>
    );
  }

  const currProfile = profiles[currentProfile];
  







  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Swoop In</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center">
          <img
            src={currProfile.imageUrl}
            alt={`${currProfile.firstName} ${currProfile.lastName}`}
            className="w-full max-w-md h-72 object-cover rounded"
          />
          <h2 className="text-2xl font-semibold mt-4">
          {currProfile.firstName} {currProfile.lastName}
          </h2>
          <p className="text-gray-600 text-center mt-2">{currProfile.bio}</p>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => swiperoni('like')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Like
            </button>
            <button
              onClick={() => swiperoni('dislike')}
              className="bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Dislike
            </button>
          </div>
        </div>
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default LandingPage;