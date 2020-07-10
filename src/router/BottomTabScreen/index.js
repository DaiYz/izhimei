import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../views/home/HomeScreen'
import { ShopScreen } from '../../views/shop'
import { MessageScreen } from '../../views/message'
import MineScreen from '../../views/mine/mineHome'

type BottomTabParams = {
  Home: undefined,
  Message: undefined
};

const BottomTabs = createBottomTabNavigator()

export default function BottomTabScreen () {
  return (
    <BottomTabs.Navigator
      initialRouteName='Message'
      screenOptions={{
        tabBarButton: props => <TouchableOpacity activeOpacity={0.7} {...props} />
      }}
    >
      <BottomTabs.Screen
        name='Home' component={HomeScreen} options={{
          tabBarLabel: '首页'
        }}
      />
      <BottomTabs.Screen
        name='Group' component={ShopScreen}
        options={{
          tabBarLabel: '商城'
        }}
      />
      <BottomTabs.Screen
        name='Message' component={MessageScreen}
        options={{
          tabBarLabel: '消息'
        }}
      />
      <BottomTabs.Screen
        name='Mine' component={MineScreen}
        options={{
          tabBarLabel: '我的'
        }}
      />
    </BottomTabs.Navigator>
  )
}
