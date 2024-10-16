import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'
import AuthSlice from '../redux/AuthSlice/slice.js'
import Loggeduserslice  from '../redux/Loggeduser/Slice.js'
import SearchprofileSlice from '../redux/Searchedprofile/SearchprofileSlice.js'
import LoggedStatsData from '../redux/LoggedStatsData/slice.js'

export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,

        Authslice : AuthSlice.reducer,

        Loggeduserslice: Loggeduserslice,

        SearchprofileSlice: SearchprofileSlice,

        LoggedStatsData: LoggedStatsData
        

      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})