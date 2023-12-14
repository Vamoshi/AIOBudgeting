import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APPLICATION_ID, APPLICATION_KEY } from "../Keys"

const initialState = {
    loading: false,
    recipes: [],
    links: {},
    from: 0,
    to: 0,
    count: 0,
    error: "",
}

const formatListToHttpString = (li) => {
    return li.map((e) => encodeURIComponent(e)).join('%2C%20')
}

const fetchRecipes = createAsyncThunk('recipeSearch/fetchRecipes', async (_, { getState }) => {
    // const ingredients = useSelector((state) => state.ingredientSearch.keywords) || ["egg", "chicken"]
    // const health = useSelector((state) => state.ingredientSearch.health) || ""

    const { ingredientSearch } = getState()
    const { keywords, health } = ingredientSearch;

    const response = await axios
        .get(`https://api.edamam.com/api/recipes/v2?type=public&q=${formatListToHttpString(keywords)}&app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEY}${health && `&health=${health}`}`);
    return response.data;
})

const RecipeSearchSlice = createSlice({
    name: 'recipeSearch',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.loading = false
            state.recipes = action.payload.hits
            state.links = action.payload._links
            state.from = action.payload.from
            state.to = action.payload.to
            state.count = action.payload.count
            state.error = ""
        })
        builder.addCase(fetchRecipes.rejected, (state, action) => {
            console.log(action);

            state.loading = false
            state.recipes = []
            state.error = action.error.message
        })
    }
})

export default RecipeSearchSlice.reducer
export { fetchRecipes }