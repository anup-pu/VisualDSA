import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/stack`;

export const getStack = () => axios.get(`${BASE_URL}/all`);

export const pushToStack = (value) =>
  axios.post(`${BASE_URL}/push`, null, { params: { value } });

export const popFromStack = () =>
  axios.delete(`${BASE_URL}/pop`);
