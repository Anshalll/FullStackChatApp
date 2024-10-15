import { createSlice } from "@reduxjs/toolkit";



let initialState = {
    searchedprofiledata: {},
    loading: true,


}


const SearchprofileSlice = createSlice({
    name: "searchedprofiledata",
    initialState,
    reducers:{
        setSearchedProfile: (state, action) => {
                state.searchedprofiledata = action.payload;
                state.loading = false;
        }
    }   
})



export const {setSearchedProfile} = SearchprofileSlice.actions
export default SearchprofileSlice.reducer