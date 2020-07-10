import * as React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  LayoutAnimation, Platform,
  Easing
} from 'react-native'
import Message from './Message'
import Container from './ChatContainer'
import InputBar from './InputBar'
import { useHeaderHeight } from '@react-navigation/stack'

const visibleHeight = new Animated.Value(0)
const panelHeight = new Animated.Value(0)
const iphoneXBottomPadding = 34
let keyboardWillShowListener = null
let keyboardWillHideListener = null

export default function () {
  const HeaderHeight = useHeaderHeight()
  const { height } = useWindowDimensions()
  const containerHeight = height - HeaderHeight
  const [keyboardShow, setKeyboardShow] = React.useState(false)
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const [bottomSafeArea, setBottomSafeArea] = React.useState(iphoneXBottomPadding)
  function _willShow () {
    keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      // const { panelShow, emojiShow } = this.state
      // keyboardAnimation(true, e.endCoordinates.height, e.duration)
      // setKeyboardHeight(e.endCoordinates.height)
      // visibleHeight.setValue(1)
      setKeyboardShow(true)
      setKeyboardHeight(e.endCoordinates.height)
      setBottomSafeArea(0)
      // this.setState({ keyboardHeight: e.endCoordinates.height, xHeight: 0, keyboardShow: true })
      Animated.timing(visibleHeight, {
        duration: e.duration,
        toValue: 1,
        easing: Easing.inOut(Easing.ease)
      }).start()
      // if (emojiShow) {
      //   return this.closeEmoji()
      // }
      // if (panelShow) {
      //   return this.closePanel()
      // }
    })
  }

  function _willHide () {
    keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
      console.log(e)
      // visibleHeight.setValue(0)
      // keyboardAnimation(false, 0, e.duration)
      // setKeyboardHeight(0)
      // const { emojiShow, panelShow } = this.state
      // const { iphoneXBottomPadding } = this.props
      // this.setState({ keyboardShow: false })
      // if (emojiShow) {
      //   return this.showEmoji()
      // }
      // if (panelShow) {
      //   return this.showPanel()
      // }
      Animated.timing(visibleHeight, {
        duration: e.duration,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      }).start()
      setKeyboardShow(false)
      setKeyboardHeight(0)
      setBottomSafeArea(iphoneXBottomPadding)
      // this.setState({ xHeight: iphoneXBottomPadding })
    })
  }

  function keyboardAnimation (show: false, height:0, duration: 200) {
    LayoutAnimation.configureNext({
      duration: duration, // 持续时间
      create: {
        type: LayoutAnimation.Types.linear,
        property: 'opacity'
      },
      update: {
        type: 'linear'
      }
    }, () => {})
    setKeyboardShow(show)
    setKeyboardHeight(height)
  }

  function _remove () {
    keyboardWillShowListener && keyboardWillShowListener.remove()
    keyboardWillHideListener && keyboardWillHideListener.remove()
  }

  function _addListener () {
    if (Platform.OS === 'ios') {
      _willShow()
      _willHide()
    }
  }

  React.useEffect(() => {
    _addListener()
    return () => {
      _remove()
    }
  })

  return (
    <>
      <Container
        keyboardShow={keyboardShow}
        keyboardHeight={keyboardHeight}
        containerHeight={containerHeight}
        visibleHeight={visibleHeight}
      >
        <Message />
        <InputBar
          iphoneXBottomPadding={bottomSafeArea}
          keyboardShow={keyboardShow}
          visibleHeight={visibleHeight}
        />
      </Container>
    </>
  )
}
