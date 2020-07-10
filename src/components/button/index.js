import { useTheme } from '@react-navigation/native'
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as React from 'react'

export default function Button (props) {
  const { title = '', disabled = false, loading = false, style = {}, textStyle = {}, onPress = () => {}, icon, linearColors, ...otherProps } = props
  const { colors } = useTheme()
  const Container = linearColors ? LinearGradient : View
  return (
    <Container
      style={[styles.button, { backgroundColor: colors.warning }, style]}
      colors={linearColors}
      {...otherProps}
    >
      <TouchableOpacity
        style={[styles.button, { flex: 1 }]}
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onPress}
      >
        {icon && icon()}
        <Text style={[{ color: colors.card, fontSize: 15 }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
