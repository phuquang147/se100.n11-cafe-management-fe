import Cookies from 'js-cookie';
import { call, put, takeLatest } from 'redux-saga/effects';
import baseService from '~/services/baseService';
import { setDataFailed, setDataStarted, setDataSuccess } from '../dataSlice';

function* getData(action) {
  try {
    const data = yield call((url) => {
      return fetch('http://localhost:3001/data', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
    }, '/data');

    const resData = yield data.json();
    console.log(resData);

    const { products, categories } = resData;
    console.log(products);
    yield put(setDataSuccess({ products, categories }));
  } catch (err) {
    yield put(setDataFailed());
  }
}

export default function* dataSaga() {
  yield takeLatest(setDataStarted.type, getData);
}
