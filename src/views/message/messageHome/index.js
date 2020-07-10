import * as React from 'react'
import { View, StyleSheet, Dimensions, StatusBar, Text, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { tools } from '../../../utils'
import MessageScreen from './message'
import InteractiveScreen from './interactive'
import QuestionAndAnsweScreen from './questionAndAnswer'
import { useTheme } from '@react-navigation/native'
import {observable, observe} from 'mobx';
import {observer} from 'mobx-react';
const { width } = Dimensions.get('window')
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const androidStatusBarHeight = StatusBar.currentHeight
const HeaderHeight = 44
const HeaderPaddingTop = tools.isIPhoneX() ? (IPhoneXPaddingTop + iosStatusBarHeight) : tools.isIos ? iosStatusBarHeight : 0
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#b3b73f' }]} />
)
const initialLayout = { width: Dimensions.get('window').width }

export default observer((props) => {
  const [index, setIndex] = React.useState(1)
  const [routes] = React.useState([
    { key: 'message', title: '私信' },
    { key: 'interactive', title: '互动消息' },
    { key: 'QA', title: '问答' }
  ])
  const { colors } = useTheme()
  const renderScene = SceneMap({
    message: MessageScreen,
    interactive: InteractiveScreen,
    QA: QuestionAndAnsweScreen
  })

  const _renderTabBar = props => {
    const { position } = props
    const len = props.navigationState.routes.length
    const NAVWIDTH = width - 120
    const itemWidth = NAVWIDTH / len
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
          <View style={{ flexDirection: 'row', width: NAVWIDTH, justifyContent: 'center' }}>
            {props.navigationState.routes.map((route, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.tabItem, { width: itemWidth }]}
                  onPress={() => setIndex(i)}
                >
                  <Text style={{ color: index === i ? '#333' : '#999', fontSize: index === i ? 18 : 15, fontWeight: '700' }}>{route.title}
                  </Text>
                </TouchableOpacity>
              )
            })}
            <Animated.View style={{ position: 'absolute', bottom: 6, left, width: itemWidth, alignItems: 'center' }}>
              <View style={{ width: 26, height: 3, backgroundColor: colors.submit, borderRadius: 2 }} />
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <TabView
        renderTabBar={(props) => _renderTabBar(props)}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  container: {
    paddingTop: HeaderPaddingTop
  },
  nav: {
    width,
    height: HeaderHeight,
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
