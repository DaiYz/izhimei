import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-fast-image'
import { tools } from '../../../utils'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')
export default (props) => {
  const { colors } = useTheme()
  const { data = {} } = props
  const { title = '' } = data
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: colors.shop.bg }]}>
      <View>
        <Image
          source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
          style={[styles.image, { width: width / 4, height: width / 4 }]}
        />
      </View>
      <View style={[styles.contentContainer, { height: width / 4 }]}>
        <View>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
        </View>
        <Text style={[{ color: colors.note }]}>医院名称</Text>
        <View style={styles.contentBottom}>
          <Text style={[{ color: colors.warning, fontSize: 15 }]}>￥<Text style={styles.price}>{data.price}</Text></Text>
          <Button
            title='火爆拼团中'
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Button (props) {
  const { title = '' } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: colors.warning }]}>
      <Text style={{ color: colors.card, fontSize: 15 }}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    height: 90,
    marginLeft: 14,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
    marginRight: 10
  },
  image: {
    borderRadius: 8
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6
  },
  contentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14
  }
})
