import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button } from '../../../../components'
import { useTheme } from '@react-navigation/native'

const LIST= [
  {
    name: '手机号',
    routeName: 'modifyPhone'
  },
  {
    name: '修改密码',
    routeName: 'modifyPwd'
  },
  {
    name: '实名认证',
    routeName: 'realName'
  },
]

export default (props) => {
  const { navigation } = props
  return (
    <>
      {
        LIST.map((item, index) =>
          <SettingList
            onPress={() => navigation.navigate(item.routeName)}
            key={index}
            isLast={index === LIST.length - 1}
            title={item.name}
          />
        )
      }
    </>
  )
}
