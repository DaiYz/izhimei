import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button, Avatar } from '../../../components'
import Animated from 'react-native-reanimated'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useTheme } from '@react-navigation/native'
import { tools } from '../../../utils'
import MyFav from './MyFav'
const { width } = Dimensions.get('window')
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
)

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#68b775' }]} />
)

const initialLayout = { width: Dimensions.get('window').width }

export default () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'fav', title: '我收藏的' },
    { key: 'post', title: '我发表的' },
    { key: 'browse', title: '最近浏览' }
  ])
  const { colors } = useTheme()
  const renderScene = SceneMap({
    fav: MyFav,
    post: SecondRoute,
    browse: ThirdRoute
  })

  const renderTabBar = props => {
    const len = props.navigationState.routes.length
    const itemWidth = width / len
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
    borderBottomWidth: 1.6,
    borderColor: '#eee',
  },
  nav: {
    width,
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: 44,
    justifyContent: 'center'
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
