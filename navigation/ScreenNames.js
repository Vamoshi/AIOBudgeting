export default ScreenNames = () => {
    return {
        Stack: {
            BudgetHomeScreen: "BudgetHomeScreen",
            BudgetDetails: "BudgetDetails",
            AccountsHomeScreen: "AccountsHomeScreen",
            AccountsDetails: "AccountsDetails",
        },
        Tabs: {
            BudgetTab: "BudgetTab",
            AccountsTab: "AccountsTab",
            ComponentsTab: "ComponentsTab"
        },
        Icons: {
            BudgetTab: { icon: "wallet-outline", family: "ionicon" },
            AccountsTab: { icon: "card-outline", family: "ionicon" },
            // Components: { icon: "toggle-outline", family: "ionicon" },
            // Home: { icon: "shop", family: "GalioExtra" },
            // RecipeSearch: { icon: "search-outline", family: "ionicon" },
        }
    }
}

Object.freeze(ScreenNames)