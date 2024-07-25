import React, { useEffect, useState, useRef } from 'react';
import AppLayout from '../layout/AppLayout';
import Sidebar from '../components/Sidebar';
import Data from '../components/main.json';
import ChatInput from '../components/shared/ChatInput';
import ChatHeader from '../components/shared/ChatHeader';
import { Visibility, MoreVert, Shortcut, Delete, Reply } from '@mui/icons-material';
import ReplyMessage from '../components/ReplyMessage'


function Chat() {

  const optionsRefs = useRef({}); 
  const [messageId, setMessageId] = useState(null);
  const [ReplyUser , setReplyUser] = useState("")


  const HandleReplyUser = (data) => {
    setReplyUser(data)
  }

  const ChatData = [
    {
      name: "Manish",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@anshalkumar",
      message: "This is manish talking here",
      time: "09:20pm",
      type: "reciever",
      chatType: "group"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },

    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
    {
      name: "Mandvi",
      pfp: "https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg",
      username: "@mandvi",
      message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi voluptates, voluptas reprehenderit illum illo ab exercitationem, temporibus dignissimos nostrum quas? Mollitia dolorem delectus veniam culpa quo at vel quae qui nulla iste a, vitae quibusdam eaque. Natus, fuga veritatis iure quaerat sit laboriosam, repellat in nam maiores rem voluptates.",
      time: "06:20pm",
      seen: "true",
      type: "sender",
      chatType: "friends"
    },
  ];

  const handleOptions = (index) => {
    setMessageId(messageId === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messageId !== null &&
        optionsRefs.current[messageId] &&
        !optionsRefs.current[messageId].contains(event.target) &&
        !event.target.closest('.three-dots')
      ) {
        setMessageId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [messageId]);

  return (
    <div className='flex flex-col w-full h-full'>
      <ChatHeader username={"@anshal918"} onlineStaus={true} name={"Anshal kumar"} userimage={"https://planetfacts.org/wp-content/uploads/2023/12/planet_saturn.jpg"} userid={"123"}/>
      <div className='w-full h-[calc(100%-160px)] gap-[20px] overflow-y-auto flex flex-col flex-reverse text-white text-sm p-[20px]'>
        {ChatData.map((value, index) => (
          <div key={index} className='w-full gap-[20px]'>
            <div  ref={(el) => (optionsRefs.current[index] = el)} className={`${value.type === "reciever" ? "float-left" : "float-right"} max-w-[600px] flex-col flex bg-gray-800 p-[10px] rounded-lg gap-[10px]`}>
              <div className='flex items-center justify-between'>
               
                <div className='relative flex'>
                  <button
                    onClick={() => handleOptions(index)}
                    className='text-white p-[3px] text-sm hover:bg-gray-700 hover:rounded-full three-dots'
                  >
                    <MoreVert className='three-dots'/>
                  </button>
                  {messageId === index && (
                    <div
                     
                      className={`bg-black w-[150px] ${value.type === "sender" ? "right-[2rem]" : "left-[2rem]"} absolute flex-col gap-[20px] p-[15px] text-white`}
                    >
                      <button onClick={() => HandleReplyUser({ msg: value.message })} className='cursor-pointer hover:text-gray-400 w-full flex justify-between items-center'>
                        Reply <Reply />
                      </button>
                      <p className='cursor-pointer hover:text-gray-400 w-full flex justify-between items-center'>
                        Forward <Shortcut />
                      </p>
                      <p className='cursor-pointer hover:text-red-600 text-red-500 w-full flex justify-between items-center'>
                        Delete <Delete />
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className='text-gray-400'>{value.message}</p>
              <div className='flex items-center justify-between text-sm'>
                <p>{value.time}</p>
                {value.type === "sender" ? (value.seen ? <Visibility className='text-[crimson]' /> : <Visibility className='text-gray-400' />) : ""}
              </div>
            </div>
          </div>
        ))}
      </div>


      <ReplyMessage data={ReplyUser}/>
      <ChatInput />
    </div>
  );
}

export default AppLayout()(Chat, <Sidebar data={Data} />);
