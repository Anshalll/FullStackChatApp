import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    prechats : []
}


const PreChatSlice = createSlice({
    name: 'prechat',
    initialState,
    reducers: {
        setPreChats: (state, action) => {
            state.prechats = action.payload
        }
    }
})


export const  {setPreChats} = PreChatSlice.actions
export default PreChatSlice.reducer