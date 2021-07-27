import Title from 'components/UI/Title/Title';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './HelloPage.module.scss';

const HelloPage = () => {
  return (
    <div className={classes.Container}>
      <Title className={classes.Left} large>
        Welcome to quiz app.
      </Title>
      <Title small>
        Have an account ?{' '}
        <Link className={classes.Link} to="/login">
          Login
        </Link>
      </Title>
      <Title small>
        or{' '}
        <Link className={classes.Link} to="/signup">
          Sign up
        </Link>
      </Title>
    </div>
  );
};

export default HelloPage;
