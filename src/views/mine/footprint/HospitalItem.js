import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
import Item from '../component/medicalItem'
const DATA = [
  {
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    name: '昵称昵称',
    address: '医院地址医院地址',
    time: new Date().getDate(),
    appointment: 1230,
    case: 13
  }
]

export default () => {
  return (
    <>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) =>
          <Item name={item.name} content={item.address} avatar={{ uri: item.avatar }} renderInfo={() => renderInfo(item)} />}
      />
    </>
  )
}

function renderInfo (data = {}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>icon</Text>
        <Text>icon</Text>
        <Text>icon</Text>
        <Text>icon</Text>
      </View>
      <Text style={{marginHorizontal: 12}}>{data.appointment}预约</Text>
      <Text>{data.case}案例</Text>
    </View>
  )
}
