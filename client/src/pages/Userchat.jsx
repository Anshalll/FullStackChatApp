import React, { useEffect, useState } from 'react'
import AppLayout from '../layout/AppLayout'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import io from 'socket.io-client'
import { useFormsMutation } from '../redux/Apis/Apis';



function Userchat() {

    
    const socket = io("http://localhost:4000");
    const [SearchUser] = useFormsMutation()
    const [Chatuser, setChatUser]  = useState({  })
    const [Error, setError] = useState("")

    useEffect(() => {


        const searched = window.location.search
        const path = new URLSearchParams(searched)


        const Searchuserfunc = async (username) => {
            const rcvd_resp = await SearchUser({ path: '/api/searchdata/' , method: "POST" , data: {username} })
            if (rcvd_resp.data) {
                
                setChatUser(rcvd_resp.data?.udata)
            }
            else if(rcvd_resp.error){

                    setError(rcvd_resp.error)
                    console.error(rcvd_resp.error)

                }       

        }


        if (Error === "") {
            if (path.get('user') && !Chatuser?.belongsto?.username) {
                Searchuserfunc(path.get('user'))
            }
        }
      

        socket.on("connect", () => {
            console.log("Connected to server with socket id:", socket.id);
        });

      
        socket.on("message", (message) => {
            console.log(message); 
        });

       
        return () => {
            socket.off("connect");
            socket.off("message");
        };
    }, [socket , SearchUser , Chatuser , Error]); 
    //Fix bugs here, (Making more then 1 request)
    return (
    
        <>

        {Error ? <p className='w-[calc(100%-400px)] h-full flex items-center justify-center text-lg font-bold'>Page not found</p> : <div className='w-[calc(100%-400px)] h-full flex flex-col'>

            <div className='bg-black h-[80px] flex items-center w-full px-[20px]'>
                <div className='flex gap-[20px]  items-center'>

                    <img src={Chatuser?.dpimage} className='border-2 border-gray-300 rounded-full w-[40px] h-[40px]' alt="" />
                    <div className='flex flex-col gap-[10px] '>
                        <p className='text-white'>@{Chatuser?.belongsto?.username}</p>
                        <p className='text-gray-400'>offline</p>
                    </div>
                </div>



            </div>


            <div className='min-h-[calc(100%-160px)] bg-gray-900  flex flex-col gap-[20px] w-full'>

            </div>

            <div className='bg-black h-[80px] w-full flex items-center justify-center px-[20px]'>

                <div className='w-[70%] h-[80%] rounded-full bg-gray-800 px-[10px]'>

                    <input type="text" className='text-white bg-transparent w-[95%] h-full outline-none' placeholder='Send a message...' />

                    <button className='w-[5%] h-full text-white'>
                        <SendOutlinedIcon />
                    </button>

                </div>

                <button className='text-white relative left-[30px]'><AttachFileOutlinedIcon /></button>

            </div>

        </div>}
        </>


    )
}

export default AppLayout()(Userchat)