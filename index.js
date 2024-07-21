/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { startNetworkLogging } from 'react-native-network-logger';

startNetworkLogging({
    forceEnable : true
});
AppRegistry.registerComponent(appName, () => App);
