import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Image from 'react-native-fast-image'
import { logo } from '../../../assets/images'

export default () => {
  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image
          source={logo}
          style={{ width: 120, height: 120 }}
        />
        <Text style={{ marginTop: 16, fontSize: 20 }}>医直美APP</Text>
      </View>

    </View>
  )
}
