import React, { useEffect, useState } from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { socket } from '../App';
import { useFormsMutation } from '../redux/Apis/Apis';
import { useLoggeduserdata } from '../hooks/useLoggeduserdata'

function Userchat({ setCurrentUser, UserOnline, MessageLists, setMessageLists }) {


    const [ActiveChat, setActiveChat] = useState(false)
    const [SearchUser] = useFormsMutation();
    const [SendMessage] = useFormsMutation();
    const { loggedUserData, loading: loadingLogged } = useLoggeduserdata()
    const [Chatuser, setChatUser] = useState({});
    const [Error, setError] = useState("");
    const [Message, setMessage] = useState("")
    const [ChatMessage, setChatMessage] = useState([])

    useEffect(() => {
        if (MessageLists.length > 0) {
            setChatMessage(MessageLists)
            console.log(MessageLists)
        }
    }, [MessageLists])



    useEffect(() => {

        setActiveChat(true)

        if (Chatuser && Chatuser.belongsto?._id) {
            setCurrentUser(Chatuser.belongsto?._id)

        }

        return () => {
            setActiveChat(false)
            console.log("You exited the chat!")
        }
    }, [Chatuser, setCurrentUser])

    useEffect(() => {
        const searched = window.location.search;
        const path = new URLSearchParams(searched);
        const username = path.get("user");

        const Searchuserfunc = async (username) => {
            try {
                const rcvd_resp = await SearchUser({
                    path: "/api/searchdata/",
                    method: "POST",
                    data: { username },
                });
                if (rcvd_resp.data) {
                    setChatUser(rcvd_resp.data.udata);
                } else {
                    setError(rcvd_resp.error || "Failed to fetch user data");
                    console.error(rcvd_resp.error);
                }
            } catch (err) {
                setError(err.message || "An error occurred");
                console.error(err);
            }
        };

        if (username && !Chatuser?.belongsto?.username) {
            Searchuserfunc(username);
        }
    }, [SearchUser, Chatuser]);


    const HandleMessage = (value) => {

        if (value.trim() !== "") {

            setMessage(value)

        }

    }


    const HandleSubmitMessage = async (e) => {

        e.preventDefault()
        let unit = 'AM';
        let newDate = new Date()

        let time = newDate.getTime()

        let hour = newDate.getHours(time) % 12
        hour = hour ? hour : 12

        let mins = Number(newDate.getMinutes(time))

        if (newDate.getHours(time) > 12 && mins > 0) {
            unit = "PM"
        }
        else {
            unit = "AM"
        }


        let timing = `${hour}:${mins} ${unit}`

        if (!loadingLogged) {

            let data = {

                sender: loggedUserData.belongsto._id,
                reciever: Chatuser?.belongsto?._id,
                message: Message,
                chat_type: "chat",

            }
            if (socket && socket.current) {
                socket.current.emit("sendmessage", data, (res) => {
                    if (res.success) {

                        setMessageLists((prev) => [...prev, { message: Message, type: "sender", time: timing }])



                    }

                })



            }

        }


    }

    return (

        <>

            {Error ? <p className='w-[calc(100%-400px)] h-full flex items-center justify-center text-lg font-bold'>Page not found</p> : <div className='w-[calc(100%-400px)] h-full flex flex-col'>

                <div className='bg-black h-[80px] flex items-center w-full px-[20px]'>
                    <div className='flex gap-[20px]  items-center'>

                        <img src={Chatuser?.dpimage} className='border-2 border-gray-300 rounded-full w-[40px] h-[40px]' alt="" />
                        <div className='flex flex-col gap-[10px] '>
                            <p className='text-white'>@{Chatuser?.belongsto?.username}</p>
                            {UserOnline ? <p className='text-green-500 shadow-lg'>Online</p> : <p className='text-gray-300'>Offline</p>}
                        </div>
                    </div>



                </div>


                <div className='min-h-[calc(100%-160px)] bg-gray-900  flex flex-col gap-[20px] w-full overflow-y-auto p-[20px] justify-end '>
                    {ChatMessage.map((value, index) => (
                        value.type === "sender" ? <div key={index} className='  min-h-[40px] w-full flex justify-end  text-white  rounded-lg'>

                            <div className='max-w-[300px] rounded-lg p-[15px] bg-gray-800 gap-[10px] flex items-center flex-col'><p className='w-full'>{value.message}</p> <span className='flex w-full text-[11px] text-gray-400'>{value.time}</span></div>

                        </div> : Chatuser.belongsto._id === value?.id &&

                        <div key={index} className='  min-h-[40px] w-full flex justify-start  text-white  rounded-lg'>

                            <div className='max-w-[300px] rounded-lg p-[15px] bg-gray-800 flex items-center gap-[10px] flex-col'><p className='w-full'>{value.message}</p> <span  className='flex w-full text-gray-400 text-[11px]'>{value.time}</span></div>



                        </div>
                    ))}
                </div>

                <div className='bg-black h-[80px] w-full flex items-center justify-center px-[20px]'>

                    <form onSubmit={HandleSubmitMessage} className='w-[70%] h-[80%] rounded-full bg-gray-800 px-[10px]'>

                        <input value={Message} onChange={(e) => HandleMessage(e.target.value)} type="text" className='text-white bg-transparent w-[95%] h-full outline-none' placeholder='Send a message...' />

                        <button onClick={(e) => HandleSubmitMessage(e)} className='w-[5%] h-full text-white'>
                            <SendOutlinedIcon />
                        </button>

                    </form>

                    <button className='text-white relative left-[30px]'><AttachFileOutlinedIcon /></button>

                </div>

            </div>}
        </>


    )
}

export default Userchat
