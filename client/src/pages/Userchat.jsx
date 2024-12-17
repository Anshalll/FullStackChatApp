import React, { useEffect, useRef, useState } from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { socket } from '../App';
import { useFormsMutation } from '../redux/Apis/Apis';
import { useLoggeduserdata } from '../hooks/useLoggeduserdata'
import { FetchChat } from '../redux/chat/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function Userchat({ setCurrentUser, UserOnline, MessageLists, setMessageLists }) {

    const ChatScrollerRef = useRef(null)

    const [ActiveChat, setActiveChat] = useState(false)
    const [SearchUser] = useFormsMutation();
    const { loggedUserData, loading: loadingLogged } = useLoggeduserdata()
    const [Chatuser, setChatUser] = useState({});
    const [Error, setError] = useState("");
    const [Message, setMessage] = useState("")
    const [ChatMessage, setChatMessage] = useState([])
    const dispatch = useDispatch()
    const {prechats} = useSelector((state) => state.PreChats)


    useEffect(() => {
        if (MessageLists.length > 0) {
            setChatMessage(MessageLists)
   
        }
    }, [MessageLists])



    useEffect(() => {

        setActiveChat(true)

        if (Chatuser && Chatuser.belongsto?._id) {
            setCurrentUser(Chatuser.belongsto?._id)
            dispatch(FetchChat({path: '/api/getmessage' , data: [loggedUserData?.belongsto?._id , Chatuser?.belongsto?._id]}))
        }

        return () => {
            setActiveChat(false)
           
        }
    }, [Chatuser, setCurrentUser , dispatch , loggedUserData ])

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
                        setMessage("")


                    }

                })



            }

        }


    }

    useEffect(() => {
        if (ChatScrollerRef.current) {
    
            ChatScrollerRef.current.scrollTop = ChatScrollerRef.current.scrollHeight;
        }
    }, [ActiveChat , ChatMessage , prechats]);
    

    return (

        <>

            {Error ? <p className='w-[calc(100%-400px)] h-full flex items-center justify-center text-lg font-bold'>Page not found</p> : <div  className='w-[calc(100%-400px)] h-full flex flex-col'>

                <div className='bg-black h-[80px] flex items-center w-full px-[20px]'>
                    <div className='flex gap-[20px]  items-center'>

                        <img src={Chatuser?.dpimage} className='border-2 border-gray-300 rounded-full w-[40px] h-[40px]' alt="" />
                        <div className='flex flex-col gap-[10px] '>
                            <p className='text-white'>@{Chatuser?.belongsto?.username}</p>
                            {UserOnline ? <p className='text-green-500 shadow-lg'>Online</p> : <p className='text-gray-300'>Offline</p>}
                        </div>
                    </div>



                </div>


                <div ref={ChatScrollerRef} className='min-h-[calc(100%-160px)] bg-gray-900 flex flex-col gap-[20px] w-full overflow-y-auto p-[20px] '>


                    {prechats.length > 0 && prechats.map((value, index) => (
                        <div className={`w-full flex items-center   ${value.sender === loggedUserData?.belongsto?._id ? "justify-end" : "justify-start"}`} key={index}>
                            <div className='text-white max-w-[300px] rounded-lg p-[15px] bg-gray-800 gap-[10px] min-h-[30px] flex items-center flex-col'><p className='w-full'>{value.message}</p> <i className='flex w-full text-[11px] text-gray-400'>{value.timing}</i></div>
                        </div>
                    )) }

                    {ChatMessage.map((value, index) => (
                        value.type === "sender" ? <div key={index} className='w-full flex justify-end  text-white  rounded-lg'>

                            <div className='max-w-[300px] rounded-lg p-[15px] bg-gray-800 gap-[10px] min-h-[30px] flex items-center flex-col'><p className='w-full'>{value.message}</p> <i className='flex w-full text-[11px] text-gray-400'>{value.time}</i></div>

                        </div> : Chatuser.belongsto._id === value?.id &&

                        <div key={index} className='   w-full flex justify-start  text-white  rounded-lg'>

                            <div className='max-w-[300px] rounded-lg p-[15px] bg-gray-800 flex items-center min-h-[30px]  gap-[10px] flex-col'><p className='w-full '>{value.message}</p> <i  className='flex w-full text-gray-400 text-[11px]'>{value.time}</i></div>



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
