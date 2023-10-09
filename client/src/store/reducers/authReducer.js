import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';
import api from "../../api/api";

// export const admin_login = createAsyncThunk(
//     'async/admin_login',
//      async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await api.post('/admin-login', info, { withCredentials: true })
//         // set the access token into localStorage here
//         localStorage.setItem('accessToken', data.accessToken)
//         return fulfillWithValue(data)

//   } catch (error) {
//       return rejectWithValue(error.response.data)
//   }
// })


export const customer_login = createAsyncThunk(
    'auth/customer_login',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/customer/customer-login', info, { withCredentials: true })
        // set the access token into localStorage here
        localStorage.setItem('customerToken', data.accessToken)
        return fulfillWithValue(data)

  } catch (error) {
    //   console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})

export const customer_register = createAsyncThunk(
    'auth/customer_register',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/customer/customer-register', info, { withCredentials: true })
        // set the access token into localStorage here
        localStorage.setItem('customerToken', data.accessToken)
        return fulfillWithValue(data)

  } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})


// export const profile_image_upload = createAsyncThunk(
//     'async/profile_image_upload',
//      async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await api.post('/profile-image-upload', info, { withCredentials: true })
//         return fulfillWithValue(data)
//   } catch (error) {
//     //   console.log(error.response.data)
//       return rejectWithValue(error.response.data)
//   }
// })

// export const update_profile = createAsyncThunk(
//     'async/update_profile',
//      async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await api.post('/update-profile', info, { withCredentials: true })
//         return fulfillWithValue(data)
//   } catch (error) {
//     //   console.log(error.response.data)
//       return rejectWithValue(error.response.data)
//   }
// })



// export const get_user_details = createAsyncThunk(
//     'async/get_user_details',
//      async (_, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await api.get('/get-user', { withCredentials: true })
//         return fulfillWithValue(data)

//   } catch (error) {
//     //   console.log(error.response.data)
//       return rejectWithValue(error.response.data)
//   }
// })


// const returnRole = (token) => {
//     if (token) {
//         const decodedToken = jwtDecode(token)
//         const tokenExpireTime = new Date(decodedToken.exp * 1000)
//         if (new Date() > tokenExpireTime) {
//             localStorage.removeItem('accessToken')
//             return ''
//         } else {
//             return decodedToken.role
//         }
//     } else {
//         return ''
//     }
// }

const decodedToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return ''
    }
}




export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: decodedToken(localStorage.getItem('customerToken')),
        // role: returnRole(localStorage.getItem('accessToken')),
        // token: localStorage.getItem('accessToken')
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [customer_register.pending] : (state, _) => {
            state.loader = true
        },
        [customer_register.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [customer_register.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            const userInfo = decodedToken(payload.accessToken)
            state.userInfo = userInfo
            // state.token = payload.accessToken
        },
        [customer_login.pending] : (state, _) => {
            state.loader = true
        },
        [customer_login.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [customer_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            const userInfo = decodedToken(payload.accessToken)
            state.userInfo = userInfo
            // state.userInfo = payload.userInfo;
            // state.token = payload.accessToken
            // state.role = returnRole(payload.accessToken) 
        },
    }
})
export const { clearMessage } = authReducer.actions
export default authReducer.reducer