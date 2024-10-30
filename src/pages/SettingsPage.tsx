import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import Footer from '../componets/Footer';
import "../css/settingsPage.css"; 

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
