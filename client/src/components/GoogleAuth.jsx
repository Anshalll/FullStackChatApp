import React from 'react'
import Googleicon from '../assets/google.png'

export default function GoogleAuth({ text }) {

const googleauth =  () => {


    window.open("http://localhost:4000/google/auth" , "_self")
    
    
}

  return (
    <>
      <button onClick={googleauth} className='w-full bg-black text-white p-[10px] rounded-lg flex items-center justify-center gap-[20px]'> <img width={30} src={Googleicon} alt="" />{text}</button>
    </>

  )
}
