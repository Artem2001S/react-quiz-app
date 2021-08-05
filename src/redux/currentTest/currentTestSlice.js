const { createSlice } = require('@reduxjs/toolkit');

const name = 'currentTest';
const initialState = {
  isFetched: false,
  entities: {},
  result: {},
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

    testDeleted: (state) => {
      state.entities.test = {};
    },

    testTitleChanged: (state, { payload }) => {
      state.entities.test[state.result].title = payload.title;
    },

    questionCreated: (state, { payload }) => {
      const { id, answers, ...question } = payload;

      const answerIds = answers.map(({ id }) => id);
      state.entities.questions
        ? (state.entities.questions[id] = {
            id,
            answers: answerIds,
            ...question,
          })
        : (state.entities.questions = {
            [id]: { id, answers: answerIds, ...question },
          });

      state.entities.test[state.result].questions.push(id);

      state.entities.answers || (state.entities.answers = {});
      answers.map((answer) => (state.entities.answers[answer.id] = answer));
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
      const { changes } = payload;
      const answer = state.entities.answers[payload.answerId];
      state.entities.answers[payload.answerId] = {
        ...answer,
        ...changes,
      };
    },

    answerCreated: (state, { payload }) => {
      const { questionId, answer } = payload;
      state.entities.answers
        ? (state.entities.answers[answer.id] = answer)
        : (state.entities.answers = { [answer.id]: answer });

      state.entities.questions[questionId].answers.push(answer.id);
    },

    answerMoved: (state, { payload }) => {
      const { newPosition, answerId, questionId } = payload;
      const { answers } = state.entities.questions[questionId];
      const fromIndex = answers.findIndex((id) => answerId === id);

      answers.splice(fromIndex, 1);
      answers.splice(newPosition, 0, answerId);
    },
    fetchTest: () => {},
    patchTest: () => {},
    deleteTest: () => {},
    patchQuestion: () => {},
    deleteQuestion: () => {},
    postQuestion: () => {},
    deleteAnswer: () => {},
    postAnswer: () => {},
    patchAnswer: () => {},
    changeAnswerPosition: () => {},
  },
});

export const {
  testFetched,
  testDeleted,
  testTitleChanged,
  questionCreated,
  questionUpdated,
  questionDeleted,
  answerDeleted,
  answerUpdated,
  answerCreated,
  answerMoved,
  fetchTest,
  patchTest,
  deleteTest,
  patchQuestion,
  deleteQuestion,
  postQuestion,
  deleteAnswer,
  postAnswer,
  patchAnswer,
  changeAnswerPosition,
} = currentTestSlice.actions;
export default currentTestSlice.reducer;
