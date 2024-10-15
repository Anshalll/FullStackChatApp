import React from 'react'





export default function UserStats({ groups, posts, followers, following }) {



  return (

    <div className='flex items-center gap-[20px]'>

      <button className='bg-black px-[20px] rounded-lg py-[5px] text-white'>Groups: {groups}</button>
      <button className='bg-black px-[20px] rounded-lg py-[5px] text-white'>Post: {posts} </button>
      <button className='bg-black px-[20px] rounded-lg py-[5px] text-white'>Followers: {followers} </button>
      <button className='bg-black px-[20px] rounded-lg py-[5px] text-white'>Following: {following} </button>


    </div>
    
  )
}
