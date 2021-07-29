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

    answerDeleted: (state, { payload }) => {
      state.entities.answers[payload.answerId] = null;
      const question = state.entities.questions[payload.questionId];

      question.answers = question.answers.filter(
        (answerId) => answerId !== payload.answerId
      );
    },
  },
});

export const fetchTest = createAction(`${name}/fetchTest`);
export const patchTest = createAction(`${name}/patchTest`);
export const deleteAnswer = createAction(`${name}/deleteAnswer`);

export const { testFetched, testTitleChanged, answerDeleted } =
  currentTestSlice.actions;
export default currentTestSlice.reducer;
