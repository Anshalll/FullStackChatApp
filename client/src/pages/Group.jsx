import React from 'react'
import AppLayout from '../layout/AppLayout'
import Sidebar from '../components/Sidebar'
import Data from '../components/main.json'



 function Group() {
  return (
    <div>Group</div>
  )
}


export default AppLayout()(Group , <Sidebar data={Data}/>)