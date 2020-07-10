import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button } from '../../../../components'
import { useTheme } from '@react-navigation/native'

export default (props) => {
  const { data, style, avatarStyle, textStyle, buttonStyle, buttonTextStyle } = props
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>

      <View style={styles.item}>
        <Avatar
          style={avatarStyle}
          source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
        />
        <Text style={[{ color: colors.text, marginLeft: 8 }, textStyle]}>{data.name}</Text>
      </View>
      <View style={styles.item}>
        <Text style={[{ color: colors.lightText }, textStyle]}>22:32:43</Text>
        <Button
          textStyle={buttonTextStyle}
          style={[{
            backgroundColor: colors.submit,
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 4,
            marginLeft: 8
          }, buttonStyle]}
          title='拼单'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
