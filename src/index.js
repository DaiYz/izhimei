import * as React from 'react'
import { StatusBar } from 'react-native'
import {
  InitialState,
  useLinking,
  NavigationContainer
  , useTheme
} from '@react-navigation/native'
import { DarkTheme, LightTheme } from './themes'
import MainStackScreen from './router/MainStackScreen'
import Modals from './router/ModalScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from './utils/rootNavigation'
import { getCurrentLocation } from './utils'
import { create } from 'mobx-persist'
import { useObserver } from 'mobx-react'
import { useStores } from './stores'

import service from './service'
import AsyncStorage from '@react-native-community/async-storage'
import Config from './config'
// import { AppearanceProvider, useColorScheme } from 'react-native-appearance'    开启暗黑模式

const hydrate = create({ storage: AsyncStorage })
const RootStack = createStackNavigator()

const getActiveRouteName = state => {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

const App = () => {
  const { appStore = undefined, chatStore = undefined } = useStores()
  async function initApp () {
    await hydrate('authToken', appStore)
    const res = await getCurrentLocation()
    chatStore.initSdk()
    console.log(res)
  }

  React.useEffect(() => {
    initApp()
  }, [])

  // return useObserver(() => {
  //   return (
  //     <>
  //       <Navigator />
  //     </>
  //   )
  // })
  return(
    <>
      <Navigator />
    </>
  )
}

function Navigator () {
  // To test deep linking on, run the following in the Terminal:
  // Android: adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:19000/--/simple-stack"
  // iOS: xcrun simctl openurl booted exp://127.0.0.1:19000/--/simple-stack
  // Android (bare): adb shell am start -a android.intent.action.VIEW -d "rne://127.0.0.1:19000/--/simple-stack"
  // iOS (bare): xcrun simctl openurl booted rne://127.0.0.1:19000/--/simple-stack
  // The first segment of the link is the the scheme + host (returned by `Linking.makeUrl`)
  // const { getInitialState } = useLinking(containerRef, {
  //   prefixes: LinkingPrefixes,
  //   config: {
  //     Root: {
  //       path: '',
  //       initialRouteName: 'Home',
  //       screens: Object.keys(SCREENS).reduce<{ [key: string]: string }>(
  //         (acc, name) => {
  //           // Convert screen names such as SimpleStack to kebab case (simple-stack)
  //           acc[name] = name
  //             .replace(/([A-Z]+)/g, '-$1')
  //             .replace(/^-/, '')
  //             .toLowerCase();
  //
  //           return acc;
  //         },
  //         { Home: '' }
  //       ),
  //     },
  //   },
  // });
  const [initialState, setInitialState] = React.useState(InitialState)
  const [currentRoute, setCurrentRoute] = React.useState('Main')
  const routeNameRef = React.useRef()
  // 开启暗黑模式
  // const scheme = useColorScheme()

  React.useEffect(() => {
    const state = navigationRef.current.getRootState()
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state)
  }, [])

  // React.useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       let state = await getInitialState()
  //
  //       if (Platform.OS !== 'web' && state === undefined) {
  //         const savedState = await AsyncStorage.getItem(
  //           NAVIGATION_PERSISTENCE_KEY
  //         )
  //         state = savedState ? JSON.parse(savedState) : undefined
  //       }
  //
  //       if (state !== undefined) {
  //         setInitialState(state)
  //       }
  //     } finally {
  //       try {
  //         const themeName = await AsyncStorage.getItem(THEME_PERSISTENCE_KEY)
  //
  //         setTheme(themeName === 'dark' ? DarkTheme : DefaultTheme)
  //       } catch (e) {
  //         // Ignore
  //       }
  //
  //       setIsReady(true)
  //     }
  //   }
  //
  //   restoreState()
  // }, [getInitialState])

  return (
    <>
      <StatusBar
        StatusBarAnimation='fade'
        backgroundColor={currentRoute === 'Group' ? LightTheme.colors.shop.shopBackground : '#fff'}
        barStyle={currentRoute === 'Group' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        ref={navigationRef}
        initialState={initialState}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = getActiveRouteName(state)

          if (previousRouteName !== currentRouteName) {
          // The line below uses the @react-native-firebase/analytics tracker
          // Change this line to use another Mobile analytics SDK
            console.log(previousRouteName, currentRouteName)
            setCurrentRoute(currentRouteName)
          }

          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName
        }}
        theme={LightTheme}
      >
        <RootStack.Navigator mode='modal' initialRouteName='Main'>
          <RootStack.Screen
            name='Main'
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name='MyModal' component={Modals} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
