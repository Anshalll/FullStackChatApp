import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileLayout } from '../layout/AppLayout'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfileData from '../components/ProfileData'
import SearchedProfile from '../components/SearchedProfile'


function Profile() {


  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get('user');


  const [Searcheduser, setSearcheduser] = useState(null)
  

  const { loggedUserData, loading } = useSelector((state) => state.Loggeduserslice)

  useEffect(() => {



    if (!user && !loading) {
    
      setSearcheduser(user)
      navigate(`/profile?user=${loggedUserData?.belongsto?.username}`)
    }
    if (user) {
    
      setSearcheduser(user)
    }
  }, [user, location.search, loading, loggedUserData?.belongsto?.username, navigate , loggedUserData])




  return (

    <>

      {!loading && Searcheduser === loggedUserData.belongsto.username ? <ProfileData /> : <SearchedProfile username={user}/> }

    </>

  )
}


export default ProfileLayout()(Profile)