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

export const Applayout =  AppLayout


const ProfileLayout = () => (Wrappedcomponent) => {

    return (props) => {
        return (
            <>
            <Header/>
            <Wrappedcomponent {...props} />
            </>
           
        )
    }   

}

export const Profilelayout = ProfileLayout