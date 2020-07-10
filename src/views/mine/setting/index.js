import * as React from 'react'
import { View, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button } from '../../../components'
import { useTheme } from '@react-navigation/native'
import { navigate } from '../../../utils'
import { useHeaderHeight } from '@react-navigation/stack'
const enumSettingTop = [
  {
    title: '修改个人资料',
    routeName: 'personal',
    content: ''
  },
  {
    title: '账户与安全',
    routeName: 'safe',
    content: ''
  }
]

const enumSettingBottom = [
  {
    title: '隐私设置',
    routeName: '',
    content: ''
  },
  {
    title: '帮助与客服',
    routeName: '',
    content: ''
  },
  {
    title: '客服电话',
    routeName: '',
    content: '10000'
  },
  {
    title: '关于医直美',
    // routeName: 'about',
    routeName: 'footprint',
    content: ''
  }
]
function onItemPress (data) {
  if (data.content && !data.routeName) {
    const tel = `tel:${data.content}`
    Linking.canOpenURL(tel).then((supported) => {
      if (!supported) {
        console.log('Can not handle tel:' + data.content)
      } else {
        return Linking.openURL(tel)
      }
    }).catch(error => console.log('tel error', error))
    return null
  }
  navigate(data.routeName)
}

export default (props)=> {
  const { colors } = useTheme()
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {
            enumSettingTop.map((item, index) => <SettingList onPress={() => onItemPress(item)} isLast={index === enumSettingTop.length - 1} key={index} title={item.title} />)
          }
          <View style={{ marginTop: 8 }}>
            {
              enumSettingBottom.map((item, index) => <SettingList onPress={() => onItemPress(item)} content={item.content} isLast={index === enumSettingBottom.length - 1} key={index} title={item.title} contentStyle={{ color: colors.submit }} />)
            }
          </View>
        </ScrollView>
      </View>
      <Button
        style={{ marginHorizontal: 30, height: 40, borderRadius: 30, marginBottom: 80, backgroundColor: colors.submit }}
        textStyle={{ fontSize: 16 }}
        title='退出当前账号'
      />
    </>
  )
}
