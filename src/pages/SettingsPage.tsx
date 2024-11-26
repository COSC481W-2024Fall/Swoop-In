import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import Footer from '../componets/Footer';
import "../css/settingsPage.css";
import LastActive from '../componets/LastActive';


const SettingsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_uid = id ?? ""; 
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserSettings = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", user_uid));
        if (userDoc.exists() && isMounted) {
          const userData = userDoc.data();
          setActiveStatus(userData?.settings?.activeStatus ?? true);
          setReceiveNotifications(userData?.settings?.notification ?? true);

          
          const isDarkMode = !userData.settings?.lightMode;
          setIsDarkMode(isDarkMode);
          document.body.classList.toggle('dark-mode', isDarkMode); 

        }
      } catch (error) {
        console.error("Error fetching settings:", error);
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
        await fetchUserSettings();
      }
    };

    checkUserAuthorization();

    return () => {
      isMounted = false;
    };
  }, [user_uid, navigate]);

  const toggleDarkMode = async () => {
    const newDarkModeState = !isDarkMode;

    try {

      await updateDoc(doc(db, "Users", user_uid), {
        "settings.lightMode": !newDarkModeState,
      });

      
      setIsDarkMode(newDarkModeState);
      document.body.classList.toggle('dark-mode', newDarkModeState); 

    } catch (error) {
      console.error("Error updating dark mode setting:", error);
    }
  };

  const toggleActiveStatus = async () => {
    setActiveStatus((prev) => !prev);
    await updateSetting("activeStatus", !activeStatus);
  };

  const toggleNotifications = async () => {
    setReceiveNotifications((prev) => !prev);
    await updateSetting("notification", !receiveNotifications);
  };

  const updateSetting = async (settingName: string, value: boolean) => {
    try {
      const userRef = doc(db, "Users", user_uid);
      await updateDoc(userRef, {
        [`settings.${settingName}`]: value,
      });
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("A password reset email has been sent to your email address.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setResetMessage("Failed to send password reset email. Please try again.");
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className={`settings-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <LastActive/>
      <header className="header">
        <h1>Settings</h1>
      </header>

      <main className="main-content">
        <div className="section">
          <h2 className="section-title">Active Status</h2>
          <div className="flex justify-between items-center mt-2">
            <span className="toggle-label">Show Active Status</span>
            <button
              onClick={toggleActiveStatus}
              className={`toggle-button ${activeStatus ? 'on' : 'off'}`}
            >
              <div className="toggle-switch"></div>
            </button>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Notifications</h2>
          <div className="flex justify-between items-center mt-2">
            <span className="toggle-label">Receive Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`toggle-button ${receiveNotifications ? 'on' : 'off'}`}
            >
              <div className="toggle-switch"></div>
            </button>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Theme</h2>
          <div className="flex justify-between items-center mt-2">
            <span className="toggle-label">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`toggle-button ${isDarkMode ? 'on' : 'off'}`}
            >
              <div className="toggle-switch"></div>
            </button>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Account Information</h2>
          <div className="account-info-container">
            <p>Email: {email}</p>
            <button
              onClick={handlePasswordReset}
              className="reset-button"
            >
              Send Password Reset Email
            </button>
            {resetMessage && (
              <p className={`reset-message ${resetMessage.includes("sent") ? "success" : "error"}`}>
                {resetMessage}
              </p>
            )}
          </div>
        </div>

        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </main>

      <Footer user_uid={user_uid} />
    </div>
  );
};

export default SettingsPage;
