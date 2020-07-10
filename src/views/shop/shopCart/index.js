import * as React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import CartItem from './CartItem'
import { useTheme } from '@react-navigation/native'
import { useStores } from '../../../stores'
const cartRef = React.createRef()
export default observer(function (props) {
  const { navigation, route } = props
  const { params = {} } = route
  const { title = '管理' } = params
  console.log(navigation)
  const { colors } = useTheme()
  const { cartStore = {} } = useStores()
  const { isSelectAll, selectAll } = cartStore
  const [initialState, setInitialState] = React.useState(0)

  React.useEffect(() => {
    // Save the initial route name
    return function () {
      selectAll(false)
    }
  }, [])

  function select () {
    console.log(initialState)
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 10, backgroundColor: 'yellow' }}>
          <View>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>店家1</Text>
          </View>
          <View>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>商品1</Text>
          </View>
          <View>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>商品2</Text>
          </View>
        </View>
        <View style={{ marginBottom: 10, backgroundColor: 'yellow' }}>
          <TouchableOpacity onPress={() => select()}>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>店家2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => select()}>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>商品1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
            />
            <Text>商品2</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View />
      <TouchableOpacity style={{ height: 100 }} onPress={() => selectAll(!isSelectAll)}>
        <View
          style={[styles.circle, isSelectAll && { backgroundColor: 'green' }]}
        />
        <Text>全选</Text>
      </TouchableOpacity>
    </View>

  )
})

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red'
  }
})
