import React from 'react'

export default function BackgroundImage({  image }) {




  return (
    <>

     <div className='w-full h-[400px]'>  
        <img src={image} alt="" className='rounded-lg w-full h-full object-cover object-center' />
    </div> 


    </>

  )
}
