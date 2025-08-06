const API_KEY = 'ADD_YOUR_API_KEY';

export const fetchFoodImage = async (foodName) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(foodName)}&number=1&apiKey=${API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].image;
    } else {
      return null; // or a default image
    }
  } catch (error) {
    console.error("Spoonacular API Error:", error);
    return null;
  }
};
