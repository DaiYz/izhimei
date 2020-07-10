import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button } from '../../../components'
import Image from 'react-native-fast-image'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
export default (props) => {
  const { style } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { borderColor: colors.border }, style]}
    >
      <View style={styles.info}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            style={{ width: 20, height: 20, borderRadius: 10, marginRight: 4 }}
            source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
          />
          <Text style={{ color: colors.lightText }}>用户名称</Text>
        </View>
        <View>
          <Text style={{ fontSize: 13, lineHeight: 20 }} numberOfLines={2}>评论内容评论内容评论内容评论内22容评论内容评论内容评论内容评论内容评论内容评论内容11</Text>
        </View>
      </View>
      <Image
        style={styles.cover}
        source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 8,
    borderRadius: 6,
    borderWidth: tools.minLineHeight(),
    borderColor: 'red',
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between'
  },
  cover: {
    width: 78,
    height: 78
  }
})
