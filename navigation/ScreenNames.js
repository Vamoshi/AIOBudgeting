export default ScreenNames = () => {
    return {
        Stack: {
            Home: 'StackHome',
            Profile: 'StackProfile',
            Settings: 'StackSettings',
            Components: 'StackComponents',
            Pro: 'StackPro',
            RecipeSearch: 'StackRecipeSearch',
            RecipeDetails: 'StackRecipeDetails',
        },
        Drawer: {
            Home: 'DrawerHome',
            Profile: 'DrawerProfile',
            Settings: 'DrawerSettings',
            Components: 'DrawerComponents',
            Pro: 'DrawerPro',
            RecipeSearch: 'DrawerRecipeSearch',
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