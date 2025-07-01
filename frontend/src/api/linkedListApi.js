import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/linkedlist`;

export const getList = () => axios.get(`${BASE_URL}/all`);

export const addLast = (value) =>
  axios.post(`${BASE_URL}/addLast`, null, { params: { value } });

export const removeNode = (value) =>
  axios.delete(`${BASE_URL}/remove`, { params: { value } });
