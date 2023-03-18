import {combineReducers} from 'redux';
import forecastsReducer from './forecastsReducer/forecastsReducer';

const rootReducer = combineReducers({
  forecasts: forecastsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
