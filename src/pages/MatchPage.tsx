import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Footer from '../componets/Footer';
import "../css/matchPage.css";
import LastActive from '../componets/LastActive';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string;
}

const MatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? "";
  const navigate = useNavigate();
  const [matchedProfiles, setMatchedProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        await fetchMatches();
        await fetchUserSettings();
      }
    };

    const fetchUserSettings = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", user_uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsDarkMode(userData?.settings?.lightMode ?? false);
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    const fetchMatches = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'Users', user_uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const matchIds = userData?.swipes?.matches || [];
          const profiles: Profile[] = [];

          for (const matchId of matchIds) {
            const matchDoc = await getDoc(doc(db, 'Users', matchId));
            if (matchDoc.exists()) {
              const matchData = matchDoc.data();
              profiles.push({
                id: matchId,
                firstName: matchData.firstName || '',
                lastName: matchData.lastName || '',
                imageUrl: matchData.images?.[0] || '/default-profile.png',
                bio: matchData.bio || '',
              });
            }
          }
          setMatchedProfiles(profiles);
        } else {
          setError('User profile not found.');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches. Please try again later.');
      }
    };

    checkUserAuthorization();
  }, [user_uid, navigate]);

  const handleUnmatch = async (matchId: string) => {
    try {
      const userDocRef = doc(db, 'Users', user_uid);
      const userDoc = await getDoc(userDocRef);

      const matchDocRef = doc(db, 'Users', matchId);
      const matchDoc = await getDoc(matchDocRef);

      if (userDoc.exists() && matchDoc.exists()) {
        const userData = userDoc.data();
        const updatedMatches = userData?.swipes?.matches?.filter((id: string) => id !== matchId) || [];

        await updateDoc(userDocRef, {
          'swipes.matches': updatedMatches,
        });

        const matchData = matchDoc.data();
        const updatedMatchUserMatches = matchData?.swipes?.matches?.filter((id: string) => id !== user_uid) || [];

        await updateDoc(matchDocRef, {
          'swipes.matches': updatedMatchUserMatches,
        });

        setMatchedProfiles((prev) => prev.filter(profile => profile.id !== matchId));
      }
    } catch (error) {
      console.error('Error unmatching:', error);
      setError('Failed to unmatch. Please try again.');
    }
  };

  const handleMessage = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  return (
    <div className={`match-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <LastActive/>
      <header className="match-page-header">
        <h1 className="match-page-title">Your Matches</h1>
      </header>

      <main className="match-page-content">
        {error && <p className="match-page-error">{error}</p>}
        <div className="match-grid">
          {matchedProfiles.map(profile => (
            <div key={profile.id} className="match-card">
              <img src={profile.imageUrl} alt={`${profile.firstName} ${profile.lastName}`} className="match-card-image" />
              <div className="match-card-info">
                <h3 className="match-card-name">{profile.firstName} {profile.lastName}</h3>
                <p className="match-card-bio">{profile.bio}</p>
                <div className="match-card-buttons">
                  <button onClick={() => handleMessage(profile.id)} className="match-card-button message-button">
                    Message
                  </button>
                  <button onClick={() => handleUnmatch(profile.id)} className="match-card-button unmatch-button">
                    Unmatch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default MatchPage;
