import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Footer from "../componets/Footer";
import "../css/profilePage.css";

interface Profile {
  firstName: string;
  lastName: string;
  age: number | '';
  bio: string;
  gender: string;
  preferredGender: string;
  minAge: number | '';
  maxAge: number | '';
  major: string;
  images: string[];
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? "";
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialProfile, setInitialProfile] = useState<Profile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component unmounts during async calls

    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "Users", user_uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && isMounted) {
          const userData = docSnap.data() as Profile & { settings?: { lightMode?: boolean } };
          setProfile({
            ...userData,
            age: userData.age || '',
            minAge: userData.minAge || '',
            maxAge: userData.maxAge || '',
          });
          setInitialProfile(userData);

          // Apply the light/dark mode from the database settings
          setIsDarkMode(!userData.settings?.lightMode);
        } else if (isMounted) {
          setMessage("User profile not found.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (isMounted) {
          setMessage("Failed to load profile. Please try again later.");
          setIsSuccess(false);
        }
      }
    };

    const checkUserAuthorization = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/');
        return;
      }

      if (currentUser.uid !== user_uid) {
        navigate(`/LandingPage/${currentUser.uid}`, { replace: true });
      } else {
        await fetchUserProfile();
      }
    };

    checkUserAuthorization();

    return () => {
      isMounted = false; // Cleanup function to avoid setting state on unmounted component
    };
  }, [user_uid, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setProfile((prev) => (prev ? { ...prev, images: filePreviews } : prev));
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    const { firstName, lastName, age, bio, gender, preferredGender, minAge, maxAge, major, images } = profile;

    if (!firstName || !lastName || !bio || !gender || !preferredGender || !major || !age || !minAge || !maxAge) {
      setMessage("All fields are required.");
      setIsSuccess(false);
      return;
    }

    if (typeof age === 'number' && age < 18) {
      setMessage("You must be at least 18 years old.");
      setIsSuccess(false);
      return;
    }

    if (typeof minAge === 'number' && (minAge < 18 || maxAge < minAge)) {
      setMessage("Please check your age preferences.");
      setIsSuccess(false);
      return;
    }

    try {
      const docRef = doc(db, "Users", user_uid);
      await updateDoc(docRef, { ...profile, age: Number(age), minAge: Number(minAge), maxAge: Number(maxAge) });
      setMessage("Profile updated successfully!");
      setIsSuccess(true);
      setInitialProfile(profile);

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to save changes. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleCancelChanges = () => {
    setProfile(initialProfile);
    setMessage(null);
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={`profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="profile-header">Edit Profile</div>

      <div className="profile-layout">
        {message && (
          <p className={isSuccess ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSaveChanges}>
          <label htmlFor="firstName" className="label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            className="input-field"
          />

          <label htmlFor="lastName" className="label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            className="input-field"
          />

          <label htmlFor="age" className="label">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={profile.age ? profile.age.toString() : ''}
            onChange={handleInputChange}
            min={18}
            className="input-field"
          />

          <label htmlFor="bio" className="label">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="textarea-field"
          />

          <label htmlFor="gender" className="label">Gender</label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Your Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="preferredGender" className="label">Preferred Gender</label>
          <select
            id="preferredGender"
            name="preferredGender"
            value={profile.preferredGender}
            onChange={handleInputChange}
            className="select-field"
          >
            <option value="">Select Preferred Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="No Preference">No Preference</option>
          </select>

          <label htmlFor="minAge" className="label">Minimum Age Preference</label>
          <input
            type="number"
            id="minAge"
            name="minAge"
            value={profile.minAge ? profile.minAge.toString() : ''}
            onChange={handleInputChange}
            min={18}
            className="input-field"
          />

          <label htmlFor="maxAge" className="label">Maximum Age Preference</label>
          <input
            type="number"
            id="maxAge"
            name="maxAge"
            value={profile.maxAge ? profile.maxAge.toString() : ''}
            onChange={handleInputChange}
            min={18}
            className="input-field"
          />

          <label htmlFor="major" className="label">Major</label>
          <input
            type="text"
            id="major"
            name="major"
            value={profile.major}
            onChange={handleInputChange}
            className="input-field"
          />

          <label htmlFor="images" className="label">Upload Profile Pictures</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          <div className="image-preview-container">
            {profile.images.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="image-preview" />
            ))}
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">Save Changes</button>
            <button type="button" onClick={handleCancelChanges} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
      <Footer user_uid={user_uid} />
    </div>
  );
};

export default ProfilePage;
