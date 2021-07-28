import currentTestReducer from './currentTest/currentTestSlice';
import testsReducer from './tests/testsSlice';
import userDataReducer from './userData/userDataSlice';
import userInterfaceReducer from './userInterface/userInterfaceSlice';

export const reducers = {
  userInterface: userInterfaceReducer,
  userData: userDataReducer,
  tests: testsReducer,
  currentTest: currentTestReducer,
};
