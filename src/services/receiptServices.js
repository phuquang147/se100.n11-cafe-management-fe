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
