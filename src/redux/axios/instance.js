import axios from 'axios';

const baseURL = 'https://snp-tests.herokuapp.com/api/v1/';
const scopeKey = 'y=vMr{N%e,8$*3^1';

const instance = axios.create({
  baseURL,
  headers: {
    'scope-key': scopeKey,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
