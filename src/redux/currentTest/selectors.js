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

export const makeGetQuestionByIdSelector = (id) =>
  createSelector(getCurrentTestState, (state) => state.entities?.questions[id]);

export const makeGetAnswerByIdSelector = (id) =>
  createSelector(getCurrentTestState, (state) => state.entities?.answers[id]);

export const getQuestionRightAnswerSelector = (state, questionId) => {
  const questionSelector = makeGetQuestionByIdSelector(questionId);
  const question = questionSelector(state);

  return question?.answers.find((answer) => {
    const answerSelector = makeGetAnswerByIdSelector(answer);
    return answerSelector(state).is_right;
  });
};
