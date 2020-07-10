import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, ViewPropTypes, StatusBar } from 'react-native'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'

export default (props) => {
  const { onSearchPress = () => {} } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.container, { backgroundColor: colors.shop.bg }]} onPress={onSearchPress}>
      <Text>icon</Text>
      <Text style={[styles.placeholder, { color: colors.shop.shopPlaceholder }]}>请输入关键词</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 16
  },
  placeholder: {
    marginLeft: 12
  }
})
