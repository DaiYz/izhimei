import * as React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Image from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import { DetailItemHeader, GroupListItem } from '../components'
import { Avatar } from '../../../components'
import { useTheme } from '@react-navigation/native'
import { shop } from '../../../assets/images'
import LinearGradient from 'react-native-linear-gradient'
import Comments from './Comments'
const { width } = Dimensions.get('window')
export default (props) => {
  const { navigation } = props
  const { colors } = useTheme()
  return (
    <View>
      <Swiper style={{ height: 300 }} showsPagination={false}>
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          style={{ flex: 1 }}
        />
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          style={{ flex: 1 }}
        />
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          style={{ flex: 1 }}
        />
      </Swiper>
      <LinearGradient colors={colors.shopHeader} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 10, paddingHorizontal: 16 }}>
        <Text style={[{ color: colors.card }]}>￥<Text style={styles.price}>6000</Text> </Text>
        <Text style={[{ color: colors.card, fontSize: 12, marginLeft: 14, marginBottom: 4 }]}>会员抢购价 <Text>￥88888</Text> </Text>
      </LinearGradient>
      <View style={[{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8 }]}>
        <Text style={{ color: colors.text, lineHeight: 18 }} numberOfLines={2}>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 6 }}>
          <Text style={{ color: colors.lightText }}>北京市</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>icon</Text>
            <Text style={{ color: colors.lightText, marginLeft: 6 }}>发起预约数: 200</Text>
          </View>
        </View>
      </View>

      <View style={[{ backgroundColor: colors.storeBg }, styles.shop]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>icon</Text>
          <Text style={{ color: colors.tip, fontWeight: 'bold' }}>商户状态: <Text>营业中</Text></Text>
        </View>
        <Text>icon</Text>
      </View>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <View>
          <Preferential
            title='优惠'
            left={() =>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>促销</Text>
              </View>}
            style={{ marginBottom: 8 }}
          />
          <Preferential
            title='保障'
            style={{ marginTop: 8 }}
            right={() => <Text>icon</Text>}
            left={() =>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>icon</Text>
                <Text>术后保障</Text>
              </View>}
          />
        </View>
        <Image
          resizeMode='contain'
          source={shop.vip}
          style={{ flex: 1, height: 100 }}
        />
      </View>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <DetailItemHeader
          onPress={() => navigation.navigate('groupList')}
          showLine={false}
          headerRight={() => <Text>icon</Text>}
          title='加入拼单'
        />
        <View>
          {
            [
              { name: '用户昵称' },
              { name: '用户昵称' }
            ].map((item, index) =>
              <GroupListItem
                key={index}
                avatarStyle={{ width: 30, height: 30, borderRadius: 15 }}
                data={item}
              />
            )
          }
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}
        onPress={() => navigation.navigate('hospital')}
      >
        <DetailItemHeader
          title='医院信息'
          headerRight={() =>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.lightText, fontSize: 12 }}>查看详情</Text>
              <Text>icon</Text>
            </View>}
        />
        <DetailItemHeader
          style={{ paddingVertical: 8, paddingLeft: 10 }}
          titleStyle={{ fontSize: 16 }}
          showLine={false}
          HeaderRight={() => <Text>icon</Text>}
          title='北京右安门医院'
        />
        <View style={{ width: '100%', backgroundColor: colors.storeInfoBg, padding: 8, borderRadius: 8, flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <View>
              <Text>124</Text>
              <Text>124</Text>
              <Text>124</Text>
              <Text>124</Text>
            </View>
          </View>
          <View style={{ width: '50%' }} />
        </View>
        <Text style={{ marginTop: 8 }}>地址：XXXXXXXXXXX</Text>
      </TouchableOpacity>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <DetailItemHeader
          title='名医推荐'
        />
        {
          [1, 2].map((item, index) =>
            <Doctor key={index} />
          )
        }
      </View>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <DetailItemHeader
          title='相关评价'
          note='150条'
          headerRight={() =>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.lightText, fontSize: 12 }}>查看更多</Text>
              <Text>icon</Text>
            </View>}
        />
        <View style={{ marginVertical: 8 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              [1, 2].map((item, index) =>
                <Comments
                  style={{ width: 240 }}
                  key={index}
                />
              )
            }
          </ScrollView>
        </View>
      </View>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <DetailItemHeader
          title='相关日记'
          note='150条'
          headerRight={() =>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.lightText, fontSize: 12 }}>查看更多</Text>
              <Text>icon</Text>
            </View>}
        />
        <View style={{ marginVertical: 8 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              [1, 2, 3].map((item, index) =>
                <Image
                  style={{ width: (width - (16 * 3)) / 2, height: 140, marginRight: 16, borderRadius: 8 }}
                  source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
                />
              )
            }
          </ScrollView>
        </View>
      </View>

      <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <DetailItemHeader
          title='商品详情'
        />
        <View style={{ marginTop: 8 }}>
          <Image
            style={{ flex: 1, height: 400 }}
            source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
          />
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        <DetailItemHeader
          title='相关项目'
          style={{ backgroundColor: colors.card, padding: 12, paddingBottom: 12, marginBottom: 8 }}
        />
      </View>

    </View>
  )
}

function Preferential (props) {
  const { title, right, left, onPress, style } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }, style]}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={() => onPress && onPress()}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={{ color: colors.lightText, marginRight: 12 }}>{title}</Text>
        {
          left && left()
        }
      </View>
      {
        right && right()
      }
    </TouchableOpacity>
  )
}

function Doctor (props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.doctor}
    >
      <View style={styles.info}>
        <Avatar
          style={{ marginRight: 18 }}
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.title}>
            <Text style={{ color: colors.text, fontWeight: 'bold', marginRight: 8 }}>医生姓名</Text>
            <Text style={{ color: colors.lightText, fontSize: 12 }}>主治医师</Text>
          </View>
          <Text style={{ color: colors.lightText, fontSize: 12, marginTop: 8 }}>好评率：99%</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.lightText, fontSize: 12 }}>擅长:</Text>
            <View style={styles.tip}>
              <Text>111</Text>
            </View>
            <View style={styles.tip}>
              <Text>111</Text>
            </View>
            <View style={styles.tip}>
              <Text>111</Text>
            </View>
          </View>
        </View>
      </View>
      <Text>icon</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  price: {
    fontSize: 24
  },
  shop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 16
  },
  doctor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  tip: {
    paddingHorizontal: 6,
    paddingVertical: 3
  }
})
