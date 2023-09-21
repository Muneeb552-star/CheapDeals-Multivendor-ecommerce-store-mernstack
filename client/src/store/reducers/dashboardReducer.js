import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from 'jwt-decode';
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
    'dashboard/get_dashboard_index_data',
     async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})





export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        recent_orders: [],
        total_orders: 0,
        pending_orders: 0,
        cancelled_orders : 0,
        errorMessage: '',
        successMessage: '',
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [get_dashboard_index_data.fulfilled]: (state, { payload }) => {
            state.total_orders = payload.totalOrders
            state.pending_orders = payload.pendingOrders
            state.cancelled_orders = payload.cancelledOrders
            state.recent_orders = payload.recentOrders
        },
        
    }
})
export const { clearMessage } = dashboardReducer.actions
export default dashboardReducer.reducer