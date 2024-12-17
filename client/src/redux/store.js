import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'
import AuthSlice from './AuthSlice/slice.js'
import Loggeduserslice  from './Loggeduser/Slice.js'
import SearchprofileSlice from './Searchedprofile/SearchprofileSlice.js'
import LoggedStatsData from './LoggedStatsData/slice.js'
import ChatSlice from './chat/slice.js'
import PreChats from './premessages/slice.js'
export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,

        Authslice : AuthSlice.reducer,

        Loggeduserslice: Loggeduserslice,

        SearchprofileSlice: SearchprofileSlice,

        LoggedStatsData: LoggedStatsData,
        ChatSlice: ChatSlice,
        PreChats: PreChats

      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})