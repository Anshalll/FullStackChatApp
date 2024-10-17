import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import BackgroundImage from './BackgroundImage'
import Dpimage from './Dpimage'
import Profiledetailsupdate from './EditStateprofile/Profiledetailsupdate'
import UserStats from './UserStats'
import DataList from './EditStateprofile/DataList'
import EditBg from './EditStateprofile/EditBg'
import EditDp from './EditStateprofile/EditDp'
import CreatepostDialog from './CreatepostDialog'



export default function ProfileData() {

    const [EditState, setEditState] = useState(false)

    const [DpUpdate , setDpUpdate] = useState(null)
    const [BgUpdate , setBgUpdate] = useState(null)
    const [DpError, setDPError] = useState(null)
    const [BgError, setBgError] = useState(null)
    const [StateType, setStateType] = useState(null)

    const [InterestsData , setInterestsData] = useState([])
  
    const { loggedUserData, loading } = useSelector((state) => state.Loggeduserslice)

    return (


        <>
            {loading ? <p>Loading...</p> : <div className='relative w-full h-full flex-col flex gap-[20px] overflow-y-auto '>

                {StateType  &&   <DataList setStateType={setStateType} StateType={StateType}/> }
                  <CreatepostDialog/>
               {EditState ? <EditBg  BgError={BgError} setBgUpdate={setBgUpdate} image={loggedUserData.backgroundimage}/> :  <BackgroundImage  image={loggedUserData.backgroundimage} />}
                <div className='w-full flex justify-between'>

                    <div className='flex items-center gap-[20px]'>

                        <div className='flex flex-col'>

                        {EditState ? <EditDp  DpError={DpError} setDpUpdate={setDpUpdate} image={loggedUserData.dpimage}/> :  <Dpimage  image={loggedUserData.dpimage}/>}

                        </div>
                        {!EditState && <div className='flex flex-col gap-[20px]'>

                            <p>{loggedUserData.belongsto?.name}</p>
                            <p>{loggedUserData.belongsto?.username}</p>
                            <p>{loggedUserData.bio}</p>

                            {loggedUserData.interests.length > 0 && <div className='flex max-w-[600px] gap-[20px] flex-grow'>
                                {loggedUserData.interests?.map((value, index) => (
                                    <p key={index} className='bg-[crimson] relative px-[20px] py-[7px] text-white rounded-lg'>{value}</p>
                                ))}
                            </div>}


                        </div>}

                        {EditState && <Profiledetailsupdate setBgError={setBgError} setDPError={setDPError} BgUpdate={BgUpdate} DpUpdate={DpUpdate} InterestsData={InterestsData} setInterestsData={setInterestsData} />}

                    </div>


                    <div className='flex items-center flex-col gap-[20px]'>

                        <UserStats setStateType={setStateType} posts={loggedUserData.posts.length} groups={loggedUserData.groups.length} followers={loggedUserData.followers.length} following={loggedUserData.following.length} />


                        {EditState ? <button className='bg-[crimson] text-white rounded-lg w-full p-[7px]' onClick={() => setEditState(false)}>Cancel</button> : <button onClick={() => setEditState(true)} className='bg-[crimson] text-white rounded-lg w-full p-[7px]'>Edit profile</button>}

                    </div>

                </div>
{/* 
                <div className='flex items-center gap-[20px]'>
                    <p>Posts</p>
                    <p>Groups</p>
                  


                </div> */}

            </div>}

        </>


    )
}
