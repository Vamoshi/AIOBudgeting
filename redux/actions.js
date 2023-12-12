export const SET_RECIPES = 'SET_RECIPES'
export const SET_SEARCH_KEYWORDS = 'SET_SEARCH_KEYWORDS'

export const setRecipes = recipes => dispatch => {
    dispatch({ type: SET_RECIPES, payload: recipes })
}

export const setSearchKeywords = keywords => dispatch => {
    dispatch({ type: SET_SEARCH_KEYWORDS, payload: keywords })
}