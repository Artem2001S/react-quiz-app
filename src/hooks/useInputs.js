import { useCallback, useState } from 'react';

export const useInputs = (inputsArray) => {
  const [inputs, setInputs] = useState(inputsArray);

  const changeInputValue = useCallback(
    (id, e) => {
      e.target.type === 'checkbox'
        ? setInputs(
            inputs.map((input) =>
              input.id === id ? { ...input, checked: e.target.checked } : input
            )
          )
        : setInputs(
            inputs.map((input) =>
              input.id === id ? { ...input, value: e.target.value } : input
            )
          );
    },
    [inputs]
  );

  const inputsWithOnChangeFunc = inputs.map((input) => ({
    ...input,
    onChange: (e) => changeInputValue(input.id, e),
  }));

  const resetInputs = useCallback(() => {
    setInputs(inputsArray);
  }, [inputsArray]);

  return {
    inputs: inputsWithOnChangeFunc,
    resetInputs,
  };
};
