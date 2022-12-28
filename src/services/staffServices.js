import Cookies from 'js-cookie';
import baseService from './baseService';

export const getStaffs = async () => {
  const res = await baseService.get('/users', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteStaff = async (staffId) => {
  const res = await baseService.delete(`/users/${staffId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteSelectedStaffs = async (userIds) => {
  const res = await baseService.put(
    '/users',
    { userIds },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const createStaff = async (staff) => {
  const res = await baseService.post('/users', staff, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const editStaff = async (updatedStaff) => {
  const res = await baseService.put(`/users/edit/${updatedStaff._id}`, updatedStaff, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};
