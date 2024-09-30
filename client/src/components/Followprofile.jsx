import React, { useState } from 'react'
import { useFormsMutation } from '../redux/Apis/Apis'

export default function Followprofile({ loggeduser, searcheduser , setTotalFollowers   , Following_searched , setFollowing_searched}) {

   
    const [Followorunfollow, {isLoading: Loading}] = useFormsMutation()

    const HandleProfilefollow = async (e) => {
        e.preventDefault()
        if (loggeduser && searcheduser) {
            let data = {loggeduser , searcheduser}

            if (!Following_searched) {
                const  Follow_user = await Followorunfollow({ data: data , path: "/api/followuser" , method: "POST"   })
                if (Follow_user.data?.following && Follow_user.data?.total_searched_user_followers) {
                    setFollowing_searched(Follow_user.data?.following)
                    setTotalFollowers(Follow_user.data?.total_searched_user_followers)
                }
            }
            else{
                
                const Unfollow_user = await await Followorunfollow({ data: data , path: "/api/unfollowuser" , method: "POST"   })
                if(Unfollow_user.data?.unfollowing ){
                    setTotalFollowers(Unfollow_user.data?.total_searched_user_followers)
                    setFollowing_searched(!Unfollow_user.data?.unfollowing)
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
