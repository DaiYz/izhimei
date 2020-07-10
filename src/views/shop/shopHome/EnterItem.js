import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ImageBackground } from '../../../components'

export default (props) => {
  const { source, imageStyle, imageContainerStyle, style = {}, onEnterPress, name, ...otherProps } = props
  return (
    <TouchableOpacity
      activeOpacity={0.8} style={style}
      onPress={() => onEnterPress(name)}
    >
      <ImageBackground
        {...otherProps}
        source={source}
        style={imageContainerStyle}
        imageStyle={imageStyle}
      />
    </TouchableOpacity>
  )
}
