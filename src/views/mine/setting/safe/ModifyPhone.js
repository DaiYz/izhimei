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
          title='+ 86'
          type='input'
          keyboardType='numeric'
          onChangeText={(e) => name = e}
          renderOther={() => <Text style={{marginLeft: 8}}>获取验证码</Text>}
          placeholder='请输入新的手机号码'
        />
        <SettingList
          title='身份证号'
          type='input'
          keyboardType='numeric'
          isLast
          onChangeText={(e) => number = e}
          placeholder='请输入身份证号码'
        />
      </View>
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
