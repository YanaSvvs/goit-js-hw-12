import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadMoreBtn = document.getElementById('load-more-btn');
const galleryElement = document.getElementById('gallery'); 

let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15; 

hideLoader();
hideLoadMoreButton();

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton(); 

  await fetchAndRenderImages();
  searchForm.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchAndRenderImages(true); 
});

async function fetchAndRenderImages(isLoadMore = false) {
  showLoader();
  if (isLoadMore) { 
      hideLoadMoreButton();
  }

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits && data.hits.length > 0) {
      createGallery(data.hits);

      if (isLoadMore) {
        const firstNewCard = galleryElement.lastElementChild; 
        if (firstNewCard) {
          const cardRect = firstNewCard.getBoundingClientRect();
          if (cardRect.height > 0) {
            window.scrollBy({
              top: cardRect.height * 2, 
              behavior: 'smooth',
            });
          }
        }
      }
      
      const totalLoadedImages = (currentPage -1) * PER_PAGE + data.hits.length;
      if (totalLoadedImages < data.totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        if (data.totalHits > 0) {
             iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 5000,
            });
        }
      }
    } else {
      hideLoadMoreButton(); 
      if (!isLoadMore && currentPage === 1) { 
        iziToast.info({
          title: 'No Results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 5000,
        });
      } else if (data.totalHits > 0) {  end.
         iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            timeout: 5000,
        });
      }
    }
  } catch (error) {
    console.error("Search or load more failed:", error);
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch images: ${error.message || 'Unknown error'}. Please try again later.`,
      position: 'topRight',
      timeout: 5000,
    });
    hideLoadMoreButton(); 
  } finally {
    hideLoader();
  }
}
