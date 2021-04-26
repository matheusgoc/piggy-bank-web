import { createSlice } from '@reduxjs/toolkit'

export const CategorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.list = action.payload
    },
  },
})

//actions
export const { setCategoryList } = CategorySlice.actions

//selectors
export const getCategoryList = state => state.categories.list

//reducers
export default CategorySlice.reducer
