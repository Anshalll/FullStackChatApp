import React from 'react'
import { Link } from 'react-router-dom'
import Verified from '../assets/verified.png'
import Linkimg from '../assets/linksimg.png'
import { Menu } from '@mui/icons-material'

import ProfileImg from '../components/shared/ProfileImg'

import AppLayout from '../layout/AppLayout'
const Profile = () => {


    const user = true

    return (
      <>
          <div className='h-[100%] w-[100%] text-white overflow-y-auto  flex flex-col'>

           

            <ProfileImg Cover={'https://scx2.b-cdn.net/gfx/news/hires/2017/evidencethat.jpg'} Pfp={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmzYfSfHLV6Lfvl5-LcfQFnl-6kNNhYXyew&s"}/>


            <div className='flex items-center justify-between w-full px-[30px]'>
                <div className='flex flex-col gap-[10px] justify-center'>
                    <p>Anshal kumar</p>
                    <i className='text-gray-400'>@anshal918</i>
                    <p>"This is anshal the great/."</p>
                </div>


      

            <div className='flex flex-col gap-[20px]  '>
                {user? <button className='flex w-[10rem] h-[40px] rounded-full items-center justify-center bg-green-500 text-black'>Edit</button> : <button  className='flex w-[10rem] h-[40px] rounded-lg items-center justify-center  bg-[crimson] text-white'>Follow</button> }


                <div className='flex  gap-[20px]  font-bold '>
                    <p className='text-center'>200 <br /> Followers</p>
                    <p className='text-center'>50 <br /> Following</p>
                 </div>


            </div>



            </div>


            <div className='flex flex-col px-[30px] mt-[2rem]'>
                <p className='text-xl font-bold text-[crimson]'>Post</p>
            </div>

            </div>

      

      </>

    )
}

export default AppLayout()(Profile)