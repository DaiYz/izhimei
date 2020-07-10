import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, FlatList, LayoutAnimation } from 'react-native'

export default (props) => {
  const { route, navigation } = props
  const { params = {} } = route
  const { selectItem = () => {} } = params
  console.log(params)
  return (
    <View activeOpacity={1} style={[{ flex: 1, backgroundColor: 'transparent' }]}>
      <FlatList
        enableEmptySections
        keyboardDismissMode='on-drag'
        scrollEventThrottle={100}
        data={[1, 2, 3, 4]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={() => <TouchableOpacity
          activeOpacity={0.8} onPress={() => {
            selectItem({
              id: 'yizhimei_2',
              nickName: 'test1',
              avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194722783,3688530960&fm=11&gp=0.jpg'
            })
            navigation.goBack()
          }} style={{ height: 44, marginTop: 10, backgroundColor: 'white' }}
        ><Text>123</Text>
        </TouchableOpacity>}
      />
    </View>
  )
}
