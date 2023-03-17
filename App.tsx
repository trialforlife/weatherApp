/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  DateSelectionCalendar,
  DefaultTheme,
  Theme,
} from 'react-native-easy-calendar';
import axios from 'axios';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

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

const ThemedCalendar = () => {
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

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text style={[styles.title, styles.highlight]}>
          Weather in Vinnitsya
        </Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <ThemedCalendar />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 5,
  },
});

const CustomTheme: Theme = {
  ...DefaultTheme,
  extraDayText: {
    color: 'orange',
  },
};
export default App;
