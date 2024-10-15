import { createSlice } from '@reduxjs/toolkit'




const AuthSlice = createSlice({
    name: 'authslice',

    initialState: {
        user: false,
        loading: true
    },

    reducers: {
        Auth: (state) => {
         
          state.user = true
          state.loading = false
        },


        UnAuth: (state ) => {
         
            state.user = false
            state.loading = false

  
          },
     
      
      }
})


export default AuthSlice
export const {Auth , UnAuth } = AuthSlice.actions