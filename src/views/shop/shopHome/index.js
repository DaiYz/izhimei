import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Image from 'react-native-fast-image'
import { shop } from '../../../assets/images'
import ShopHeader from './Header'
import EnterItem from './EnterItem'
import ShopItem from './ShopItem'
import Banner from './Banner'
import { observer } from 'mobx-react'
import { useStores } from '../../../stores'
import { navigate } from '../../../utils/rootNavigation'
import { tools } from '../../../utils'
import { GoodsItem } from '../components'

function onEnterPress (name, params) {
  navigate(name)
}

export default observer(({ navigation }) => {
  const { colors } = useTheme()
  const { shopStore = {} } = useStores()
  return (
    <View style={{ flex: 1, backgroundColor: colors.shop.shopBackground }}>
      <ShopHeader
        onBack={() => navigation.goBack()}
        onLocationPress={() => {}}
        onSearchPress={() => navigation.navigate('shopSearch')}
      />
      <FlatList
        contentContainerStyle={{ backgroundColor: colors.shop.bg, paddingBottom: tools.isIPhoneX() ? 34 : 0 }}
        ListHeaderComponent={
          <ListHeader
            onEnterPress={onEnterPress}
            banner={shopStore.shopBanner.slice()}
          />
        }
        data={shopStore.shopList.slice()}
        keyExtractor={(item) => `${item.id}`}
        horizontal={false}
        numColumns={2}
        renderItem={({ item, index }) =>
          <GoodsItem
            onItemPress={() => navigation.navigate('shopDetail')}
            item={item}
            index={index}
          />}
      />
    </View>
  )
})

function ListHeader (props) {
  const { colors } = useTheme()
  const { banner, onEnterPress } = props
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.shop.shopBackground }]}>
      <Banner
        data={banner}
      />
      <TopNav />
      <CategoryEnter onEnterPress={onEnterPress} />
      <TouchableOpacity activeOpacity={0.8} style={[{ backgroundColor: colors.shop.bg }]}>
        <Image
          source={shop.topNav.shopAd}
          style={{ flex: 1, height: 100, marginTop: 12 }}
        />
      </TouchableOpacity>

    </View>
  )
}

function TopNav () {
  const { colors } = useTheme()
  const COUNTS = ['抗衰紧致', '玻尿酸', '肉毒素', '美容护肤', '激光脱毛', '半永久妆', '自体脂肪', '面部轮廓', '私密整形', '牙齿美容']
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <View style={[styles.topNav, { backgroundColor: colors.shop.bg }]}>
        {
          COUNTS.map((item, index) =>
            <TouchableOpacity activeOpacity={0.8} key={index} style={styles.topNavItem}>
              <Image
                source={shop.topNav[`nav${index + 1}`]}
                style={{ height: 40, width: 40 }}
              />
              <Text style={{ marginTop: 10 }}>{item}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

function CategoryEnter (props) {
  const { onEnterPress } = props
  const { colors } = useTheme()
  return (
    <View style={{ paddingHorizontal: 14, marginVertical: 8 }}>
      <View>
        <EnterItem
          name='group'
          onEnterPress={onEnterPress}
          source={shop.topNav.groupBg}
          style={{
            borderColor: colors.shop.group,
            borderWidth: 4,
            borderRadius: 12
          }}
          imageContainerStyle={styles.imageContainerStyle}
          imageStyle={{ borderRadius: 8 }}
        />
        <View style={styles.enterBottom}>
          <EnterItem
            onEnterPress={onEnterPress}
            style={{
              width: '49%',
              borderColor: colors.shop.vip,
              borderWidth: 4,
              borderRadius: 12
            }}
            source={shop.topNav.vipBg}
            imageContainerStyle={styles.imageContainerStyle}
            imageStyle={{ borderRadius: 8 }}
          />
          <EnterItem
            name='doctor'
            onEnterPress={onEnterPress}
            style={{
              width: '49%',
              borderColor: colors.shop.doctor,
              borderWidth: 4,
              borderRadius: 12
            }}
            source={shop.topNav.doctorBg}
            imageContainerStyle={styles.imageContainerStyle}
            imageStyle={{ borderRadius: 8 }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20
  },
  topNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 20,
    marginVertical: 10,
    flex: 1
  },
  topNavItem: {
    width: '20%',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterTop: {

  },
  enterBottom: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  enterItemStyle: {

  },
  imageContainerStyle: {
    width: '100%', height: 80
  }
})
