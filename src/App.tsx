import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MatchPage from './pages/MatchPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Start from "./start"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Start />} /> 
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;