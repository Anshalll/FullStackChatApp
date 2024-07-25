import React, { useState } from 'react'
import { Send , AttachFile } from '@mui/icons-material'


const ChatInput = () => {

    const [FileNow , setFileNow] = useState()


    const HandleFile = (e) => {
        console.log(e.target.files)
        const file  = e.target.files[0]
        const file_url =  URL.createObjectURL(file)
        console.log(file_url)
    }

    return (

        <div className='h-[80px] w-full bg-gray-800 flex items-center justify-center gap-[20px]'>
            <div className='flex w-[60%] h-[70%] bg-black rounded-full'>

                <input type="text" placeholder='Enter a message' className='w-[90%] rounded-full text-sm px-[20px] text-gray-200 outline-none bg-transparent' />
                <button className='w-[10%]'><Send className='text-white' /></button>
            </div>

            
            <div className='relative flex w-[30px]'>

               <AttachFile className='text-white'/>
                <input type="file" className='absolute w-full opacity-[0]' onChange={HandleFile} name="image" id="image" />

            </div>
        </div>

    )
}

export default ChatInput