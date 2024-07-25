import React, { useState } from 'react'
import { Menu, NotificationsOutlined, Home, Circle , GroupOutlined} from '@mui/icons-material'
import { Link, NavLink , useNavigate} from 'react-router-dom'
import User from '../assets/user.jpg'
import SearchResults from './SearchResults'


export default function Navbar() {

  const [SearchValues, setSearchValues] = useState("")
  const [NewNotifications, setNewNotifications] = useState(true)
  const  navigate = useNavigate()
  return (
    <nav className=' h-full px-[20px]   text-white bg-gray-800 flex justify-between items-center '>
      <div className='flex items-center gap-[20px]'>
        <button className='lg:hidden'><Menu /></button>
        <p>Anshal's chatapp</p>
      </div>


      <div className='h-[50px] realtive w-[40%] bg-black rounded-full'>


        <input type="text" placeholder='Search for something..' className='w-full text-sm px-[20px] h-full outline-none bg-transparent rounded-full' onChange={(e) => setSearchValues(e.target.value)} />

        {SearchValues && <SearchResults />}

      </div>


      <div className='flex gap-[20px] items-center text-sm text-white'>
        <NavLink to="/creategroup" className={({ isActive }) => `${isActive ? "text-[crimson]"  :  "text-white"}  `}><GroupOutlined/></NavLink>
        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-[crimson]" : "text-white"}`}><Home /></NavLink>

        <button className='flex items-center relative' onClick={() => {
          setNewNotifications(false)
          navigate("/notifications")
          }}>

          <div className='flex flex-col w-full'>

            <NotificationsOutlined />{NewNotifications?  <Circle className='absolute text-[crimson] top-[10px] left-[50%]' sx={{ fontSize: 10 }} /> : "" }

          </div>

        </button>


        <Link to="/profile" className='bg-[crimson] py-[7px] active:bg-red-700 px-[20px] rounded-xl'><p className='flex  items-center gap-[20px]'><img src={User} className="w-[20px] h-[20px]  rounded-full bg-black" alt="" />Profile</p></Link>
      </div>
    </nav>
  )
}
