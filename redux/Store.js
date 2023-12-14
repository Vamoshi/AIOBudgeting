import { configureStore } from "@reduxjs/toolkit";
import RecipeSearchReducer from "./RecipeSearchSlice";
import IngredientSearchReducer from "./IngredientSearchSlice";
import ReduxLogger from "redux-logger"

const logger = ReduxLogger.createLogger

const Store = configureStore({
    reducer: {
        recipeSearch: RecipeSearchReducer,
        ingredientSearch: IngredientSearchReducer
    },
})

export default Store