import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { Avatar } from '../../../../components'
import { tools } from '../../../../utils'
const { width } = Dimensions.get('window')
export default () => {
  const { colors } = useTheme()
  const PADDING = 6
  return (
    <View style={{ borderBottomWidth: tools.minLineHeight(), borderColor: colors.border }}>
      <View style={{ padding: PADDING * 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            style={{ marginRight: 8 }}
            source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          />
          <View>
            <Text style={{ marginBottom: 5 }}>用户昵称</Text>
            <Text>2020年3月5日</Text>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <Text numberOfLines={2}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Image
            style={{ width: (width - 6 * PADDING) / 3, height: (width - 6 * PADDING) / 3 - 10, borderRadius: 6 }}
            source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          />
          <Image
            style={{ width: (width - 6 * PADDING) / 3, height: (width - 6 * PADDING) / 3 - 10, marginHorizontal: PADDING, borderRadius: 6 }}
            source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          />
          <Image
            style={{ width: (width - 6 * PADDING) / 3, height: (width - 6 * PADDING) / 3 - 10, borderRadius: 6 }}
            source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <Text>436人已看</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>icon</Text>
              <Text>4</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>icon</Text>
              <Text>360</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
