import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Start: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'Users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate(`/LandingPage/${user.uid}`), 1000);
      } else {
        setMessage('No additional user data found for this account.');
      }
    } catch (error: any) {
      // Custom error messages based on Firebase error codes
      switch (error.code) {
        case 'auth/invalid-email':
          setMessage('Invalid email format. Please enter a valid @emich.edu email.');
          break;
        case 'auth/user-disabled':
          setMessage('This account has been disabled. Please contact support.');
          break;
        case 'auth/user-not-found':
          setMessage('No account found with this email. Please check your email or sign up.');
          break;
        case 'auth/wrong-password':
          setMessage('Incorrect password. Please try again or reset your password.');
          break;
        case 'auth/too-many-requests':
          setMessage('Too many failed login attempts. Please try again later.');
          break;
        default:
          setMessage('Login failed. Please check your credentials and try again.');
          break;
      }
    }
  };

  return (
    <>
      <h1>SwoopIn</h1>
      <div title="website-layout" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="SwoopIn"
            src="https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png"
            className="mx-auto h-20 w-20"
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
                  <a href="/reset-password" className="font-semibold text-green-600 hover:text-green-500">
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
          <a href="/SignUpPage" className="block text-center font-semibold leading-6 text-green-600 hover:text-gray-500 mt-4">
            Sign Up
          </a>

          {message && <p className={`text-center mt-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Start;
