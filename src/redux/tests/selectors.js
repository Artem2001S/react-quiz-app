import { createSelector } from 'reselect';

const getTestsState = (state) => state.tests;
export const getTestsListSelector = createSelector(
  getTestsState,
  (testsState) => testsState.tests
);

export const getTestsIsFetchedSelector = createSelector(
  getTestsState,
  (testsState) => testsState.isFetched
);

const getTestsMeta = createSelector(
  getTestsState,
  (testsState) => testsState.meta
);

export const getTotalPagesSelector = createSelector(
  getTestsMeta,
  (meta) => meta.totalPages
);

export const getTestsCountSelector = createSelector(
  getTestsMeta,
  (meta) => meta.totalCount
);

export const getTestsCurrentPageSelector = createSelector(
  getTestsMeta,
  (meta) => meta.currentPage
);

export const getTestsSortTypeSelector = createSelector(
  getTestsMeta,
  (meta) => meta.sort
);

export const getTestsSearchValue = createSelector(
  getTestsMeta,
  (meta) => meta.searchValue
);
