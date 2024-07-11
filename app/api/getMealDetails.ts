import axios from "axios";

const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

export const fetchMealDetails = async (mealName: string): Promise<{ name: string, instructions: string, image: string} | null> => {

    if (!mealName) {
        return null;
    }

    const response = await axios.get(MEAL_API_URL, {
        params: {
            s: mealName
        }
    });

    const meals = response.data.meals || [];

    if (meals.length === 0) {
        return null;
    }

    const meal = meals[0];
    return {
        name: meal.strMeal,
        instructions: meal.strInstructions,
        image: meal.strMealThumb
    };

};