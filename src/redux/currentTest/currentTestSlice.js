const { createSlice, createAction } = require('@reduxjs/toolkit');

const name = 'currentTest';
const initialState = {
  isFetched: false,
  entities: null,
  result: undefined,
};

const currentTestSlice = createSlice({
  name,
  initialState,
  reducers: {
    testFetched: (state, { payload }) => {
      state.isFetched = true;
      state.entities = payload.entities;
      state.result = payload.result;
    },
  },
});

export const fetchTest = createAction(`${name}/fetchTest`);

export const { testFetched } = currentTestSlice.actions;
export default currentTestSlice.reducer;
