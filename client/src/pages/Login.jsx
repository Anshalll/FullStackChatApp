import React  from 'react'
import { Link } from 'react-router-dom'
// import {RemoveRedEye , PanoramaFishEyeSharp} from '@mui/icons-material'
export default function Login() {

  // const [Showpassword  , setShowpassword] = useState(false)
  const Loginuser = (e) => {
      e.preventDefault()
  }
  return (
  
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-900'>

      <form onSubmit={Loginuser} className='w-[400px] p-[20px] bg-white flex flex-col gap-[20px] items-center justify-center rounded-lg'>
      <h1 className='w-full'>LOGIN</h1>
        <input type="text" name='userremail' placeholder='Enter username or email' className='w-full p-[10px] outline-none border-2 border-black rounded-lg' />
        <div className='flex w-full'>

        <input type='password' name='password' placeholder='Enter password'  className='w-full p-[10px] border-2 border-black rounded-lg'/>
       
        </div>


        <Link>Reset password</Link>
        <button className='rounded-full bg-cyan-500 w-full p-[10px]' type='submit'>Login</button>

        <button  className='rounded-full bg-gray-100 w-full p-[10px] border-2 border-black'>Google</button>
        
        <Link to='/register'>New? Register now!</Link>
      </form>


    </div>
  )
}
