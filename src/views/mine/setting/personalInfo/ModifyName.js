import * as React from 'react'
import { View, TextInput, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Image from 'react-native-fast-image'

let TextValue = ''

function onSubmit () {
  console.log(TextValue)
}

export default (props) => {
  const { navigation } = props
  React.useEffect(() => {
    navigation.setParams({ onRightPress: onSubmit })
  }, [])

  return (
    <>
      <View style={styles.input}>
        <TextInput
          style={{ flex: 1, padding: 0 }}
          underlineColorAndroid='transparent'
          onChangeText={(e) => TextValue = e}
          placeholder='请输入昵称'
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginVertical: 8,
    height: 44,
    padding: 8,
    paddingHorizontal: 16
  }
})
