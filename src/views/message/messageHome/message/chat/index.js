import * as React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
import { ChatScreen } from '../../../../../components/easyChat/chat'
import Image from 'react-native-fast-image'
import { observer } from 'mobx-react'
import { useStores } from '../../../../../stores'
import Button from '../../../../../components/button'
import { chatTools } from '../../../../../utils'
import SYImagePicker from 'react-native-syan-image-picker'
const { width, height } = Dimensions.get('window')

const panelSource = [
  {
    icon: <Image source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} style={{ width: 30, height: 30 }} />,
    title: '照片',
    type: 'photo'
  }, {
    icon: <Image source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} style={{ width: 30, height: 30 }} />,
    title: '拍照',
    type: 'camera'
  },
  {
    icon: <Image source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} style={{ width: 30, height: 30 }} />,
    title: '名片',
    type: 'bCard'
  }, {
    icon: <Image source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} style={{ width: 30, height: 30 }} />,
    title: '日记/帖子',
    type: 'diary'
  },
  {
    icon: <Image source={{ uri: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg' }} style={{ width: 30, height: 30 }} />,
    title: '问诊卡',
    type: 'card'
  }
]

export default observer((props) => {
  const { chatStore = {} } = useStores()
  const [loading, setLoading] = React.useState([false])
  const { currentMessage, isInverted, sendCustomMessage, setValue, setAndResetSession, sendTextMessage, sendImageMessage } = chatStore
  const { navigation, route } = props
  const { params } = route
  console.log(params)
  React.useEffect(() => {
    return () => {
      setValue('currentMessage', [])
      setAndResetSession(params.sessionId)
    }
  }, [])

  const renderPanelRow = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: (width - 30) / 4,
          height: (width - 30) / 4,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20
        }}
        activeOpacity={0.7}
        onPress={() => onPanelPress(data.type)}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 15, borderColor: '#ccc', borderWidth: StyleSheet.hairlineWidth }}>
          {data.icon}
        </View>
        <Text style={{ color: '#7a7a7a', marginTop: 10 }}>{data.title}</Text>
      </TouchableOpacity>
    )
  }

  const onPanelPress = (type) => {
    switch (type) {
      case 'photo':
        handleOpenImagePicker()
        break
      case 'camera':
        handleLaunchCamera()
        break
      case 'bCard':
        navigation.navigate('selectCard', {
          selectItem: sendPersonalCardMsg
        })
        break
      case 'diary':
        navigation.navigate('choosePost', {
          selectItem: sendPersonalCardMsg
        })
        break
      case 'card':
        break
    }
  }

  const sendPersonalCardMsg = (data) => {
    console.log(data)
    return null
    sendCustomMessage({
      type: 'personalCard',
      content
    })
  }

  const sendTextMsg = (type, content) => {
    console.log(type, content)
    sendTextMessage(content)
  }

  const handleLaunchCamera = async () => {
    SYImagePicker.openCamera({ isCrop: false, showCropCircle: false, showCropFrame: false }, (err, photos) => {
      console.log(err, photos)
      if (!err) {
        console.log(photos[0])
        const data = photos[0]
        const fileOptions = {
          filePath: data.uri,
          w: data.width,
          h: data.height,
          size: data.size
        }
        sendImageMessage(fileOptions)
      }
    })
  }

  const handleOpenImagePicker = () => {
    SYImagePicker.showImagePicker({
      imageCount: 1,
      isRecordSelected: true,
      isCrop: false,
      showCropCircle: false,
      quality: 90,
      compress: true,
      enableBase64: false
    }, (err, photos) => {
      if (!err) {
        const data = photos[0]
        const fileOptions = {
          filePath: data.uri,
          w: data.width,
          h: data.height,
          size: data.size
        }
        sendImageMessage(fileOptions)
        console.log(photos)
      } else {
        console.log(err)
      }
    })
  }

  return (
    <>
      <ChatScreen
        userProfile={
          {
            id: 'yizhimei_2',
            nickName: 'test1',
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194722783,3688530960&fm=11&gp=0.jpg'
          }
        }
        sendMessage={sendTextMsg}
        androidHeaderHeight={44}
        inverted={isInverted}
        usePopView={false}
        messageList={currentMessage.slice()}
        panelSource={panelSource}
        renderPanelRow={renderPanelRow}
      />
    </>
  )
})
