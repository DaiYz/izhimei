import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')

const PADDING = 8
const GRID = 4

export default (props) => {
  const { data, title } = props
  const [currentIndex, setCurrentIndex] = React.useState(0)

  return (
    <View style={{ marginTop: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text>*</Text>
        <Text>{title}</Text>
      </View>
      <View style={styles.tipContainer}>
        {
          data.map((item, index) => <Tip onPress={() => setCurrentIndex(index)} key={index} text={item} index={index} active={currentIndex === index} />)
        }
      </View>
    </View>
  )
}

function Tip (props) {
  const { text, onPress, active, index } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.tip, { marginRight: index % GRID === 3 ? 0 : PADDING }, { backgroundColor: active ? 'red' : '#eee' }]}>
      <Text numberOfLines={1} style={{ color: active ? colors.card : colors.text }}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tip: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 10,
    height: 30,
    width: (width - (14 * 2) - (PADDING * (GRID - 1))) / GRID
  }
})
