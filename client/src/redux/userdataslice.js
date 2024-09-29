import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId) => {
      const response = await fetch(`http://localhost:4000/api/${userId}`, {
        credentials: "include"
      });
      const data = await response.json();
      return data; 
    }
  );

let initialState = {

    userdata: {},
    Admin: false,
    loading: true
    
}

const Userdata = createSlice({
    name: "userdata",
    initialState,
    extraReducers: (builder) => {
        builder

        .addCase(fetchUser.pending, (state) => {
            state.loading = true 
        })
        
        .addCase(fetchUser.fulfilled , (state, action) => {
          state.userdata = action.payload 
          state.loading = false
        })

        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
        

    }
})


export default Userdata.reducer