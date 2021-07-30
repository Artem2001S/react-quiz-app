import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAnswer as deleteAnswerAction,
  deleteQuestion as deleteQuestionAction,
  fetchTest,
  patchAnswer,
  patchQuestion,
  patchTest,
  postAnswer,
  postQuestion,
} from 'redux/currentTest/currentTestSlice';
import { useComponentDidMount } from 'hooks/useComponentDidMount';
import {
  getCurrentTestSelector,
  getIsCurrentTestFetchedSelector,
} from 'redux/currentTest/selectors';
import Test from 'components/Test/Test';
import Title from 'components/UI/Title/Title';
import Container from 'components/UI/Container/Container';
import { useCallback } from 'react';
import { useInputs } from 'hooks/useInputs';
import { nanoid } from '@reduxjs/toolkit';
import { messageReceived } from 'redux/userInterface/userInterfaceSlice';

const TestContainer = ({ testId }) => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const currentTest = useSelector(getCurrentTestSelector);
  const isTestFetched = useSelector(getIsCurrentTestFetchedSelector);
  useComponentDidMount(() => dispatch(fetchTest({ testId })));

  const { inputs, resetInputs } = useInputs([
    {
      id: nanoid(),
      label: 'New title:',
      name: 'title',
      value: '',
    },
  ]);

  const [titleInput] = inputs;

  const changeEditMode = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode]);

  const saveTitleBtnClickHandler = useCallback(() => {
    if (!titleInput.value) {
      dispatch(messageReceived({ message: 'Enter title.' }));
      return;
    } else {
      dispatch(patchTest({ testId, title: titleInput.value }));
      setIsEditMode(false);
      resetInputs();
    }
  }, [dispatch, resetInputs, testId, titleInput]);

  const deleteAnswer = useCallback(
    (answerId, questionId) => {
      dispatch(deleteAnswerAction({ answerId, questionId }));
    },
    [dispatch]
  );

  const toggleAnswerIsRight = useCallback(
    (answerId, answer) => {
      dispatch(
        patchAnswer({ answerId, is_right: !answer.is_right, text: answer.text })
      );
    },
    [dispatch]
  );

  const updateAnswerText = useCallback(
    (answerId, answer, newText) => {
      dispatch(
        patchAnswer({ answerId, is_right: answer.is_right, text: newText })
      );
    },
    [dispatch]
  );

  const updateQuestionTitle = useCallback(
    (questionId, title, questionType) => {
      dispatch(
        patchQuestion({ questionId, title, question_type: questionType })
      );
    },
    [dispatch]
  );

  const deleteQuestion = useCallback(
    (questionId) => {
      dispatch(deleteQuestionAction({ questionId }));
    },
    [dispatch]
  );

  const createQuestion = useCallback(
    (testId, question) => {
      if (!question.title) {
        dispatch(messageReceived({ message: 'Enter question title.' }));
      } else {
        dispatch(postQuestion({ testId, question }));
      }
    },
    [dispatch]
  );

  const createAnswer = useCallback(
    (questionId, answerText) => {
      dispatch(
        postAnswer({
          questionId,
          answer: { text: answerText, is_right: false },
        })
      );
    },
    [dispatch]
  );

  return isTestFetched ? (
    <>
      {currentTest && isTestFetched ? (
        <Test
          test={currentTest}
          isEditMode={isEditMode}
          input={titleInput}
          onEditModeChanged={changeEditMode}
          onSaveTitleBtnClick={saveTitleBtnClickHandler}
          onAnswerDelete={deleteAnswer}
          onAnswerIsRightToggle={toggleAnswerIsRight}
          onNewAnswerFormSubmit={createAnswer}
          onAnswerTextChanged={updateAnswerText}
          onQuestionTitleUpdate={updateQuestionTitle}
          onQuestionDelete={deleteQuestion}
          onNewQuestionFormSubmit={createQuestion}
        />
      ) : (
        <Container>
          <Title large>Test not found</Title>
        </Container>
      )}
    </>
  ) : null;
};

export default React.memo(TestContainer);
