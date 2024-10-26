import React, {useState} from "react";
import LandingPage from "./LandingPage";
import Start from "../start";


const CreateProfilePage: React.FC = () => {
    const [firstname, setfirstName] = useState(''); 
    const [lastname, setlastName] = useState('');

    // Set Image
    const [images, setImages] = useState ('');
    // Set User Age
    const [userage, setuserAge] = useState ('');
    // Set Bio
    const [bio,setBio] = useState('')
    // Set Gender
    const [gender,setGender] = useState ('');
    // Set Preferred Gender
    const [genderPreferrence,setgenderPreferrence] = useState('');
    // Set preferred Age
    const [agePreferrence,setagePreferrence] = useState('');
    // Set Major if app
    const [major, setMajor] = useState ('');

    return (
      <div>
        <h1>Create Profile Page</h1>
        <p></p>
        <form>
            <label 
                htmlFor="firstName" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Enter your First name
            </label>
            <input 
                type="text" 
                id="firstName" 
                name="firstName"
                value={firstname} 
                onChange={(e) => setfirstName(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
    
            <label 
                htmlFor="lastName" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Enter your Last Name
            </label>
            <input 
                type="text" 
                id="lastName" 
                name="lastName"
                value={lastname} 
                onChange={(e) => setlastName(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            {/* EDIT Images URGENT */}
            <label 
                htmlFor="text" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Images
            </label>
            <input 
                type="text" 
                id="att1" 
                name="att1" 
                value={images} 
                onChange={(e) => setImages(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            <label 
                htmlFor="userage" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Age
            </label>
            <input
                type="text" 
                id="userage" 
                name="userage" 
                value={userage} 
                onChange={(e) => setuserAge(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            <label 
                htmlFor="text" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Bio
            </label>
            <input 
                type="text" 
                id="att1" 
                name="att1" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            <label 
                htmlFor="text" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Gender
            </label>
            <input 
                type="text" 
                id="att1" 
                name="att1" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                Preferred Gender
            </label>
            <input 
                type="text" 
                id="att1" 
                name="att1" 
                value={genderPreferrence} 
                onChange={(e) => setgenderPreferrence(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
            <div className="flex items-center space-x-4">
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Age Preferrence:
                </label>
                <select 
                    id="age" 
                    name="age" 
                    onChange={(e) => setagePreferrence(e.target.value)}
                    className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                        <option value="">--Select Age--</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65+">65+</option>
                </select>
            </div>
            <label 
                htmlFor="text" 
                className="block text-sm font-medium leading-6 text-gray-900">
                Major (if applicable)
            </label>
            <input 
                type="text" 
                id="att1" 
                name="att1" 
                value={major} 
                onChange={(e) => setMajor(e.target.value)}                  
                className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
        </form>
        <a href="/LandingPage">
            <button 
            type="submit" 
            className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" >
            Start Connecting!
            </button>
        </a>
        <a href="/">Back to Login</a>
        
      </div>
    );
  };
  

  export default CreateProfilePage;