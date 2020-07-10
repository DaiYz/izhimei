import * as React from 'react'
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native'
import { Avatar } from '../../../../components'
import Image from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native'
import { tools, navigate } from '../../../../utils'
const TYPES = [
  {
    name: '评论与@',
    routeName: 'comments',
    icon: ''
  },
  {
    name: '赞与收藏',
    routeName: 'praiseAndCollection',
    icon: ''
  },
  {
    name: '粉丝',
    routeName: 'fans',
    icon: ''
  }
]

const data = [
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    content: '内容内容内容内容',
    images: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg\'',
    time: '1小时前'
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    content: '内容内容内容内容',
    images: '',
    time: '1小时前'
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    content: '内容内容内容内容',
    images: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg',
    time: '1小时前'
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    content: '内容内容内容内容',
    images: '',
    time: '1小时前'
  },
  {
    id: 1,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
    content: '内容内容内容内容',
    images: 'http://img3.imgtn.bdimg.com/it/u=3572038597,3237488844&fm=26&gp=0.jpg',
    time: '1小时前'
  }
]

export default () => {
  const { colors } = useTheme()
  return (
    <>
      <Header />
      <FlatList
        style={{ backgroundColor: colors.card }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        keyExtractor={(item, index) => `${index}`}
        data={data}
        ItemSeparatorComponent={() => <View style={{ width: '100%', height: tools.minLineHeight(), backgroundColor: colors.border }} />}
        renderItem={({ item, index }) => <ListItem item={item} />}
        ListHeaderComponent={<View>
          <Text style={{ fontSize: 16 }}>最新</Text>
        </View>}
      />
    </>
  )
}

function Header (props) {
  const { colors } = useTheme()
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.card }]}>
      {
        TYPES.map((item, index) =>
          <TouchableOpacity key={index} style={styles.headerItem} activeOpacity={0.8} onPress={() => navigate(item.routeName)}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#aaa' }} />
            <Text style={{ marginTop: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

function ListItem (props) {
  const { item } = props
  const { colors } = useTheme()
  return (
    <View style={styles.listContainer}>
      <Avatar source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 22 }} />
      <View style={styles.contentContainer}>
        <Text>{item.content}</Text>
        {
          item.images ? <Image source={{ uri: item.images }} style={{ width: 160, height: 160, borderRadius: 8, marginTop: 8 }} /> : null
        }
        <Text style={{ marginTop: 6, color: colors.lightText }}>{item.time}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flexDirection: 'row',
    marginVertical: 16
  },
  contentContainer: {
    marginLeft: 16,
    marginTop: 5
  }
})
