import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keywords: [],
  health: ""
}

const ingredientSearchSlice = createSlice({
  name: 'ingredientSearch',
  initialState,
  reducers: {
    updateIngredientList: (state, action) => {
      state.keywords = action.payload.split(/[,\s]+/)
    },
  },
})

export default ingredientSearchSlice.reducer
export const { updateIngredientList } = ingredientSearchSlice.actions
