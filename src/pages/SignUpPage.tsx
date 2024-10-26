import React ,{ useState }from "react";

import CreateProfilePage from "./CreateProfilePage";

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmpassword, confirmPassword] = useState('');


    return (
      <div title="website-layout" className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1>Sign Up Page</h1>
            <div>
                <form>
                    {/* Email Field */}
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Enter your email
                    </label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        pattern=".+@emich\.edu$" 
                        title="Invalid email address, must be EMU" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}                  
                        className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                    {/* Username Field */}
                    <label 
                        htmlFor="username" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Enter a username
                    </label>
                        <input 
                        type="username" 
                        id="username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}                  
                        className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                    {/* Password Field */}
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Enter your new password
                    </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}                  
                            className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    {/* Re-confirm Password Field */}
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Re-enter your new password
                    </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            value={confirmpassword} 
                            onChange={(e) => confirmPassword(e.target.value)}                  
                            className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                </form>
            </div>
                <a href="/CreateProfilePage">
                    <button 
                        type="submit" 
                        className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" >
                        Proceed to Creating your Profile
                    </button>
                </a>
                <a href="/">
                    Back to Login
                </a>
        </div>
      </div>
      
    );
};
  
export default SignUpPage;


