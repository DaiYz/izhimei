import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SettingList, Button, Avatar } from '../../../../components'

let name = ''
let number = ''
export default () => {
  return (
    <>
      <View style={{ marginTop: 8 }}>
        <SettingList
          title='真实姓名'
          type='input'
          onChangeText={(e) => name = e}
          placeholder='请输入姓名'
        />
        <SettingList
          title='身份证号'
          type='input'
          isLast
          onChangeText={(e) => number = e}
          placeholder='请输入身份证号码'
        />
      </View>
      <Text style={{margin: 20}}>继续表示同意<Text>用户协议及隐私条款</Text></Text>
      <Button
        textStyle={{ fontSize: 18 }}
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
