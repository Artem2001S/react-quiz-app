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
