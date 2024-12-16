import React from "react";
import Navbar from "../components/Navbar";
import SidebarChat from "../components/SidebarChat";


const AppLayout =  (Wrappedcomponent) => {

    return (props) => {

        return (

            <>

                <header className="w-full h-[80px] text-[13px]">
                    <Navbar />
                </header>
                <main className="text-[13px] flex  h-[calc(100vh-80px)]">
                    <SidebarChat />
                   {Wrappedcomponent &&  <Wrappedcomponent setCurrentUser={props.setChatUser}   UserOnline={props.UserOnline} setMessageLists={props.setMessageLists} MessageLists={props.MessageLists} />}

                </main>
            </>
        )
    }

}

export default AppLayout



export const ProfileLayout = () => (Wrappedcomponent) => {

    return (props) => {
        return (

            <>
                <header className="w-full h-[80px] text-[13px]">
                    <Navbar />
                </header>
                <main className="text-[13px] flex  h-[calc(100vh-80px)] p-[20px]">

           
                    <Wrappedcomponent {...props} />

                </main>
            </>
        )
    }

}

