import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';


import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';


import { NavLink } from 'react-router-dom';

export default function SidebarChat() {
    return (
        <div className='w-[400px] h-full flex flex-col gap-[20px]  bg-black shadow-lg'>

            <div className='flex justify-between w-full items-center p-[20px]'>

                <NavLink to={'/'} className={({ isActive }) => `${isActive ? "text-[crimson] border-b border-[crimson]" : "text-white" }`}><HomeOutlinedIcon /></NavLink>

                <NavLink to={'/chat'} className={({ isActive }) => `${isActive ? "text-[crimson]" : "text-white"} `}><ChatBubbleOutlineOutlinedIcon /></NavLink>

                <NavLink to={'/groups'} className={({ isActive }) => `${isActive ? "text-[crimson]" : "text-white"}  `}><Groups3OutlinedIcon /></NavLink>


            </div>

        </div>
    )
}


