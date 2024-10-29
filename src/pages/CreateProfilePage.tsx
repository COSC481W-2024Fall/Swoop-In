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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
        <div title="profile-layout" className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-center text-xl font-bold mb-6">Create Profile Page</h1>
                <form>
                    {/* First Name */}
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"   
                        />  
                    {/* Last Name */}
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"   
                    />
                    {/* Images */}
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                        Upload Images
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        name="images"
                        accept=".jpg, .jpeg, .png, .heic"
                        multiple
                        onChange={(e) =>setImages}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-700"
                    />
                    {/* User Age */}
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
                    {/* Bio */}
                    <label 
                        htmlFor="bio" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Bio
                    </label>
                    <textarea
                        id="bio" 
                        name="bio" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}                  
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                    {/* UserGender */}
                    <label 
                        htmlFor="gender" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                    </label>
                    <select
                        id="gender" 
                        name="gender" 
                        onChange={(e) => setGender(e.target.value)}                  
                        className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                            <option value="">--Select Your Gender--</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                    </select>
                    {/* Gender Preference */}
                    <label 
                        htmlFor="prefgender" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Preferred Gender
                    </label>
                    <select
                        id="prefgender" 
                        name="prefgender" 
                        onChange={(e) => setgenderPreferrence(e.target.value)}                  
                        className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                            <option value="">--Select Your Gender Preferrence--</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                    </select>
                    {/* Age Preference */}
                    {/* <div className="flex items-center space-x-4"> */}
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                            Age Preferrence:
                        </label>
                        <select 
                            id="agepreferrence" 
                            name="agepreferrence" 
                            onChange={(e) => setagePreferrence(e.target.value)}
                            className="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                                <option value="">--Select Age--</option>
                                <option value="18-24">18-24</option>
                                <option value="25-34">25-34</option>
                                <option value="35-44">35-44</option>
                                <option value="45-54">45-54</option>
                                <option value="55-64">55-64</option>
                                <option value="65+">65+</option>
                                <option value="No preference">No Preference</option>
                        </select>
                    {/* </div> */}
                    {/* Major */}
                    <label 
                        htmlFor="major" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Major (if applicable)
                    </label>
                    <input 
                        type="text" 
                        id="major" 
                        name="major" 
                        value={major} 
                        onChange={(e) => setMajor(e.target.value)}                  
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 mb-6"
                    />
                </form>
                <a href="/LandingPage">
                    <button 
                    type="submit" 
                    className="w-full rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mb-4">
                    Start Connecting!
                    </button>
                </a>
                <a href="/"className="text-center text-sm text-gray-600 hover:text-gray-900">Back to Login</a>
        </div>
      </div>
    );
  };

  export default CreateProfilePage;