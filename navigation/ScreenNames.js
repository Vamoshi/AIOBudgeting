export default ScreenNames = () => {
    return {
        Stack: {
            BudgetHomeScreen: "BudgetHomeScreen",
            BudgetDetails: "BudgetDetails",
            AccountsHomeScreen: "AccountsHomeScreen",
            AccountsDetails: "AccountsDetails",
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