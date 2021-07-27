import userDataReducer from './userData/userDataSlice';
import userInterfaceReducer from './userInterface/userInterfaceSlice';

export const reducers = {
  userInterface: userInterfaceReducer,
  userData: userDataReducer,
};
