import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import Footer from '../componets/Footer';
import "../css/landingPage.css";


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

  const carouselItems: CarouselItem[] = [
    { id: 1, src: 'https://via.placeholder.com/400x300?text=Carousel+Item+1', alt: 'Carousel Item 1' },
    { id: 2, src: 'https://via.placeholder.com/400x300?text=Carousel+Item+2', alt: 'Carousel Item 2' },
    { id: 3, src: 'https://via.placeholder.com/400x300?text=Carousel+Item+3', alt: 'Carousel Item 3' },
  ];


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


      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="carousel-container">
          <div className="carousel">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-button" onClick={prevSlide}>Prev</button>
            <button className="carousel-button" onClick={nextSlide}>Next</button>
          </div>
        </div>

        <div className="profile-card">
          <h2>John Doe</h2>
          <p>This is a test bio :D I like long walks on the beach</p>
        </div>

        <div className="action-buttons">
          <button className="action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            Like
          </button>
          <button className="action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
            </svg>
            Dislike
          </button>

        </div>
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default LandingPage;
