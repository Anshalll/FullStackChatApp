import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedProfile } from '../redux/Searchedprofile/SearchprofileSlice'
import { useFormsMutation } from '../redux/Apis/Apis'
import { setLoggeduserdata } from '../redux/Loggeduser/Slice'
import SearcheduserDataList from './EditStateprofile/SearcheduserDataList'

import Notfound from '../components/NotFound'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

import BackgroundImage from './BackgroundImage'
import Dpimage from './Dpimage'
import UserStats from './UserStats'



export default function SearchedProfile({ username }) {

    const [FindSearchProfile] = useFormsMutation()
    const [UpdateUserStats] = useFormsMutation()

    const [StateType, setStateType] = useState(null)

    const [HandleOptionState, setHandleOptionState] = useState(false)
    const OptionsRef = useRef()
    const [ProfileError, setProfileError] = useState(false)
    const dispatch = useDispatch()
    const { searchedprofiledata, loading } = useSelector((state) => state.SearchprofileSlice)
    const { loggedUserData, loading: loadingLoggedudata } = useSelector((state) => state.Loggeduserslice)


    useEffect(() => {

        if (username) {

            let data = { username }

            let find_profile = async () => {
                const rcvd_resp = await FindSearchProfile({ path: '/api/searchdata', method: "POST", data })


                if (rcvd_resp?.data?.udata) {

                    dispatch(setSearchedProfile(rcvd_resp?.data?.udata))
                }
                else if (rcvd_resp?.error) {
                    setProfileError(true)
                }

            }

            find_profile()
        }

    }, [username, FindSearchProfile, dispatch])


    const Handleoptions = () => {

        setHandleOptionState(prev => !prev)

    }


    useEffect(() => {
        if (HandleOptionState && OptionsRef) {

            const WindowClick = (e) => {
                if (e.target !== OptionsRef.current && !OptionsRef.current.contains(e.target)) {
                    setHandleOptionState(false)
                }
            }

            window.addEventListener('click', WindowClick)


            return () => {
                window.removeEventListener('click', WindowClick)
            }

        }

    }, [HandleOptionState, OptionsRef])

    const HandleProfileFollow = async (e, searcheduser, loggeduser) => {

        e.preventDefault()

        let sallow_logged = { ...loggedUserData, following: [...loggedUserData.following] }

        sallow_logged.following.push(searcheduser)


        let sallow_searched = { ...searchedprofiledata, followers: [...searchedprofiledata.followers] }


        sallow_searched.followers.push(loggeduser)


        let data = { logged: sallow_logged, searched: sallow_searched }

        const rcvd_resp = await UpdateUserStats({ path: '/api/followunfollowuser', method: "PUT", data })
        if (rcvd_resp.error?.error) {
            console.error("An error occured!")
        }
        if (rcvd_resp.data?.success) {

            dispatch(setLoggeduserdata(rcvd_resp.data?.updated_logged))

            dispatch(setSearchedProfile(rcvd_resp.data?.updated_searched))
        }


    }

    const HandleProfileUnfollow = async (e, searcheduser, loggeduser) => {

        e.preventDefault()

        let sallow_logged = { ...loggedUserData, following: loggedUserData.following.filter(e => e._id !== searcheduser) }

        dispatch(setLoggeduserdata(sallow_logged))

        let sallow_searched = { ...searchedprofiledata, followers: searchedprofiledata.followers.filter(e => e._id !== loggeduser) }

        dispatch(setSearchedProfile(sallow_searched))

        let data = { logged: sallow_logged, searched: sallow_searched }

        const rcvd_resp = await UpdateUserStats({ path: '/api/followunfollowuser', method: "PUT", data })

        if (rcvd_resp.error?.error) {

            console.error("An error occured!")

        }
        if (rcvd_resp.data?.success) {

            dispatch(setLoggeduserdata(rcvd_resp.data?.updated_logged))

            dispatch(setSearchedProfile(rcvd_resp.data?.updated_searched))
        }


    }



    return (
        <>

            <div className='flex justify-center w-full'>

                {ProfileError ? <Notfound /> : (loading || loadingLoggedudata ? "Loading...." : (<>


                    <div className='w-[1500px] Scroller relative  h-full flex-col flex gap-[20px] overflow-y-auto '>

                        {StateType && <SearcheduserDataList setStateType={setStateType} StateType={StateType} />}

                        <BackgroundImage image={searchedprofiledata.backgroundimage} />
                        <div className='w-full flex justify-between'>

                            <div className='flex items-center gap-[20px]'>
                                <Dpimage image={searchedprofiledata.dpimage} />

                                <div className='flex flex-col gap-[20px]'>

                                    <p>{searchedprofiledata.belongsto?.name}</p>
                                    <p>{searchedprofiledata.belongsto?.username}</p>
                                    <p>{searchedprofiledata.bio}</p>

                                    {searchedprofiledata.interests.length > 0 && <div className='flex max-w-[600px] gap-[20px] flex-grow'>
                                        {searchedprofiledata.interests?.map((value, index) => (
                                            <p key={index} className='bg-[crimson] relative px-[20px] py-[7px] text-white rounded-lg'>{value}</p>
                                        ))}
                                    </div>}


                                </div>



                            </div>


                            <div className='flex items-center flex-col gap-[20px]'>

                                <UserStats setStateType={setStateType} posts={searchedprofiledata.posts.length} groups={searchedprofiledata.groups.length} followers={searchedprofiledata.followers.length} following={searchedprofiledata.following.length} />


                                {loggedUserData.following.some((user) => user._id === searchedprofiledata._id) ? <button className='bg-cyan-500text-white rounded-lg p-[7px] w-full' onClick={(e) => HandleProfileUnfollow(e, searchedprofiledata._id, loggedUserData._id)}>Following</button> : <button onClick={(e) => HandleProfileFollow(e, searchedprofiledata._id, loggedUserData._id)} className='bg-green-500 text-white rounded-lg p-[7px] w-full'>Follow</button>}

                                <div className='flex items-center w-full justify-center gap-[20px]'>

                                    <button className='w-full bg-white border-2 border-black rounded-full p-[7px] font-bold flex items-center gap-[20px] justify-center'><EmailOutlinedIcon /> Message </button>


                                    <div ref={OptionsRef} className='flex relative'>

                                        <button onClick={Handleoptions} className='w-max'><MoreVertOutlinedIcon /></button>

                                        {HandleOptionState && <span className='absolute bg-white flex flex-col gap-[20px] bg-whiite shadow-xl right-[40px] w-[150px] p-[10px]'>

                                            <button className='items-center gap-[10px] flex w-full border-b border-gray-300 p-[3px]'><ShareOutlinedIcon sx={{ fontSize: 13 }} />Share</button>
                                            <button className='items-center gap-[10px] text-[crimson] flex w-full border-b border-gray-300 p-[3px]'><BlockOutlinedIcon sx={{ fontSize: 13 }} /> Block</button>
                                            <button className='items-center gap-[10px] text-[crimson] flex w-full border-b border-gray-300  p-[3px]'><ReportOutlinedIcon sx={{ fontSize: 13 }} />Report</button>


                                        </span>}




                                    </div>

                                </div>

                            </div>



                        </div>


                        <div className='flex flex-col gap-[20px] items-center justify-center w-full'>

                            <h1 className='font-bold text-lg w-full'>User post</h1>
                            <div className='w-full grid grid-cols-4 gap-[40px] py-[20px]'>

                                {searchedprofiledata?.posts.map((value, index) => (


                                    <div key={index} className='w-[350px] h-[350px] hover:w-[355px] hover:h-[355px]'>
                                        <img src={value.path} className='w-full rounded-sm h-full object-cover onject-center' alt="" />
                                    </div>

                                ))}

                            </div>
                        </div>

                    </div>  </>))}

            </div>
        </>


    )
}
