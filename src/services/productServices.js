import axios from 'axios';
import Cookies from 'js-cookie';
import baseService from './baseService';

export const getProducts = async () => {
  const res = await fetch('http://localhost:3001/products', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  const data = await res.json();
  return data;
};

export const createProduct = async (product) => {
  const res = await baseService.post('/products', product, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteProduct = async (productId) => {
  const res = await fetch(`http://localhost:3001/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const postImage = async (formData) => {
  const res = axios({
    method: 'put',
    url: 'https://coffee-management-app.herokuapp.com/post-image',
    data: formData,
    headers: { Authorization: `Bearer ${Cookies.get('token')}`, 'Content-Type': 'multipart/form-data' },
  });
  return res;
};
