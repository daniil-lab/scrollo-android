/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppReducer from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

export const getStore = createStore(AppReducer);

class App extends React.Component {
  render() {
    return (
        <Provider store={getStore}>
          <AppNavigator />
        </Provider>
    );
  }
}

export default App;
