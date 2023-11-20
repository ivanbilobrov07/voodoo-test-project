import debounce from 'debounce';
import { createProductsMarkup } from './js/createMarkup';
import { fetchAllProducts, fetchProductsByPage } from './js/fetchProducst';
import { generatePaginationInstance } from './js/productsPagination';
import {
  generateProductOverviewMarkup,
  setProductListeners,
} from './js/productOverview';

const productsListRef = document.querySelector('#products-list');
const paginationContainerRef = document.querySelector('#products-pagination');

const TOTAL_ITEMS = 461;
const ITEMS_PER_PAGE = 9;
let PAGE = 1;
export const SCREENS = {
  MOBILE: 'Modile',
  TABLET: 'Tablet',
  DESKTOP: 'Desktop',
};

const fillProductsList = async page => {
  const products = await fetchProductsByPage(ITEMS_PER_PAGE, page);

  productsListRef.innerHTML = createProductsMarkup(products);
};

const handleListClick = async ({ target }) => {
  if (!target.closest('.product')) {
    return;
  }
  const { id } = target.closest('.product').dataset;

  const backdrop = document.querySelector('.backdrop');

  backdrop.innerHTML = await generateProductOverviewMarkup(id);
  setProductListeners();

  backdrop.classList.remove('hidden');
};

const calculateScreenSize = () => {
  const width = window.innerWidth;

  if (width >= 1300) {
    return SCREENS.DESKTOP;
  } else if (width < 768) {
    return SCREENS.MOBILE;
  } else {
    return SCREENS.TABLET;
  }
};

const onWindowResize = () => {
  const paginationInstance = generatePaginationInstance(
    paginationContainerRef,
    TOTAL_ITEMS,
    ITEMS_PER_PAGE,
    PAGE,
    calculateScreenSize()
  );
  paginationInstance.on('afterMove', ({ page }) => {
    PAGE = page;
    fillProductsList(page);
  });
};

const paginationInstance = generatePaginationInstance(
  paginationContainerRef,
  TOTAL_ITEMS,
  ITEMS_PER_PAGE,
  PAGE,
  calculateScreenSize()
);
paginationInstance.on('afterMove', ({ page }) => {
  PAGE = page;
  fillProductsList(page);
});

fillProductsList();

productsListRef.addEventListener('click', handleListClick);

window.addEventListener('resize', debounce(onWindowResize, 300));
