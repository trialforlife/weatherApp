import {forecastTypes} from '../../Actiontypes/forecastsTypes';
import {
  FetchForecastsFailure,
  FetchForecastsFailurePayload,
  FetchForecastsRequest,
  FetchForecastsSuccess,
  FetchForecastsSuccessPayload,
} from '../../types/types';

export const fetchForecastsRequest = (): FetchForecastsRequest => ({
  type: forecastTypes.FETCH_FORECAST_REQUEST,
});

export const fetchForecastsSuccess = (
  payload: FetchForecastsSuccessPayload,
): FetchForecastsSuccess => ({
  type: forecastTypes.FETCH_FORECAST_SUCCESS,
  payload,
});

export const fetchForecastsFailure = (
  payload: FetchForecastsFailurePayload,
): FetchForecastsFailure => ({
  type: forecastTypes.FETCH_FORECAST_FAILURE,
  payload,
});
