import {all, fork} from 'redux-saga/effects';
import forecastsSaga from './forecastsSaga/forecastsSaga';

export function* rootSaga() {
  yield all([fork(forecastsSaga)]);
}
