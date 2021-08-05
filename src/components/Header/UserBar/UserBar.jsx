import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button/Button';
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

UserBar.propTypes = {
  userName: PropTypes.string,
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default React.memo(UserBar);
