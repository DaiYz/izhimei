import * as React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { DetailItemHeader } from '../components'
const { width } = Dimensions.get('window')
export default (props) => {
  const [open, setOpen] = React.useState(false)
  const { colors } = useTheme()

  function onPress () {
    LayoutAnimation.configureNext({
      duration: 200, // 持续时间
      create: {
        type: LayoutAnimation.Types.linear,
        property: 'opacity'
      },
      update: {
        type: 'linear'
      }
    }, () => {})
    setOpen(!open)
  }
  return (
    <View style={[!open ? styles.container : { backgroundColor: colors.card, paddingHorizontal: 12 }]}>
      <View style={[{ backgroundColor: colors.card, borderRadius: 8, paddingTop: 12, overflow: 'hidden' }]}>
        <View style={{ paddingHorizontal: 18 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
              style={{ width: 56, height: 56, borderRadius: 8 }}
            />
            <View style={{ flex: 1, justifyContent: 'space-between', marginLeft: 14 }}>
              <View>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', color: colors.text }}>医院名称医院名称医院名称医院名称医院名称医院名称医院名称医院名称</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Text style={{ fontSize: 12, color: colors.lightText }}>效果: 4.7分</Text>
                  <Text style={{ fontSize: 12, color: colors.lightText }}>效果: 4.7分</Text>
                  <Text style={{ fontSize: 12, color: colors.lightText }}>效果: 4.7分</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>icon</Text>
                <Text>icon</Text>
                <Text>icon</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 18 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>4323</Text>
              <Text>预约</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>4323</Text>
              <Text>预约</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>4323</Text>
              <Text>预约</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>4323</Text>
              <Text>预约</Text>
            </View>
          </View>
        </View>
        {
          !open &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20, paddingHorizontal: 18, backgroundColor: colors.storeInfoBg }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>执业许可</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>执业许可</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>执业许可</Text>
              </View>
            </View>
        }

        {
          open &&
            <View style={{ marginVertical: 16 }}>
              <View>
                <DetailItemHeader
                  title='基本信息'
                />
                <View style={{ flexDirection: 'row', marginTop: 8, paddingHorizontal: 8 }}>
                  <Text>成立时间:</Text>
                  <Text>2018-2-14</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8, paddingHorizontal: 8 }}>
                  <Text>成立时间:</Text>
                  <Text>2018-2-14</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8, paddingHorizontal: 8 }}>
                  <Text>成立时间:</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ lineHeight: 18 }} numberOfLines={6}>我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介</Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                <DetailItemHeader
                  showLine={false}
                  title='执业许可'
                />
                <ScrollView horizontal>
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80 }}
                  />
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80, marginHorizontal: 6 }}
                  />
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80 }}
                  />
                </ScrollView>
              </View>

              <View style={{ marginTop: 16 }}>
                <DetailItemHeader
                  showLine={false}
                  title='医院环境'
                />
                <ScrollView horizontal>
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80 }}
                  />
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80, marginHorizontal: 6 }}
                  />
                  <Image
                    source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
                    style={{ width: (width - 36) / 3, height: 80 }}
                  />
                </ScrollView>
              </View>

              <View style={{ marginTop: 16 }}>
                <DetailItemHeader
                  title='特色服务'
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={styles.service}>
                    <Text>icon</Text>
                    <Text>服务</Text>
                  </View>
                  <View style={styles.service}>
                    <Text>icon</Text>
                    <Text>服务</Text>
                  </View>
                  <View style={styles.service}>
                    <Text>icon</Text>
                    <Text>服务</Text>
                  </View>
                  <View style={styles.service}>
                    <Text>icon</Text>
                    <Text>服务</Text>
                  </View>
                </View>
              </View>
            </View>
        }

        <TouchableOpacity activeOpacity={1} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 12, backgroundColor: open ? colors.card : colors.storeInfoBg }} onPress={() => onPress()}>
          <Text>{open ? 'less' : 'more'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingHorizontal: 12
  },
  service: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '33%',
    justifyContent: 'center',
    marginTop: 18
  }
})
