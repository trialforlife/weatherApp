import {forecastTypes} from '../../Actiontypes/forecastsTypes';
import {ForecastsActions, ForecastsState} from '../../types/types';

const initialState: ForecastsState = {
  pending: false,
  forecasts: [],
  error: null,
};

export default (state = initialState, action: ForecastsActions) => {
  switch (action.type) {
    case forecastTypes.FETCH_FORECAST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case forecastTypes.FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        pending: false,
        forecasts: action.payload.forecasts,
        error: null,
      };
    case forecastTypes.FETCH_FORECAST_FAILURE:
      return {
        ...state,
        pending: false,
        forecasts: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
