import * as React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Header from './Header'
import Image from 'react-native-fast-image'
export default observer((props) => {
  return (
    <>
      <Image />
      <Header />
      <TouchableOpacity onPress={() => props.navigation.navigate('setting')}>
        <Text>Mine!</Text>
      </TouchableOpacity>
    </>
  )
})
