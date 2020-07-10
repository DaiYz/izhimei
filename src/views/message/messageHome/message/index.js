import * as React from 'react'
import { View, StyleSheet, Animated, FlatList, Text } from 'react-native'
import Image from 'react-native-fast-image'
import { List } from '../../../../components'
import { navigate } from '../../../../utils'
import { observer } from 'mobx-react'
import { useTheme } from '@react-navigation/native'
import { useStores } from '../../../../stores'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Button from '../../../../components/button'

export default observer((props) => {
  console.log(props)
  const { colors } = useTheme()
  const { chatStore = {} } = useStores()
  const { sessionList = [], setValue, getLocalMessage, setAndResetSession } = chatStore
  console.log(sessionList)
  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    })
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }
  const renderRightActions = progress => (
    <View style={{ width: 80, flexDirection: 'row' }}>
      {renderRightAction('Del', '#dd2c00', 64, progress)}
    </View>
  )

  const goChat = (item) => {
    const { id, lastMsg = {} } = item
    const { time } = lastMsg
    getLocalMessage(id, time)
    setAndResetSession(id, false)
    navigate('chat', {
      sessionId: id
    })
  }

  const renderItem = (item, index) => {
    const {lastMsg = {}, avatar = ''} = item
    const {fromNick = '', text = ''} = lastMsg
    return (
      <Swipeable
        overshootRight={false}
        friction={1}
        leftThreshold={0}
        rightThreshold={10}
        renderRightActions={renderRightActions}
      >
        <List
          onPress={() => {
            goChat(item)
          }}
          data={item}
          name={fromNick}
          avatar={avatar}
          message={text}
          index={index}
          renderLabel={() => {
            return (
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 12, color: colors.lightText }}>一天前</Text>
              </View>
            )
          }}
        />
      </Swipeable>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sessionList.slice()}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => renderItem(item, index)
          }
      />
      <Button
        title={chatStore.testText} style={{ position: 'absolute', bottom: 100, left: 0, right: 0, height: 40 }} onPress={() => {
          getLocalMessage('p2p-yizhimei_3')
          setAndResetSession('p2p-yizhimei_3', false)
          navigate('chat', {
            sessionId: 'p2p-yizhimei_3'
          })
        }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
