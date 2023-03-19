import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Provider} from 'react-redux';
import store from './_redux/store';
import {fetchForecastsRequest} from './_redux/actions/forecastsActions/forecastsActions';
import WeatherCalendar from './WeatherCalendar';

function launchApp(): void {
  store.dispatch(fetchForecastsRequest());
}

launchApp();

function InnerApp(): JSX.Element {
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={[styles.title, styles.highlight]}>
            Weather in Vinnitsya
          </Text>
          <WeatherCalendar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={InnerApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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

export default App;
