import Button from 'components/UI/Button/Button';
import React from 'react';
import classes from './UserBar.module.scss';

const UserBar = ({ userName, onLogout }) => {
  return (
    <div className={classes.UserBar}>
      <div className={classes.HelloUser}>
        Hello, <strong>{userName}</strong>
      </div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default UserBar;
