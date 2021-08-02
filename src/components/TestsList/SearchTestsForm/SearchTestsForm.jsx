import React, { useCallback, useState } from 'react';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import classes from './SearchTestsForm.module.scss';

const SearchTestsForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(inputValue.trim());
    },
    [inputValue, onSubmit]
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={classes.SearchForm}>
      <Input
        placeholder="Search by title"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button>Search</Button>
    </form>
  );
};

export default React.memo(SearchTestsForm);
