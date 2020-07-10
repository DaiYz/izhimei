import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { shop } from '../../../assets/images'
import Image from 'react-native-fast-image'
import { observer } from 'mobx-react'
import { useStores } from '../../../stores'
import { tools } from '../../../utils'
import DoctorItem from './DoctorItem'
export default observer(({ navigation }) => {
  const { shopStore = {} } = useStores()
  const { doctorList = [] } = shopStore
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: tools.isIPhoneX() ? 34 : 0
        }}
        ListHeaderComponent={
          <Image
            source={shop.hospital.hospital}
            style={{
              flex: 1,
              height: 160,
              marginBottom: 20
            }}
          />
        }
        data={doctorList.slice()}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) =>
          <DoctorItem
            data={item}
            index={index}
          />}
      />
    </View>
  )
})
