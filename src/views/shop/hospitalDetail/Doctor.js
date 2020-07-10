import * as React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { DetailItemHeader, DoctorItem } from '../components'
const { width } = Dimensions.get('window')
export default (props) => {
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.card, marginTop: 8, paddingBottom: 16 }}>
      <DetailItemHeader
        style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}
        title='本地医生'
        note='(11位)'
        headerRight={() =>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.lightText, fontSize: 12 }}>查看更多</Text>
            <Text>icon</Text>
          </View>}
      />
      <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
        {
          [1, 2, 3].map((item, index) =>
            <DoctorItem
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
