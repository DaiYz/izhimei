import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from '../../../../components'

export default (props) => {
  const { avatar, name, content, renderInfo, onPress } = props
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress && onPress()} style={{ backgroundColor: '#fff', flexDirection: 'row', padding: 16, alignItems: 'center', marginTop: 10 }}>
      <Avatar source={avatar} style={{ width: 58, height: 58, borderRadius: 29, marginRight: 16 }} />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ color: '#aaa', marginVertical: 4 }}>{content}</Text>
        {
          renderInfo && renderInfo()
        }
      </View>
    </TouchableOpacity>
  )
}
