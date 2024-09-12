import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Dialog from '../components/Dialog';
import { ApisComman } from '../utils/ApisComman';
import { useFormsMutation } from '../redux/Apis/Apis';

export default function Resetpass() {
  const [Checkurl, setCheckUrl] = useState(undefined);
  const { id } = useParams();
  const [Error, setError] = useState("")
  const [Success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [Resetpass, { isLoading }] = useFormsMutation()


  useEffect(() => {
    const main = async () => {
      const data  = {url : id}
 
      const response = await ApisComman(Resetpass, data , "verifyresetpass", setCheckUrl, "POST" , "checkurl" , null , null)
      if (response) {
          setCheckUrl(true)
      }

    };

    main();
  }, [id , Resetpass]);

  if (Checkurl === undefined) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e) => {

    e.preventDefault();


    const data = new FormData(e.target);
    data.append("url", id)
    const datatosend = Object.fromEntries(data);


    const response = await ApisComman(Resetpass, datatosend, "updatepassurl", setError, "PATCH" , "updatepassurl" , null , null)
    console.log(response)
    if (response) {
      setSuccess(true)
    }

  }


  const HandleDialog = () => {

    navigate('/login')
  }



  return (
    <>
      {Checkurl ?   (Success === true ? <Dialog message={<p className='text-center'>
        Password changed
      </p>
      } handleDialog={HandleDialog} /> : <div className='h-screen w-full flex items-center justify-center'><div className="w-[20%] p-8 space-y-3  bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {Error && <p className='text-[crimson]'>{Error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pass" id='newpass' className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="pass"

              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="pass"

              required
            />
          </div>
          <div>
            <label htmlFor="cpass" className="block text-sm font-medium text-gray-700">Confirm password</label>
            <input
              type="password"
              name="cpass"
              id="cpass"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isLoading ? "Loading..." : <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset
          </button>}
        </form>

      </div></div>) : (<NotFound />)

      }
    </>
  );
}
