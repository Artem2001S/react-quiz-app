import { questionTypes } from './constants';

export const validateInputs = (inputs) => {
  const errors = [];

  inputs.forEach(({ type, validationData, value, name }) => {
    if (type !== 'checkbox') {
      const isEmpty = !value.length;

      if (isEmpty && validationData.isRequired) {
        errors.push(`Enter data on "${name}" field.`);
      }
    }
  });

  return errors;
};

export const isArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  let matchesCount = 0;
  arr1.forEach((element) => arr2.includes(element) && matchesCount++);

  return matchesCount === arr1.length;
};

export const getValidQuestions = (questions) => {
  return questions.filter(
    (question) =>
      question.answers.length >= 2 ||
      question.question_type === questionTypes.number
  );
};
