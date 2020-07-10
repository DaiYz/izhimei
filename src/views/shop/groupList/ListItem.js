import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button } from '../../../components'
import { useTheme } from '@react-navigation/native'

export default (props) => {
  const { data } = props
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>

      <View style={styles.item}>
        <Avatar
          source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg' }}
        />
        <Text style={{ color: colors.text, marginLeft: 8 }}>{data.name}</Text>
      </View>
      <View style={styles.item}>
        <Text style={{ color: colors.lightText }}>22:32:43</Text>
        <Button
          style={{
            backgroundColor: colors.submit,
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 4,
            marginLeft: 8
          }}
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
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
