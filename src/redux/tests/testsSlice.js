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
    testRemoved: (state, { payload }) => {
      state.tests = state.tests.filter((test) => test.id !== payload.id);
    },
  },
});

export const fetchTests = createAction(`${name}/fetchTests`);
export const createNewTest = createAction(`${name}/createNewTest`);
export const deleteTest = createAction(`${name}/deleteTest`);

export const { testsLoaded, testCreated, testRemoved } = testsSlice.actions;
export default testsSlice.reducer;
