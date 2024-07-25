import React from 'react'
import AppLayout from '../layout/AppLayout'
import { Check , Close } from '@mui/icons-material';

const Notifications = () => {

  const PresentNotifications  = false
  
  return (

    <div className='w-full text-sm flex items-center justify-center h-full text-white'>
    {PresentNotifications?     <div className='flex flex-col overflow-y-auto gap-[20px] p-[20px] bg-gray-800 w-[50%] h-full'>

          <div className='flex flex-col justify-between  w-full gap-[20px] border-b border-gray-500 p-[10px]'>
            
            
            <div className='flex w-full gap-[10px] justify-between'>

              <div className='flex gap-[20px] items-center'>

                  <img src="https://hips.hearstapps.com/hmg-prod/images/2020-nissan-gt-r-nismo-1563425603.jpg" className='w-[30px] h-[30px] rounded-full object-ceover object-center' alt="loading" />
                  <p className='font-bold'>Anshal kumar</p>
              </div>

              <p className='text-gray-300'>09:20pm</p>
            </div>

            <div className='text-gray-300'>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, enim quia. Recusandae quaerat commodi inventore repudiandae impedit obcaecati similique, quibusdam sed molestias harum excepturi illo quas enim? Voluptas eum sint minus rem.</p>
              
            </div>
            
          </div>

          <div className='flex flex-col justify-between  w-full gap-[20px] border-b border-gray-500 p-[10px]'>
            
            
            <div className='flex w-full gap-[10px] justify-between'>

              <div className='flex gap-[20px] items-center'>

                  <img src="https://hips.hearstapps.com/hmg-prod/images/2020-nissan-gt-r-nismo-1563425603.jpg" className='w-[30px] h-[30px] rounded-full object-ceover object-center' alt="loading" />
                  <p className='font-bold'>Anshal kumar</p>
              </div>

              <p className='text-gray-300'>09:20pm</p>
            </div>

            <div className='text-gray-300 justify-between items-center flex'>

              <p>Pushkar sent you a request!</p>
              <div className='flex items-center gap-[20px] text-black'>
                  <button className='bg-green-500 w-[30px] rounded-full h-[30px]'><Check/></button>
                  <button className='bg-[crimson] w-[30px] rounded-full  h-[30px]'><Close/></button>
              </div>
              
            </div>
            
          </div>


          <div className='flex flex-col justify-between  w-full gap-[20px] border-b border-gray-500 p-[10px]'>
            
            
            <div className='flex w-full gap-[10px] justify-between'>

              <div className='flex gap-[20px] items-center'>

                  <img src="https://hips.hearstapps.com/hmg-prod/images/2020-nissan-gt-r-nismo-1563425603.jpg" className='w-[30px] h-[30px] rounded-full object-ceover object-center' alt="loading" />
                  <p className='font-bold'>Manish kumar</p>
              </div>

              <p className='text-gray-300'>09:20pm</p>
            </div>

            <div className='text-gray-300'>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, enim quia. Recusandae quaerat commodi inventore repudiandae impedit obcaecati similique, quibusdam sed molestias harum excepturi illo quas enim? Voluptas eum sint minus rem.</p>
              
            </div>
            
          </div>


        </div> : <p className='text-xl'>No notifications</p> }
    </div>

  )

}

export default AppLayout()(Notifications)