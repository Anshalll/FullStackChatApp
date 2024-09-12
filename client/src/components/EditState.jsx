import React, { useState } from 'react'

export default function EditState({Data}) {

    const [Interests , setInterests] = useState([])

    const HandleInterests = (e) => {
        if (e.key === " ") {
            console.log("Interest seperated")
        }
    }

    return (


        <div className='flex flex-col gap-[20px]'>
            <input type="text" className='border-2 border-gray-200 rounded-md outline-none p-[7px]' placeholder='Your name' name='name' value={Data.name} onChange={() => { }} />

            <input type="text" className='border-2 border-gray-200 rounded-md outline-none p-[7px]'  name='username' placeholder='Your username' value={Data.username} onChange={() => { }} />

            <input type="text" name='bio' className='border-2 border-gray-200 rounded-md outline-none p-[7px]' placeholder='Your bio' value={Data.bio || "Add new bio" } onChange={() => {}} />

            {Data.interest?.length > 0 && <div className='flex  gap-[20px] items-center'>
                

                {Data.interest.map((value) => (
                    
                    <p className='bg-[crimson] px-[20px] py-[7px] text-white rounded-lg'>{value}</p>
                    
                    
                ))}
                
               
            </div>
            
            }
            <input onKeyDown={HandleInterests}  type="text" id='interests' placeholder='Add interest'className='border-2 border-gray-200 rounded-md outline-none p-[7px]'  />
            
            <label className='font-semibold text-gray-500' htmlFor="interests"><i>Press space after each interest</i></label>
        </div>
    )
}
