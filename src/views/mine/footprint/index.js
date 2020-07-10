import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button, Avatar } from '../../../components'
import Animated from 'react-native-reanimated'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import {useTheme} from '@react-navigation/native';

import Hospital from './HospitalItem'
import Doctor from './DoctorItem'
const { width } = Dimensions.get('window')
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
)

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const initialLayout = { width: Dimensions.get('window').width }

export default () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'goods', title: '商品' },
    { key: 'diary', title: '日记' },
    { key: 'hospital', title: '医院' },
    { key: 'doctor', title: '医生' }
  ])
  const { colors } = useTheme()
  const renderScene = SceneMap({
    goods: FirstRoute,
    diary: SecondRoute,
    hospital: Hospital,
    doctor: Doctor
  })

  const renderTabBar = props => {
    const { position } = props
    const len = props.navigationState.routes.length
    const itemWidth = width / len
    const inputRange = props.navigationState.routes.map((x, i) => i)
    const left = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map(inputIndex =>
        inputIndex * itemWidth
      )
    })

    return (
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={styles.nav}>
          <View style={{ flexDirection: 'row', width, justifyContent: 'center' }}>
            {props.navigationState.routes.map((route, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.tabItem, { width: itemWidth }]}
                  onPress={() => setIndex(i)}
                >
                  <Text style={{
                    color: index === i ? colors.submit : '#999',
                    fontSize: index === i ? 18 : 15,
                    fontWeight: '700'
                  }}
                  >{route.title}
                  </Text>
                </TouchableOpacity>
              )
            })}
            <Animated.View style={{ position: 'absolute', bottom: 0, left, width: itemWidth, alignItems: 'center' }}>
              <View style={{ width: 26, height: 5, backgroundColor: colors.submit, borderRadius: 2 }} />
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <TabView
      renderTabBar={renderTabBar}
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  container: {
    // marginBottom: 10
  },
  nav: {
    width,
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: 42,
    justifyContent: 'center'
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
