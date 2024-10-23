import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config'; // Import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import necessary Firestore query methods
import App from "./App" 
import SignUpPage from  "./pages/SignUpPage"
const Start: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      setMessage('User registered successfully.');
    } catch (error: any) {
      setMessage(`Error during registration: ${error.message}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'Users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        const userData = userDoc.data();
  
        if (userData && userData.password === password) {
          setMessage('Login successful! Redirecting...');
          navigate('/LandingPage'); // Redirect to the main app page after login
        } else {
          setMessage('Invalid password.');
        }
      } else {
        setMessage('User not found.');
      }
    } catch (error: any) {
      setMessage(`Error during login: ${error.message}`);
    }
  };
  

  return (
    <>
      <h1>Swoopin</h1>
      <div title="website-layout" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="SwoopIn"
            src="https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png"
            className="mx-auto h-20 w-20"
            srcSet="
              https://a.espncdn.com/i/teamlogos/ncaa/200/2199.png 200w,
              https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png 500w
            "
            sizes="
              (max-width: 600px) 25vw,  
              (max-width: 1200px) 15vw,  
              10vw
            "
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  pattern=".+@emich\.edu$"
                  title="Invalid email address, must be EMU"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <a href="/SignUpPage" className="font-semibold leading-6 text-green-600 hover:text-gray-500">
            Sign Up
          </a>

          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Start;
