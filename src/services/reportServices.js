import Cookies from 'js-cookie';
import baseService from './baseService';

export const getReportByDate = async ({ date, month, year }) => {
  const res = await baseService.post(
    '/report-by-date',
    { date: date, month: month + 1, year: year },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const getReportByMonth = async ({ month, year }) => {
  const res = await baseService.post(
    '/report-by-month',
    { month: month + 1, year: year },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};

export const getReportByYear = async ({ year }) => {
  const res = await baseService.post(
    '/report-by-year',
    { year: year },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return res;
};
