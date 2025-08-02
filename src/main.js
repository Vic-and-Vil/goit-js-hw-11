import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = form.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term', position: 'topRight' });
    return;
  }

  clearGallery();
  showLoader();

  try {npm
    const data = await getImagesByQuery(query);
    const hits = data.hits;
    if (hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(hits);
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ title: 'Error', message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
    form.reset();
  }
});
