import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigation from './src/Navigation';
import {store} from './src/Store/store';

const App = () => {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;
