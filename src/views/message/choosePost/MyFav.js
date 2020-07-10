import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
import { List } from '../../../components'
import Image from 'react-native-fast-image'
const { width } = Dimensions.get('window')
const DATA = [

  {
    name: '用户昵称',
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    time: '时间',
    images: ['http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg', 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg', 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg'],
    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
  }
]
export default () => {
  return (
    <>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) =>
          <List
            containerStyle={{ borderTopWidth: 0 }}
            name={item.name}
            avatar={item.avatar}
            message={item.time}
            renderBody={() =>
              <Body images={item.images} content={item.content} />}
          />}
      />
    </>
  )
}

function Body (props) {
  const { images = [], content = '' } = props
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          images.map((item, index) =>
            <Image
              key={index}
              source={{ uri: item }}
              style={{ width: (width - 16 * 4) / 3, height: 100, marginLeft: 16, borderRadius: 6 }}
            />
          )
        }
      </View>
      <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
        <Text numberOfLines={2} style={{lineHeight: 20, fontSize: 15}}>{content}</Text>
      </View>
    </View>
  )
}
