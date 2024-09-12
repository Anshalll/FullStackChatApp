import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'
import AuthSlice from '../redux/AuthSlice/slice.js'
import userdataslice from './userdataslice.js'



export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,
        [AuthSlice.name]: AuthSlice.reducer,
        userdataslice: userdataslice
      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})