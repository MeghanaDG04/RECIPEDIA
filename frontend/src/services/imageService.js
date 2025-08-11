const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const FALLBACK_IMAGE = "/fallback.jpg"; // must be in public folder

export async function fetchFoodImage(query) {
  if (!API_KEY) {
    console.warn("No Pexels API key found, returning fallback image.");
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
