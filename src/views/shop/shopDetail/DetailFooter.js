import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar, Button } from '../../../components'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
export default (props) => {
  const {onIconClicked} = props
  const { colors } = useTheme()
  return (
    <View style={[{ backgroundColor: colors.card }, { paddingBottom: tools.isIPhoneX() ? 34 : 0 }]}>
      <View style={[{ backgroundColor: colors.storeBg }, styles.top]}>
        <Text>icon</Text>
        <Text>预付金 <Text>￥ 500</Text></Text>
      </View>
      <View style={[styles.bottom]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconItem}>
            <Text>icon</Text>
            <Text>咨询</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem} activeOpacity={0.8} onPress={() => onIconClicked('shoppingCart')}>
            <Text>icon</Text>
            <Text>购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <Text>icon</Text>
            <Text>收藏</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button
            linearColors={colors.shopCart}
            style={{ flex: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: 40, backgroundColor: 'red' }}
            title='加入购物车'
          />
          <Button
            linearColors={colors.buy}
            style={{ flex: 1, borderTopRightRadius: 20, borderBottomRightRadius: 20, height: 40 }}
            title='立即购买'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
