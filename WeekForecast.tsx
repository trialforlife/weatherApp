import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './_redux/reducers/rootReducer';
import {IForecast} from './models/IForecast';
import Section from './Section';

function getWeekNumber(date: Date) {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(
    (((date as unknown as number) - (yearStart as unknown as number)) /
      86400000 +
      1) /
      7,
  );
  return weekNo;
}

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wesnesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface IWeekData {
  title?: number;
  data?: Array<IDayData>;
}

interface IDayData {
  name: string;
  currentForecasts: Array<IForecast>;
}

const WeekForecast = () => {
  let today: Date = new Date();
  let maxDate: Date = new Date();

  maxDate.setDate(maxDate.getDate() + 5);
  const currentWeekNo = getWeekNumber(today);
  const maxDateWeekNo = getWeekNumber(maxDate);

  let weeksAmount = 1;
  if (currentWeekNo !== maxDateWeekNo) {
    weeksAmount = 2;
  }
  let data: IWeekData = [{title: 'This week', data: []}];
  if (weeksAmount > 1) {
    data[1] = {title: 'Next week', data: []};
  }

  for (let date = today; date <= maxDate; date.setDate(date.getDate() + 1)) {
    let weekNo = getWeekNumber(date);
    let index = Math.abs(currentWeekNo - weekNo);
    data[index] = Object.assign({}, data[index]);
    data[index].data.push({
      name: week[date.getDay()],
      currentForecasts: useSelector((state: RootState) => {
        return state.forecasts.forecasts.filter((item: IForecast) => {
          let currentDateObj = new Date(date);
          let itemDateObj = new Date(item.dt * 1000);
          return currentDateObj.getDate() === itemDateObj.getDate();
        });
      }),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              {item.currentForecasts.map((currentForecast) => {
                return (
                  <Section
                    title={
                      new Date(currentForecast.dt * 1000).getHours() +
                      ':00 hour(s)'
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
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default WeekForecast;
