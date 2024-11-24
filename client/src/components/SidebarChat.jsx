import React from 'react'

import { useSelector } from 'react-redux';


import {  NavLink } from 'react-router-dom';



export default function SidebarChat() {

    const { loggedUserData, loading } = useSelector((state) => state.Loggeduserslice)

    return (
        <div className='w-[400px] h-full flex flex-col gap-[20px]  bg-black shadow-lg px-[20px] relative'>



            <div className='w-full bg-gray-800 rounded-lg p-[10px]'>
                <input type="text" placeholder='Search a user' className='bg-transparent outline-none px-[20px] text-gray-300' />
            </div>

            <div className='w-full h-full overflow-y-auto flex flex-col gap-[20px]'>


                {loading ? <p className='w-full h-full flex items-center justify-center text-white text-lg'>Loading</p> : (loggedUserData?.following?.length !== 0 || loggedUserData?.followers?.length !== 0 ?

                    <div className='flex flex-col gap-[20px]'>
                        <p className='text-white text-lg'>Recommended</p>
                        <>
                            {loggedUserData?.following.slice(0, 50).map((value, index) => (
                                <NavLink to={`/chat?user=${value.belongsto?.username}`}  className='w-full flex items-center gap-[20px]' key={index}>

                                    <img src={value.dpimage} className='w-[40px] h-[40px] rounded-full object-cover' alt="" />
                                    <div className='flex flex-col w-full items-center gap-[10px]'>

                                        <p className='text-white w-full flex'>{value.belongsto.username}</p>
                                        <i className='text-gray-400 w-full flex'>{value.belongsto.name}</i>

                                    </div>
                                </NavLink>


                            ))}

                            {loggedUserData?.followers.slice(0, 50).map((value, index) => (
                                <button className='w-full' key={index}>
                                    <p className='text-white'>{value.name}</p>
                                </button>


                            ))}
                        </>


                    </div>



                    : <p className='w-full h-full flex items-center justify-center text-white text-lg'>No data</p>)}
            </div>

        </div>
    )
}


