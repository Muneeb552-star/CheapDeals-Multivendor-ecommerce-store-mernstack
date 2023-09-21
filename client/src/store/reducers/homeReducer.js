import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"

/* This function will get all categories from database */

export const get_categories = createAsyncThunk(
    'product/get_categories',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get('/home/get-categories')
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* This function will get all products from database */

export const get_products = createAsyncThunk(
    'product/get_products',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get('/home/get-products')
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* This function will get one product from database */

export const get_product = createAsyncThunk(
    'product/get_product',
     async ( slug , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/get-product/${slug}`)
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

/* This function will get all products from database */

export const product_price_range = createAsyncThunk(
    'product/product_price_range',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get('/home/product-price-range')
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* This function will get all products from database */

export const filter_products = createAsyncThunk(
    'product/filter_products',
     async ( query , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/filter-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortByPrice}&&pageNumber=${query.currentPage}&&searchValue=${query.searchValue ? query.searchValue : ''}`)
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* This function will submit customer review of product */

export const customer_review = createAsyncThunk(
    'review/customer_review',
     async ( info , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.post(`/home/customer/submit-review`, info)
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})


/* This function will get all products from database */

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
     async ( {
        productId,
        pageNumber
     } , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
        return fulfillWithValue(data)
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})




export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categories : [],
        products : [],
        product : {},
        related_products : [],
        total_products : 0,
        latest_products : [],
        top_rated_products : [],
        discount_products : [],
        per_page : 4,
        price_range : {
            low: 0,
            high : 1000
        },
        successMessage: '',
        errorMessage: '',
        total_reviews: 0,
        rating_review: [],
        reviews: []
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },

    extraReducers: {
        [get_categories.fulfilled]: (state, { payload }) => {
            state.categories = payload.categories 
        },
        [get_products.fulfilled]: (state, { payload }) => {
            state.products = payload.products
            state.latest_products = payload.latest_products
            state.top_rated_products = payload.top_rated_products
            state.discount_products = payload.discount_products
        },
        [get_product.fulfilled]: (state, { payload }) => {
            state.product = payload.product
            state.related_products = payload.relatedProducts
        },
        [product_price_range.fulfilled]: (state, { payload }) => {
            state.price_range = payload.price_range
        },
        [filter_products.fulfilled]: (state, { payload }) => {
            state.products = payload.products
            state.per_page = payload.per_page
            state.total_products = payload.totalProducts
        },
        [customer_review.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
        [get_reviews.fulfilled]: (state, { payload }) => {
            state.total_reviews = payload.total_reviews
            state.rating_review = payload.rating_review
            state.reviews = payload.reviews
        },
    }
})
export const { clearMessage } = homeReducer.actions
export default homeReducer.reducer

