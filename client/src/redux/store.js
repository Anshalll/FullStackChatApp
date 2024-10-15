import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'
import AuthSlice from '../redux/AuthSlice/slice.js'
import Loggeduserslice  from '../redux/Loggeduser/Slice.js'
import SearchprofileSlice from '../redux/Searchedprofile/SearchprofileSlice.js'


export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,
        Authslice : AuthSlice.reducer,
        Loggeduserslice: Loggeduserslice,
        SearchprofileSlice: SearchprofileSlice



      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})