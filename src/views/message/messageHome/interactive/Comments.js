import * as React from 'react'
import { View, StyleSheet, Animated, FlatList, Text, TouchableOpacity } from 'react-native'
import Image from 'react-native-fast-image'
import { List, Button } from '../../../../components'
import { tools } from '../../../../utils'
import { useTheme } from '@react-navigation/native'
import { useStores } from '../../../../stores'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
const data = [
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    message: 'XXXXXXXXXXXXX',
    time: new Date().getDate()
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    message: 'XXXXXXXXXXXXX',
    time: new Date().getDate()
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    message: 'XXXXXXXXXXXXX',
    time: new Date().getDate()
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    message: 'XXXXXXXXXXXXX',
    time: new Date().getDate()
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    message: 'XXXXXXXXXXXXX',
    time: new Date().getDate()
  }
]

export default (props) => {
  const { colors } = useTheme()
  const { messageStore = {} } = useStores()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) =>
          <List
            name={item.name}
            avatar={item.avatar}
            message={item.message}
            index={index}
            otherInfo='关注了你'
            renderLabel={() => {
              return (
                <Button style={{ width: 60, height: 24, backgroundColor: colors.card, borderColor: colors.border, borderRadius: 16, borderWidth: tools.minLineHeight() }} textStyle={{ fontSize: 12, color: colors.text }} title='回粉' />
              )
            }}
          />}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})
