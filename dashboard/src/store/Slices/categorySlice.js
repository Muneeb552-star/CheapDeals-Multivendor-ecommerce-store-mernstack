import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* 
    This function will add/insert categories into database.
*/

export const add_category = createAsyncThunk(
    'category/add_category',
     async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)
        const { data } = await api.post('/add-category', formData, { withCredentials: true })
        return fulfillWithValue(data)

  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})

/* 
    This function will get all categories from database.
*/

export const get_categories = createAsyncThunk(
    'category/get_categories',
     async ( _ , { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get('/get-categories', { withCredentials: true })
        return fulfillWithValue(data)

  } catch (error) {
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




export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categories: [],
        totalCategories: 0
    },

    reducers: {
        clearMessage: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [add_category.pending] : (state, _) => {
            state.loader = true
        },
        [add_category.rejected] : (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error 
        },
        [add_category.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [get_categories.fulfilled]: (state, { payload }) => {
            // state.totalCategories = payload.totalCategories
            state.categories = payload.categories 
        }
    }
})
export const { clearMessage } = categorySlice.actions
export default categorySlice.reducer