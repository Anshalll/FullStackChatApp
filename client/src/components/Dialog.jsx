import React from 'react'

export default function Dialog({message ,   handleDialog  }) {
  return ( 
    <div className='absolute z-[1] flex items-center justify-center h-screen w-[100vw] '>
            <dialog open className='bg-white w-[20%] h-[30%] gap-[20px] flex-col flex items-center justify-center'> 
              {message}
                <button onClick={handleDialog} className='font-bold bg-blue-400 px-[30px] py-[7px]'>ok</button>
            </dialog>
    </div>  
  )
}
