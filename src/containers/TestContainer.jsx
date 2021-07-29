import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAnswer as deleteAnswerAction,
  fetchTest,
  patchTest,
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
