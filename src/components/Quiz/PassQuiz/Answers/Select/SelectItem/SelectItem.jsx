import React, { useCallback } from 'react';
import RadioButton from 'components/UI/RadioButton/RadioButton';
import Checkbox from 'components/UI/Checkbox/Checkbox';

const SelectItem = ({ isSelected, isSingleSelect, index, text, onClick }) => {
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  return isSingleSelect ? (
    <RadioButton label={text} checked={isSelected} onChange={handleClick} />
  ) : (
    <Checkbox label={text} checked={isSelected} onChange={handleClick} />
  );
};

export default React.memo(SelectItem);
