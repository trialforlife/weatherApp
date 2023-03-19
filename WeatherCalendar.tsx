import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './_redux/reducers/rootReducer';
import {IForecast} from './models/IForecast';
import {
  DateSelectionCalendar,
  DefaultTheme,
  Theme,
} from 'react-native-easy-calendar';
import {View} from 'react-native';
import Section from './Section';

const getFormatedDateString = (date: Date): string => {
  const dd: number = date.getDate();
  const mm: number = date.getMonth() + 1;
  const yyyy: number = date.getFullYear();
  const dateString: string = yyyy + '-' + mm + '-' + dd;
  return dateString;
};

const WeatherCalendar = () => {
  let today: Date = new Date();
  let maxDate: Date = new Date();

  maxDate.setDate(maxDate.getDate() + 5);

  const currentDateString: string = getFormatedDateString(today);
  const maxDateString: string = getFormatedDateString(maxDate);
  const [selectedDate, setSelectedDate] = useState(currentDateString);

  const currentForecasts = useSelector((state: RootState) => {
    return state.forecasts.forecasts.filter((item: IForecast) => {
      let currentDateObj = new Date(selectedDate);
      let itemDateObj = new Date(item.dt * 1000);
      return currentDateObj.getDate() === itemDateObj.getDate();
    });
  });

  return (
    <View>
      <DateSelectionCalendar
        theme={CustomTheme}
        onSelectDate={setSelectedDate}
        selectedDate={selectedDate}
        minDate={currentDateString}
        maxDate={maxDateString}
      />
      <View>
        {currentForecasts.map(currentForecast => {
          return (
            <Section
              title={
                new Date(currentForecast.dt * 1000).getHours() + ':00 hour(s)'
              }
              key={currentForecast.dt}>
              temp {currentForecast.main.temp} °C,{' '}
              {currentForecast.weather[0].description}
              {'\n'}
              feels like {currentForecast.main.feels_like} °C {'\n'}
              pressure {currentForecast.main.pressure} GPa {'\n'}
              humidity {currentForecast.main.humidity} % {'\n'}
              wind speed {currentForecast.wind.speed} Km/h {'\n'}
              visibility {currentForecast.visibility / 1000} Km
            </Section>
          );
        })}
      </View>
    </View>
  );
};

const CustomTheme: Theme = {
  ...DefaultTheme,
  extraDayText: {
    color: 'orange',
  },
};

export default WeatherCalendar;
