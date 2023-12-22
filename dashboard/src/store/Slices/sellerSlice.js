import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"
import { getAccessToken } from '../../utils/tokenUtils'


/* 
    This function will get all seller requests from database.
*/

export const get_seller_requests = createAsyncThunk(
    'seller/get_seller_requests',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.get('/get-seller-requests', { 
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(data)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

/* 
    This function will get one seller details to admin from database.
*/

export const get_seller = createAsyncThunk(
    'seller/get_seller',
     async ( sellerId , { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.get(`/get-seller/${sellerId}`, { 
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        console.log(data)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* 
    This function will get active seller details to admin from database.
*/

export const get_active_sellers = createAsyncThunk(
    'seller/get_seller',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.get(`/get-sellers`, { 
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

/* 
    This function will get one seller details to admin from database.
*/
export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
     async ( info , { rejectWithValue, fulfillWithValue }) => {
    try {

        const accessToken = getAccessToken()

        const { data } = await api.post(`/seller-status-update`, info, { 
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


export const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: ''
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [get_seller_requests.fulfilled] : (state, { payload }) => {
            state.sellers = payload.sellers
            // state.totalSeller = payload.totalSeller
        },
        [get_seller.fulfilled] : (state, { payload }) => {
            state.seller = payload.seller
            // state.totalSeller = payload.totalSeller
        },
        
        [seller_status_update.fulfilled] : (state, { payload }) => {
            state.successMessage = payload.message
            state.seller = payload.seller
            // state.totalSeller = payload.totalSeller
        },
        [get_active_sellers.fulfilled] : (state, { payload }) => {
            state.sellers = payload.sellers
            // state.totalSeller = payload.totalSeller
        }
        
    }
})
export const { clearMessage } = sellerSlice.actions
export default sellerSlice.reducer