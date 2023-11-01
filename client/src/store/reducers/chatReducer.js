import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from 'jwt-decode';
import api from "../../api/api";


export const add_friend = createAsyncThunk(
    'chat/add_friend',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/chat/customer/add-customer-friend', info, { withCredentials: true })
        return fulfillWithValue(data)

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const send_message = createAsyncThunk(
    'chat/send_message',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/chat/customer/send-message-to-seller', info, { withCredentials: true })
        return fulfillWithValue(data)

    } catch (error) {
        return rejectWithValue(error.response.data)
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
        [send_message.fulfilled]: (state, { payload }) => {
            let tempFriends = state.my_friends
            let index = tempFriends.findIndex( f => f.idId === payload.message.receiverId )

            while ( index > 0 ) {
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
            }

            state.my_friends = tempFriends
            state.fd_messages = [...state.fd_messages, payload.message]
            state.successMessage = ' Message Sent Successfully '
        },
    }
})




export const { clearMessage } = chatReducer.actions
export default chatReducer.reducer