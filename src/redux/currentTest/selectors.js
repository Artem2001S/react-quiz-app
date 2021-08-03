import { createSelector } from 'reselect';
import { denormalizeTest } from './normalize/normalizing';

const getCurrentTestEntities = (state) => state.currentTest.entities;
const getCurrentTestResult = (state) => state.currentTest.result;

export const getCurrentTestSelector = createSelector(
  [getCurrentTestEntities, getCurrentTestResult],
  (entities, result) => denormalizeTest(result, entities)
);

export const getIsCurrentTestFetchedSelector = (state) =>
  state.currentTest.isFetched;

export const getQuestionByIdSelector = (state, id) =>
  state.currentTest.entities?.questions[id];
export const getAnswerByIdSelector = (state, id) =>
  state.currentTest.entities?.answers[id];

export const getQuestionRightAnswerSelector = (state, questionId) =>
  getQuestionByIdSelector(state, questionId)?.answers.find(
    (answer) => getAnswerByIdSelector(state, answer).is_right
  );
