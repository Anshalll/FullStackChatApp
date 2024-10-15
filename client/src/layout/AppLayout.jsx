import React from "react";
import Navbar from "../components/Navbar";


const AppLayout = () => (Wrappedcomponent) => {

    return (props) => {
        return (

            <>
            <header className="w-full h-[80px] text-[13px]">
                <Navbar/>
            </header>
                <main className="text-[13px] h-[calc(100vh-80px)]">
                    <Wrappedcomponent {...props} />
                </main>
            </>
        )
    }

}

export default AppLayout