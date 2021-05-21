import axios from 'axios';

// const baseUrl = window.location.href.split(window.location.pathname)[0] + '/api';

const api = axios.create({
  baseURL: "baseUrl",
});

export default api;
