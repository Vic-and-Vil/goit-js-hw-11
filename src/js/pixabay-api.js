import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = 'YOUR_PIXABAY_KEY_HERE';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(API_URL, { params });
  return response.data;
}
