import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from 'jwt-decode';
import api from "../../api/api";

export const place_order = createAsyncThunk(
    'order/place_order',
     async ({products, price, shipping_fee, shippingInfo, userId, navigate, items}) => {
    try {
        const { data } = await api.post('/home/order/place-order', {products, price, shipping_fee, shippingInfo, userId, navigate, items})
        navigate('/payment', {
            state: {
                price: price + shipping_fee,
                items,
                orderId: data.orderId
            }
        })
        return true

  } catch (error) {
      console.log(error.response)
  }
})

export const get_orders = createAsyncThunk(
    'order/get_orders',
     async ({customerId, status}, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/customer/get-orders/${customerId}/${status}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

export const get_order_details = createAsyncThunk(
    'order/get_order_details',
     async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/customer/get-order-details/${orderId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})





export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        myOrders: [],
        errorMessage: '',
        successMessage: '',
        myOrder: {},
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [get_orders.fulfilled]: (state, { payload }) => {
            state.myOrders = payload.orders
        },
        [get_order_details.fulfilled]: (state, { payload }) => {
            state.myOrder = payload.order
        },
    }
})
export const { clearMessage } = orderReducer.actions
export default orderReducer.reducer