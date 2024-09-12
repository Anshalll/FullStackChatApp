import React, { useState , useRef } from 'react'

import Recaptcha from '../shared/Recaptcha.jsx'
import { ApisComman } from '../utils/ApisComman.js'
import { useFormsMutation } from '../redux/Apis/Apis.js'

export default function Verifyregisterotp({data}) {

  const [otpvalue, setotpvalue] = useState("")
  const recaptchaRef = useRef(null)
  const [Error , setError] = useState()
  const [RecaptchaVal, setRecaptchaVal] = useState(false);
  const [recaptchaToken, setrecaptchaToken] = useState("");
  const  [Message , setMessage] = useState("")
  const  [Verifyotp , {isLoading} ] = useFormsMutation()


  const HandleSubmit = async () => {

    data.hcaptchaToken = recaptchaToken
    data.value = otpvalue
    console.log(data)
    const response = await ApisComman(Verifyotp , data , "register" , setError , "POST" , null  , RecaptchaVal , recaptchaRef)
    console.log(response)
    if (response) {
        window.location.href = "http://localhost:3000"
    }
        
  }



  const Resendotp = async () => {

 

    data.hcaptchaToken = recaptchaToken
    delete data.value
    
    console.log(data);

    const response = await ApisComman(Verifyotp , data , "verifyregister" , setError , "POST" , null  , RecaptchaVal , recaptchaRef)
    
    if (response) {
      setMessage("Oto sent!")

        setTimeout(() => {
          setMessage("")
        } , 3000)
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
      
      <h1>Verify otp sent to {data.email}</h1>
      {Error && <p className='text-[crimson] font-bold'>{Error}</p>}
      {Message && <p className='text-green-500'>{Message}</p>}


      <label htmlFor="email" className="block text-sm font-medium text-gray-700">otp</label>
      <input
        type="text"
        id="value"
        value={otpvalue}

        onChange={(e) => setotpvalue(e.target.value)}
        className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

     {isLoading ? "Loding..." :  <button
        onClick={HandleSubmit}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Verify
      </button>}
      <button onClick={Resendotp}>Resend otp</button>
      <Recaptcha recaptchaRef={recaptchaRef} setRecaptchaVal={setRecaptchaVal}  setrecaptchaToken={setrecaptchaToken} setError={setError} />

      </div>


    </div>
  )
}
