import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { tools } from '../../../../utils'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { Avatar } from '../../../../components'
export default (props) => {
  const { item, index, style, onItemPress, itemStyle } = props
  const ISEVEN = index % 2 === 0
  const { colors } = useTheme()
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onItemPress}
        style={[
          ISEVEN ? styles.leftContainer : styles.rightContainer,
          styles.itemContainer,
          { borderWidth: tools.minLineHeight(), borderColor: colors.border },
          itemStyle]}
      >
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          style={styles.cover}
        />
        <View style={{ paddingHorizontal: 6 }}>
          <Text style={[styles.title]} numberOfLines={2}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                style={styles.avatar}
                source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
              />
              <Text numberOfLines={1}>用户昵称用户昵称用户昵称用户昵称用户昵称</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>icon</Text>
              <Text>121</Text>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingBottom: 10
  },
  itemContainer: {
    borderRadius: 6,
    paddingBottom: 12
  },
  leftContainer: {
    marginLeft: 6,
    marginRight: 3
  },
  rightContainer: {
    marginRight: 6,
    marginLeft: 3
  },

  title: {
    marginVertical: 6
  },
  cover: {
    flex: 1,
    height: 200,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6
  },
  name: {

  }
})
