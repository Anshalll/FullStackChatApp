import React from 'react'
import { Link } from 'react-router-dom'



export default function Register() {

 const Registeruser = (e) => {
    e.preventDefault()
 }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-900'>


      
      <form onSubmit={Registeruser} className='w-[400px] p-[20px] bg-white flex flex-col gap-[20px] items-center justify-center rounded-lg'>
      <h1 className='w-full'>SIGN UP</h1>
      <input type="text" name='name' placeholder='Enter your name' className='w-full p-[10px] outline-none border-2 border-black rounded-lg' />
      <input type="text" name='username' placeholder='Enter your username' className='w-full p-[10px] outline-none border-2 border-black rounded-lg'/>
      <input type="text" name='email' placeholder='Enter your email' className='w-full p-[10px] outline-none border-2 border-black rounded-lg'/>


      <div className='flex w-full'>

      <input type='password' name='password' placeholder='Enter password'   className='w-full p-[10px] border-2 border-black rounded-lg'/>
    
      </div>

      
      <div className='flex w-full '>

      <input type='password' name='cpaassword' placeholder='Confirm password'  className='w-full p-[10px] border-2 border-black rounded-lg' />

      </div>

      <button type='submit'  className='rounded-full bg-cyan-500 w-full p-[10px]'>Sign up</button>


      <button  className='rounded-full bg-gray-100 w-full p-[10px] border-2 border-black'>Google</button>
      <Link to='/login'>Login instead</Link>


      </form>



    </div>
  )
}
