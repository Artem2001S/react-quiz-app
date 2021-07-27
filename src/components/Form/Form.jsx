import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/UI/Input/Input';
import classes from './Form.module.scss';
import Button from 'components/UI/Button/Button';
import Errors from 'components/UI/Errors/Errors';
import Title from 'components/UI/Title/Title';

const Form = ({
  submitBtnText,
  inputs,
  onInputChange,
  errors,
  title,
  onSubmit,
}) => {
  return (
    <form className={classes.Form} onSubmit={onSubmit}>
      <Title medium centered>
        {' '}
        {title}{' '}
      </Title>
      {inputs?.map(({ validationData, ...input }) => (
        <Input key={input.id} onChange={onInputChange} {...input} />
      ))}

      <Button type="button" onClick={onSubmit} className={classes.SubmitBtn}>
        {submitBtnText}
      </Button>
      {errors.length > 0 && <Errors errors={errors} />}
    </form>
  );
};

Form.propTypes = {
  inputs: PropTypes.array,
  errors: PropTypes.array,
  title: PropTypes.string,
  submitBtnText: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default React.memo(Form);
