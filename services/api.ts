import axios from 'axios';

const api = axios.create({
  baseURL: `http://glo-01-0443.isdra.com.br:3002/api`,
  // baseURL: 'http://localhost:3333',
  // baseURL: 'http://glo-01-0443:3333',
  // baseURL: 'http://172.16.104.252:3333',
});

export default api;
