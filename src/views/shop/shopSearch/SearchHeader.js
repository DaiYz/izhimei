import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, TextInput, StatusBar } from 'react-native'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const androidStatusBarHeight = StatusBar.currentHeight
const HeaderHeight = 44
const HeaderPaddingTop = tools.isIPhoneX() ? (IPhoneXPaddingTop + iosStatusBarHeight) : tools.isIos ? iosStatusBarHeight : 0

export default (props) => {
  const { onSubmitEditing = () => {}, goBack } = props
  const { colors } = useTheme()
  return (
    <View style={[styles.container]}>
      <View style={styles.nav}>
        <View style={[styles.searchRight, { backgroundColor: colors.lightGray }]}>
          <Text>icon</Text>
          <View style={{ marginLeft: 4, flex: 1 }}>
            <TextInput
              placeholder='输入城市名或拼音'
              returnKeyType='search'
              autoFocus
              style={{ padding: 0 }}
              underlineColorAndroid='transparent'
              onSubmitEditing={onSubmitEditing}
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchLeft} onPress={goBack}>
          <Text style={[styles.city, { color: colors.text }]}>取消</Text>
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
    // backgroundColor: 'red',
    paddingHorizontal: 14
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 8
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16
  },
  searchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 20,
    paddingHorizontal: 16,
    flex: 1
  }
})
