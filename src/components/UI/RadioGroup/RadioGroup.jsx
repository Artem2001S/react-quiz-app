import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton/RadioButton';
import classes from './RadioGroup.module.scss';

const RadioGroup = ({
  label,
  radioButtons,
  selectedIndex = 0,
  selectedIndexChanged,
}) => (
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

RadioGroup.propTypes = {
  label: PropTypes.string,
  radioButtons: PropTypes.array,
  selectedIndex: PropTypes.number,
  selectedIndexChanged: PropTypes.func,
};

export default React.memo(RadioGroup);
