import { createAction, createSlice } from '@reduxjs/toolkit';
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
      };
    },
  },
});

export const fetchTests = createAction(`${name}/fetchTests`);
export const createNewTest = createAction(`${name}/createNewTest`);
export const deleteTest = createAction(`${name}/deleteTest`);

export const { testsLoaded } = testsSlice.actions;
export default testsSlice.reducer;
