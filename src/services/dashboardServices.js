import Cookies from 'js-cookie';
import baseService from './baseService';

export const getDashboardData = async () => {
  const res = await baseService.get('/dashboard', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
