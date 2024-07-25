import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoutes'
import { LayoutLoader } from './components/Loaders/Loaders'



const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Chat = lazy(() => import('./pages/Chat'))
const Group = lazy(() => import('./pages/Group'))
const Notfound = lazy(() => import('./pages/NotFound'))
const ChatHome = lazy(() => import('./components/ChatHome'))
const Profile = lazy(() => import('./pages/Profile'))
const Notifications = lazy(() => import('./pages/Notifications.jsx'))
const CreateGroup = lazy(() => import('./pages/CreateGroup.jsx'))
const GroupInfo = lazy(() => import('./pages/GroupInfo.jsx'))




export default function App() {

  let user = true

  return (




    <Router>

      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>

            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<ChatHome />} />
            <Route path='/group' element={<ChatHome />} />

            <Route path='/chat/:chatid' element={<Chat />} />
            <Route path='/group/:groupid' element={<Group />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/creategroup' element={<CreateGroup />} />
            <Route path='/groupinfo' element={<GroupInfo />} />




          </Route>


          <Route element={<ProtectedRoute user={!user} redirect='/' />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path='*' element={<Notfound />} />

        </Routes>
      </Suspense>


    </Router>
  )
}
