import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Chatitems from './Specific/ChatItems'


export default function Sidebar({ data }) {






  const BaseClass = 'border-b-2 w-[20rem] h-full items-center flex justify-center'
  const ActiveClass = 'border-[crimson] text-[crimson]'

  return (
    <aside className='h-full w-[30rem] bg-gray-800 flex flex-col  text-white  rounded-xl'>
      <div className=' justify-between w-full items-center flex  rounded-t-xl h-[4rem] '>



        <NavLink to="/group" className={({ isActive }) => `${BaseClass} ${isActive ? ActiveClass : ""}`}>Groups</NavLink>
        <NavLink to="/chat" className={({ isActive }) => `${BaseClass} ${isActive ? ActiveClass : ""}`}>Friends </NavLink>

      </div>


      <div className='flex text-white flex-col gap-[20px] h-[calc(100%-4rem)] w-full'>
        <Chatitems data={data} />
      </div>

    </aside>
  )
}
