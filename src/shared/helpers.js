import { questionTypes } from './constants';

export const validateInputs = (inputs) => {
  const errors = [];

  inputs.forEach(({ type, validationData, value, name }) => {
    if (type !== 'checkbox') {
      const isEmpty = !value.length;

      if (isEmpty && validationData.isRequired) {
        errors.push(`Enter data on "${name}" field.`);
      }

      if (validationData.minLength) {
        value.length < validationData.minLength &&
          errors.push([
            `The '${name}' should contain at least ${validationData.minLength} letters`,
          ]);
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

export const getQuestionWarnings = (question) => {
  const errors = [];

  if (!question.title) return ['Empty question title'];

  if (question.question_type === questionTypes.number) return [];

  question.answers.length < 2 &&
    errors.push('The question should have at least 2 answers');
  const rightAnswersCount = question.answers.filter(
    (answer) => answer.is_right
  ).length;

  rightAnswersCount === 0 &&
    errors.push('The question should have at least 1 right answer');

  rightAnswersCount > 1 &&
    question.question_type === questionTypes.single &&
    errors.push('Single question should have only one right answer');

  question.answers.forEach(
    (answer) => !answer.text && errors.push('Empty answer text')
  );

  return errors;
};
