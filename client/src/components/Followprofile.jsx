import React from 'react'
import { useFormsMutation } from "../redux/Apis/Apis"

import FollowUnfollow from '../utils/Follow_unfollow'
export default function Followprofile({ loggeduser, searcheduser , setTotalFollowers   , Following_searched , setFollowing_searched}) {

    const [Followorunfollow] = useFormsMutation()


    const HandleProfilefollow = async (e) => {
        e.preventDefault()
        if (loggeduser && searcheduser) {
            

            const rcvd_resp = await FollowUnfollow(Following_searched , loggeduser , searcheduser , Followorunfollow)
            if (rcvd_resp) {
                if (rcvd_resp.following ) {
                    
                setFollowing_searched(rcvd_resp.following)
                setTotalFollowers(rcvd_resp.total_followers)

                }
                if (rcvd_resp.unfollowing ) {
                    
                    setFollowing_searched(!rcvd_resp.unfollowing)
                    setTotalFollowers(rcvd_resp.total_followers)

                }
                    

            }



        }
      
    }


    return (
        <>
      {Following_searched ?  <button onClick={HandleProfilefollow} className='bg-cyan-500 text-white p-[7px] rounded-lg'>
            Unfollow

        </button> :   <button onClick={HandleProfilefollow} className='bg-green-500 text-white p-[7px] rounded-lg'>
            Follow

        </button>}
        </>
    )
}
