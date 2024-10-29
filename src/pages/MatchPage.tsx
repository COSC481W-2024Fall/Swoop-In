import React from 'react';
import { Link } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  imageUrl: string;
  bio: string;
}

const MatchPage: React.FC = () => {
  
  const matchedProfiles: Profile[] = [
    { 
      id: 1, 
      name: "Abhi Bhagat", 
      imageUrl: "/pics/abhi.png", 
      bio: "I love fantasy baseball and football! Also my girlfriend, Anisha :) Message me if you want to argue about who's fantasy team is better." 
    },
    { 
      id: 2, 
      name: "Christina Lin", 
      imageUrl: "/pics/christina.png", 
      bio: "Not super active on here, probably working. My best traits include being the airport dad, always wearing the coolest hats, and falling asleep in any class." 
    },
    { 
      id: 3, 
      name: "Rami Dari", 
      imageUrl: "/pics/rami.jpg", 
      bio: "If we get food, just know that you will probably out eat me. I like reading romance novels, short walks on the beach, and watching the Pistons lose!" 
    },
    
    { 
      id: 4, 
      name: "Megan LaRoy", 
      imageUrl: "/pics/meg.jpg", 
      bio: "Looking for Counter Strike 2 duo. Don't bother messaging me if you peaked in silver... Definitely message me if you can explain sliding window algorithm to me!" 
    },

    // whatever else profiles
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Swoop In</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Matches</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedProfiles.map((profile) => (
  <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex justify-center items-center p-4">
      <div className="aspect-square w-full max-w-sm">
        <img
          src={profile.imageUrl}
          alt={`${profile.name}'s profile`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
    {/* i know i fudged up the indentation but i doint remember how to correct it in VSCode bc i added the buttons in after and couldnt reformat it hehehe */}
    <div className="p-4">
      <h3>{profile.name}</h3>
      <p>{profile.bio}</p>
                <div className="flex justify-between">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Message
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Unmatch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-around">
            <Link to="/LandingPage" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/match" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span className="text-xs mt-1">Match</span>
            </Link>
            <Link to="/chat" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span className="text-xs mt-1">Chat</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MatchPage;