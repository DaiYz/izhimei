import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Image from 'react-native-fast-image'
import { tools } from '../../../../utils'
import { useTheme } from '@react-navigation/native'
export default (props) => {
  const { item, index, style, onItemPress, renderInfo, otherPrice } = props
  const ISEVEN = index % 2 === 0
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.shop.bg }, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onItemPress}
        style={[ISEVEN ? styles.leftContainer : styles.rightContainer, styles.itemContainer, tools.elevationShadowStyle(10, colors.shadow), {
          backgroundColor: colors.shop.bg
        }]}
      >
        <Image
          source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }}
          style={styles.cover}
        />
        <View style={styles.title}>
          <Text numberOfLines={2} style={[{ color: colors.shop.text, lineHeight: 18, fontSize: 15 }]}>{item.title}</Text>
          <View style={styles.tipContainer}>
            <Tip
              text='颜值抵扣'
            />
            <Tip
              text='支持分期'
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.price, { color: colors.shop.text }]}>￥{item.price}</Text>
            {
              otherPrice ? <Text style={[styles.price, { color: colors.shop.text }]}>￥{item.price}</Text> : null
            }

          </View>
        </View>
        {
          renderInfo && renderInfo()
        }

      </TouchableOpacity>
    </View>
  )
}

function Tip (props) {
  const { text } = props
  const { colors } = useTheme()
  return (
    <View style={[styles.tipStyle, { borderColor: colors.tip }]}>
      <Text style={[{ color: colors.tip }, { fontSize: 12 }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingBottom: 10
  },
  leftContainer: {
    marginLeft: 10,
    marginRight: 5
  },
  rightContainer: {
    marginRight: 10,
    marginLeft: 5
  },
  itemContainer: {
    borderRadius: 10,
    paddingBottom: 16
  },
  title: {
    padding: 4
  },
  price: {
    marginTop: 8,
    fontSize: 24
  },
  cover: {
    flex: 1,
    height: 160,
    borderRadius: 10
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  tipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: tools.minLineHeight(),
    borderRadius: 4,
    marginRight: 10,
    padding: 4
  }
})
