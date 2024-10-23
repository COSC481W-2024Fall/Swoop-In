import React, {useState} from "react";
import LandingPage from "./LandingPage";

const CreateProfilePage: React.FC = () => {
    const [username, setfirstName] = useState(''); 
    const [password, setlastName] = useState('');
    const [confirmpassword, setAtt1] = useState('');

    return (
      <div>
        <h1>Create Profile Page</h1>
        <p>This is the Create Profile page.</p>
        <form>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your First name
            </label>
            <input type="text" id="firstName" name="firstName" value={username} onChange={(e) => setfirstName(e.target.value)}                  
                   className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
    
            <label htmlFor="elastNam" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your Last Name
            </label>
            <input type="text" id="lastName" name="lastName" value={password} onChange={(e) => setlastName(e.target.value)}                  
                   className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Profile Attribute
            </label>
            <input type="text" id="att1" name="att1" value={confirmpassword} onChange={(e) => setAtt1(e.target.value)}                  
                   className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            
        </form>
        <a href="/LandingPage">
                <button type="submit" className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6
                        text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" >
                    Start Connecting!
                </button>
            </a>
        
      </div>
    );
  };
  

  export default CreateProfilePage;