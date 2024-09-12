import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'
export default function ProtectedRoute({childrean ,   user , redirect="/login" }) {

    if (!user) {
        
        return <Navigate to={redirect}/>
    }

     return  childrean ? childrean : <Outlet/>

}
