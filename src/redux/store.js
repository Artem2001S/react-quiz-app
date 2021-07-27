import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducers } from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: true,
});
