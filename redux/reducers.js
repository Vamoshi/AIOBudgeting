import { SET_RECIPES, SET_SEARCH_KEYWORDS } from "./actions"

const intialState = {
    recipes: [],
    keywords: [],
}

const searchReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return { ...state, recipes: action.payload }
        case SET_SEARCH_KEYWORDS:
            return { ...state, keywords: action.payload }
        default:
            return state
    }
}

export default searchReducer