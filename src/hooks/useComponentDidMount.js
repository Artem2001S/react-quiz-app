const { useEffect } = require('react');

export const useComponentDidMount = (fn) => useEffect(fn, [fn]);
