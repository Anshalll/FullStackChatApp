
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Recaptcha from '../shared/Recaptcha';
import Dialog from '../components/Dialog';
import { ApisComman } from '../utils/ApisComman';
import { useFormsMutation } from '../redux/Apis/Apis';


export default function ForgotPassword() {

    const recaptchaRef = useRef(null)
    const [RecaptchaVal, setRecaptchaVal] = useState(false);
    const [recaptchaToken, setrecaptchaToken] = useState("");
    const [Dialogval, setDialogVal] = useState(false)
    const navigate = useNavigate()
    const [Error, setError] = useState("");
    const [Email, setEmail] = useState("")
    const [Forgotpass, { isLoading }] = useFormsMutation()



    const handleSubmit = async (e) => {

        e.preventDefault()



        const data = new FormData(e.target);
        data.append("hcaptchaToken", recaptchaToken);
        const datatosend = Object.fromEntries(data);

        const response = await ApisComman(Forgotpass, datatosend, "reseturlgeneration", setError, "POST", null, RecaptchaVal, recaptchaRef)

        if (response) {
            setEmail(data.email)
            setDialogVal(true)
        }




    }

    const HandleDialog = () => {

        navigate('/login')
    }

    return (
        <>
            {Dialogval === true ? <Dialog message={<p className='text-center'>A link is  sent to <span className='font-bold'> {Email} </span> for reseting the password </p>
            } handleDialog={HandleDialog} /> : <></>}
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                    {Error && <p className='text-[crimson] font-bold'>{Error}</p>}



                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="useremail" id='useremail' className="block text-sm font-medium text-gray-700">Email or username</label>
                            <input
                                type="text"
                                id="useremail"

                                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="useremail"

                                required
                            />
                        </div>

                        {isLoading ? "Loading..." : <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                        }
                    </form>

                    <Recaptcha recaptchaRef={recaptchaRef} setRecaptchaVal={setRecaptchaVal} setrecaptchaToken={setrecaptchaToken}  setError={setError}/>

                </div>
            </div>

        </>

    )
}
