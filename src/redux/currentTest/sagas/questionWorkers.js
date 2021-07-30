import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import {
  questionCreated,
  questionDeleted,
  questionUpdated,
} from '../currentTestSlice';
import {
  deleteQuestionRequest,
  patchQuestionRequest,
  postQuestionRequest,
} from '../requests';

export function* patchQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { questionId, title, question_type, answer } = payload;

    const { data } = yield call(patchQuestionRequest, questionId, {
      title,
      question_type,
      answer,
    });

    yield put(
      questionUpdated({
        questionId,
        changes: { title: data.title, answer: data.answer },
      })
    );
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

export function* postQuestionWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { testId, question } = payload;
    const { data } = yield call(postQuestionRequest, testId, question);

    yield put(questionCreated(data));
  } catch (error) {
    yield put(messageReceived({ message: 'Question posting server error.' }));
  } finally {
    yield put(loadingFinished());
  }
}
