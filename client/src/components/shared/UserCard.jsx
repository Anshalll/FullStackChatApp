import React from 'react'
const UserCard = ({ image, username, newMessage, newMessageCount }) => {
    return (
        <div className="flex items-center justify-between w-full">

        <div className='flex flex-col gap-[10px]'>

          <div className='flex gap-[20px] items-center'>
            <img src={image} className='w-[30px] h-[30px] object-cover object-center rounded-full' alt="Loading" />
            <p className='font-bold'>{username}</p>
          </div>
          <p>{newMessage}</p>
        </div>
        <p className='bg-gray-900 w-[20px] h-[20px] flex text-sm items-center justify-center rounded-full'>{newMessageCount}</p>

        </div>
    )
}

export default UserCard