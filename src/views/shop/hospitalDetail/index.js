import * as React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from '../../../components'
import Info from './Info'
import Diary from './Diary'
import Comments from './Comments'
import Doctor from './Doctor'
export default () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Info />
        <Doctor />
        <Diary />
        <Comments />
        <Button
          style={{ marginTop: 18, marginHorizontal: 24, marginBottom: 100, height: 41, borderRadius: 21 }}
          title='咨询一下'
        />
      </ScrollView>
    </View>
  )
}
