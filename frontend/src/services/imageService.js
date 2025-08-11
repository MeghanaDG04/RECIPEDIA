<<<<<<< HEAD
// src/services/imageService.js
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const FALLBACK_IMAGE = "/fallback.jpg"; // must be in public folder

export async function fetchFoodImage(query) {
  if (!API_KEY) {
    console.warn("No Pexels API key found, returning fallback image.");
=======
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
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e
    return FALLBACK_IMAGE;
  }

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
    const data = await res.json();
    return data.photos[0]?.src?.medium || FALLBACK_IMAGE;
  } catch (err) {
    console.error("Image fetch failed:", err);
    return FALLBACK_IMAGE;
  }
}
