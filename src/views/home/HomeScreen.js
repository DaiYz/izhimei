import * as React from 'react'
import { Text, View, Button } from 'react-native'
export default (props) => {
  const { navigation } = props

  React.useEffect(() => {
    // Save the initial route name
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal', { screen: 'ModalScreen1' })}
        title='Open Modal1'
      />
      <Button
        onPress={() => navigation.navigate('MyModal', { screen: 'ModalScreen2' })}
        title='Open Modal2'
      />
      <Button
        onPress={() => navigation.navigate('MyModal', { screen: 'ModalScreen3' })}
        title='Open Modal3'
      />
      <Button
        onPress={() => navigation.navigate('Details')}
        title='Open Details'
      />
    </View>
  )
}
