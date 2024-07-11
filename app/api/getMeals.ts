import axios from 'axios';

const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

export const fetchMeals = async (query: string): Promise<{ value: string, label: string }[]> => {
    if (query.length < 2) {
        return [];
    }

    const response = await axios.get(MEAL_API_URL, {
        params: {
            s: query
        }
    });

    const meals = response.data.meals || [];

    return meals.map((meal: { strMeal: string }) => ({
        value: meal.strMeal,
        label: meal.strMeal
    }));
};
