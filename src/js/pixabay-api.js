import axios from 'axios';

const API_KEY = '50595103-65097a90456797714ffdbb949'; 
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: PER_PAGE,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch images');
  }
}