import React from 'react'
export default function Dpimage({  image }) {

  return (
    <>
    
        <div className='w-[200px] h-[200px] rounded-full'>
            <img src={image} alt="" className='w-full h-full rounded-full object-cover object-center' />
        </div> 
    </>
  )
}
