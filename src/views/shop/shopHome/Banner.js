import * as React from 'react'
import { View, Dimensions } from 'react-native'
import Image from 'react-native-fast-image'
import Carousel from 'react-native-snap-carousel'
const { width } = Dimensions.get('window')
export default (props) => {
  const { data } = props
  return (
    <Carousel
      data={data}
      loop
      autoplay
      renderItem={_renderItem}
      sliderWidth={width}
      itemWidth={width - 16}
    />
  )
}

function _renderItem ({ item, index }) {
  return (
    <View>
      <Image
        source={item}
        style={{ flex: 1, height: 120, borderRadius: 12, marginTop: 12 }}
      />
    </View>
  )
}
