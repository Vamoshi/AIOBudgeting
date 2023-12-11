import Components from "../screens/Components"
import Home from "../screens/Home"
import Pro from "../screens/Pro"
import Profile from "../screens/Profile"
import RecipeDetails from "../screens/RecipeDetails"
import RecipeSearch from "../screens/RecipeSearch"
import Settings from "../screens/Settings"


export default ScreenList = () => {
    return {
        Profile: Profile,
        Settings: Settings,
        Components: Components,
        Home: Home,
        Pro: Pro,
        RecipeSearch: RecipeSearch,
        RecipeDetails: RecipeDetails,
    }
}