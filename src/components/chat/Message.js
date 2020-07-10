import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, FlatList, LayoutAnimation } from 'react-native'

export default function () {
  return (
    <View activeOpacity={1} style={[{ flex: 1, backgroundColor: 'transparent' }]}>
      <FlatList
        enableEmptySections
        keyboardDismissMode='on-drag'
        scrollEventThrottle={100}
        data={[1, 2, 3, 4]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={() => <View style={{ height: 44, marginTop: 10, backgroundColor: 'white' }}><Text>123</Text></View>}
      />
    </View>
  )
}
