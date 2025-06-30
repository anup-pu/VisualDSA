import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tree';

export const insertNode = (value) =>
  axios.post(`${BASE_URL}/insert`, null, { params: { value } });

export const deleteNode = (value) =>
  axios.delete(`${BASE_URL}/delete`, { params: { value } });

export const getInorder = () => axios.get(`${BASE_URL}/inorder`);
