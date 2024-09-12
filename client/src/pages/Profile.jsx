import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import EditState from '../components/EditState'

export default function Profile() {
    const [Admin, setAdmin] = useState(false)
    const { userdata, loading } = useSelector((state) => state.userdataslice)
    const [Editmode, setEditMode] = useState(false)
    const [Data, setData] = useState({})

    const location = useLocation()
    const navigate = useNavigate() // Fixed typo here

    const query_instance = new URLSearchParams(location.search)
    const main_profile = query_instance.get("user")

    useEffect(() => {
        if (!loading) {
            const { user } = userdata

            if (user) {
                setData(user)
                if (!main_profile) {
                    navigate(`/profile?user=${user.username}`)
                } else if (main_profile === user.username) {
                    setAdmin(true)
                }
            }
        }
    }, [userdata, loading, main_profile, navigate]) // Included navigate in dependency array

    const HandleEdit = (e) => {
        e.preventDefault()
        if (Admin) {
            setEditMode(true)
        }
    }

    return (
        <>
            {loading ? "Loading..." : (
                <form className='w-full text-[13px] gap-[20px] items-center flex p-[20px] flex-col h-[100vh] overflow-y-auto'>
                    <div className='w-[1500px] flex h-[300px] bg-gray-300 rounded-lg'>
                        {/* Profile Image Placeholder */}
                    </div>
                    <div className='flex gap-[40px] w-[1500px] items-center h-[300px]'>
                        <div className='w-[250px] flex h-[250px] bg-gray-300 rounded-full'>
                            {/* User Avatar Placeholder */}
                        </div>
                        <div className='w-[calc(100%-250px)] flex justify-between h-[200px]'>
                            {Editmode ? (
                                <EditState Data={Data} />
                            ) : (
                                <div className='flex flex-col gap-[20px]'>
                                    <p>{Data.name}</p>
                                    <p>{Data.username}</p>
                                    <p>{Data.bio || "Add bio"}</p>
                                    {Data.interest?.length > 0 && (
                                        <div className='flex gap-[20px] items-center'>
                                            {Data.interest.map((value, index) => (
                                                <p key={index} className='bg-[crimson] px-[20px] py-[7px] text-white rounded-lg'>
                                                    {value}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='flex flex-col gap-[20px]'>
                                <div className='flex gap-[30px]'>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Groups <span className='font-normal'>{Data.group || 0}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Posts: <span className='font-normal'>{Data.posts || 0}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Followers <span className='font-normal'>{Data.followers || 0}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Following: <span className='font-normal'>{Data.following || 0}</span>
                                    </p>
                                </div>
                                {Admin ? 
                                   (Editmode ?  <button type='submit' className='bg-green-500 text-white p-[7px] rounded-lg'>
                                    Save
                                </button> :  <button onClick={HandleEdit} className='bg-[crimson] text-white p-[7px] rounded-lg'>
                                        Edit
                                    </button>)
                                 : (
                                    <button className='bg-green-500 text-white p-[7px] rounded-lg'>
                                        Follow
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}
