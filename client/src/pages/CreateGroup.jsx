import React, { useState } from 'react'
import AppLayout from '../layout/AppLayout'

const CreateGroup = () => {


    const [PreviewImage, setPreviewImage] = useState("https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg")


    const [GpBG, setGpBG] = useState("https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg")



    const gpdpSetter = (e) => {

        const file = e.target.files[0]
        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);

    }


    const gpbgSetter = (e) => {

        const file = e.target.files[0]
        const previewURL = URL.createObjectURL(file);
        setGpBG(previewURL);

    }


    return (
        <div className='w-full h-full flex  items-center justify-center overflow-y-auto'>
            <form className='w-[70%] flex gap-[20px] h-full p-[20px] flex-col'>

                <div className='w-full h-max flex gap-[20px] flex-col'>

                    <div className='relative flex w-full h-[200px]'>
                        <img src={GpBG} className="h-full  w-full rounded-lg object-cover object-center" alt="" />

                        <input onChange={gpbgSetter} type="file" name="gpdp" id="gpdp" className=' absolute opacity-[0] h-full rounded-lg w-full' />

                    </div> 
                    <div className='flex gap-[20px] w-full'>

                        <div className='w-[20%] h-[200px] relative flex'>


                            <img src={PreviewImage} className="h-full w-[200px] rounded-full object-cover object-center" alt="" />

                            <input onChange={gpdpSetter} type="file" name="gpdp" id="gpdp" className=' absolute opacity-[0] h-full rounded-full w-[200px]' />
                

                        </div>

                        <div className='flex flex-col w-[80%] gap-[20px] text-white text-sm'>

                            <input type="text" placeholder='Enter group name' className='w-full p-[9px] rounded-lg bg-gray-800 focus:border-2 focus:border-[crimson] outline-none' />

                            <textarea name="" placeholder='Group description' id="" rows={10} className='w-full p-[9px] rounded-lg bg-gray-800 focus:border-2 focus:border-[crimson] outline-none'></textarea>


                            <button className='bg-green-500 text-black w-max px-[20px] py-[7px] rounded-full'>Create</button>

                        </div>

                    </div>




                </div>

            </form>

        </div>
    )
}

export default AppLayout()(CreateGroup)