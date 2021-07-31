import React, { useState } from 'react';
import { useQuizCtx } from 'components/Quiz/QuizContext';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import { useCallback } from 'react';
import { questionTypes } from 'shared/constants';

const Number = () => {
  const { isLastQuestion, nextQuestion } = useQuizCtx();
  const [inputValue, setInputValue] = useState(0);
  const inputChangeHandler = useCallback(
    (e) => setInputValue(e.target.value),
    []
  );

  const nextQuestionBtnClickHandler = useCallback(() => {
    nextQuestion(questionTypes.number, inputValue);
  }, [inputValue, nextQuestion]);

  return (
    <div>
      <Input type="number" value={inputValue} onChange={inputChangeHandler} />
      <Button
        style={{ marginTop: '10px' }}
        onClick={nextQuestionBtnClickHandler}
      >
        {isLastQuestion ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default React.memo(Number);
