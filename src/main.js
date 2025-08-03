import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = form.elements['search-text'].value.trim(); // ← Назва як у другому варіанті

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
    // ✅ ГОЛОВНЕ: передаємо currentPage!
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: total } = data;
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
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
        message: "We're sorry, but you've reached the end of search results.",
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

function smoothScroll() {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: 2 * height, behavior: 'smooth' });
}
loadMoreBtn.classList.add('hidden');
