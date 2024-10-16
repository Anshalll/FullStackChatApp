import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    FollowingData: [],
    FollowersData: [],
  
}


const LoggedStatsData  =  createSlice({
    name: "loggedstatsdata",
    initialState,
    reducers: {
        setFollowingData: (state, action) => {
            state.FollowingData = action.payload
          
        },
        setFollowersData: (state, action) => {
            state.FollowersData = action.payload
            
        }
    }
})

export const {setFollowingData , setFollowersData} = LoggedStatsData.actions
export default LoggedStatsData.reducer