import { fetchProducts } from "./api";
import { debounce } from "./debounce";
import { callbackWithPreload } from "./preload";


export const filterProducts = () => {
  const filterForm = document.querySelector('.filter__form');
  const goodsTitle = document.querySelector('.goods__title');
  const goodsSection = document.querySelector('.goods');
  
  const applyFilters = () => {
    const formData = new FormData(filterForm);
    const type = formData.get('type');
    const minPrice = formData.get('minPrice');
    const maxPrice = formData.get('maxPrice');
    const params = {};

    if (type) params.type = type;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    callbackWithPreload(goodsSection, fetchProducts, params)
  };

  applyFilters();

  const applyPriceFilters = debounce(applyFilters, 500);

  filterForm.addEventListener('input', (event) => {
    const target = event.target;

    if (target.name === 'type') {
      goodsTitle.textContent = target.labels[0].textContent;
      filterForm.minPrice.value = '';
      filterForm.maxPrice.value = '';
      applyFilters();
      return;
    }

    if (target.name === 'minPrice' || target.name === 'maxPrice') {
      applyPriceFilters();
    }
  });
};