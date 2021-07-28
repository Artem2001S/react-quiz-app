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
