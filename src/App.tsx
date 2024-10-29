import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MatchPage from './pages/MatchPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SignUpPage from './pages/SignUpPage';
import CreateProfilePage from './pages/CreateProfilePage';

import ChattingPage from './pages/ChattingPage';

import Start from "./start"
import { Sign } from 'crypto';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Start />} /> 
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/CreateProfilePage" element={<CreateProfilePage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chat/:chatId" element={<ChattingPage/>} />
      </Routes>
    </Router>
  );
};

export default App;