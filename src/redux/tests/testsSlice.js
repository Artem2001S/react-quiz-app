import { createSlice } from '@reduxjs/toolkit';
import { testsListSortTypes } from 'shared/constants';

const name = 'tests';

const initialState = {
  tests: [],
  isFetched: false,
  meta: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    sort: testsListSortTypes.default,
    searchValue: '',
  },
};

const testsSlice = createSlice({
  name,
  initialState,
  reducers: {
    testsLoaded: (state, { payload }) => {
      const { meta, tests } = payload;
      state.isFetched = true;
      state.tests = tests;

      state.meta = {
        totalCount: meta.total_count,
        totalPages: meta.total_pages,
        currentPage: meta.currentPage || 1,
        sort: meta.sort,
        searchValue: meta.searchValue,
      };
    },
    fetchTests: () => {},
    createNewTest: () => {},
  },
});

export const { testsLoaded, createNewTest, fetchTests } = testsSlice.actions;
export default testsSlice.reducer;
