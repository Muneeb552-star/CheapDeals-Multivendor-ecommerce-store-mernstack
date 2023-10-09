import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from 'jwt-decode';
import api from "../../api/api";


export const add_friend = createAsyncThunk(
    'chat/add_friend',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/chat/customer/add-customer-friend', info, { withCredentials: true })
        console.log('API Response:', data); // Debugging statement
        return fulfillWithValue(data);
    } catch (error) {
        console.error('API Error:', error); // Debugging statement
        return rejectWithValue(error.response.data);
    }
});



export const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        my_friends: [],
        fd_messages: [],
        currentFd: "",
        errorMessage : "",
        successMessage: ""
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [add_friend.fulfilled]: (state, { payload }) => {
            state.fd_messages = payload.messages
            state.currentFd = payload.currentFd
            state.my_friends = payload.myFriends
        },
    }
})




export const { clearMessage } = chatReducer.actions
export default chatReducer.reducer