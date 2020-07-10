import * as React from 'react'
import { Animated, Platform } from 'react-native'

export default function (props) {
  const { children, keyboardShow, keyboardHeight, containerHeight, visibleHeight, panelContainerHeight = 0 } = props
  const height = visibleHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [
      containerHeight,
      keyboardShow
        ? containerHeight - keyboardHeight
        : containerHeight - panelContainerHeight
    ]
  })

  return (
    <>
      <Animated.View style={[props.style, Platform.OS === 'ios' ? { height } : { flex: 1 }]}>
        {
          children
        }
      </Animated.View>
    </>
  )
}
