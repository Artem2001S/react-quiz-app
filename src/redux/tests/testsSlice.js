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
  },
});

export const fetchTests = createAction(`${name}/fetchTests`);

export const { testsLoaded } = testsSlice.actions;
export default testsSlice.reducer;
