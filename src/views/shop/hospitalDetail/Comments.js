import * as React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { DetailItemHeader, CommentItem } from '../components'
const { width } = Dimensions.get('window')
export default (props) => {
  const { colors } = useTheme()
  return (
    <View style={{ backgroundColor: colors.card, marginTop: 8 }}>
      <DetailItemHeader
        style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}
        title='相关评价'
        note='165条'
        headerRight={() =>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.lightText, fontSize: 12 }}>查看更多</Text>
            <Text>icon</Text>
          </View>}
      />
      <View>
        {
          [1, 2, 3, 4].map((item, index) =>
            <CommentItem
              key={index}
              index={index}
              item={item}
            />
          )
        }
      </View>
    </View>
  )
}
