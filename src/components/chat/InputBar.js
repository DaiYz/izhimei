import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, Animated } from 'react-native'

export default function (props) {
  const { iphoneXBottomPadding, visibleHeight, keyboardShow = false, panelContainerHeight = 0 } = props


  const paddingBottom = visibleHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [
      iphoneXBottomPadding,
      10
    ]
  })
  return (
    <Animated.View style={[styles.container, { paddingBottom: paddingBottom }]}>
      <View style={styles.input}>
        <TextInput
          style={styles.commentBar_input}
          multiline
          placeholder='chat'
        />
      </View>
      <Text>icon</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 4,
    borderRadius: 6,
    backgroundColor: '#eee'
  },
  commentBar_input: {
    height: 26,
    padding: 0
    // backgroundColor: '#f9f9f9'
  }
})
