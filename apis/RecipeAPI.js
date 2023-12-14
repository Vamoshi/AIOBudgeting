// import { APPLICATION_ID, APPLICATION_KEY } from "../Keys"
// import axios from 'axios';

// class RecipeAPI {
//     getRecipesByKeywords = async (ingredients, health = "") => {
//         try {
//             const resultJson = await axios.get(`
//             https://api.edamam.com/api/recipes/v2?type=public&q=${formatListToHttpString(ingredients)}&app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEY}${health && `&health=${health}`}
//             `)

//             return { links: resultJson.data._links, recipes: resultJson.data.hits }
//         } catch (error) {
//             return { links: {}, recipes: {} }
//         }
//     }
// }

// const RecipeApi = new RecipeAPI()

// export default RecipeApi

// const formatListToHttpString = (li) => {
//     return li.map((e) => encodeURIComponent(e)).join('%2C%20')
// }