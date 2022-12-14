import Cookies from 'js-cookie';
import baseService from './baseService';

export const createTable = async (table) => {
  const res = await baseService.post('/tables', table, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getTables = async () => {
  const res = await baseService.get('/tables', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getTableById = async (tableId) => {
  const res = await baseService.get(`/tables/${tableId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const updateTable = async (table, tableId) => {
  const res = await baseService.put(`/tables/${tableId}`, table, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const deleteTable = async (tableId) => {
  const res = await baseService.delete(`/tables/${tableId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const moveTable = async (movedTableId, targetedTableId) => {
  const res = await baseService.put(
    `/tables/move/${movedTableId}`,
    { targetedTableId },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const mergeTable = async (tableIds) => {
  const res = await baseService.post(
    `/tables/merge`,
    { tableIds },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};
