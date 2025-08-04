import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = form.elements['search-text'].value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  await fetchAndRender();
  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRender(true);
});

async function fetchAndRender(isLoadMore = false) {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: total } = data;
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found. Try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(hits);

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: 'You have reached the end of search results.',
        position: 'topRight',
      });
    }

    if (isLoadMore) smoothScroll();
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.classList.add('hidden');
