import React from 'react'
import Title from '../components/shared/Title'
import Navbar from '../components/Navbar'


const AppLayout = () => (Wrappedcomponent , Sidebar) => {

    return (props) => {
        return (




            <div className='w-[100vw] h-[100vh]   bg-gray-900  p-[5px]'>


                <div className='flex flex-col  w-[100%]  h-full gap-[5px]'>

                    <Title />

                    <header className='h-[60px] w-full'>
                        <Navbar />
                    </header>

                    <div className='flex w-full gap-[10px] h-[calc(100vh-60px)]'>
                  {Sidebar? Sidebar : <></>}
                        <Wrappedcomponent {...props}/>
                    </div>
                </div>

            </div>

        )
    }
}

export default AppLayout