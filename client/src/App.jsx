import React, { useEffect, lazy, Suspense, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux'
import { Auth, UnAuth } from './redux/AuthSlice/slice.js'
import { useValidateUserMutation } from './redux/Apis/Apis.js';
import { setLoggeduserdata } from './redux/Loggeduser/Slice.js';
import { io } from 'socket.io-client'
import { useLoggeduserdata } from './hooks/useLoggeduserdata.js';
import AppLayout from './layout/AppLayout.jsx';
import {useChatdata} from './hooks/useChatdata.js'
import {setPreChats} from './redux/premessages/slice.js'
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Resetpass = lazy(() => import("./pages/Resetpass.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"))
const Userchat = AppLayout(lazy(() => import("./pages/Userchat.jsx")))



export let socket;

export default function App() {


  const [ChatUser, setChatUser] = useState("")
  const [UserOnline, setUserOnline] = useState(false)
  const [MessageLists, setMessageLists] = useState([])
  const {loading: loadingchat , error, chat} = useChatdata()

  socket = useRef(null)
  const dispatch = useDispatch()
  const [VerifyUser] = useValidateUserMutation()
  const { user, loading } = useSelector((state) => state.Authslice)
  const navigate = useNavigate()

  const { loggedUserData: userdata, loading: loadinguser } = useLoggeduserdata()

  useEffect(() => {
    if (!loading && user && !loadinguser && userdata) {

      if (!socket?.current) {
        socket.current = io("http://localhost:4000")

      }
      socket?.current.emit("register", userdata.belongsto?._id, (callback) => {
        // console.log(callback)
      })

      socket.current.emit("online_users" , userdata.belongsto?._id, (callback) => {
        // console.log(callback)
      }) 


      socket.current.on("recieved_message", (res) => {
      
        
        setMessageLists((prev) => [...prev , {message: res.message , type: "reciever" , id: res.sender , time: res.time} ])


        
      })


      return () => {
        if (socket.current) {
          socket.current.emit("unregister", userdata.belongsto?._id, (callback) => {
            if (callback.success) {
              console.log("Unregistered successfully:", callback);
            }
            socket.current.disconnect();
            socket.current = null;
          });
        }
      }
    }
  }, [user, loading, loadinguser, userdata])


  useEffect(() => {
    if (ChatUser) {
      
      socket?.current.emit("check_user", ChatUser, (res) => {

        setUserOnline(res?.success)
      })
    }
  }, [ChatUser])

  useEffect(() => {

    const valiated = async () => {

      try {

        const rcvd_resp = await VerifyUser({ path: '/' })

        if (rcvd_resp?.error) {

          dispatch(UnAuth())

        }
        if (rcvd_resp?.data?.auth) {
          dispatch(Auth())

          dispatch(setLoggeduserdata(rcvd_resp?.data?.user))
        }


      } catch (error) {

        dispatch(UnAuth())
      }


    }

    valiated();

  }, [dispatch, VerifyUser, navigate]);


  useEffect(() => {
    if (!loadingchat) {

      dispatch(setPreChats(chat))
      
    }
    if (error) {
      console.error("An error occured!")
    }
  } , [loadingchat , chat , error , dispatch]) 

  return (


    <>
      {loading ? "Loading..." : <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route element={<ProtectedRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpass/:id" element={<Resetpass />} />
          </Route>


          <Route element={<ProtectedRoute user={user} />}>

            <Route path="/" element={<Home />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/chat' element={<Userchat UserOnline={UserOnline} MessageLists={MessageLists} setMessageLists={setMessageLists} setChatUser={setChatUser } />} />

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>}

    </>
  );
}
