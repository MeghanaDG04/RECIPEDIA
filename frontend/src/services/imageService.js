const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const FALLBACK_IMAGE = '/fallback-image.jpg';

export const fetchFoodImage = async (foodName) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(foodName)}&number=1&apiKey=${API_KEY}`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].image || FALLBACK_IMAGE;
    } else {
      return FALLBACK_IMAGE;
    }
  } catch (error) {
    console.error("API Error:", error);
    return FALLBACK_IMAGE;
  }
};
