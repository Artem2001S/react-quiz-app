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

    questionCreated: (state, { payload }) => {
      const { id, ...question } = payload;
      state.entities.questions[id] = { id, ...question };

      state.entities.test[state.result].questions.push(id);
    },

    questionUpdated: (state, { payload }) => {
      const question = state.entities.questions[payload.questionId];
      state.entities.questions[payload.questionId] = {
        ...question,
        ...payload.changes,
      };
    },

    questionDeleted: (state, { payload }) => {
      state.entities.questions[payload.questionId] = null;
      const test = state.entities.test[state.result];

      test.questions = test.questions.filter(
        (questionId) => questionId !== payload.questionId
      );
    },

    answerDeleted: (state, { payload }) => {
      state.entities.answers[payload.answerId] = null;
      const question = state.entities.questions[payload.questionId];

      question.answers = question.answers.filter(
        (answerId) => answerId !== payload.answerId
      );
    },

    answerUpdated: (state, { payload }) => {
      const answer = state.entities.answers[payload.answerId];
      state.entities.answers[payload.answerId] = {
        ...answer,
        ...payload.changes,
      };
    },
  },
});

export const fetchTest = createAction(`${name}/fetchTest`);
export const patchTest = createAction(`${name}/patchTest`);

export const patchQuestion = createAction(`${name}/patchQuestion`);
export const deleteQuestion = createAction(`${name}/deleteQuestion`);
export const postQuestion = createAction(`${name}/postQuestion`);

export const deleteAnswer = createAction(`${name}/deleteAnswer`);
export const patchAnswer = createAction(`${name}/patchAnswer`);

export const {
  testFetched,
  testTitleChanged,
  questionCreated,
  questionUpdated,
  questionDeleted,
  answerDeleted,
  answerUpdated,
} = currentTestSlice.actions;
export default currentTestSlice.reducer;
