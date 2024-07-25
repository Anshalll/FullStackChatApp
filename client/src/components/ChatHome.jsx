import React from 'react'
import AppLayout from '../layout/AppLayout'
import ChatStyles from './ChatStyles'
import Sidebar from './Sidebar'
import Data from './main.json'

 function ChatHome() {
  return  <ChatStyles/>
}


export default AppLayout()(ChatHome , <Sidebar data={Data}/>)