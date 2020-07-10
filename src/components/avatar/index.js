import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Image from 'react-native-fast-image'

export default function Avatar (props) {
  const { onPress, style = {}, source = {} } = props

  return (
    <TouchableOpacity
      disabled={onPress === undefined}
      style={[styles.avatar, style]}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress && onPress()}
    >
      <Image
        style={{ flex: 1 }}
        source={source}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden'
  }
})
