import * as React from 'react'
import {
  Dimensions,
  Platform,
  PixelRatio,
  Alert,
  View,
  TouchableOpacity,
  Text,
  NativeModules,
  ToastAndroid
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import RootSiblings from 'react-native-root-siblings'
const RCTToast =
  Platform.OS === 'android' ? ToastAndroid : NativeModules.LRDRCTSimpleToast
const Toast = {
  // Toast duration constants
  SHORT: RCTToast.SHORT,
  LONG: RCTToast.LONG,

  // Toast gravity constants
  TOP: RCTToast.TOP,
  BOTTOM: RCTToast.BOTTOM,
  CENTER: RCTToast.CENTER,

  show (message, duration = this.SHORT) {
    RCTToast.show(message, duration)
  },

  toast (message, duration = this.SHORT, gravity = this.CENTER) {
    RCTToast.showWithGravity(message, duration, gravity)
  }
}
const { width, height } = Dimensions.get('window')
const IMAGE_URL = __DEV__
  ? 'https://api2.cimicnews.com'
  : 'https://api2.cimicnews.com'

const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

// iphone6 像素
const isIos = Platform.OS === 'ios'

const basePx = isIos ? 750 : 720

const Px2Dp = (px: number) => {
  const layoutSize = (px / basePx) * width

  return PixelRatio.roundToNearestPixel(layoutSize)
}

const FontSize = (size: number) => {
  // iphone 5s and older Androids
  if (width < 360) {
    return size - 1
  } else if (height < 667) {
    // iphone 5
    return size
  } else if (height >= 667 && height <= 735) {
    // iphone 6-6s
    return size + 1
  } else if (height >= 735) {
    return size + 2
  }
  return size
}

const isIPhoneX = () => {
  return Platform.OS === 'ios' && DeviceInfo.hasNotch()
}

const elevationShadowStyle = (elevation, shadowColor = 'rgba(0,0,0,0.4)') => {
  return {
    elevation,
    shadowColor,
    shadowOffset: { width: 0, height: 0.2 * elevation },
    shadowOpacity: 0.3
  }
}

const alertAlert = (
  title = '',
  content = '',
  ok = () => console.log('OK Pressed')
) => {
  Alert.alert(title, content, [{ text: '确定', onPress: ok }], {
    cancelable: false
  })
}

const minLineHeight = () => {
  return 1 / PixelRatio.get()
}

const getVersion = () => {
  return DeviceInfo.getVersion()
}

const alert = () => {
  const sibling = new RootSiblings(
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => sibling && sibling.destroy()}
      style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center' }]}
    >
      <View style={{ marginHorizontal: 30, backgroundColor: '#fff', borderRadius: 8, padding: 12 }}>
        <View />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
            <Text>取消</Text>
          </TouchableOpacity>
          <View style={{ width: minLineHeight(), height: 20, backgroundColor: '#666' }} />
          <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
            <Text>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>)
}

export default {
  Px2Dp,
  FontSize,
  isIPhoneX,
  isIos,
  alertAlert,
  minLineHeight,
  elevationShadowStyle,
  Toast,
  getVersion,
  alert
}
