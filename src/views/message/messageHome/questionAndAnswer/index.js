import * as React from 'react'
import { View, StyleSheet, Dimensions, StatusBar, Text, TouchableOpacity } from 'react-native'
import { empty } from '../../../../assets/images'
import Image from 'react-native-fast-image'

export default () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 160 }}>
      <Image resizeMode='contain' source={empty.emptyCart} style={{ width: 140, height: 160 }} />
      <Text style={{ marginTop: 10 }}>没有参与问答</Text>
    </View>
  )
}
