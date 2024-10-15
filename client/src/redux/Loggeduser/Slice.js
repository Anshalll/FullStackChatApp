import { createSlice } from "@reduxjs/toolkit";



let initialState = {

    loggedUserData: {},
    loading: true
}


const Loggeduserdata = createSlice({
    name: 'loggeduserdata',

    initialState,

    reducers: {

        
        setLoggeduserdata : (state, action) => {
            state.loggedUserData= action.payload
            state.loading = false
        }
    }


})


export const {setLoggeduserdata} = Loggeduserdata.actions
export default Loggeduserdata.reducer
