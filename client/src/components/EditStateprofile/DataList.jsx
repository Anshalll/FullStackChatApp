import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useFormsMutation } from '../../redux/Apis/Apis';
import { setLoggeduserdata } from '../../redux/Loggeduser/Slice';

export default function DataList({ StateType, setStateType }) {

  const { loggedUserData } = useSelector((state) => state.Loggeduserslice)


  const [Data, setData] = useState(loggedUserData)
  const dispatch = useDispatch()
  const [UpdateUserStats] = useFormsMutation()
  const [SearchTerm, setSearchTerm] = useState("")

  const HandleProfileUnfollow = async (e, user) => {

    e.preventDefault()

    let sallow_logged = { ...loggedUserData, following: [...loggedUserData.following.filter(e => e._id !== user._id)] }

    dispatch(setLoggeduserdata(sallow_logged))


    let sallow_user = { ...user, followers: [...user.followers.filter(e => e._id !== loggedUserData._id)] }



    const update_user = await UpdateUserStats({ path: '/api/followunfollowuser', method: "PUT", data: { logged: sallow_logged, searched: sallow_user } })

    if (update_user?.error) {
      console.error('An error occured!')
    }

  }

  const HandleProfileFollow = async (e, user) => {


    e.preventDefault()
    let sallow_logged = { ...loggedUserData, following: [...loggedUserData.following] }
    sallow_logged.following.push(user)
    dispatch(setLoggeduserdata(sallow_logged))

    let sallow_user = { ...user, followers: [...user.followers] }
    let update_sallow_data = sallow_user.followers.filter(e => e._id !== loggedUserData._id)
    update_sallow_data.push(sallow_logged)
    sallow_user.followers = update_sallow_data


    let data = { logged: sallow_logged, searched: sallow_user }
    const update_user = await UpdateUserStats({ path: '/api/followunfollowuser', method: "PUT", data })

    if (update_user?.data?.success) {

      setData(sallow_logged)

    }
    if (update_user?.error?.error) {
      console.error("An error occured!")
    }

  }


  const HandleFollowersRemove = async (e, user) => {
    e.preventDefault()

    const sallow_logged = { ...loggedUserData, followers: [...loggedUserData.followers.filter(e => e._id !== user._id)] }


    const sallow_user = { ...user, following: [...user.following.filter((e => e._id !== loggedUserData._id))] }

    const update_user = await UpdateUserStats({ path: '/api/updatefollowers', method: "PATCH", data: { logged: sallow_logged, searched: sallow_user } })


    if (update_user?.data?.success) {

      setData(sallow_logged)
      dispatch(setLoggeduserdata(sallow_logged))

    }


    if (update_user?.error) {
      console.error('An error occured!')
    }



  }

  const HandleDataSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)

    let dtype = StateType.toLowerCase()
    let searchQuery = e.target.value;
   
    let findings = loggedUserData[dtype]?.filter((e) => {
        return e.belongsto.username?.toLowerCase().includes(searchQuery?.toLowerCase())
    });

    
    let sallow_data = {...Data , dtype: [...Data[dtype]]}
    sallow_data[dtype] = findings
    setData(sallow_data)


    if (!e.target.value) {
      setData(loggedUserData)
    }

  }

  return (
    <div className=' absolute w-[100%] flex h-full items-center justify-center'>

      <dialog open className='shadow-xl h-[700px] bg-white w-[800px] rounded-lg'>
        <div className='h-[60px] px-[20px] border-b-2 border-gray-300 flex items-center justify-between'>
          <p className="text-[14px]">{StateType}</p>
          <button onClick={() => setStateType(null)}><CloseIcon /></button>
        </div>

        <div className='h-[60px] w-full p-[7px] '>
          <div className='flex w-full h-full items-center border-2 border-gray-300 rounded-lg px-[20px]'>
            <SearchOutlinedIcon className='w-[5%] h-full' />
            <input onChange={(e) => HandleDataSearch(e)} value={SearchTerm} type="text" className='w-full h-full px-[20px]  rounded-lg outline-none  w-[95%]' placeholder='Search user' />
          </div>

        </div>

        <div className='h-[calc(100%-120px)] w-full '>

          {
            StateType.toLowerCase() === "followers" &&  Data?.followers && (
              Data?.followers?.length > 0 ?
                <div className='w-full  h-full flex flex-col overflow-y-auto gap-[20px] p-[20px]'>
                  {Data?.followers?.map((value, index) => (
                    <a href={`/profile?user=${value.belongsto?.username}`} key={index} className='w-full flex items-center justify-between'>
                      <div className='flex items-center gap-[20px]'>
                        <img src={value?.dpimage} alt="" className='w-[60px] h-[60px] object-center object-cover  rounded-lg' />


                        <div className='flex flex-col gap-[10px]'>
                          <p>{value.belongsto?.username}</p>
                          <i>{value.belongsto?.name}</i>

                        </div>
                      </div>

                      <div className='flex gap-[20px] items-center'>

                        {loggedUserData.following.some(e => e._id === value._id) ? <button onClick={(e) => HandleProfileUnfollow(e, value)} className='bg-cyan-500 font-bold px-[40px] py-[10px] rounded-lg'>Following</button> : <button onClick={(e) => HandleProfileFollow(e, value)} className='bg-green-500 font-bold px-[40px] py-[10px] rounded-lg'>Follow</button>}

                        {<button onClick={(e) => HandleFollowersRemove(e, value)} className='bg-black text-white px-[40px] py-[10px] rounded-lg'>Remove</button>}
                      </div>

                    </a>
                  ))}

                </div>
                : <p className='w-full h-full flex items-center justify-center text-4xl font-bold'>No data</p>)

          }

          {
            StateType.toLowerCase() === "following" && (Data?.following?.length > 0 ?
              <div className='w-full  h-full flex flex-col overflow-y-auto gap-[20px] p-[20px]'>


                {Data?.following?.map((value, index) => (
                  <a href={`/profile?user=${value.belongsto?.username}`} key={index} className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-[20px]'>
                      <img src={value?.dpimage} alt="" className='w-[60px] h-[60px] object-center object-cover  rounded-lg' />


                      <div className='flex flex-col gap-[10px]'>
                        <p>{value.belongsto?.username}</p>
                        <i>{value.belongsto?.name}</i>

                        {loggedUserData.followers.some((uid) => uid._id === value._id) && <p className='w-max rounded-lg bg-yellow-500 p-[4px]'>Follows you</p>}


                      </div>
                    </div>

                    <div>

                      {loggedUserData.following.some((udata) => udata._id === value._id) ? <button onClick={(e) => HandleProfileUnfollow(e, value)} className='bg-cyan-500 font-bold px-[40px] py-[10px] rounded-lg'>Following</button> : <button onClick={(e) => HandleProfileFollow(e, value)} className='bg-green-500 font-bold px-[40px] py-[10px] rounded-lg'>Follow</button>}




                    </div>

                  </a>
                ))}
              </div>

              :

              <p className='w-full h-full flex items-center justify-center text-lg font-bold tracking-wider'>No data</p>

            )


          }

        </div>
      </dialog>


    </div>
  )
}
