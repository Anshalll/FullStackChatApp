import React from 'react'
import AppLayout from '../layout/AppLayout'
import ChatStyles from '../components/ChatStyles'
import Sidebar from '../components/Sidebar'
import Data from '../components/main.json'

function Home({  name }) {
  return <ChatStyles/>

}



export default AppLayout()(Home , <Sidebar data={Data}/>)