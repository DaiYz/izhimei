/**
 * @format
 */

import 'react-native-gesture-handler'
import 'react-native-root-siblings'
import { AppRegistry, UIManager } from 'react-native'
import App from './src'
import { name as appName } from './app.json'
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    assert: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    time: () => {},
    timeEnd: () => {}
  }
}

AppRegistry.registerComponent(appName, () => App)
