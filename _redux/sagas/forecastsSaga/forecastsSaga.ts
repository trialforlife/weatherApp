import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {IForecastResponse, ICoord} from '../../../models/IForecast';
import {
  fetchForecastsFailure,
  fetchForecastsSuccess,
} from '../../actions/forecastsActions/forecastsActions';
import {forecastTypes} from '../../Actiontypes/forecastsTypes';

const locationVinnitsya: ICoord = {
  lat: 49.22584448644553,
  lon: 28.439236844179426,
};

const token: string = '';

const endPoint =
  'https://api.openweathermap.org/data/2.5/forecast?lat=' +
  locationVinnitsya.lat +
  '&lon=' +
  locationVinnitsya.lon +
  '&units=metric&appid=' +
  token;

const getForecasts = () => axios.get<IForecastResponse>(endPoint);

function* fetchForecastsSaga() {
  try {
    const {data} = yield call(getForecasts);
    const {list} = data;
    yield put(
      fetchForecastsSuccess({
        forecasts: list,
      }),
    );
  } catch (e) {
    let errorMessage = 'Failed fetch posts';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    yield put(
      fetchForecastsFailure({
        error: errorMessage,
      }),
    );
  }
}

function* forecastsSaga() {
  yield all([
    takeLatest(forecastTypes.FETCH_FORECAST_REQUEST, fetchForecastsSaga),
  ]);
}

export default forecastsSaga;
