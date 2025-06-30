import axios from 'axios';

const BASE_URL = 'http://localhost:8080/queue';

export const getQueue = () => axios.get(`${BASE_URL}/all`);

export const enqueue = (value) =>
  axios.post(`${BASE_URL}/enqueue`, null, { params: { value } });

export const dequeue = () =>
  axios.delete(`${BASE_URL}/dequeue`);
