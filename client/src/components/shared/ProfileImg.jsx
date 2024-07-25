import React from 'react'

const ProfileImg = ({ Cover, Pfp }) => {



    return (
       

            <div className='flex relative w-full h-[530px] px-[20px]'>
                <img src={Cover ? Cover : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="" className='w-full object-cover object-center h-[400px]  rounded-xl' />
                <img src={Pfp ? Pfp : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="" className='absolute w-[300px] h-[300px] rounded-full object-center object-cover top-[12rem] border-2 border-black left-[40px]' />
            </div>



   
    )
}

export default ProfileImg