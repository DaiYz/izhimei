import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button, Avatar } from '../../../../components'

let oldPwd = ''

export default () => {
  return (
    <>
      <View style={{ marginTop: 8 }}>
        <SettingList
          title='旧密码'
          type='input'
          onChangeText={(e) => oldPwd = e}
          placeholder='请输入旧密码'
        />
        <SettingList
          title='新密码'
          type='input'
          onChangeText={(e) => oldPwd = e}
          placeholder='请输入旧密码'
        />
        <SettingList
          title='确认新密码'
          type='input'
          isLast
          onChangeText={(e) => oldPwd = e}
          placeholder='请输入旧密码'
        />
      </View>
      <Button
        textStyle={{fontSize: 18}}
        style={styles.button}
        title='确认'
      />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 40,
    marginTop: 80,
    height: 44,
    borderRadius: 22
  }
})
