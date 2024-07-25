import React from 'react'
import AppLayout from '../layout/AppLayout'
import Profileimg from '../components/shared/ProfileImg'
import {Person} from '@mui/icons-material'
import Usercard from '../components/shared/UserCard'




const GroupInfo = () => {


    const user  = true

    const data = [
        {
            name : "Manish",
            newMessage: ["this is manish"],
            image: 'https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg'

            
        }
    ]

    return (
        <div className='h-[100%] w-[100%] gap-[20px] text-white  overflow-y-auto  flex flex-col'>



            <Profileimg/>

            <div className='w-full justify-between items-center flex text-white px-[20px]'>
                <div className='flex flex-col gap-[20px]'>
                        <h1 className='font-bold text-lg'>Anshal's Group</h1>
                        <p className='max-w-[600px] text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero expedita aspernatur doloribus fuga eligendi voluptatum? Perspiciatis, eius autem. Illo, ratione impedit necessitatibus id eveniet vel, at, veniam hic quia eligendi commodi iusto.</p>
                </div>

                <div className='flex flex-col gap-[20px]'>
                {user? <button className='flex w-[10rem] h-[40px] rounded-full items-center justify-center bg-green-500 text-black'>Edit</button> : <button  className='flex w-[10rem] h-[40px] rounded-lg items-center justify-center  bg-[crimson] text-white'>Join</button> }
                
                <h1><Person/> Total users 200</h1>
                <p className='text-gray-400'>Started 2 days ago</p>
                </div>  
             
            </div>


            <div className='flex flex-col gap-[20px] text-white px-[20px] bg-black p-[10px] rounded-lg'>
                <h1 className='text-lg font-bold '>Members</h1>
                   {data.map((value , idnex) => {
                    return   <Usercard username={value.name}  image={value.image}/>
                   })}
                   
                </div>

        </div>
    )
}

export default AppLayout()(GroupInfo)