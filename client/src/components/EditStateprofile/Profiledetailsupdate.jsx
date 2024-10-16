import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import {useFormsMutation , useFileUploadMutation} from '../../redux/Apis/Apis'



export default function Profiledetailsupdate({  setInterestsData, InterestsData , BgUpdate , DpUpdate , setDPError , setBgError }) {

   
 
    const { loggedUserData } = useSelector((state) => state.Loggeduserslice)
    const [UpdateProfile] = useFormsMutation()
    const [UpdateBg] = useFileUploadMutation()

    const [InterestValue, setInterestValue] = useState("")
    const [InterestError , setInterestError] = useState("")
    const [UsernameError, setUsernameError] = useState("")
    
    const [Name, setName] = useState(loggedUserData.belongsto?.name)
    const [Username, setUsername] = useState(loggedUserData.belongsto?.username)
    const [Bio, setBio] = useState(loggedUserData?.bio)


    useEffect(() => {
        setInterestsData(loggedUserData.interests)
            
    } , [loggedUserData.interests , setInterestsData])


    const HandleInterests = (e) => {
 
        if (e.key === ',') {
            e.preventDefault() 
            if (InterestValue.trim()) {
                if (InterestsData.length < 5) {

                    setInterestsData((values) => [...values, InterestValue.trim() ])
                    setInterestValue("")

                }
                else{
                    setInterestError("Only five allowed!")
                }

            }
          }
    }


    const RemoveInterests = (index) => {
        setInterestsData((value) => value.filter((_ , i) => i !== index))

    }

    const BGupdatehandle = async () => {
        if (BgUpdate) {
            let bg = new FormData()
            bg.append("bg" , BgUpdate)
            let rcvd_resp = await UpdateBg({  path: '/api/updatebg', method: "PATCH" , data: bg  })

            if (rcvd_resp.error) {
                
                setBgError(rcvd_resp.error?.error)
                setTimeout(() => {
                    setBgError(null)
                } , 3000)

               return false
            }
           
            else{
                return true
            }
        }

        return true
    }

    const Dpupdatehandle = async () => {
        if (DpUpdate) {
            let dp = new FormData()
            dp.append("dp" , DpUpdate)
            let rcvd_resp = await UpdateBg({  path: '/api/updatedp', method: "PATCH" , data: dp  })

             if (rcvd_resp.error) {
           
                setDPError(rcvd_resp.error?.error)
                setTimeout(() => {
                    setDPError(null)
                } , 3000)

                return false
            }
           
            else{
               return true
            }

        }

        return true
    }


    const HandleUpdate = async (e) => {
        
        e.preventDefault()

        const data = {uid:loggedUserData.belongsto._id , name: Name, username: Username, bio: Bio , interests: InterestsData}

     

         let BG = await BGupdatehandle()
         let DP = await  Dpupdatehandle()
    

        if (BG && DP) {
   

            const rcvd_resp = await UpdateProfile({ method: 'PATCH' , path: '/api/updateprofile' ,  data })

            if (rcvd_resp.data?.username ) {
                
                    
                window.location.href = `http://localhost:3000/profile?user=${rcvd_resp.data?.username}`
                
    
            }
    
            if (rcvd_resp.error?.username_error) {
                setUsernameError(rcvd_resp.error.username_error)
            }
    
            if (rcvd_resp.error?.error) {
                console.error("An error occured!")
            }
        
        }



    }   

    return (
        <>


            <div  className='flex flex-col w-[300px] gap-[20px] mt-[20px]'>

                <input name='name' onChange={(e) => setName(e.target.value)} className='outline-none border-2 border-black w-full p-[7px] rounded-lg' value={Name} />

                <input name='username' onChange={(e) => setUsername(e.target.value)}  type="text" className='outline-none border-2 border-black w-full p-[7px] rounded-lg' value={Username} />

                {UsernameError && <p className='text-[crimson]'>{UsernameError}</p> }

                <input name='bio' type="text" onChange={(e) => setBio(e.target.value)}  className='outline-none border-2 border-black w-full p-[7px] rounded-lg' value={Bio} />



               {InterestsData.length > 0 &&  <div className='flex flex-wrap w-full gap-[20px] items-center'>
                {InterestsData.map((value, index) => (
                   value !== "" &&    <p key={index} className='bg-[crimson] relative px-[20px] py-[7px] text-white rounded-lg'>
                        {value}
                        <span
                            className='cursor-pointer absolute left-[90%] bottom-[60%]'
                            onClick={() => RemoveInterests(index)}
                        >
                            <CloseIcon  sx={{ fontSize: 15 }} className='bg-gray-800 rounded-full ' />
                        </span>
                    </p>
                ))}
            </div>}
            
            {InterestError && <p className='text-[crimson]'>{InterestError}</p> }
            <input  
                onChange={(e) => setInterestValue(e.target.value)}
                value={InterestValue}
                onKeyDown={HandleInterests}
                type="text"
                id='interests'
                placeholder='Add interest'
                className='border-2 border-gray-200 rounded-md outline-none p-[7px]'
            />

                
                <button onClick={(e) => HandleUpdate(e)}  className='bg-green-500 p-[7px] w-full text-white rounded-lg w-full'>Save</button>

            </div>

        </>

    )
}
