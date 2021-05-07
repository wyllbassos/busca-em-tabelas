import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://glo-01-0443.isdra.com.br:3333',
  baseURL: 'http://localhost:3333',
  //baseURL: 'http://172.16.104.120:3333',
  //baseURL: 'http://192.168.25.11:3333',
  //baseURL: 'http://189.27.157.184:3333',
});

export default api;
