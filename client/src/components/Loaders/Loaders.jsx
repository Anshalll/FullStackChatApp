import React from 'react'
import { Loop } from '@mui/icons-material'
export function LayoutLoader() {
  return (
    <div className='w-[100vw] h-[100vh] text-white  bg-gray-900 flex items-center justify-center p-[5px]'>


      <div className='loader'>
          <Loop/>
      </div>

    </div>
  )
}

