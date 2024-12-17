import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const FetchChat = createAsyncThunk(
    'userchat/chat',
    async (payload, thunk) => {
        try {
            const response = await fetch(`http://localhost:4000${payload.path}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.data),
            });

            const data = await response.json();
     
            if (data.error) {

                return thunk.rejectWithValue(data.error);
                
            }

            return data.data;

        } catch (error) {
            return thunk.rejectWithValue("An error occurred while fetching chat.");
        }
    }
);

const initialState = {
    chat: [],
    loading: false,
    error: null,
};

const ChatSlice = createSlice({
    name: "chatslice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(FetchChat.fulfilled, (state, action) => {
                state.chat = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(FetchChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchChat.rejected, (state, action) => {
                state.chat = []; // Clear chat on error
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ChatSlice.reducer;
