import * as React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import { observer } from 'mobx-react'
import { useTheme } from '@react-navigation/native'
import { useStores } from '../../../stores'
import SearchHeader from './SearchHeader'
import SearchItem from './SearchItem'
import { tools } from '../../../utils'
const { width } = Dimensions.get('window')

function onItemPress (text) {
  console.log(text)
  Keyboard.dismiss()
}
function onSubmitEditing (e) {
  onItemPress(e.nativeEvent.text)
}

export default observer (({ navigation }) => {
  const PADDINHG = 6
  const LINE = 4
  const REGULAR = 5
  const HOTWidth = (width - ((LINE + 3) * PADDINHG)) / LINE
  const { colors } = useTheme()
  const { shopStore = {} } = useStores()
  return (
    <View style={[{ backgroundColor: colors.card, flex: 1 }]}>
      <SearchHeader
        onSubmitEditing={onSubmitEditing}
        goBack={() => navigation.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ backgroundColor: colors.shop.bg, paddingBottom: tools.isIPhoneX() ? 34 : 0, paddingHorizontal: PADDINHG * 2 }}
      >
        <SearchItem
          title='热门搜索'
          data={shopStore.hotSearch.slice()}
          renderRight={() => <View><Text>icon</Text></View>}
          renderItem={({ item, index }) =>
            <View key={index} style={[{ width: HOTWidth, marginTop: PADDINHG * 2 }, (index % 3 !== 0 || index === 0) && { marginRight: PADDINHG }]}>
              <Tip
                onItemPress={onItemPress}
                data={item}
              />
            </View>}
        />
        <SearchItem
          title='常用分类'
          data={shopStore.regularType.slice()}
          renderItem={({ item, index }) =>
            <View
              key={index} style={[{
                width: (width - (16 * PADDINHG)) / REGULAR,
                height: (width - (16 * PADDINHG)) / REGULAR,
                marginTop: PADDINHG * 2
              }, (index % REGULAR !== 4 || index === 0) && { marginRight: PADDINHG * 3 }]}
            >
              <Tip
                style={[styles.regular, { borderRadius: (width - (10 * PADDINHG)) / REGULAR / 2, backgroundColor: colors[`tip${index % 3 + 1}`] }]}
                onItemPress={onItemPress}
                data={item}
              />
            </View>}
        />
      </ScrollView>
    </View>
  )
})

function Tip (props) {
  const { colors } = useTheme()
  const { style = {}, data, textStyle = {}, onItemPress = () => {} } = props
  return (
    <TouchableOpacity onPress={() => onItemPress(data)} activeOpacity={0.8} style={[styles.tipContainer, { backgroundColor: colors.lightGray }, style]}>
      <Text numberOfLines={1} style={[{ color: colors.text }, textStyle]}>{data}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tipContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10
  },
  regular: {
    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
  }
})
