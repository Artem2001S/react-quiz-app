import Button from 'components/UI/Button/Button';
import React from 'react';
import classes from './UserBar.module.scss';

const UserBar = ({ userName, isAdmin, onLogout }) => (
  <div className={classes.UserBar}>
    <div className={classes.HelloUser}>
      Hello, <strong>{userName}</strong>
      {isAdmin && <i>,you're admin</i>}
    </div>
    <Button onClick={onLogout}>Logout</Button>
  </div>
);

export default React.memo(UserBar);
