import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, ViewPropTypes, StatusBar } from 'react-native'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const androidStatusBarHeight = StatusBar.currentHeight
const HeaderHeight = 44
const HeaderPaddingTop = tools.isIPhoneX() ? (IPhoneXPaddingTop + iosStatusBarHeight) : tools.isIos ? iosStatusBarHeight : 0

export default (props) => {
  const { colors } = useTheme()
  const { onSearchPress } = props
  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <View style={styles.nav}>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchLeft}>
          <Text style={[styles.city, { color: colors.text }]}>帮助与客服</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.right}>
          <Text style={[{ color: colors.text }]}>icon</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: HeaderPaddingTop
  },
  nav: {
    width,
    height: HeaderHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    paddingHorizontal: 20
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
