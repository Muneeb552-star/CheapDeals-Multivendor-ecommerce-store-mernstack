import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtDecode from 'jwt-decode';
import api from "../../api/api";
import { getAccessToken } from '../../utils/tokenUtils'

export const admin_login = createAsyncThunk(
    'async/admin_login',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/admin-login', info, { withCredentials: true })
        // set the access token into localStorage here
        localStorage.setItem('accessToken', data.accessToken)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const seller_login = createAsyncThunk(
    'async/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
      try {

        const { data } = await api.post('/seller-login', info, { withCredentials: true })

        localStorage.setItem('accessToken', data.accessToken)
        return fulfillWithValue(data)

      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const seller_register = createAsyncThunk(
    'async/seller_register',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/seller-register', info, { withCredentials: true })
        // set the access token into localStorage here
        localStorage.setItem('accessToken', data.accessToken)
        return fulfillWithValue(data)

  } catch (error) {
    //   console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})


export const profile_image_upload = createAsyncThunk(
    'async/profile_image_upload',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.post('/profile-image-upload', info, { 
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return fulfillWithValue(data)

  } catch (error) {
    //   console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})


export const update_profile = createAsyncThunk(
    'async/update_profile',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.post('/update-profile', info, { 
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return fulfillWithValue(data)

  } catch (error) {
    //   console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})


export const get_user_details = createAsyncThunk(
    'async/get_user_details',
     async (_, { rejectWithValue, fulfillWithValue }) => {

    try {

        const accessToken = getAccessToken()

        const { data } = await api.get('/get-user', { 
            withCredentials: true, 
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


const returnRole = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token)
        const tokenExpireTime = new Date(decodedToken.exp * 1000)

        if (new Date() > tokenExpireTime) {
            localStorage.removeItem('accessToken')
            return ''
        } else {
            return decodedToken.role
        }

    } else {
        return ''
    }
}



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [admin_login.pending] : (state, _) => {
            state.loader = true
        },
        [admin_login.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [admin_login.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.userInfo = payload.userInfo
            state.token = payload.accessToken
            state.role = returnRole(payload.accessToken)
        },
        [seller_login.pending] : (state, _) => {
            state.loader = true
        },
        [seller_login.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [seller_login.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message; 
            state.userInfo = payload.userInfo;
            state.token = payload.accessToken
            state.role = returnRole(payload.accessToken)
        },
        [seller_register.pending] : (state, _) => {
            state.loader = true
        },
        [seller_register.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [seller_register.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message; 
            state.userInfo = payload.userInfo;
            state.token = payload.accessToken
            state.role = returnRole(payload.accessToken) 
        },
        [get_user_details.fulfilled]: (state, { payload }) =>{
            state.loader = false
            state.userInfo = payload.userInfo
        },
        [profile_image_upload.pending]: (state, _) =>{
            state.loader = true
        },
        [profile_image_upload.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [profile_image_upload.fulfilled]: (state, { payload }) =>{
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        },
        [update_profile.pending]: (state, _) =>{
            state.loader = true
        },
        [update_profile.fulfilled]: (state, { payload }) =>{
            state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        },
            

    }
})
export const { clearMessage } = authSlice.actions
export default authSlice.reducer