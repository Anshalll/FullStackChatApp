import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggeduserdata } from '../../redux/Loggeduser/Slice';
import { useFormsMutation } from '../../redux/Apis/Apis';

export default function SearcheduserDataList({ setStateType, StateType }) {

    const { searchedprofiledata } = useSelector((state) => state.SearchprofileSlice)

    const [Data, setData] = useState(searchedprofiledata)
    const [UpdateUserStats] = useFormsMutation()

    const { loggedUserData } = useSelector((state) => state.Loggeduserslice)
    const dispatch = useDispatch()

    const HandleProfileFollow = async (e , user) => {

        e.preventDefault()

        let sallow_logged = {...loggedUserData, following: [...loggedUserData.following]}
        sallow_logged.following.push(user)
        dispatch(setLoggeduserdata(sallow_logged))
        
        let sallow_user = {...user , followers: [...user.followers]}
        sallow_user.followers.push(loggedUserData)
       
        let data = {logged: sallow_logged , searched: sallow_user}

        const update_user = await UpdateUserStats({ path: '/api/followunfollowuser' , method: "PUT" , data  })

        if (update_user?.data?.success) {
     
           setData(searchedprofiledata)
          
         }
         if (update_user?.error?.error) {
           console.error("An error occured!")
         }

    }

    const HandleProfileUnfollow = async (e , user) => {
        e.preventDefault()

        let sallow_logged = {...loggedUserData, following: [...loggedUserData.following.filter(e => e._id !== user._id)]}

        dispatch(setLoggeduserdata(sallow_logged))


        let sallow_user = {...user , followers: [...user.followers.filter(e=> e._id !== loggedUserData._id) ] }
      


        let data = {logged: sallow_logged , searched: sallow_user}

        const update_user = await UpdateUserStats({ path: '/api/followunfollowuser' , method: "PUT" , data  })

        
         if (update_user?.error?.error) {
           console.error("An error occured!")
         }



    }

    return (
        <div className=' absolute w-[100%] flex h-full items-center justify-center'>

            <dialog open className='shadow-xl h-[700px] bg-white w-[800px] rounded-lg'>
                <div className='h-[60px] px-[20px] border-b-2 border-gray-300 flex items-center justify-between'>
                    <p className="text-[14px]">{StateType}</p>
                    <button onClick={() => setStateType(null)}><CloseIcon /></button>
                </div>
                <div className='h-[calc(100%-60px)] w-full '>

                    {/* {
            StateType.toLowerCase() === "followers" &&
            (loggedUserData.followers.length > 0 ? "" : <p className='w-full h-full flex items-center justify-center text-4xl font-bold'>No data</p>)

          } */}

                    {
                        StateType.toLowerCase() === "following" && Data?.following.length > 0 ?  (
                            <div className='h-full flex flex-col gap-[20px] p-[20px]'>

                                {Data.following.map((value, index) => (
                                    <a key={index} href={`/profile?user=${value.belongsto?.username}`} className='w-full'>
                                        <div className='w-full flex items-center justify-between'>
                                            <div className='flex items-center gap-[20px]'>
                                                <img src={value.dpimage} alt="" className='w-[60px] h-[60px] rounded-lg object-cover object-center' />
                                                <div className='flex flex-col gap-[20px]'>
                                                    <div className='flex flex-col gap-[10px]'>
                                                        <p>{value.belongsto?.username}</p>
                                                        <i>{value.belongsto?.name}</i>

                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                               {loggedUserData._id === value._id ? <p className='shadow-xl font-bold'>You</p> : (loggedUserData.following.some(e=> e._id === value._id) ? <button onClick={(e)=> HandleProfileUnfollow(e , value)} className='bg-cyan-500 font-bold px-[40px] py-[10px] rounded-lg'>Following</button>  : <button onClick={(e) => HandleProfileFollow(e , value)} className='bg-green-500 font-bold px-[40px] py-[10px] rounded-lg'>Follow</button> )}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                        ) : ( <p className='w-full flex h-full items-center justify-center text-lg font-bold tracking-wider'>No data</p> )
                    }

                </div>
            </dialog>


        </div>
    )
}
