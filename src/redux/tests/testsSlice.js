import { createAction, createSlice } from '@reduxjs/toolkit';

const name = 'tests';

const initialState = {
  tests: [],
  isFetched: false,
};

const testsSlice = createSlice({
  name,
  initialState,
  reducers: {
    testsLoaded: (state, { payload }) => {
      state.isFetched = true;
      state.tests = payload.tests;
    },
    testCreated: (state, { payload }) => {
      state.tests.unshift(payload.test);
    },
  },
});

export const fetchTests = createAction(`${name}/fetchTests`);
export const createNewTest = createAction(`${name}/createNewTest`);

export const { testsLoaded, testCreated } = testsSlice.actions;
export default testsSlice.reducer;
