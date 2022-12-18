import Cookies from 'js-cookie';
import baseService from './baseService';

export const getReceipts = async () => {
  const res = await baseService.get('/receipts', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const getReceiptById = async (receiptId) => {
  const res = await baseService.get(`/receipts/${receiptId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return res;
};

export const payForReceipt = async (receiptId) => {
  const res = baseService.put(
    `/receipts/pay/${receiptId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const createReceipt = async (products, totalPrice, tables) => {
  const res = await baseService.post(
    '/receipts',
    { products, totalPrice, tables },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const editReceipt = async (receiptId, products) => {
  const res = await baseService.put(
    `/receipts/edit/${receiptId}`,
    { products },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const removeReceipt = async (receiptId) => {
  const res = await baseService.put(
    `/receipts/remove/${receiptId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};
