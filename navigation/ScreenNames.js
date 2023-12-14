// Order is important from Stack and Drawer
// After the space starts the subscreens

export default ScreenNames = () => {
    return {
        Stack: {
            Home: 'StackHome',
            Profile: 'StackProfile',
            Settings: 'StackNotes',
            Components: 'StackComponents',
            RecipeSearch: 'StackRecipeSearch',

            Pro: 'StackPro',
            RecipeDetails: 'StackRecipeDetails',
        },
        Drawer: {
            Home: 'DrawerHome',
            Profile: 'DrawerProfile',
            Settings: 'DrawerNotes',
            Components: 'DrawerComponents',
            RecipeSearch: 'DrawerRecipeSearch',

            Pro: 'DrawerPro',
            RecipeDetails: 'DrawerRecipeDetails',
        },
        Icons: {
            Profile: { icon: "circle-10", family: "GalioExtra" },
            Settings: { icon: "gears", family: "font-awesome" },
            Components: { icon: "toggle-outline", family: "ionicon" },
            Home: { icon: "shop", family: "GalioExtra" },
            RecipeSearch: { icon: "search-outline", family: "ionicon" },
        }
    }
}

Object.freeze(ScreenNames)