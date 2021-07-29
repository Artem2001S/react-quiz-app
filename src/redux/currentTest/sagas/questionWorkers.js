import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import { questionDeleted, questionUpdated } from '../currentTestSlice';
import { deleteQuestionRequest, patchQuestionRequest } from '../requests';

export function* patchQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId, title, question_type } = payload;
    yield call(patchQuestionRequest, questionId, { title, question_type });

    yield put(questionUpdated({ questionId, changes: { title } }));
  } catch (error) {
    yield put(messageReceived({ message: 'Question patching server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}

export function* deleteQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId } = payload;

    yield call(deleteQuestionRequest, questionId);

    yield put(questionDeleted({ questionId }));
  } catch (error) {
    yield put(messageReceived({ message: 'Question deleting server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}
