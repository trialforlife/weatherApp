import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {IForecast} from '../../../models/IForecast';
import {
  fetchForecastsFailure,
  fetchForecastsSuccess,
} from '../../actions/forecastsActions/forecastsActions';
import {forecastTypes} from '../../Actiontypes/forecastsTypes';

const getForecasts = () =>
  axios.get<IForecast[]>('https://jsonplaceholder.typicode.com/todos');

function* fetchForecastsSaga() {
  try {
    const response = yield call(getForecasts);
    yield put(
      fetchForecastsSuccess({
        forecasts: response.data,
      }),
    );
  } catch (e) {
    yield put(
      fetchForecastsFailure({
        error: e.message,
      }),
    );
  }
}

function* forecastsSaga() {
  yield all([takeLatest(forecastTypes.FETCH_FORECAST_REQUEST, fetchForecastsSaga)]);
}

export default forecastsSaga;
