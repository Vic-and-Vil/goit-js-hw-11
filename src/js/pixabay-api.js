import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '51594808-2f8a269bf80026fef40a32938';

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
