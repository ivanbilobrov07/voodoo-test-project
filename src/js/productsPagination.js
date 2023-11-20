import Pagination from 'tui-pagination';
import sprite from '../images/sprite.svg';
import { SCREENS } from '..';

const generatePrev = () => {
  return `<a href="#" class="mr-auto flex items-center font-medium gap-[8px] py-[8px] px-[10px] rounded-[8px] border border-grey_10">
            <svg width="16" height="16"><use href="${sprite}#left-arrow"></use></svg>
            <span class="tui-ico-{{type}} hidden sm:block">Previous</span>
            </a>`;
};

const generateNext = () => {
  return `<a href="#" class="ml-auto flex items-center font-medium gap-[8px] py-[8px] px-[10px] rounded-[8px] border border-grey_10">
    <span class="tui-ico-{{type}} hidden sm:block">Next</span>
            <svg width="16" height="16"><use href="${sprite}#right-arrow"></use></svg>
            </a>`;
};

const generateOptions = (totalItems, itemsPerPage, page, visiblePages) => {
  return {
    totalItems,
    itemsPerPage,
    visiblePages,
    page,
    centerAlign: true,
    firstItemClassName: 'pagination-first-elem',
    lastItemClassName: 'pagination-last-elem',
    template: {
      page: `<a href="#" class="w-[40px] h-[40px] flex text-grey_60 items-center justify-center rounded-[8px]">{{page}}</a>`,
      currentPage: `<a href="#" class="w-[40px] h-[40px] flex items-center text-primaryText bg-grey_10 justify-center rounded-[8px]">{{page}}</a>`,
      moveButton: function ({ type }) {
        let template = '';
        if (type === 'prev') {
          template = generatePrev();
        } else if (type === 'next') {
          template = generateNext();
        } else {
          template = '<a style="display: none" href="#"></a>';
        }

        return template;
      },
      disabledMoveButton: function ({ type }) {
        let template = '';

        if (type === 'prev') {
          template = generatePrev();
        } else if (type === 'next') {
          template = template = generateNext();
        } else {
          template = '<a style="display: none" href="#"></a>';
        }

        return template;
      },
      moreButton: `<a href="#" class="w-[40px] h-[40px] flex text-grey_60 items-center justify-center rounded-[8px]">...</a>`,
    },
  };
};

export const generatePaginationInstance = (
  element,
  totalItems,
  itemsPerPage,
  page,
  screen
) => {
  let visiblePages = 2;

  if (screen === SCREENS.MOBILE) {
    visiblePages = 2;
  } else if (screen === SCREENS.TABLET) {
    visiblePages = 4;
  } else {
    visiblePages = 6;
  }

  return new Pagination(
    element,
    generateOptions(totalItems, itemsPerPage, page, visiblePages)
  );
};
