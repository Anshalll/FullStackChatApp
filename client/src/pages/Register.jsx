import React, { useState, useRef } from 'react';
import Recaptcha from '../shared/Recaptcha.jsx';
import Verifyregisterotp from '../components/Verifyregisterotp.jsx'
import { Link } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth.jsx';
import { ApisComman } from '../utils/ApisComman.js';
import { useFormsMutation } from '../redux/Apis/Apis.js';

const Register = () => {

  const [RecaptchaVal, setRecaptchaVal] = useState(false);
  const [recaptchaToken, setrecaptchaToken] = useState("");
  const [VerifyRegister, setVerifyRegister] = useState(false)
  const [Error, setError] = useState("");
  const [Data, setData] = useState({})
  const recaptchaRef = useRef(null)
  const [RegisterUser, { isLoading }] = useFormsMutation()


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const data = new FormData(e.target);
    data.append("hcaptchaToken", recaptchaToken);
    const datatosend = Object.fromEntries(data);
    console.log(datatosend)
    const response = await ApisComman(RegisterUser , datatosend , "verifyregister" , setError  , "POST" , null , RecaptchaVal , recaptchaRef)

    if (response) {
     setData(datatosend)
     setVerifyRegister(true)
    
    }

  };




  return (
    <>
      {VerifyRegister ? <Verifyregisterotp data={Data} /> : <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[22%]  p-8 space-y-3 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {Error && <p className='text-[crimson] font-bold'>{Error}</p>}
          <GoogleAuth text={'Register with google'} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name='email'
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name='name'
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name='username'
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name='password'
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name='cpass'
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          {isLoading ? "Loading..." :   <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>}
          </form>

          <Recaptcha recaptchaRef={recaptchaRef} setRecaptchaVal={setRecaptchaVal} setrecaptchaToken={setrecaptchaToken} setError={setError} />
          <Link to="/login" className='w-full text-center flex items-center justify-center text-cyan-500 font-bold'>Alredy have an account? Login!</Link>

        </div>
      </div>}
    </>

  );
};

export default Register;
