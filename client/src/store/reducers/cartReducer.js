import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from 'jwt-decode';
import api from "../../api/api";


export const add_to_wishlist = createAsyncThunk(
    'wishlist/add_to_wishlist',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/home/product/add-to-wishlist', info)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const get_wishlist_products = createAsyncThunk(
    'wishlist/get_wishlist_products',
     async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/product/get-wishlist-products/${userId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

export const delete_wishlist_product = createAsyncThunk(
    'wishlist/delete_wishlist_product',
     async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.delete(`/home/product/delete-wishlist-product/${wishlistId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

export const add_to_cart = createAsyncThunk(
    'cart/add_to_cart',
     async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/home/product/add-to-cart', info)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const get_cart_products = createAsyncThunk(
    'cart/get_cart_products',
     async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/product/get-cart-products/${userId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const delete_cart_product = createAsyncThunk(
    'cart/delete_cart_product',
     async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.delete(`/home/product/delete-cart-product/${cart_id}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const increase_cart_quantity = createAsyncThunk(
    'cart/increase_cart_quantity',
     async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.put(`/home/product/increase-cart-quantity/${cartId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


export const decrease_cart_quantity = createAsyncThunk(
    'cart/decrease_cart_quantity',
     async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.put(`/home/product/decrease-cart-quantity/${cartId}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})




/**
 * Redux slice for managing cart-related state.
 */

export const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        cart_products : [],
        cart_products_count : 0,
        wishlist_count : 0,
        wishlist: [],
        price: 0,
        shipping_fee : 0,
        out_of_stock_products : [],
        successMessage: '',
        errorMessage: '',
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [add_to_cart.rejected] : (state, { payload }) => {
            state.errorMessage = payload.error 
        },
        [add_to_cart.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
            state.cart_products_count = state.cart_products_count + 1
        },
        [get_cart_products.fulfilled]: (state, { payload }) => {
            state.price = payload.price
            state.cart_products = payload.cart_products
            state.cart_products_count = payload.cart_products_count
            state.shipping_fee = payload.shipping_fee
            state.out_of_stock_products = payload.outOfStockProduct
        },
        [delete_cart_product.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
        [increase_cart_quantity.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
        [decrease_cart_quantity.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
        [add_to_wishlist.rejected]: (state, { payload }) => {
            state.errorMessage = payload.error
        },        
        [add_to_wishlist.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
            state.wishlist = payload.wishlist
            state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1
        },        
        [get_wishlist_products.fulfilled]: (state, { payload }) => {
            state.wishlist = payload.wishlists
            state.wishlist_count = payload.wishlistCount
        },
        [delete_wishlist_product.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
            state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId)
            state.wishlist_count = state.wishlist_count - 1
        },
        
    }
})
export const { clearMessage } = cartReducer.actions
export default cartReducer.reducer