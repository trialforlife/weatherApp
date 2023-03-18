import {IForecast} from '../../models/IForecast';
import {forecastTypes} from '../Actiontypes/forecastsTypes';

export interface ForecastsState {
  pending: boolean;
  forecasts: IForecast[];
  error: string | null;
}

export interface FetchForecastsSuccessPayload {
  forecasts: IForecast[];
}

export interface FetchForecastsFailurePayload {
  error: string;
}

export interface FetchForecastsRequest {
  type: typeof forecastTypes.FETCH_FORECAST_REQUEST;
}

export type FetchForecastsSuccess = {
  type: typeof forecastTypes.FETCH_FORECAST_SUCCESS;
  payload: FetchForecastsSuccessPayload;
};

export type FetchForecastsFailure = {
  type: typeof forecastTypes.FETCH_FORECAST_FAILURE;
  payload: FetchForecastsFailurePayload;
};

export type ForecastsActions =
  | FetchForecastsRequest
  | FetchForecastsSuccess
  | FetchForecastsFailure;
