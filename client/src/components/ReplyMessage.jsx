import React from 'react'
import { CloseOutlined } from '@mui/icons-material'
export default function ReplyMessage({ data }) {
  return (
    <>
    {data !== "" ? <div className='text-white w-full justify-between flex text-sm p-[10px] rounded- bg-gray-800 mb-[10px]'>
      <div className='w-[95%]  flex flex-col justify-center  gap-[10px] '>

      <p className='font-bold '>Replying</p>
      <p className='text-gray-300'>{data.msg}</p>
      </div>
      <div className='w-[5%] flex items-center justify-center'>
        <button className='flex w-[20px] h-[20px] p-[5px] items-center justify-center bg-white rounded-full'><CloseOutlined sx={{ fontSize: 20 }} className='text-black'/></button>
      </div>
    </div> : <></>}
    </>
  )
}
