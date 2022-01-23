/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {ReactNode} from 'react';
import {AppRoutes} from './src/routes';
import {Provider} from 'mobx-react';
import * as Stores from './src/stores';

const App: () => ReactNode = () => {
  return (
    <Provider {...Stores}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
