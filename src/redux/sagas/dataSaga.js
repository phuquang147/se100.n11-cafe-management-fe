import Cookies from 'js-cookie';
import { call, put, takeLatest } from 'redux-saga/effects';
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

    const { products, categories } = resData;
    yield put(setDataSuccess({ products, categories }));
  } catch (err) {
    yield put(setDataFailed());
  }
}

export default function* dataSaga() {
  yield takeLatest(setDataStarted.type, getData);
}
