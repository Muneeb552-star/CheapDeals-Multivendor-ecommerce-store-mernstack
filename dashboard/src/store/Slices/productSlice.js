import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* 
    This function will add/insert categories into database.
*/

export const add_product = createAsyncThunk(
    'product/add_product',
     async ( product, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/add-product', product, { withCredentials: true })
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

/* 
    This function will update product into database.
*/

export const update_product = createAsyncThunk(
    'product/update_product',
     async ( product, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/update-product', product, { withCredentials: true })
        console.log(data)
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* 
    This function will update product images only.
*/

export const update_product_image = createAsyncThunk(
    'product/update_product_image',
     async ( imageData, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post('/update-product-image', imageData, { withCredentials: true })
        console.log(data)
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

/* 
    This function will get all products from database.
*/

export const get_products = createAsyncThunk(
    'product/get_products',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get('/get-products', { withCredentials: true })
        return fulfillWithValue(data)
  } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})


/* 
    This function will get single products from database.
*/

export const get_product = createAsyncThunk(
    'product/get_product',
     async ( productId , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/get-product/${productId}`, { withCredentials: true })
        return fulfillWithValue(data)
  } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
  }
})

/* 
    Get categories function with pagination 
*/
// export const get_categories = createAsyncThunk(
//     'category/get_categories',
//      async ( { perPage, page, searchValue } , { rejectWithValue, fulfillWithValue }) => {
//     try {
        
//         const { data } = await api.get(`/get-categories?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, { withCredentials: true })
//         console.log(data)
//         return fulfillWithValue(data)

//   } catch (error) {
//       return rejectWithValue(error.response.data)
//   }
// })




export const productSlice = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        products: [],
        product: '',
        totalProducts: 0
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [add_product.pending] : (state, _) => {
            state.loader = true
        },
        [add_product.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [add_product.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
        },
        [get_products.fulfilled]: (state, { payload }) => {
            // state.totalProducts = payload.totalProducts
            state.products = payload.products 
        },
        [get_product.fulfilled]: (state, { payload }) => {
            // state.totalProducts = payload.totalProducts
            state.product = payload.product 
        },
        [update_product.pending] : (state, _) => {
            state.loader = true
        },
        [update_product.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [update_product.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.product = payload.product
        },
        [update_product_image.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
            state.product = payload.product
        },
    }
})
export const { clearMessage } = productSlice.actions
export default productSlice.reducer