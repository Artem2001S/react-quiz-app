const { useEffect } = require('react');

export const useComponentDidMount = (fn) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
};
