import defaultProductImg from '../images/product.png';

export const createProductsMarkup = data => {
  console.log(data);
  return data
    .map(({ id, title, images, variants }) => {
      const { price, compare_at_price } = variants[0];
      const discount = compare_at_price
        ? ((compare_at_price - price) / compare_at_price) * 100
        : null;

      return `<li class="product basis-[172px] md:basis-[220px] xl:basis-[295px] cursor-pointer" data-id="${id}">
        <div class="mb-[17px] rounded-[13px] xl:h-[298px] overflow-hidden">
          <img class="w-[172px] h-[174px] md:w-[220px] md:h-[200px] xl:w-full xl:h-full" src="${
            images[0] ? images[0].src : defaultProductImg
          }" alt="${title}" />
        </div>
        <div>
          <p class="mb-[9px] product-title text-[16px] font-bold">${title}</p>
          <p class="font-bold text-[20px] flex gap-[10px]">
            <span>${Math.round(price)}$</span>
            ${
              compare_at_price && compare_at_price > price
                ? `<span class="text-grey_40 line-through">${Math.round(
                    compare_at_price
                  )}$</span>
                   <span class="text-main_red py-[6px] flex items-center rounded-[62px] px-[12px] text-[12px] font-medium bg-light_red">-${Math.round(
                     discount
                   )}%</span>`
                : ''
            }
          </p>
        </div>
      </li>`;
    })
    .join('');
};
