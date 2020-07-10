import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import DetailHeader from './DetailHeader'
import DetailFooter from './DetailFooter'
import { observer } from 'mobx-react'
import { GoodsItem } from '../components'
import { navigate } from '../../../utils/rootNavigation'
import { tools } from '../../../utils'
export default observer((props) => {
  const { navigation, route } = props
  React.useEffect(() => {

  }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal={false}
          numColumns={2}
          ListHeaderComponent={<DetailHeader
            navigation={navigation}
          />}
          data={[{
            title: 'XXXX',
            price: 100
          }, {
            title: 'XXXX',
            price: 100
          }, {
            title: 'XXXX',
            price: 100
          }, {
            title: 'XXXX',
            price: 100
          }]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) =>
            <GoodsItem
              style={{ backgroundColor: 'transparent' }}
              onItemPress={() => {
                tools.alert()
              }}
              item={item}
              index={index}
            />}
        />
      </View>
      <DetailFooter
        onIconClicked={onIconClicked}
      />
    </View>
  )
})

function onIconClicked (name, params = {}) {
  navigate(name)
}
