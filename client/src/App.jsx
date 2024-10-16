import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route , useNavigate} from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux'
import { Auth, UnAuth } from './redux/AuthSlice/slice.js'
import { useValidateUserMutation } from './redux/Apis/Apis.js';
import { setLoggeduserdata } from './redux/Loggeduser/Slice.js';


const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Resetpass = lazy(() => import("./pages/Resetpass.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"))



export default function App() {

  const dispatch = useDispatch()
  const [VerifyUser] = useValidateUserMutation()
  const { user, loading } = useSelector((state) => state.Authslice)
  const navigate = useNavigate()

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

  }, [dispatch, VerifyUser , navigate]);


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
            <Route path='/profile' element={<Profile/>} />
+          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>}

      </>
  );
}
