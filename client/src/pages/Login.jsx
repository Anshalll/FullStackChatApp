import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from '../shared/Recaptcha';
import { ApisComman } from '../utils/ApisComman';
import GoogleAuth from '../components/GoogleAuth';
import { useFormsMutation } from '../redux/Apis/Apis';


export default function Login (){

  const [RecaptchaVal, setRecaptchaVal] = useState(false);
  const [recaptchaToken, setrecaptchaToken] = useState("");
  const [Error, setError] = useState("");
  const recaptchaRef = useRef(null)
  const [LoginUser, { isLoading  }] = useFormsMutation()



  const handleSubmit = async (e) => {

    e.preventDefault();
 
    const data = new FormData(e.target);
    data.append("hcaptchaToken", recaptchaToken);

    
    const datatosend = Object.fromEntries(data.entries());

    console.log(datatosend)

    const response = await ApisComman(LoginUser , datatosend , "login" , setError ,  "POST" , null , RecaptchaVal , recaptchaRef)
    if (response) {
     
      window.location.href = "http://localhost:3000"
  }

  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {Error && <p className='text-[crimson] font-bold'>{Error}</p>}
        <GoogleAuth text={"Login with google"} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="useremail" id='useremail' className="block text-sm font-medium text-gray-700">Email or username</label>
            <input
              type="text"
              id="useremail"

              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="useremail"

         
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         
            />
          </div>
          {isLoading ? "Loading..." : <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>}
        </form>
        <Link to="/forgotpassword" className='w-full text-center flex items-center justify-center text-cyan-500 font-bold'>Forgot password?</Link>
        <Recaptcha recaptchaRef={recaptchaRef} setRecaptchaVal={setRecaptchaVal} setrecaptchaToken={setrecaptchaToken} setError={setError} />
        <Link to="/register" className='w-full text-center flex items-center justify-center text-cyan-500 font-bold'>New? Create an Account!</Link>
      </div>
    </div>

  );
};


