import axios from 'axios';

import { fetchAllProducts } from './fetchProducst';

import imageSprite from '../images/sprite.svg';
import productDefaultImage from '../images/product.png';

const SIZE_VALUES = {
  xs: 'X-Small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'X-Large',
};

const createRecomendationsMarkup = async id => {
  // const recomendations = await axios.get(
  //   `/recommendations/products.json?product_id=${id}&limit=4`
  // );
  // console.log(recomendations);
  return '';
};

const generateOptions = (options, activeOption) => {
  if (
    !options.length ||
    (options.length === 1 && options[0].name === 'Title')
  ) {
    return '';
  }

  const generateColorOptions = ({ name, values, position, active }) => {
    return `
    <div class="pb-[24px] mb-[24px] border-b border-grey_10">
      <p class="mb-[16px] text-[14px] text-grey_60">
        Select Colors
      </p>
      <ul class="product__colors-list flex gap-[12px] flex-wrap" data-position="${position}">
        ${values
          .map(
            value => `<li data-color_active data-color_value="${value}">
          <label class="product-item__color-label">
            <input ${
              value === active ? 'checked' : ''
            } class="product-item__color-input visually-hidden" type="radio" value="${value}" name="${name}" />
            <span class="product-item__color-icon" style="background-color: ${value}"></span>
          </label>
        </li>`
          )
          .join('')}
      </ul>
    </div>
    `;
  };

  const generateSizeOptions = ({ name, values, position, active }) => {
    return `
    <div class="pb-[24px] mb-[24px] border-b border-grey_10">
      <p class="mb-[16px] text-[14px] text-grey_60">
        Choose Size
      </p>
      <ul class="product__sizes-list flex pb-[10px] gap-[8px] overflow-x-auto overflow-y-initial" data-position="${position}">
        ${values
          .map(
            value => `<li data-size_active data-size_value="${value}">
          <label class="product-item__size-label">
            <input ${
              value === active ? 'checked' : ''
            } class="product-item__size-input visually-hidden" type="radio" value="${value}" name="${name}" />
            <span class="product-item__size-button">${SIZE_VALUES[value]}</span>
          </label>
        </li>`
          )
          .join('')}
      </ul>
    </div>
    `;
  };

  const generateElementOptions = ({ name, values, position, active }) => {
    return `
    <div class="pb-[24px] mb-[24px] border-b border-grey_10">
      <p class="mb-[16px] text-[14px] text-grey_60">
        Choose Element
      </p>
      <ul class="product__elements-list flex pb-[10px] gap-[8px] overflow-x-auto overflow-y-initial" data-position="${position}">
        ${values
          .map(
            value => `<li data-element_active data-element_value="${value}">
          <label class="product-item__element-label">
            <input ${
              value === active ? 'checked' : ''
            } class="product-item__element-input visually-hidden" type="radio" value="${value}" name="${name}" />
            <span class="product-item__element-button">${value}</span>
          </label>
        </li>`
          )
          .join('')}
      </ul>
    </div>
    `;
  };

  for (let i = 0; i < options.length; i++) {
    options[i].active = activeOption[`option${i + 1}`];
  }

  const sortedOptions = [];
  options.find(o => o.name === 'Color') &&
    sortedOptions.push(options.find(o => o.name === 'Color'));
  options.find(o => o.name === 'Size') &&
    sortedOptions.push(options.find(o => o.name === 'Size'));
  options.find(o => o.name === 'Element') &&
    sortedOptions.push(options.find(o => o.name === 'Element'));

  const markup = `<div class="product__options">
    ${sortedOptions.map(option => {
      if (option.name === 'Color') {
        return generateColorOptions(option);
      }
      if (option.name === 'Size') {
        return generateSizeOptions(option);
      }
      if (option.name === 'Element') {
        return generateElementOptions(option);
      }
    })}
  </div>`;

  return markup;
};

export const generateProductOverviewMarkup = async id => {
  const product = (await fetchAllProducts()).find(p => p.id === +id);

  const { title, options, variants } = product;
  const image = product.images[0]?.src ?? productDefaultImage;

  const activeVariant = variants[0];

  const optionsMarkup = generateOptions(options, activeVariant);
  const { price, compare_at_price } = activeVariant;

  const discount = compare_at_price
    ? ((compare_at_price - price) / compare_at_price) * 100
    : null;

  return `
      <div class="container xl:max-w-[1240px]">
        <div
          class="bg-white rounded-[30px] p-[13px] relative pb-[28px] xl:pt-[92px] xl:pr-[54px] xl:pl-[50px] xl:pb-[104px]"
        >
          <div data-product_id="${id}" class="xl:flex xl:mb-[123px] xl:gap-[40px] product">
            <button id="product__btn-close" class="block absolute top-[25px] right-[25px]">
              <svg class="h-[20px] w-[20px] xl:w-[33px] xl:h-[33px]">
                <use href="${imageSprite}#icon-close"></use>
              </svg>
            </button>
            <img
              class="block mb-[28px] w-[334px] h-[290px] xl:w-[505px] xl:h-[510px] xl:mb-0 rounded-[30px] xl:rounded-none"
              src="${image}"
              alt="${title}"
            />
            <div class="">
              <div class="pb-[24px] mb-[24px] border-b border-grey_10">
                <h2 class="mb-[12px] text-[24px] xl:leading-normal xl:text-[40px] font-black leading-[28px]">
                  ${title}
                </h2>
                <p id="product__price" class="mb-[22px] font-bold text-[24px] xl:text-[32px] flex gap-[10px] leading-normal">
                  <span class="product__price-main">${Math.round(price)}$</span>
                  ${
                    compare_at_price && compare_at_price > price
                      ? `<span class="text-grey_40 product__price-past line-through">${Math.round(
                          compare_at_price
                        )}$</span>
                         <span class="text-main_red product__price-discount py-[6px] flex items-center rounded-[62px] px-[12px] text-[14px] xl:text-[16px] font-medium bg-light_red">-${Math.round(
                           discount
                         )}%</span>`
                      : ''
                  }
                </p>
                <p class="text-[14px] xl:text-[16px] text-grey_60 leading-[20px]">
                  This graphic t-shirt which is perfect for any occasion.
                  Crafted from a soft and breathable fabric, it offers superior
                  comfort and style.
                </p>
              </div>
              <form class="mb-[90px]" id="product__form">
                ${optionsMarkup}
                <div class="flex justify-between xl:gap-[20px]">
                  <div
                    class="flex gap-[16px] items-center py-[12px] px-[16px] bg-background rounded-[62px]"
                  >
                    <button type="button">
                      <svg width="20" height="20">
                        <use href="${imageSprite}#icon-minus"></use>
                      </svg>
                    </button>
                    <span class="text-[14px] font-medium">1</span>
                    <button type="button">
                      <svg width="20" height="20">
                        <use href="${imageSprite}#icon-plus"></use>
                      </svg>
                    </button>
                  </div>
                  <button
                    class="min-w-[212px] h-[44px] xl:w-full text-[14px] bg-primaryText text-white rounded-[62px] flex p-[12px] font-medium justify-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h2 class="mb-[19px] text-[24px] font-black leading-[36px] xl:text-[38px]">You might also like</h2>
            <ul id="recomendation__list">${await createRecomendationsMarkup(
              id
            )}</ul>
          </div>
        </div>
      </div>
  `;
};

const changeProductData = async (id, activeOption) => {
  const product = (await fetchAllProducts()).find(p => p.id === +id);

  const { variants } = product;
  const activeVariant = variants.find(
    variant => variant.title === activeOption
  );

  const { price, compare_at_price } = activeVariant;
  const discount = compare_at_price
    ? ((compare_at_price - price) / compare_at_price) * 100
    : null;

  const productPriceRef = document.querySelector('#product__price');
  const mainPriceRef = productPriceRef.querySelector('.product__price-main');
  const pastPriceRef = productPriceRef.querySelector('.product__price-past');
  const discountRef = productPriceRef.querySelector('.product__price-discount');

  mainPriceRef.innerHTML = `$${Math.round(price)}`;
  if (compare_at_price) {
    pastPriceRef.innerHTML = `$${Math.round(compare_at_price)}`;
  }
  if (discount && discount > 0) {
    discountRef.innerHTML = `-${Math.round(discount)}%`;
  }
};

const onOptionsChange = async e => {
  const { product_id } = e.target.closest('.product').dataset;
  const colorsListRef = document.querySelector('.product__colors-list');
  const sizeListRef = document.querySelector('.product__sizes-list');
  const elementsListRef = document.querySelector('.product__elements-list');

  const colorActiveValue = colorsListRef
    ?.querySelector('.product-item__color-input:checked')
    .closest('li').dataset.color_value;
  const sizeActiveValue = sizeListRef
    ?.querySelector('.product-item__size-input:checked')
    .closest('li').dataset.size_value;
  const elementActiveValue = elementsListRef
    ?.querySelector('.product-item__element-input:checked')
    .closest('li').dataset.element_value;

  const colorPosition = colorsListRef?.dataset.position;
  const sizePosition = sizeListRef?.dataset.position;
  const elementPosition = elementsListRef?.dataset.position;

  const options = [];

  if (colorPosition) {
    options.push({
      name: 'Color',
      position: colorPosition,
      value: colorActiveValue,
    });
  }
  if (sizePosition) {
    options.push({
      name: 'Size',
      position: sizePosition,
      value: sizeActiveValue,
    });
  }
  if (elementPosition) {
    options.push({
      name: 'Element',
      position: elementPosition,
      value: elementActiveValue,
    });
  }

  options.sort((a, b) => a.position - b.position);

  if (e.target.closest('[data-color_value]')) {
    const { color_value: colorValue } =
      e.target.closest('[data-color_value]').dataset;

    const activeOptionString = options
      .map(option => {
        return option.name === 'Color' ? colorValue : option.value;
      })
      .join(' / ');

    changeProductData(product_id, activeOptionString);
  } else if (e.target.closest('[data-size_value]')) {
    const { size_value: sizeValue } =
      e.target.closest('[data-size_value]').dataset;

    const activeOptionString = options
      .map(option => {
        return option.name === 'Size' ? sizeValue : option.value;
      })
      .join(' / ');

    changeProductData(product_id, activeOptionString);
  } else if (e.target.closest('[data-element_value]')) {
    const { element_value: elementValue } =
      e.target.closest('[data-size_value]').dataset;

    const activeOptionString = options
      .map(option => {
        return option.name === 'Element' ? elementValue : option.value;
      })
      .join(' / ');

    changeProductData(product_id, activeOptionString);
  }
};

const closeProductOverview = () => {
  const productBackdropRef = document.querySelector('.backdrop');
  window.removeEventListener('keydown', onKeyboardPress);
  productBackdropRef.classList.add('hidden');
};

const onBackdropClick = e => {
  if (e.target !== e.currentTarget) {
    return;
  }

  closeProductOverview();
};

const onKeyboardPress = e => {
  if (e.code !== 'Escape') {
    return;
  }

  closeProductOverview();
};

export const setProductListeners = () => {
  const productFormRef = document.querySelector('#product__form');
  const productBackdropRef = document.querySelector('.backdrop');
  const closeButtonRef = document.querySelector('#product__btn-close');

  productFormRef.addEventListener('submit', e => {
    e.preventDefault();
  });

  window.addEventListener('keydown', onKeyboardPress);
  productBackdropRef.addEventListener('click', onBackdropClick);
  closeButtonRef.addEventListener('click', closeProductOverview);

  const productOptionsRef = document.querySelector('.product__options');

  if (!productOptionsRef) return;

  productOptionsRef.addEventListener('change', onOptionsChange);
};
