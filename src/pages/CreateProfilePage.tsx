import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import "../css/createProfilePage.css"; // Import the CSS file

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [preferredGender, setPreferredGender] = useState('');
  const [minAgePreference, setMinAgePreference] = useState('');
  const [maxAgePreference, setMaxAgePreference] = useState('');
  const [major, setMajor] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  const handleProfileCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!firstName || !lastName || !age || !bio || !gender || !preferredGender || !minAgePreference || !maxAgePreference || !major) {
      setError("Please fill out all fields.");
      return;
    }

    if (parseInt(age) < 18) {
      setError("You must be at least 18 years old to create a profile.");
      return;
    }

    if (parseInt(minAgePreference) < 18 || parseInt(maxAgePreference) < parseInt(minAgePreference)) {
      setError("Please ensure age preferences are set correctly and are above 18.");
      return;
    }

    if (user) {
      const userData = {
        firstName,
        lastName,
        age: parseInt(age),
        bio,
        gender,
        preferredGender,
        minAge: parseInt(minAgePreference),
        maxAge: parseInt(maxAgePreference),
        major,
        images: imagePreviews,
        lastActive: new Date(),
        createdAt: new Date(),
      };

      try {
        await setDoc(doc(db, "Users", user.uid), userData, { merge: true });
        navigate(`/LandingPage/${user.uid}`);
      } catch (error) {
        console.error("Error creating profile: ", error);
      }
    }
  };

  return (
    <div className="create-profile-page container">
      <div className="profile-layout">
        <h1 className="profile-title">Create Your Profile</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleProfileCreation}>
          <label htmlFor="firstName" className="label">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input-field"
          />

          <label htmlFor="lastName" className="label">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input-field"
          />

          <label htmlFor="age" className="label">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={18}
            required
            className="input-field"
          />

          <label htmlFor="bio" className="label">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="textarea-field"
          />

          <label htmlFor="gender" className="label">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
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
            value={preferredGender}
            onChange={(e) => setPreferredGender(e.target.value)}
            required
            className="select-field"
          >
            <option value="">Select Preferred Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="No Preference">No Preference</option>
          </select>

          <label htmlFor="minAgePreference" className="label">Minimum Age Preference</label>
          <input
            type="number"
            id="minAgePreference"
            value={minAgePreference}
            onChange={(e) => setMinAgePreference(e.target.value)}
            min={18}
            required
            className="input-field"
          />

          <label htmlFor="maxAgePreference" className="label">Maximum Age Preference</label>
          <input
            type="number"
            id="maxAgePreference"
            value={maxAgePreference}
            onChange={(e) => setMaxAgePreference(e.target.value)}
            min={18}
            required
            className="input-field"
          />

          <label htmlFor="major" className="label">Major</label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
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
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="image-preview" />
            ))}
          </div>

          <button type="submit" className="submit-button">Start Connecting!</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
