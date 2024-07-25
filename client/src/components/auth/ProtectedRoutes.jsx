import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protectedroute({ childrean ,  user , redirect="/login" }) {
  if(!user) return <Navigate to={redirect}/> 


  return childrean? childrean : <Outlet/>
  
}
