export const validateInputs = (inputs) => {
  const errors = [];
  inputs.forEach(({ validationData, value, name }) => {
    const isEmpty = !value.length;

    if (isEmpty && validationData.isRequired) {
      errors.push(`Enter data on "${name}" field.`);
    }
  });

  return errors;
};
