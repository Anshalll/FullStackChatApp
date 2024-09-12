import React from "react";



const AppLayout = () => (Wrappedcomponent) => {

    return (props) => {
        return (
            <div>
            <Wrappedcomponent {...props} />
            </div>
        )
    }   

}

export default AppLayout