import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('user@example.com'); // You can fetch the real email here
  const [password, setPassword] = useState('********'); // Masked password for privacy
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const toggleNotifications = () => {
    setReceiveNotifications((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handlePasswordChange = () => {
    setIsEditingPassword(!isEditingPassword);
    if (isEditingPassword) {
      // Logic for updating the password
      console.log('Password updated');
    }
  };


const SettingsPage: React.FC = () => {

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="flex justify-between items-center mt-2">
              <span>Receive Notifications</span>
              <button
                onClick={toggleNotifications}
                className={`px-4 py-2 rounded-lg ${
                  receiveNotifications ? 'bg-primary text-white' : 'bg-gray-300'
                }`}
              >
                {receiveNotifications ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <div className="mt-2">
              <p>Email: {email}</p>
              <p>Password: {isEditingPassword ? <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> : password}</p>
              <button
                onClick={handlePasswordChange}
                className="bg-primary text-white px-4 py-2 rounded-lg mt-2"
              >
                {isEditingPassword ? 'Save' : 'Change Password'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold">Theme</h2>
            <div className="flex justify-between items-center mt-2">
              <span>Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-primary text-white' : 'bg-gray-300'}`}
              >
                {isDarkMode ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-around">
            <button className="text-xs mt-1">Home</button>
            <button className="text-xs mt-1">Match</button>
            <button className="text-xs mt-1">Chat</button>
            <button className="text-xs mt-1">Profile</button>
            <button className="text-xs mt-1">Settings</button>
          </nav>
        </div>
      </footer>
    </div>
  );
};



export default SettingsPage;
