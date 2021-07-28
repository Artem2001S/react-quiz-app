import Title from 'components/UI/Title/Title';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './HelloPage.module.scss';

const HelloPage = () => {
  const { isAuthorized } = useAuth();
  return (
    <div className={classes.Container}>
      <Title className={classes.Left} large>
        Welcome to quiz app.
      </Title>
      {isAuthorized ? (
        <Title small>
          You're authorized, go to{' '}
          <Link className={classes.Link} to="/dashboard">
            Dashboard
          </Link>
        </Title>
      ) : (
        <>
          <Title small>
            A Have an account ?{' '}
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
        </>
      )}
    </div>
  );
};

export default React.memo(HelloPage);
