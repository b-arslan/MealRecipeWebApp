
# Meal Recipe App

This is a simple web application to search for meal recipes and display their details using the Ant Design library for layout and UI components. The app uses an autocomplete feature to search for meals and fetches detailed recipes when a meal is selected.

## Features

- Search for meals using an autocomplete input.
- Fetch and display meal details including name, instructions, and an image.
- Responsive layout using Ant Design components.
- Loading spinner while fetching meal details.

## Project Structure

- `pages`: Contains the main page component (`App`).
- `styles`: Contains SCSS files for styling.
- `api`: Contains functions to fetch meal data from an API.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/b-arslan/MealRecipeWebApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MealRecipeWebApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000`.

## Usage

1. Type a meal name into the autocomplete input. The app will fetch and display matching meal options.
2. Select a meal from the list.
3. Click the "Get Recipe" button to fetch and display the meal's details including an image and cooking instructions.

## Acknowledgements

- [Ant Design](https://ant.design/) for the UI components.
- [TheMealDB](https://www.themealdb.com/) for the meal data API.