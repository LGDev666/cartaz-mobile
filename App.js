// In App.js in a new project

import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import store from './src/store/store';
import TabNavigator from './src/navbar/tab_navigator';
import { useState } from 'react';
import Login from './src/login/Login';
import Navigator from './src/navbar/Navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useSelector, useDispatch } from 'react-redux';


function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Navigator/>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>

  );
}

export default App;