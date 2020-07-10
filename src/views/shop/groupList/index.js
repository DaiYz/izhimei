import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import ListItem from './ListItem'
import { tools } from '../../../utils'

export default ({ navigation }) => {
  const [groupList, setGroupList] = React.useState([])
  const { colors } = useTheme()
  React.useEffect(() => {
    async function getList () {
      setGroupList([
        { name: '用户昵称' },
        { name: '用户昵称' }
      ])
    }
    getList()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ backgroundColor: colors.card }, styles.title]}>
        <Text style={[{ color: colors.text, fontSize: 16 }]}>6人正在拼团，可直接参与</Text>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: tools.isIPhoneX() ? 34 : 0,
          paddingTop: 12
        }}
        data={groupList.slice()}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={
          () => <View style={{ height: tools.minLineHeight(), backgroundColor: colors.border }} />
        }
        renderItem={({ item, index }) =>
          <ListItem
            data={item}
            index={index}
          />}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  title: {
    padding: 12
  }
})
