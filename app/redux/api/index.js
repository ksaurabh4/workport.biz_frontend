import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.workport.biz/api/v1',
  // baseURL: 'http://localhost:3001/api',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export default api;
