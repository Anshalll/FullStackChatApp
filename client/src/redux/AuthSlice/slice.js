import { createSlice } from '@reduxjs/toolkit'




const AuthSlice = createSlice({
    name: 'authslice',

    initialState: {
        user: false,
        loader: true
    },

    reducers: {
        Auth: (state , action) => {
         
          state.user = action.payload
          state.loader = false
        },


        UnAuth: (state ) => {
         
            state.user = false
            state.loader = false

  
          },
     
      
      }
})


export default AuthSlice
export const {Auth , UnAuth } = AuthSlice.actions