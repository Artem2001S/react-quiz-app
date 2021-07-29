import React from 'react';

const TestContext = React.createContext();

export const TestContextProvider = ({ children, ...props }) => {
  return <TestContext.Provider value={props}>{children}</TestContext.Provider>;
};

export const useTestCtx = () => {
  return React.useContext(TestContext);
};
