import React from 'react'
import { NavLink } from 'react-router-dom'
import UserCard from '../shared/UserCard.jsx'

const ChatItems = ({ data }) => {

  const ActiveClass = 'bg-black text-white'
  const Baseclass = 'flex  items-center justify-between p-[10px] gap-[10px] border-b border-gray-900'

  return (
    <div className='flex flex-col gap-[20px] w-full text-sm'>
      
      {data?.map((value, index) => {
        return <NavLink  to={`/chat/${value.id}`} key={index} className={({isActive}) =>  `${Baseclass} ${isActive ? ActiveClass : ""} `}>
          <UserCard image={value.image} username={value.name}  newMessage={value.newmessage[0]} newMessageCount={value.newmessage.length}/>

        </NavLink>
      })}
    </div>
  )
}

export default ChatItems