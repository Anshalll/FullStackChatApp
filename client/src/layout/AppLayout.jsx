import React from "react";
import Header from "../components/Header";


const AppLayout = () => (Wrappedcomponent) => {

    return (props) => {
        return (
            <>
            <Header/>
            <Wrappedcomponent {...props} />
            </>
           
        )
    }   

}

export default AppLayout