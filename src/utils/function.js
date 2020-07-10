import Config from '../config'
import { init, setLocatingWithReGeocode, addLocationListener, setNeedAddress, stop, start } from '../nativeBridge/aMap'

export const getCurrentLocation = async () => {
  try {
    // android 请求权限
    // if (IS_ANDROID) {
    //   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    //   if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //     return
    //   }
    // }

    // 初始化 sdk
    await init({
      ios: Config.app.AMAP_IOS_KEY,
      android: Config.app.AMAP_ANDROID_KEY
    })

    // 监听定位变化，监听到城市位置信息之后，resolve 并停止定位
    const locationPromise = new Promise(resolve => {
      setLocatingWithReGeocode(true)
      setNeedAddress(true)
      addLocationListener(location => {
        if (location && location.adCode) {
          resolve(location)
          stop()
        }
      })
    })
    const timeoutPromise = new Promise(resolve => {
      setTimeout(() => {
        stop()
        resolve()
      }, 20 * 1000)
    })
    start()
    return Promise.race([locationPromise, timeoutPromise])
  } catch (err) {
    console.warn(err)
  }
}
