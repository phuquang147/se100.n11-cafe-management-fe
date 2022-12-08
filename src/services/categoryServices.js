import Cookies from 'js-cookie';
import baseService from './baseService';

export const updateCategory = async (category, categoryId) => {
  const res = await baseService.put(`/categories/${categoryId}`, category, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteCategory = async (categoryId) => {
  const res = await baseService.delete(`/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
