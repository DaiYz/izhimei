import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, TextInput, StatusBar } from 'react-native'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')

export default (props) => {
  const { colors } = useTheme()
  const { title = '', data = [], renderRight, renderItem } = props
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        {renderRight && renderRight()}
      </View>
      <View style={{
        marginTop: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
      >
        {
          data.map((item, index) =>
            renderItem({ item, index })
          )
        }
      </View>
    </View>
  )
}
