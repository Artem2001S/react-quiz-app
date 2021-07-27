import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/UI/Input/Input';
import classes from './Form.module.scss';
import Button from 'components/UI/Button/Button';

const Form = ({ submitBtnText, inputs, onInputChange, onSubmit }) => {
  return (
    <form className={classes.Form} onSubmit={onSubmit}>
      {inputs?.map(({ validationData, ...input }) => (
        <Input key={input.id} onChange={onInputChange} {...input} />
      ))}

      <Button type="button" onClick={onSubmit} className={classes.SubmitBtn}>
        {submitBtnText}
      </Button>
    </form>
  );
};

Form.propTypes = {
  inputs: PropTypes.array,
  submitBtnText: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default React.memo(Form);
