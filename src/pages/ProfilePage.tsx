import React, { useState } from "react";
import { Link } from 'react-router-dom';

interface Profile {
  firstname: string;
  lastname: string;
  images: string;
  userage: string; 
  bio: string;
  gender: string;
  genderPreferrence: string;
  agePreferrence: string;
  major: string;
}

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile>({
        firstname: 'Rami',
        lastname: 'Dari',
        images: '/pics/rami.jpg', 
        userage: '21',
        bio: 'If we get food, just know that you will probably out eat me. I like reading romance novels, short walks on the beach, and watching the Pistons lose!',
        gender: 'Male',
        genderPreferrence: 'Female',
        agePreferrence: '25-34',
        major: 'Computer Science'
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfile(prev => ({
                ...prev,
                images: e.target.files![0].name
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile updated:', profile);
    };

    return (
      <div className="min-h-screen flex flex-col bg-white pb-24">
          <div className="flex-1 max-w-2xl mx-auto p-4">
              <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                      <label 
                          htmlFor="firstname" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          First Name
                      </label>
                      <input 
                          type="text" 
                          id="firstname" 
                          name="firstname"
                          value={profile.firstname} 
                          onChange={handleInputChange}                  
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                  </div>
  
                  <div>
                      <label 
                          htmlFor="lastname" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Last Name
                      </label>
                      <input 
                          type="text" 
                          id="lastname" 
                          name="lastname"
                          value={profile.lastname} 
                          onChange={handleInputChange}                  
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                  </div>
  
                  <div>
                      <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                          Profile Picture
                      </label>
                      <input
                          type="file"
                          id="image-upload"
                          name="images"
                          accept=".jpg, .jpeg, .png, .heic"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                  </div>
  
                  <div>
                      <label 
                          htmlFor="userage" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Age
                      </label>
                      <input
                          type="text" 
                          id="userage" 
                          name="userage" 
                          value={profile.userage} 
                          onChange={handleInputChange}                  
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                  </div>
  
                  <div>
                      <label 
                          htmlFor="bio" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Bio
                      </label>
                      <textarea 
                          id="bio" 
                          name="bio" 
                          value={profile.bio} 
                          onChange={handleInputChange}                  
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                  </div>
  
                  <div>
                      <label 
                          htmlFor="gender" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Gender
                      </label>
                      <select 
                          id="gender" 
                          name="gender" 
                          value={profile.gender}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>
  
                  <div>
                      <label 
                          htmlFor="genderPreferrence" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Preferred Gender
                      </label>
                      <select
                          id="genderPreferrence"
                          name="genderPreferrence"
                          value={profile.genderPreferrence}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                      </select>
                  </div>
  
                  <div>
                      <label 
                          htmlFor="agePreferrence" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Age Preference
                      </label>
                      <select 
                          id="agePreferrence" 
                          name="agePreferrence" 
                          value={profile.agePreferrence}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      >
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55-64">55-64</option>
                          <option value="65+">65+</option>
                      </select>
                  </div>
  
                  <div>
                      <label 
                          htmlFor="major" 
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Major (if applicable)
                      </label>
                      <input 
                          type="text" 
                          id="major" 
                          name="major" 
                          value={profile.major} 
                          onChange={handleInputChange}                  
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                  </div>
  
                  <div className="flex justify-between items-center mb-20">
                      <button 
                          type="submit" 
                          className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      >
                          Save Changes
                      </button>
                      
                      <Link 
                          to="/profile" 
                          className="text-sm text-gray-600 hover:text-gray-900"
                      >
                          Cancel
                      </Link>
                  </div>
              </form>
          </div>
  
          <footer className="bg-gray-100 py-4 fixed bottom-0 left-0 right-0 w-screen border-t border-gray-200">
              <div className="max-w-screen-xl mx-auto px-4">
                  <nav className="flex justify-between items-center max-w-screen-xl mx-auto">
                      <Link to="/LandingPage" className="flex flex-col items-center w-1/5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          <span className="text-xs mt-1">Home</span>
                      </Link>
                      <Link to="/match" className="flex flex-col items-center w-1/5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                          <span className="text-xs mt-1">Match</span>
                      </Link>
                      <Link to="/chat" className="flex flex-col items-center w-1/5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                          <span className="text-xs mt-1">Chat</span>
                      </Link>
                      <Link to="/profile" className="flex flex-col items-center w-1/5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          <span className="text-xs mt-1">Profile</span>
                      </Link>
                      <Link to="/settings" className="flex flex-col items-center w-1/5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                          <span className="text-xs mt-1">Settings</span>
                      </Link>
                  </nav>
              </div>
          </footer>
      </div>
  );

};

export default ProfilePage; 