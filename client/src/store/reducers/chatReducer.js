import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';
import api from "../../api/api";







export const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        my_friends: [],
        fd_messages: [],
        currentFd: "",
        successMessage: ""
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        
    }
})
export const { clearMessage } = chatReducer.actions
export default chatReducer.reducer