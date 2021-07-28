import { useState } from 'react';

export const useInputs = (inputsArray) => {
  const [inputs, setInputs] = useState(inputsArray);

  const changeInputValue = (id, e) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, value: e.target.value } : input
      )
    );
  };

  const inputsWithOnChangeFunc = inputs.map((input) => ({
    ...input,
    onChange: (e) => changeInputValue(input.id, e),
  }));

  return {
    inputs: inputsWithOnChangeFunc,
  };
};
