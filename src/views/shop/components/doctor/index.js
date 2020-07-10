import * as React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { tools } from '../../../../utils'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { Avatar } from '../../../../components'
const { width } = Dimensions.get('window')
const PADDING = 6
const MAXNUM = 3
const ITEM_WIDTH = (width - PADDING * 6) / MAXNUM
export default (props) => {
  const { item, index, style, onItemPress } = props
  const ISEVEN = index % 2 === 0

  const { colors } = useTheme()
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onItemPress}
        style={[]}
      >
        <View style={{ backgroundColor: colors.storeInfoBg, alignItems: 'center', width: ITEM_WIDTH, marginRight: PADDING, paddingBottom: 16, borderRadius: 6 }}>
          <Avatar
            style={{ width: ITEM_WIDTH * 0.5, height: ITEM_WIDTH * 0.5, borderRadius: ITEM_WIDTH * 0.5 / 2, marginTop: -ITEM_WIDTH / 6 }}
            source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          />
          <Text style={{ marginTop: 8 }}>医生名称</Text>
          <Text style={{ marginTop: 4 }}>副主任医师</Text>
          <Text style={{ marginTop: 12 }}>235人预约过</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: ITEM_WIDTH / 6,
    overflow: 'visible'
  }
})
