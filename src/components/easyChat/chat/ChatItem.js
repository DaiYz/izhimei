import React, { PureComponent } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  StyleSheet, Dimensions
} from 'react-native'
import TextMessage from './TextMessage'
import ImageMessage from './ImageMessage'
import VideoMessage from './VideoMessage'
import VoiceMessage from './VoiceMessage'
const { width } = Dimensions.get('window')

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  emoji: new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}')
}

export default class ChatItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isSelect: false
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (!nextProps.isOpen) {
      this.setState({ isSelect: false })
    } else {
      if (nextProps.currentIndex === parseInt(nextProps.rowId) && this.props.currentIndex !== parseInt(nextProps.rowId)) {
        this.setState({ isSelect: true })
      }
    }
  }

  _select = () => {
    this.setState({ isSelect: !this.state.isSelect })
  }

  changeLoading = (status) => {
    this.setState({ loading: status })
  }

  _renderContent= (isSelf) => {
    const { message, isOpen, messageErrorIcon, reSendMessage, rowId, ImageComponent } = this.props
    const {content = {}, type = ''} = message
    const { loading } = this.state
    switch (type) {
      case 'text':
        if (this.props.renderTextMessage === undefined) {
          return (
            <TextMessage
              ImageComponent={ImageComponent}
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              reSendMessage={reSendMessage}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              views={content}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
              lastReadAt={this.props.lastReadAt}
              showIsRead={this.props.showIsRead}
              isReadStyle={this.props.isReadStyle}
              chatType={this.props.chatType}
            />
          )
        } else {
          return this.props.renderTextMessage({ isOpen, isSelf, message, views: this._getActualText(message.content), index: parseInt(rowId) })
        }
      case 'image':
        if (this.props.renderImageMessage === undefined) {
          return (
            <ImageMessage
              ImageComponent={ImageComponent}
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              reSendMessage={reSendMessage}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
              lastReadAt={this.props.lastReadAt}
              showIsRead={this.props.showIsRead}
              isReadStyle={this.props.isReadStyle}
              chatType={this.props.chatType}
            />
          )
        } else {
          return this.props.renderImageMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'voice':
        if (this.props.renderVoiceMessage === undefined) {
          return (
            <VoiceMessage
              ImageComponent={ImageComponent}
              reSendMessage={reSendMessage}
              loading={loading}
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
              voiceLeftIcon={this.props.voiceLeftIcon}
              voiceRightIcon={this.props.voiceRightIcon}
              voiceLoading={this.props.voiceLoading}
              voicePlaying={this.props.voicePlaying}
              savePressIndex={this.props.savePressIndex}
              pressIndex={this.props.pressIndex}
              voiceLeftLoadingColor={this.props.voiceLeftLoadingColor}
              voiceRightLoadingColor={this.props.voiceRightLoadingColor}
              lastReadAt={this.props.lastReadAt}
              chatType={this.props.chatType}
              showIsRead={this.props.showIsRead}
              isReadStyle={this.props.isReadStyle}
            />
          )
        } else {
          return this.props.renderVoiceMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'video' :
        if (this.props.renderVideoMessage === undefined) {
          return (
            <VideoMessage
              ImageComponent={ImageComponent}
              rightMessageBackground={this.props.rightMessageBackground}
              leftMessageBackground={this.props.leftMessageBackground}
              reSendMessage={reSendMessage}
              isOpen={isOpen}
              isSelf={isSelf}
              messageErrorIcon={messageErrorIcon}
              message={message}
              onMessageLongPress={this.props.onMessageLongPress}
              onMessagePress={this.props.onMessagePress}
              rowId={this.props.rowId}
              lastReadAt={this.props.lastReadAt}
              chatType={this.props.chatType}
              showIsRead={this.props.showIsRead}
              isReadStyle={this.props.isReadStyle}
            />
          )
        } else {
          return this.props.renderVideoMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'location':
        if (this.props.renderLocationMessage === undefined) {
          return null
        } else {
          return this.props.renderLocationMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'share':
        if (this.props.renderShareMessage === undefined) {
          return null
        } else {
          return this.props.renderShareMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'videoCall':
        if (this.props.renderVideoCallMessage === undefined) {
          return null
        } else {
          return this.props.renderVideoCallMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'voiceCall':
        if (this.props.renderVoiceCallMessage === undefined) {
          return null
        } else {
          return this.props.renderVoiceCallMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'redEnvelope':
        if (this.props.renderRedEnvelopeMessage === undefined) {
          return null
        } else {
          return this.props.renderRedEnvelopeMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'file':
        if (this.props.renderFileMessage === undefined) {
          return null
        } else {
          return this.props.renderFileMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'diary':
        if (this.props.renderDiaryMessage === undefined) {
          return null
        } else {
          return this.props.renderDiaryMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'medicalCard':
        if (this.props.renderMedicalCardMessage === undefined) {
          return null
        } else {
          return this.props.renderMedicalCardMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'personalCard':
        if (this.props.renderPersonalCardMessage === undefined) {
          return null
        } else {
          return this.props.renderPersonalCardMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
      case 'system':
        if (this.props.renderSystemMessage === undefined) {
          return (
            <View style={styles.system_container}>
              <View style={styles.system_button}>
                <Text style={styles.system_text}>{message.content}</Text>
              </View>
            </View>
          )
        } else {
          return this.props.renderSystemMessage({ isOpen, isSelf, message, index: parseInt(rowId) })
        }
    }
  }

  renderCheck = () => {
    const {ImageComponent} = this.props
    if (this.props.renderMessageCheck === undefined) {
      if (this.state.isSelect) {
        return (
          <View style={styles.check}>
            {this.props.messageSelectIcon ? this.props.messageSelectIcon :
              <ImageComponent source={require('../source/image/check.png')} style={{ width: 14, height: 14 }} />
            }
          </View>
        )
      } else {
        return <View style={styles.unCheck} />
      }
    } else {
      return this.props.renderMessageCheck(this.state.isSelect)
    }
  }

  render () {
    const { user = {}, message, isOpen, selectMultiple, avatarStyle = {}, rowId, chatType, showUserName, userNameStyle, ImageComponent } = this.props
    const isSelf = user.id === message.targetId
    const {type} = message
    const avatar = isSelf ? user.avatar : message.chatInfo.avatar
    const nickName = isSelf ? '' : message.chatInfo.nickName
    const avatarSource = typeof(avatar) === 'number' ? avatar : {uri: avatar}
    const Element = isOpen ? TouchableWithoutFeedback : View
    const showName = chatType === 'group' && showUserName && type !== 'system'
    return (
      <View>
        <Element
          onPress={() => {
            this.setState({ isSelect: !this.state.isSelect })
            selectMultiple(!this.state.isSelect, parseInt(rowId), message)
          }}
        >
          <View>
            {
              type === 'system'
                ? null
                : <TouchableOpacity activeOpacity={1}>
                  {
                    message.renderTime ? this.props.renderMessageTime(message.time) : null
                  }
                </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => this.props.closeAll()}
              disabled={isOpen}
              activeOpacity={1}
              style={[styles.chat, isSelf ? styles.right : styles.left]} ref={(e) => (this.content = e)}
            >
              {
                !isSelf && isOpen &&  type !== 'system' &&
                <View>
                  {this.renderCheck()}
                </View>
              }
              {
                type === 'system'
                  ? null
                  :  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={isOpen}
                    onPress={() => this.props.onPressAvatar(isSelf, message.targetId)}
                  >
                    {this.props.renderAvatar ? (
                      this.props.renderAvatar(message)
                    ) : (
                      <ImageComponent source={avatarSource} style={[styles.avatar, avatarStyle]} />
                    )}
                  </TouchableOpacity>
              }
              <View style={[
                  { justifyContent: showName && type === 'voice' ? 'flex-start' : 'center' },
                  type === 'system' && { flex: 1 },
                ]}>
                {
                  showName && !isSelf? <Text style={[styles.userName, userNameStyle]}>{nickName}</Text>
                    : null
                }
                {this._renderContent(isSelf)}
              </View>
              {
                isSelf && isOpen && type !== 'system' &&
                <View
                  style={{ flex: 1 }}
                >
                  {this.renderCheck()}
                </View>
              }
            </TouchableOpacity>

            {
              this.props.renderErrorMessage(message.sendStatus)
            }
          </View>
        </Element>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  commentBar: {
    width: width,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  subEmojiStyle: {
    width: 25,
    height: 25
  },
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 20
    // backgroundColor: '#f9f9f9'
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.8
  },
  chat: {
    paddingHorizontal: 10,
    paddingVertical: 14
  },
  right: {
    flexDirection: 'row-reverse'
  },
  left: {
    flexDirection: 'row'
  },
  txtArea: {

  },
  voiceArea: {
    borderRadius: 12,
    maxWidth: width - 160,
    justifyContent: 'center',
    minHeight: 30
  },
  avatar: {
    marginLeft: 8,
    borderRadius: 24,
    width: 48,
    height: 48
  },
  check: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderRadius: 10,
    borderColor: '#9c9c9c',
    marginTop: 14
  },
  system_container: {
    flex: 1,
    alignItems: 'center'
  },
  system_button: {
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4
  },
  system_text: {
    fontSize: 12
  },
  userName: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
    marginLeft: 14
  }
})
