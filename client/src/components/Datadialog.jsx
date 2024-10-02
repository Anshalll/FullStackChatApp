import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';

export default function Datadialog({ ShowModal, Data, Typedata, closeDialog ,Admin  , Logged_user}) {
    return (
        <>
            {ShowModal && <dialog className='flex items-center  justify-center bottom-[20%]'>
                <div className='w-[700px] h-[600px] rounded-lg flex-col bg-white p-[20px]  shadow-2xl'>
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
                    <div className='h-[calc(100%-80px)] w-full flex flex-col gap-[20px] overflow-y-auto'>

                        {Data.length > 0 ? (
                            Data.map((value, index) => {
                                return (
                                    <a
                                        href={`/profile/?user=${value.user_name}`}
                                        key={value.user_name || index} 
                                        className='w-full border-b-2 border-gray-300 px-[2px] h-[100px] flex items-center justify-between'
                                    >
                                        <div className='flex items-center gap-[20px]'>
                                            <img
                                                src={value.dpimage}
                                                className='border border-black w-[60px] h-[60px] rounded-full object-center object-cover'
                                                alt={value.user_name}  // Add alt text
                                            />
                                            <div className='flex flex-col gap-[20px] justify-center'>
                                                <p className='font-bold'>{value.user_name}</p>
                                                <i className='text-gray-500'>{value.name}</i>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-[20px]'>
                                          
                                           {Logged_user === value.user_name ? <button className=' font-bold w-[100px] h-[40px]'>
                                              You
                                            </button>  :  
                                                (value.current_follows ? <button className='rounded-lg bg-cyan-500 font-bold w-[100px] h-[40px]'>
                                                    Following
                                                  </button> : <button className='rounded-lg text-white bg-green-500 font-bold w-[100px] h-[40px]'>
                                                    Follow
                                                  </button> 
                                                  )
                                             }
                                           {Admin && <button className='bg-gray-700 text-[crimson] rounded-lg font-bold w-[100px] h-[40px]'>
                                                Remove
                                            </button>}
                                        </div>
                                    </a>
                                );
                            })
                        ) : (
                            <p className='w-full h-full flex items-center justify-center text-lg font-bold'>
                                Nothing to show
                            </p>
                        )}


                    </div>


                </div>

            </dialog>}

        </>
    )
}
