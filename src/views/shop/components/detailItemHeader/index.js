import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
export default (props) => {
  const { colors } = useTheme()
  const { onPress, headerRight, showLine = true, title = '', style = {}, titleStyle = {}, note } = props
  console.log(showLine)
  const Container = onPress ? TouchableOpacity : View
  return (
    <Container
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={[styles.container, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showLine && <View style={[styles.line, { backgroundColor: colors.shop.shopBackground }]} />}
          <Text style={[{ color: colors.text, fontSize: 15 }, titleStyle]}>{title}</Text>
        </View>
        {
          note ? <Text style={[{ color: colors.lightText, fontSize: 12, marginLeft: 6 }, titleStyle]}>{note}</Text> : null
        }
      </View>

      {
        headerRight && headerRight()
      }
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6,
    justifyContent: 'space-between'
  },
  line: {
    width: 3,
    height: 12,
    marginRight: 7,
    borderRadius: 2
  }
})
