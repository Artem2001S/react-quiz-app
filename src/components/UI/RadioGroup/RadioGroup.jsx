import React from 'react';
import RadioButton from './RadioButton/RadioButton';
import classes from './RadioGroup.module.scss';

const RadioGroup = ({
  label,
  radioButtons,
  selectedIndex = 0,
  selectedIndexChanged,
}) => {
  return (
    <div className={classes.RadioGroup}>
      <span>{label}</span>
      {radioButtons.map((radioButton, index) => (
        <RadioButton
          key={radioButton.id}
          index={index}
          isSelected={selectedIndex === index}
          onSelect={selectedIndexChanged}
          {...radioButton}
        />
      ))}
    </div>
  );
};

export default React.memo(RadioGroup);
