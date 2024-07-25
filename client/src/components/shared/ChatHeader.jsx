import React from 'react'

const ChatHeader = (props) => {
    return (
        <div className='h-[80px] flex text-white p-[10px] bg-gray-800 w-full  items-center justify-between'>
            <div className='flex '>

                <div className='flex flex-col text-sm gap-[10px]'>
                    <h1 className='font-bold'>{props.name}</h1>
                    <i className='text-gray-300'>{props.username}</i>
                </div>

            </div>

        </div>
    )
}

export default ChatHeader