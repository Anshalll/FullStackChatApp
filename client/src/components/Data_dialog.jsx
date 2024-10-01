import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export default function Data_dialog({ ShowModal , Data , Typedata , closeDialog}) {
  return (
    <>
    {ShowModal &&   <dialog  className='flex items-center  justify-center bottom-[20%]'>
      <div className='w-[500px] h-[600px] rounded-lg bg-white p-[20px]  shadow-2xl'>
          <div className='flex justify-between items-center h-[40px]'>
              <p className='font-bold'>{Typedata}</p>
              <button onClick={closeDialog} className='text-gray-600'>
                  <CloseOutlinedIcon />
              </button>
          </div>

          <input
              type="text"
              className='w-full h-[40px] p-2 border rounded'
              placeholder='Search for user...'
          />
          <div className='h-[calc(100%-80px)] flex flex-col gap-[20px] overflow-y-auto'>
              
              {Data.length > 0 ? "Loading.." : <p className='w-full h-full flex items-center justify-center text-lg font-bold'>Nothing to show</p>}

          </div>
            

      </div>
     
  </dialog>}

  </>
  )
}
