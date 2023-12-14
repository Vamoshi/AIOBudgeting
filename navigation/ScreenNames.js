// Order is important from Stack and Drawer
// After the space starts the subscreens

export default ScreenNames = () => {
    return {
        Stack: {
            Home: 'StackHome',
            Profile: 'StackFavorites',
            Settings: 'StackShopping List',
            Components: 'StackComponents',
            RecipeSearch: 'StackRecipeSearch',

            Pro: 'StackPro',
            RecipeDetails: 'StackRecipeDetails',
        },
        Drawer: {
            Home: 'DrawerHome',
            Profile: 'DrawerFavorites',
            Settings: 'DrawerShopping List',
            Components: 'DrawerComponents',
            RecipeSearch: 'DrawerRecipeSearch',

            Pro: 'DrawerPro',
            RecipeDetails: 'DrawerRecipeDetails',
        },
        Icons: {
            Profile: { icon: "heart", family: "font-awesome" },
            Settings: { icon: "cart", family: "ionicon" },
            Components: { icon: "toggle-outline", family: "ionicon" },
            Home: { icon: "shop", family: "GalioExtra" },
            RecipeSearch: { icon: "search-outline", family: "ionicon" },
        }
    }
}

Object.freeze(ScreenNames)