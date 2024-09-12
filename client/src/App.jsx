import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
import { useGetAccessDataQuery } from './redux/Apis/Apis.js';
import {useDispatch , useSelector} from 'react-redux'
import {Auth , UnAuth} from './redux/AuthSlice/slice.js'
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import { fetchUser } from './redux/userdataslice.js';

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Resetpass = lazy(() => import("./pages/Resetpass.jsx"));


export default function App() {

  const dispatch = useDispatch()
  const {data, isLoading , error} = useGetAccessDataQuery()
  const {user , loader}  = useSelector((state) => state.authslice)

 
  useEffect(() => {

  



   
    if (!isLoading) {
     
       
     if (data) {
       dispatch(Auth(data.auth))
       dispatch(fetchUser("getdata"))
     }
     else{
      dispatch(UnAuth(error.data.auth))

     }
      
  
    }  

    
  
  }, [isLoading, data, error , dispatch ]);


  return (
    <Router>
      {
        loader? <p>Loading....</p> : 
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
      
          <Route element={<ProtectedRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpass/:id" element={<Resetpass />} />
          </Route>

        
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />

          
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

}
    </Router>
  );
}
