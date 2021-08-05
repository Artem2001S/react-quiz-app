import { createSelector } from 'reselect';
import { denormalizeTest } from './normalize/normalizing';

const getCurrentTestState = (state) => state.currentTest;

const getCurrentTestEntities = createSelector(
  getCurrentTestState,
  (state) => state.entities
);

const getCurrentTestResult = createSelector(
  getCurrentTestState,
  (state) => state.result
);

export const getCurrentTestSelector = createSelector(
  [getCurrentTestEntities, getCurrentTestResult],
  (entities, result) => denormalizeTest(result, entities)
);

export const getIsCurrentTestFetchedSelector = createSelector(
  getCurrentTestState,
  (state) => state.isFetched
);

export const getQuestionByIdSelector = createSelector(
  getCurrentTestState,
  (state, id) => state.entities?.questions[id]
);

export const getAnswerByIdSelector = createSelector(
  getCurrentTestState,
  (state, id) => state.entities?.answers[id]
);

export const getQuestionRightAnswerSelector = (state, questionId) =>
  getQuestionByIdSelector(state, questionId)?.answers.find(
    (answer) => getAnswerByIdSelector(state, answer).is_right
  );
