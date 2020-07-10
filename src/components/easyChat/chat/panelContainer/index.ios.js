import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native'
import PlusPanel from '../plus'
const { width, height } = Dimensions.get('window')

export default class PanelContainer extends PureComponent {
  render () {
    const { panelContainerHeight, visibleHeight, ImageComponent, panelHeight, emojiHeight, panelContainerBackgroundColor, onEmojiSelected } = this.props
    return (
      <Animated.View
        style={[{
          bottom: visibleHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [-panelContainerHeight, -panelContainerHeight]
          }),
          opacity: visibleHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          position: 'absolute',
          height: panelContainerHeight,
          width
        }, { backgroundColor: panelContainerBackgroundColor }
        ]}
      >
        {
          this.props.usePlus
            ? <PlusPanel
              panelHeight={panelHeight}
              panelContainerHeight={panelContainerHeight}
              panelSource={this.props.panelSource}
              renderPanelRow={this.props.renderPanelRow}
              panelContainerStyle={this.props.panelContainerStyle}
            />
            : null
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
