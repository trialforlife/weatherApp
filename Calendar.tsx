import React, {useState, useCallback} from 'react';
import {
  DateSelectionCalendar,
  DefaultTheme,
  Theme,
} from 'react-native-easy-calendar';
import axios from 'axios';

type location = {
  latitude: number;
  longitude: number;
};

const locationVinnitsya: location = {
  latitude: 49.22584448644553,
  longitude: 28.439236844179426,
};

const token: string = '';

const endPoint =
  'https://api.openweathermap.org/data/2.5/forecast?lat=' +
  locationVinnitsya.latitude +
  '&lon=' +
  locationVinnitsya.longitude +
  '&units=metric&appid=' +
  token;

const getFormatedDateString = (date: Date): string => {
  const dd: number = date.getDate();
  const mm: number = date.getMonth() + 1;
  const yyyy: number = date.getFullYear();
  const dateString: string = yyyy + '-' + mm + '-' + dd;
  return dateString;
};

const Calendar = () => {
  axios
    .get(endPoint)
    .then(result => {
      console.log('result', result.data.list);
      return result.data.list;
    })
    .then(weatherData => {
      const todayInSeconds: number = Date.now() / 1000;
      const currentWeather = weatherData.find((dataItem: {dt: number}) => {
        return Math.abs(todayInSeconds - dataItem?.dt) < 3 * 3600;
      });
      console.log('currentWeather', currentWeather);
      // get current weather
      // group + by dates
      // calculate average
    });

  let today: Date = new Date();
  let maxDate: Date = new Date();

  maxDate.setDate(maxDate.getDate() + 5);

  const currentDateString: string = getFormatedDateString(today);
  const maxDateString: string = getFormatedDateString(maxDate);
  const [selectedDate, setSelectedDate] = useState(currentDateString);

  const onSelectDate = useCallback((date: string) => {
    console.log('date', date);
    setSelectedDate(date);
  }, []);

  return (
    <DateSelectionCalendar
      theme={CustomTheme}
      onSelectDate={onSelectDate}
      selectedDate={selectedDate}
      minDate={currentDateString}
      maxDate={maxDateString}
    />
  );
};

const CustomTheme: Theme = {
  ...DefaultTheme,
  extraDayText: {
    color: 'orange',
  },
};

export default Calendar;
