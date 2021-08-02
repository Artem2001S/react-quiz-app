export const getTestsListSelector = (state) => state.tests.tests;
export const getTestsIsFetchedSelector = (state) => state.tests.isFetched;

export const getTotalPagesSelector = (state) => state.tests.meta.totalPages;
export const getTestsCountSelector = (state) => state.tests.meta.totalCount;
export const getTestsCurrentPageSelector = (state) =>
  state.tests.meta.currentPage;

export const getTestsSortTypeSelector = (state) => state.tests.meta.sort;
