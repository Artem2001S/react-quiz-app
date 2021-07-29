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
    testTitleChanged: (state, { payload }) => {
      state.entities.test[state.result].title = payload.title;
    },
  },
});

export const fetchTest = createAction(`${name}/fetchTest`);
export const patchTest = createAction(`${name}/patchTest`);

export const { testFetched, testTitleChanged } = currentTestSlice.actions;
export default currentTestSlice.reducer;
