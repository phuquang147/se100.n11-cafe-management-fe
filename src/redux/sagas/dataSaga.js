import Cookies from 'js-cookie';
import { call, put, takeLatest } from 'redux-saga/effects';
import baseService from '~/services/baseService';
import { setDataFailed, setDataStarted, setDataSuccess } from '../dataSlice';

function* getData(action) {
  try {
    const data = yield call((url) => {
      return baseService.get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
    }, '/data');

    const { products } = data.data;
    yield put(setDataSuccess({ products }));
  } catch (err) {
    yield put(setDataFailed());
  }
}

export default function* dataSaga() {
  yield takeLatest(setDataStarted.type, getData);
}
