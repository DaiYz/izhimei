import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from '../BottomTabScreen'
import { stacks } from '../../views'
const MainStack = createStackNavigator()

export default function MainStackScreen () {
  return (
    <MainStack.Navigator
      initialRouteName='App'
      screenOptions={
        {
          headerTitleAlign: 'center',
          headerStyle: {
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'transparent',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            elevation: 0
          },
          headerBackTitleVisible: false
        }
      }
    >
      <MainStack.Screen name='App' component={BottomTab} options={{ headerShown: false }} />
      {
        stacks.map((item, index) =>
          <MainStack.Screen
            key={index}
            name={item.name} component={item.component} options={item.options}
          />
        )
      }

    </MainStack.Navigator>
  )
}
