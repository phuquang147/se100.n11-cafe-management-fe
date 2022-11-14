import axios from 'axios';

const baseService = axios.create({
  baseURL: 'https://coffee-management-app.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseService;
