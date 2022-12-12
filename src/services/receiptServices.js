import Cookies from 'js-cookie';
import baseService from './baseService';

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
    `/receipts/${receiptId}/pay`,
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
