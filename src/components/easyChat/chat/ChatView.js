import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  Animated,
  Easing,
  Clipboard,
  Dimensions,
  FlatList,
  ViewPropTypes as RNViewPropTypes
} from 'react-native'
import Image from 'react-native-fast-image'
import PropTypes from 'prop-types'
import { getCurrentTime, isIPhoneX } from './utils'
import PopView from './components/pop-view'
import ChatItem from './ChatItem'
import InputBar from './InputBar'
import PanelContainer from './panelContainer'
import DelPanel from './del'
const { height, width } = Dimensions.get('window')
const ViewPropTypes = RNViewPropTypes || View.propTypes
let ImageComponent = Image
class ChatWindow extends PureComponent {
  constructor (props) {
    super(props)
    const { androidHeaderHeight, chatType, iphoneXHeaderPadding, iphoneXBottomPadding, CustomImageComponent } = props
    this.time = null
    ImageComponent = CustomImageComponent || Image
    this._userHasBeenInputed = false
    this.iosHeaderHeight = 64
    this.isIphoneX = isIPhoneX()
    this.visibleHeight = new Animated.Value(0)
    this.panelHeight = new Animated.Value(0)
    this.leftHeight = new Animated.Value(0)
    this.paddingHeight = new Animated.Value(0)
    this.emojiHeight = new Animated.Value(0)
    this.HeaderHeight = this.isIphoneX ? iphoneXHeaderPadding + this.iosHeaderHeight : Platform.OS === 'android' ? androidHeaderHeight : this.iosHeaderHeight
    this.listHeight = height - this.HeaderHeight - 64
    this.isInverted = false
    this.rootHeight = 0
    this.androidHasAudioPermission = false
    this.state = {
      messageContent: '',
      cursorIndex: 0,
      listVisibleHeight: 0,
      keyboardShow: false,
      keyboardHeight: 0,
      showVoice: false,
      xHeight: iphoneXBottomPadding,
      isPanelShow: false,
      isEmojiShow: false,
      saveChangeSize: 0,
      inputChangeSize: 0,
      voiceLength: 0,
      voiceEnd: false,
      isVoiceContinue: true,
      contentHeight: 0,
      selectMultiple: false,
      tabSelect: 0,
      modalTitle: '',
      imageModalShow: false,
      imageSource: '',
      isSelfMessage: true,
      listY: 0,
      isInverted: false,
      panelShow: false,
      emojiShow: false,
      messageSelected: [],
      currentIndex: -1,
      pressIndex: -1
    }
  }

  async componentDidMount () {
    Platform.OS === 'ios' && this._willShow()
    Platform.OS === 'ios' && this._willHide()
    Platform.OS === 'android' && this._didShow()
    Platform.OS === 'android' && this._didHide()
  }

  componentWillUnmount () {
    Platform.OS === 'ios' && this._willRemove()
    Platform.OS === 'android' && this._didRemove()
    this.time && clearTimeout(this.time)
  }

  _willShow () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      const { panelShow, emojiShow } = this.state
      this.setState({ keyboardHeight: e.endCoordinates.height, xHeight: 0, keyboardShow: true })
      Animated.timing(this.visibleHeight, {
        duration: e.duration,
        toValue: 1,
        easing: Easing.inOut(Easing.ease)
      }).start()
      if (emojiShow) {
        return this.closeEmoji()
      }
      if (panelShow) {
        return this.closePanel()
      }
    })
  }

  _willHide () {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
      const { emojiShow, panelShow } = this.state
      const { iphoneXBottomPadding } = this.props
      this.setState({ keyboardShow: false })
      if (emojiShow) {
        return this.showEmoji()
      }
      if (panelShow) {
        return this.showPanel()
      }
      Animated.timing(this.visibleHeight, {
        duration: e.duration,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      }).start()
      this.setState({ xHeight: iphoneXBottomPadding })
    })
  }

  _didShow () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      this.setState({ keyboardShow: true })
    })
  }

  _didHide () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
      const { emojiShow, panelShow } = this.state
      this.setState({ keyboardShow: false })
      if (emojiShow) {
        return this.showEmoji()
      }
      if (panelShow) {
        return this.showPanel()
      }
    })
  }

  _willRemove () {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
  }

  _didRemove () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _sendMessage = (type, messageContent) => {
    const { inverted } = this.props
    this._userHasBeenInputed = true
    if (type === 'text' && messageContent.trim().length === 0) {
     return null
    }
    this.props.sendMessage(type, this.state.messageContent, this.isInverted)
    this.InputBar.input && this.InputBar.input.clear()
    this.setState({ messageContent: '' })
    if (!inverted) {
      this.time && clearTimeout(this.time)
      // this.time = setTimeout(() => { this.chatList && this.chatList.scrollToEnd({ animated: true }) }, 200)
    } else {
      this.chatList.scrollToOffset({ y: 0, animated: false })
    }
  }

  _changeMethod () {
    this.setState({ showVoice: !this.state.showVoice },
      async () => {
        if (Platform.OS === 'android' && this.state.showVoice && !this.androidHasAudioPermission) {
          const hasPermission = await this.props.checkPermission()
          this.androidHasAudioPermission = hasPermission
          if (!hasPermission) {
            this.props.requestAndroidPermission()
          }
        }
      }
    )
    this.setState({ saveChangeSize: this.state.inputChangeSize })
    this.time && clearTimeout(this.time)
    this.time = setTimeout(() => this.InputBar.input && this.InputBar.input.focus(), 300)
    if (!this.state.showVoice && this.state.panelShow) {
      this.setState({ xHeight: this.props.iphoneXBottomPadding })
      return this.closePanel(true)
    }
    if (!this.state.showVoice && this.state.emojiShow) {
      this.setState({ xHeight: this.props.iphoneXBottomPadding })
      return this.closeEmoji(true)
    }
  }

  _changeText (e) {
    this.setState({ messageContent: e })
  }

  _onContentSizeChange (e) {
    const { inverted } = this.props
    const changeHeight = e.nativeEvent.contentSize.height
    if (changeHeight === 34) return
    this.setState({ inputChangeSize: changeHeight <= 70 ? changeHeight : 70 })
    if (!inverted) {
      this.chatList && this.chatList.scrollToEnd({ animated: true })
    }
  }

  _onVoiceStart = () => {
    this.setState({ voiceEnd: true })
    this.voice.show()
  }

  _onVoiceEnd = () => {
    this.voice.close()
    this.setState({ voiceEnd: false })
  }

  _PressAvatar = (isSelf, targetId) => {
    const { pressAvatar } = this.props
    pressAvatar(isSelf, targetId)
    this.closeAll()
  }

  _scrollToBottom (listHeightAndWidth) {
    const { inverted } = this.props
    if (listHeightAndWidth !== undefined) {
      const { contentHeight } = listHeightAndWidth
      this.isInverted = contentHeight > this.listHeight
    }
    if (!inverted) {
      setTimeout(() => {
        this.chatList && this.chatList.scrollToEnd({
          animated: this._userHasBeenInputed
        })
      }, this._userHasBeenInputed ? 0 : 130)
    }
  }

  _onFocus = () => {
    if (Platform.OS === 'android') {
      this.closeAll(() => {
        this.InputBar.input && this.InputBar.input.focus()
      })
    }
  }

  closePanel = (realClose = false, callback) => {
    Animated.parallel([
      Animated.timing(Platform.OS === 'ios' ? this.visibleHeight : this.paddingHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: realClose ? 0 : 1
      }),
      Animated.timing(this.panelHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      })
    ]).start(() => {
      this.setState({ panelShow: false })
      callback && callback()
    })
  }

  showPanel = (callback) => {
    this.setState({ xHeight: 0 })
    Animated.parallel([
      Animated.timing(Platform.OS === 'ios' ? this.visibleHeight : this.paddingHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 1
      }),
      Animated.timing(this.panelHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 1,
        easing: Easing.inOut(Easing.ease)
      })
    ]).start(() => {
      callback && callback()
      this.setState({ panelShow: true })
    })
  }

  isShowPanel = () => {
    const { keyboardShow, panelShow, emojiShow } = this.state
    if (Platform.OS === 'ios') {
      if (panelShow) {
        return this.InputBar.input && this.InputBar.input.focus()
      } else {
        if (emojiShow) {
          return this.closeEmoji(false, () => this.showPanel())
        }
        if (!keyboardShow) {
          this.showPanel()
        } else {
          this.setState({
            keyboardShow: false,
            keyboardHeight: 0,
            xHeight: 0,
            panelShow: true
          })
          this.InputBar.input && this.InputBar.input.blur()
        }
        if (this.state.showVoice) this.setState({ showVoice: false })
      }
    } else {
      if (panelShow) {
        return this.closePanel(true, () => { this.InputBar.input && this.InputBar.input.focus() })
      } else {
        if (emojiShow) {
          return this.closeEmoji(false, () => this.showPanel())
        }
        if (!keyboardShow) {
          this.showPanel()
        } else {
          this.setState({ keyboardShow: false, panelShow: true })
          this.InputBar.input && this.InputBar.input.blur()
        }
        if (this.state.showVoice) this.setState({ showVoice: false })
      }
    }
  }

  showEmoji = (callback) => {
    this.setState({ xHeight: 0 })
    Animated.parallel([
      Animated.timing(Platform.OS === 'ios' ? this.visibleHeight : this.paddingHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 1
      }),
      Animated.timing(this.emojiHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 1,
        easing: Easing.inOut(Easing.ease)
      })
    ]).start(() => {
      this.setState({ emojiShow: true })
      callback && callback()
    })
  }

  closeEmoji = (realClose = false, callback) => {
    Animated.parallel([
      Animated.timing(Platform.OS === 'ios' ? this.visibleHeight : this.paddingHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: realClose ? 0 : 1
      }),
      Animated.timing(this.emojiHeight, {
        duration: this.props.allPanelAnimateDuration,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      })
    ]).start(() => {
      this.setState({ emojiShow: false })
      callback && callback()
    })
  }

  tabEmoji = () => {
    const { keyboardShow, emojiShow, panelShow } = this.state
    const { showVoice } = this.state
    if (Platform.OS === 'ios') {
      if (emojiShow) {
        return this.InputBar.input && this.InputBar.input.focus()
      }
      if (panelShow) {
        return this.closePanel(false, () => this.showEmoji())
      }
      if (!keyboardShow) {
        this.showEmoji()
      } else {
        this.setState({
          keyboardShow: false,
          emojiShow: true,
          keyboardHeight: 0,
          xHeight: 0
        })
        this.InputBar.input && this.InputBar.input.blur()
      }
      if (showVoice) this.setState({ showVoice: false })
    } else {
      if (emojiShow) {
        return this.closeEmoji(true, () => this.InputBar.input && this.InputBar.input.focus())
      } else {
        if (panelShow) {
          return this.closePanel(false, () => this.showEmoji())
        }
        if (!keyboardShow) {
          this.showEmoji()
        } else {
          this.setState({
            keyboardShow: false,
            emojiShow: true
          })
          this.InputBar.input && this.InputBar.input.blur()
        }
        if (this.state.showVoice) this.setState({ showVoice: false })
      }
    }
  }

  selectMultiple = (isSelect, index, message) => {
    let messageArr = this.state.messageSelected
    const existArr = messageArr.filter((item) => item.index === index)
    if (existArr.length === 0) {
      messageArr.push({ index, isSelect, message })
      this.setState({ messageSelected: messageArr })
    } else {
      const filterArr = messageArr.filter((item) => item.index !== index)
      if (isSelect) {
        filterArr.push({ index, isSelect, message })
      }
      this.setState({ messageSelected: filterArr })
    }
  }

  _closeMultipleSelect = () => {
    this.setState({
      selectMultiple: false,
      currentIndex: -1
    })
    Animated.timing(this.leftHeight, {
      duration: 200,
      toValue: 0,
      easing: Easing.linear()
    }).start()
  }

  _openMultipleSelect = () => {
    this.setState({ selectMultiple: true })
    Animated.timing(this.leftHeight, {
      duration: 200,
      toValue: 1,
      easing: Easing.linear()
    }).start()
  }

  show = (view, type, index, text, message) => {
    if (!this.props.usePopView) {
      this.props.onMessageLongPress(type, index, text, message)
    } else {
      view.measure((x, y, width, height, pageX, pageY) => {
        let items = null
        if (this.props.setPopItems) {
          items = this.props.setPopItems(type, index, text, message)
        } else {
          items = [
            {
              title: '删除',
              onPress: () => {
                this.props.delMessage({ index, message }, this.isInverted)
              }
            },
            {
              title: '多选',
              onPress: () => {
                this.multipleSelect(index, message)
              } }
          ]
          if (type === 'text') {
            items = [
              {
                title: '复制',
                onPress: () => Clipboard.setString(text)
              },
              {
                title: '删除',
                onPress: () => {
                  this.props.delMessage({ index, message }, this.isInverted)
                }
              },
              {
                title: '多选',
                onPress: () => {
                  this.multipleSelect(index, message)
                } }
            ]
          }
        }
        if (items === null) console.error('need to return items')
        if (items.length > 0 ) {
          PopView.show({ x: pageX, y: pageY, width, height }, items, { popoverStyle: this.props.popoverStyle })
        }
      })
    }
  }

  multipleSelect = (index, message) => {
    this.closeAll()
    Keyboard.dismiss()
    this._openMultipleSelect()
    this.props.changeHeaderLeft()
    if (index !== undefined) {
      this.state.messageSelected.length = 0
      this.setState({
        currentIndex: index
      })
      this.state.messageSelected.push({ index, message, isSelect: true })
    }
  }

  changeVoiceStatus = (status) => {
    this.setState({ isVoiceContinue: status })
  }

  closeAll = (callback) => {
    if (this.state.panelShow) {
      this.setState({ xHeight: this.props.iphoneXBottomPadding })
      return this.closePanel(true, callback)
    }
    if (this.state.emojiShow) {
      this.setState({ xHeight: this.props.iphoneXBottomPadding })
      return this.closeEmoji(true, callback)
    }
  }

  _loadHistory = async () => {
    const { inverted } = this.props
    if (!inverted) return
    await this.props.loadHistory()
  }

  savePressIndex = (id) => {
    this.setState({ pressIndex: id })
  }

  renderBg = (bg) => {
    const {renderChatBg} = this.props
    if (bg === null) return null
    if (renderChatBg === undefined) {
      const source = typeof(bg) === 'number' ? bg : {uri: bg}
      return (
        <ImageComponent source={source} style={{position: 'absolute', width, top: 0, height}} resizeMode={'cover'} />
      )
    } else {
      return renderChatBg(bg)
    }
  }

  render () {
    const { messageList, allPanelHeight, inverted, chatBackgroundImage, chatType } = this.props
    const { messageContent, voiceEnd, inputChangeSize, hasPermission, xHeight, keyboardHeight, keyboardShow, panelShow, emojiShow } = this.state
    const currentList = messageList.slice().sort((a, b) => inverted
      ? (b.time - a.time)
      : (a.time - b.time))
    const panelContainerHeight = allPanelHeight + (this.isIphoneX ? this.props.iphoneXBottomPadding : 0)
    return (
      <View style={{ backgroundColor: this.props.containerBackgroundColor, flex: 1, position: 'relative' }} onLayout={(e) => this.rootHeight = e.nativeEvent.layout.height}>
        { this.renderBg(chatBackgroundImage) }
        <Animated.View style={Platform.OS === 'android' ? { flex: 1, backgroundColor: 'transparent'} : {
          backgroundColor: 'transparent',
          height: this.visibleHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [
              height - this.HeaderHeight,
              keyboardShow
                ? height - keyboardHeight - this.HeaderHeight
                : height - this.HeaderHeight - panelContainerHeight
            ]
          }),
        }
        } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.closeAll()}
            style={[{ flex: 1, backgroundColor: 'transparent' }, this.props.chatWindowStyle]}>
            <FlatList
              {...this.props.flatListProps}
              ref={e => (this.chatList = e)}
              inverted={inverted}
              data={currentList}
              ListFooterComponent={this.props.renderLoadEarlier}
              extraData={this.props.extraData}
              automaticallyAdjustContentInsets={false}
              onScroll={(e) => { this.props.onScroll(e) }}
              showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
              onEndReachedThreshold={this.props.onEndReachedThreshold}
              enableEmptySections
              scrollEventThrottle={100}
              keyExtractor={(item) => `${item.time}`}
              onEndReached={() => this._loadHistory()}
              onLayout={(e) => {
                this._scrollToBottom()
                this.listHeight = e.nativeEvent.layout.height
              }}
              onContentSizeChange={(contentWidth, contentHeight) => { this._scrollToBottom({ contentWidth, contentHeight }) }}
              renderItem={({ item, index }) =>
                <ChatItem
                  ImageComponent={ImageComponent}
                  ref={(e) => (this.messageItem = e)}
                  user={this.props.userProfile}
                  chatType={chatType}
                  lastReadAt={this.props.lastReadAt}
                  showIsRead={this.props.showIsRead}
                  isReadStyle={this.props.isReadStyle}
                  reSendMessage={this.props.reSendMessage}
                  renderMessageCheck={this.props.renderMessageCheck}
                  message={item}
                  currentIndex={this.state.currentIndex}
                  isOpen={this.state.selectMultiple}
                  selectMultiple={this.selectMultiple}
                  rowId={index}
                  popShow={this.show}
                  messageSelectIcon={this.props.messageSelectIcon}
                  renderMessageTime={this.props.renderMessageTime}
                  onMessageLongPress={this.show}
                  onMessagePress={this.props.onMessagePress}
                  onPressAvatar={this._PressAvatar}
                  messageErrorIcon={this.props.messageErrorIcon}
                  voiceLeftIcon={this.props.voiceLeftIcon}
                  voiceRightIcon={this.props.voiceRightIcon}
                  closeAll={this.closeAll}
                  renderAvatar={this.props.renderAvatar}
                  avatarStyle={this.props.avatarStyle}
                  showUserName={this.props.showUserName}
                  userNameStyle={this.props.userNameStyle}
                  renderErrorMessage={this.props.renderErrorMessage}
                  renderTextMessage={this.props.renderTextMessage}
                  renderImageMessage={this.props.renderImageMessage}
                  renderVoiceMessage={this.props.renderVoiceMessage}
                  renderVideoMessage={this.props.renderVideoMessage}
                  renderLocationMessage={this.props.renderLocationMessage}
                  renderShareMessage={this.props.renderShareMessage}
                  renderVideoCallMessage={this.props.renderVideoCallMessage}
                  renderVoiceCallMessage={this.props.renderVoiceCallMessage}
                  renderRedEnvelopeMessage={this.props.renderRedEnvelopeMessage}
                  renderFileMessage={this.props.renderFileMessage}
                  renderSystemMessage={this.props.renderSystemMessage}
                  renderDiaryMessage={this.props.renderDiaryMessage}
                  renderMedicalCardMessage={this.props.renderMedicalCardMessage}
                  renderPersonalCardMessage={this.props.renderPersonalCardMessage}
                  rightMessageBackground={this.props.rightMessageBackground}
                  leftMessageBackground={this.props.leftMessageBackground}
                  voiceLoading={this.props.voiceLoading}
                  voicePlaying={this.props.voicePlaying}
                  savePressIndex={this.savePressIndex}
                  pressIndex={this.state.pressIndex}
                  voiceLeftLoadingColor={this.props.voiceLeftLoadingColor}
                  voiceRightLoadingColor={this.props.voiceRightLoadingColor}
                  leftMessageTextStyle={this.props.leftMessageTextStyle}
                  rightMessageTextStyle={this.props.rightMessageTextStyle}
                />
              }
            />
          </TouchableOpacity>
          <InputBar
            ImageComponent={ImageComponent}
            rootHeight={this.rootHeight}
            allPanelHeight={this.props.allPanelHeight}
            emojiIcon={this.props.emojiIcon}
            keyboardIcon={this.props.keyboardIcon}
            plusIcon={this.props.plusIcon}
            voiceIcon={this.props.voiceIcon}
            sendIcon={this.props.sendIcon}
            sendUnableIcon={this.props.sendUnableIcon}
            ref={e => (this.InputBar = e)}
            isIphoneX={this.isIphoneX}
            placeholder={this.props.placeholder}
            useVoice={this.props.useVoice}
            onMethodChange={this._changeMethod.bind(this)}
            showVoice={this.state.showVoice}
            onSubmitEditing={(type, content) => this._sendMessage(type, content)}
            messageContent={messageContent}
            textChange={this._changeText.bind(this)}
            onContentSizeChange={this._onContentSizeChange.bind(this)}
            xHeight={xHeight}
            onFocus={this._onFocus}
            voiceStart={this._onVoiceStart}
            voiceEnd={this._onVoiceEnd}
            isVoiceEnd={voiceEnd}
            voiceStatus={this.state.isVoiceContinue}
            changeVoiceStatus={this.changeVoiceStatus}
            inputChangeSize={inputChangeSize}
            hasPermission={hasPermission}
            pressInText={this.props.pressInText}
            pressOutText={this.props.pressOutText}
            isShowPanel={this.isShowPanel}
            showEmoji={this.tabEmoji}
            isEmojiShow={this.state.emojiShow}
            isPanelShow={this.state.panelShow}
            paddingHeight={this.paddingHeight}
            useEmoji={this.props.useEmoji}
            usePlus={this.props.usePlus}
            inputStyle={this.props.inputStyle}
            inputOutContainerStyle={this.props.inputOutContainerStyle}
            inputContainerStyle={this.props.inputContainerStyle}
            inputHeightFix={this.props.inputHeightFix}
          />
          {
            this.props.usePopView
              ? <DelPanel
                ImageComponent={ImageComponent}
                messageSelected={this.state.messageSelected}
                isIphoneX={this.isIphoneX}
                delPanelButtonStyle={this.props.delPanelButtonStyle}
                delPanelStyle={this.props.delPanelStyle}
                renderDelPanel={this.props.renderDelPanel}
                HeaderHeight={this.HeaderHeight}
                iphoneXBottomPadding={this.props.iphoneXBottomPadding}
                messageDelIcon={this.props.messageDelIcon}
                delMessage={this.props.delMessage}
                isInverted={this.isInverted}
                leftHeight={this.leftHeight}
              />
              : null
          }
          <PanelContainer
            panelContainerBackgroundColor={this.props.panelContainerBackgroundColor}
            visibleHeight={this.visibleHeight}
            panelContainerHeight={panelContainerHeight}
            usePlus={this.props.usePlus}
            useEmoji={this.props.useEmoji}
            panelHeight={this.panelHeight}
            isIphoneX={this.isIphoneX}
            HeaderHeight={this.HeaderHeight}
            allPanelHeight={this.props.allPanelHeight}
            iphoneXBottomPadding={this.props.iphoneXBottomPadding}
            panelSource={this.props.panelSource}
            renderPanelRow={this.props.renderPanelRow}
            panelContainerStyle={this.props.panelContainerStyle}
            ImageComponent={ImageComponent}
            emojiHeight={this.emojiHeight}
            onEmojiSelected={this._onEmojiSelected}
          />
        </Animated.View>
      </View>
    )
  }
}

export default ChatWindow
ChatWindow.propTypes = {
  /* defaultProps */
  messageList: PropTypes.array.isRequired,
  inverted: PropTypes.bool,
  lastReadAt: PropTypes.object,
  chatBackgroundImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onScroll: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  chatWindowStyle: ViewPropTypes.style,
  sendMessage: PropTypes.func,
  renderAvatar: PropTypes.func,
  avatarStyle: ViewPropTypes.style,
  allPanelAnimateDuration: PropTypes.number,
  chatType: PropTypes.oneOf(['friend', 'group']),
  onMessagePress: PropTypes.func,
  onMessageLongPress: PropTypes.func,
  renderMessageTime: PropTypes.func,
  pressAvatar: PropTypes.func,
  renderErrorMessage: PropTypes.func,
  renderChatBg: PropTypes.func,
  reSendMessage: PropTypes.func,
  androidHeaderHeight: PropTypes.number.isRequired,
  iphoneXHeaderPadding: PropTypes.number,
  iphoneXBottomPadding: PropTypes.number,
  showUserName: PropTypes.bool,
  showIsRead: PropTypes.bool,
  isReadStyle: PropTypes.object,
  userProfile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.isRequired,
    nickName: PropTypes.string
  }),
  panelSource: PropTypes.array,
  renderPanelRow: PropTypes.func,
  panelContainerStyle: ViewPropTypes.style,
  allPanelHeight: PropTypes.number,
  messageErrorIcon: PropTypes.element,
  loadHistory: PropTypes.func,
  leftMessageBackground: PropTypes.string,
  rightMessageBackground: PropTypes.string,
  leftMessageTextStyle: PropTypes.object,
  rightMessageTextStyle: PropTypes.object,
  renderLoadEarlier: PropTypes.func,
  extraData: PropTypes.any,
  containerBackgroundColor: PropTypes.string,
  showsVerticalScrollIndicator: PropTypes.bool,
  userNameStyle: PropTypes.object,
  panelContainerBackgroundColor: PropTypes.string,
  /* popProps */
  usePopView: PropTypes.bool,
  popoverStyle: ViewPropTypes.style,
  renderDelPanel: PropTypes.func,
  changeHeaderLeft: PropTypes.func,
  setPopItems: PropTypes.func,
  messageDelIcon: PropTypes.element,
  messageSelectIcon: PropTypes.element,
  delMessage: PropTypes.func,
  renderMessageCheck: PropTypes.func,

  /* inputBarProps */
  emojiIcon: PropTypes.element,
  placeholder: PropTypes.string,
  keyboardIcon: PropTypes.element,
  plusIcon: PropTypes.element,
  sendIcon: PropTypes.element,
  sendUnableIcon: PropTypes.element,
  inputStyle: ViewPropTypes.style,
  inputOutContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputHeightFix: PropTypes.number,
  useEmoji: PropTypes.bool,
  usePlus: PropTypes.bool,
  /* voiceProps */
  useVoice: PropTypes.bool,
  pressInText: PropTypes.string,
  pressOutText: PropTypes.string,
  voiceIcon: PropTypes.element,
  voiceLeftIcon: PropTypes.element,
  voiceRightIcon: PropTypes.element,
  voiceErrorIcon: PropTypes.element,
  voiceCancelIcon: PropTypes.element,
  voiceSpeakIcon: PropTypes.array,
  audioPath: PropTypes.string,
  audioOnProgress: PropTypes.func,
  audioOnFinish: PropTypes.func,
  audioInitPath: PropTypes.func,
  audioRecord: PropTypes.func,
  audioStopRecord: PropTypes.func,
  audioPauseRecord: PropTypes.func,
  audioResumeRecord: PropTypes.func,
  audioCurrentTime: PropTypes.number,
  audioHandle: PropTypes.bool,
  setAudioHandle: PropTypes.func,
  audioHasPermission: PropTypes.bool,
  checkPermission: PropTypes.func,
  requestAndroidPermission: PropTypes.func,
  voiceErrorText: PropTypes.string,
  voiceCancelText: PropTypes.string,
  voiceNoteText: PropTypes.string,
  voiceLoading: PropTypes.bool,
  voicePlaying: PropTypes.bool,
  voiceLeftLoadingColor: PropTypes.string,
  voiceVolume: PropTypes.number,
  voiceRightLoadingColor: PropTypes.string,
  /* bubbleProps */
  renderTextMessage: PropTypes.func,
  renderImageMessage: PropTypes.func,
  renderVoiceMessage: PropTypes.func,
  renderVoiceView: PropTypes.func,
  renderVideoMessage: PropTypes.func,
  renderLocationMessage: PropTypes.func,
  renderShareMessage: PropTypes.func,
  renderVideoCallMessage: PropTypes.func,
  renderVoiceCallMessage: PropTypes.func,
  renderRedEnvelopeMessage: PropTypes.func,
  renderFileMessage: PropTypes.func,
  renderSystemMessage: PropTypes.func,
  renderPersonalCardMessage: PropTypes.func,
  renderMedicalCardMessage: PropTypes.func,
  renderDiaryMessage: PropTypes.func,
  /* delPanelProps */
  delPanelStyle: ViewPropTypes.style,
  delPanelButtonStyle: ViewPropTypes.style,
  flatListProps: PropTypes.object
}

ChatWindow.defaultProps = {
  renderLoadEarlier: () => (null),
  extraData: null,
  chatType: 'friend',
  chatBackgroundImage: null,
  inverted: false,
  allPanelAnimateDuration: 100,
  messageList: [],
  showUserName: false,
  panelContainerStyle: {},
  sendMessage: (type, content, isInverted) => {
    console.log(type, content, isInverted, 'send')
  },
  reSendMessage: (message) => {
    console.log(message, 'reSend')
  },
  leftMessageBackground: '#fff',
  rightMessageBackground: '#a0e75a',
  useVoice: true,
  useEmoji: true,
  usePlus: true,
  iphoneXHeaderPadding: 24, // 安全区域
  iphoneXBottomPadding: 34, // 安全区域
  onEndReachedThreshold: 0.1,
  usePopView: true,
  userProfile: {
    id: '88886666',
    avatar: require('../source/image/defaultAvatar.png'),
    nickName: 'Test'
  },
  panelSource: [],
  renderPanelRow: () => {},
  onScroll: () => {},
  renderErrorMessage: (messageStatus) => {
    switch (messageStatus) {
      case -1:
        return <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 80, backgroundColor: '#e6e6e6', paddingVertical: 8, borderRadius: 4, marginBottom: 10 }}>
          <Text style={{ color: '#333', fontSize: 10 }}>好友关系异常，发送失败</Text>
        </View>
      default :
        return null
    }
  },
  popoverStyle: {
    backgroundColor: '#333'
  },
  allPanelHeight: 200,
  loadHistory: () => { console.log('loadMore') },
  onMessagePress: (type, index, content, message) => { console.log(type, index, content, message) },
  onMessageLongPress: (type, index, content, message) => { console.log('longPress', type, index, content, message) },
  renderMessageTime: (time) =>
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
      <View style={{ backgroundColor: '#e6e6e6', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 16 }}>
        <Text style={{ color: '#333', fontSize: 10 }}>{getCurrentTime(parseInt(time))}</Text>
      </View>
    </View>,
  placeholder: '请输入...',
  pressInText: '按住 说话',
  pressOutText: '送开 发送',
  changeHeaderLeft: () => {
    /* example */
    // this.props.navigation.setParams({
    //   headerLeft: (
    //     <TouchableOpacity
    //       activeOpacity={0.7}
    //       style={{ top: 1, width: 54, paddingLeft: 12, justifyContent: 'center', alignItems: 'flex-start' }}
    //       onPress={() => {
    //         this.props.navigation.setParams({
    //           headerLeft: (
    //             <TouchableOpacity
    //               activeOpacity={0.7}
    //               style={{ top: 1, width: 54, paddingLeft: 8, justifyContent: 'center', alignItems: 'flex-start' }}
    //               onPress={() => this.props.navigation.goBack()}
    //             >
    //               <Material name={'keyboard-arrow-left'} size={30} color={'#000'} />
    //             </TouchableOpacity>
    //           )
    //         })
    //         that._closeMultipleSelect()
    //       }
    //       }
    //     >
    //       <Text style={{fontSize: 15, fontWeight: '600'}}>取消</Text>
    //     </TouchableOpacity>
    //   )
    // })
  },
  androidHeaderHeight: 66,
  pressAvatar: (isSelf, targetId) => { console.log(isSelf, targetId) },
  voiceVolume: 10,
  delMessage: (content, isInverted) => {
    console.log(content, isInverted)
  },
  audioPath: '',
  panelContainerBackgroundColor: '#f5f5f5',
  audioOnProgress: () => {},
  audioOnFinish: () => {},
  audioInitPath: () => {},
  audioRecord: () => {},
  audioStopRecord: () => {},
  audioPauseRecord: () => {},
  audioResumeRecord: () => {},
  audioCurrentTime: 0,
  audioHandle: true,
  setAudioHandle: () => {},
  audioHasPermission: false,
  checkPermission: () => {},
  requestAndroidPermission: () => {},
  voiceErrorText: '说话时间太短',
  voiceCancelText: '松开手指取消发送',
  voiceNoteText: '手指上划，取消发送',
  voiceLoading: false,
  voicePlaying: false,
  voiceLeftLoadingColor: '#ccc',
  voiceRightLoadingColor: '#628b42',
  inputHeightFix: 0,
  containerBackgroundColor: '#f5f5f5',
  showsVerticalScrollIndicator: false,
  showIsRead: false
}

