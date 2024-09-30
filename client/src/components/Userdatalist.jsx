import React, { useState, useRef } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function UserDataList({ TotalFollowers, TotalGroups, TotalFollowing, TotalPosts , user_followers , userFollowing}) {

    const [Data, setData] = useState([]);
    const [ShowModal , setShowModal] = useState(false)
    const [Typedata, setTypedata] = useState(null)

    const HandleDatatoshow = (e , Followers) => {
        e.preventDefault()
        if (!ShowModal) {
            setShowModal(true)
            setTypedata(Followers)
        }
    };

    const closeDialog = (e) => {
        e.preventDefault()

       if (ShowModal) {
        setShowModal(!ShowModal)
       }
    };

    return (
        <>
            <div className='flex gap-[30px] text-black'>
                <button className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Groups <span className='font-normal'>{TotalGroups}</span>
                </button>

                <button className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Posts: <span className='font-normal'>{TotalPosts}</span>
                </button>

                <button onClick={(e) => HandleDatatoshow(e, 'Followers')} className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Followers <span className='font-normal'>{TotalFollowers}</span>
                </button>

                <button onClick={(e) => HandleDatatoshow(e, 'Following')} className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Following: <span className='font-normal'>{TotalFollowing}</span>
                </button>
            </div>

          {ShowModal &&   <dialog  className='flex items-center  justify-center bottom-[20%]'>
                <div className='w-[500px] h-[600px] rounded-lg bg-white p-[20px]  shadow-2xl'>
                    <div className='flex justify-between items-center h-[40px]'>
                        <p className='font-bold'>{Typedata}</p>
                        <button onClick={closeDialog} className='text-gray-600'>
                            <CloseOutlinedIcon />
                        </button>
                    </div>

                    <input
                        type="text"
                        className='w-full h-[40px] p-2 border rounded'
                        placeholder='Search for user...'
                    />
                    <div className='h-[calc(100%-80px)] flex flex-col gap-[20px] overflow-y-auto'>
                        
                        {Data.length > 0 ? "Loading.." : <p className='w-full h-full flex items-center justify-center text-lg font-bold'>Nothing to show</p>}

                    </div>
                      

                </div>
               
            </dialog>}
        </>
    );
}
