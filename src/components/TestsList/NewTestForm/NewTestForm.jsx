import React, { useState, useCallback } from 'react';
import Button from 'components/UI/Button/Button';
import Container from 'components/UI/Container/Container';
import Input from 'components/UI/Input/Input';
import Title from 'components/UI/Title/Title';
import classes from './NewTestForm.module.scss';

const NewTestForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(
    (e) => setInputValue(e.currentTarget.value),
    []
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(inputValue.trim());
      setInputValue('');
    },
    [inputValue, onSubmit]
  );

  return (
    <Container centered>
      <Title small>New test</Title>
      <form className={classes.Form} onSubmit={handleFormSubmit}>
        <Input
          placeholder="Title"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button>Add</Button>
      </form>
    </Container>
  );
};

export default React.memo(NewTestForm);
