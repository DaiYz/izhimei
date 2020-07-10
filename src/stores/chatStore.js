import { observable, action } from 'mobx'
import { Alert } from 'react-native'
import sdk from '../service/NIM_Web_SDK_rn_v7.6.0'
// import sdk from '../service/NIM_Web_SDK_rn_v6.1.0'
import config from '../config'
import Realm from 'realm'
import RNFS from 'react-native-fs'
import { chatTools } from '../utils'
import moment from 'moment'
sdk.usePlugin({
  db: Realm
})
sdk.usePlugin({
  rnfs: RNFS
})
class ChatStore {
  @observable nim = null
  @observable currentSessionId = ''
  @observable currentAccount = ''
  @observable sessionList = []
  @observable isInverted: Boolean = false
  @observable currentMessage: Array = []
  @observable sessionMessage:  Array = []
  @observable chatUsersInfo: Array = []
  @observable testText = 11

  @action.bound setValue (key, val) {
    this[key] = val
  }

  @action.bound setAndResetSession (sessionId = this.currentSessionId, isReset = true) {
    if (isReset) {
      this.nim.resetCurrSession()
      this.setValue('currentSessionId', '')
      console.log('重置')
      return null
    }
    this.nim && this.nim.setCurrSession(sessionId)
    this.setValue('currentSessionId', sessionId)
  }

  @action.bound initSdk (account = 'yizhimei_2', token = '3976997d2576154c85895eadcac3f7a0') {
    const self = this
    this.nim = sdk.NIM.getInstance({
      debug: true, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
      appKey: config.app.MIN_KEY,
      account,
      token,
      db: true,
      syncSessionUnread: true,
      onconnect: function () {
        console.log('connected')
      },
      onwillreconnect: function (obj) {
        console.log('即将重连')
        console.log(obj.retryCount)
        console.log(obj.duration)
      },
      ondisconnect: function (error) {
        console.log('丢失连接')
        console.log(error)
        if (error) {
          switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
              break
            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
            case 417:
              break
            // 被踢, 请提示错误后跳转到登录页面
            case 'kicked':
              break
            default:
              break
          }
        }
      },
      onsyncdone () {
        Alert.alert('提示', '账号及离线消息同步完成')
      },
      onerror (event, obj) {
        console.log('IM error:', event, obj)
        // self.destroyNIM();
        // callback(event);
      },
      onmsg: (msg) => {
        console.log(msg)
        this.receiveMsg(msg)
        // cc: false
        // custom: ""
        // flow: "in"
        // from: "yizhimei_1"
        // fromClientType: "Server"
        // fromNick: "test"
        // idClient: "8c3f57b7-f2d2-47b2-ba12-eb1047bdfb4b"
        // idServer: "391406166172"
        // isHistoryable: true
        // isLocal: false
        // isOfflinable: true
        // isPushable: true
        // isReplyMsg: true
        // isRoamingable: false
        // isSyncable: true
        // isUnreadable: true
        // needMsgReceipt: false
        // needPushNick: true
        // scene: "p2p"
        // sessionId: "p2p-yizhimei_1"
        // status: "success"
        // target: "yizhimei_1"
        // text: "哈哈哈"
        // time: 1590129271277
        // to: "yizhimei_2"
        // type: "text"
        // userUpdateTime: 1590047067682

        // 此处为委托消息事件，消息发送成功后，成功消息也在此处处理
      },
      onsessions: this.onSession,
      onofflinemsgs: function (obj) {
        console.log('收到离线消息', obj)
      },
      onupdatesession: this.onSession,
      onusers (users) {
        console.log(users)
      }
    })
  }

@action.bound onSession (session) {
    console.log('更新消息会话', session)
    const res = this.nim.mergeSessions(this.sessionList, session)
      .sort((a, b) => {
        const time1 = a.lastMsg ? a.lastMsg.time : a.updateTime
        const time2 = b.lastMsg ? b.lastMsg.time : b.updateTime
        return time2 - time1
      })
    this.sessionList = [...res]
    console.log(this.sessionList.slice())
  }

  @action.bound receiveMsg (msg) {
  if (msg.sessionId === this.currentSessionId) {
    this.currentMessage = chatTools.getTargetChatMessages(this.currentMessage, msg, this.getChatInfo())
  }
}

  @action.bound getLocalMessage (sessionId, end) {
    console.log(moment.utc().valueOf(), moment())
    if (this.nim) {
      console.log(new Date().getTime())
      this.nim.getLocalMsgs({
        sessionId, // 表示单聊场景(p2p)，对方账号为account。
        limit: 16,
        desc: true,
        done: (error, obj) => {
          if (error) return
          this.isInverted = obj.msgs.length >= 12
          if (obj.msgs.length > 0) {
            this.currentMessage = chatTools.getTargetChatMessages([], obj.msgs, this.getChatInfo())
          }
          console.log(new Date().getTime())
          console.log('获取本地消息' + (!error ? '成功' : '失败'), error, obj)
        }
      })
    }
  }

  @action.bound sendTextMessage (text: String, to: String = 'yizhimei_3') {
    if (this.nim) {
      const msg = this.nim.sendText({
        scene: 'p2p',
        to,
        text,
        done: (error, msg) => {
          console.log(error)
          console.log(msg)
          const status = !error ? 'success' : 'fail'
          this.currentMessage = chatTools.replaceMsg(this.currentMessage, msg, status)
          console.log(this.currentMessage.slice(), '发送成功', msg.idClient)
        }
      })
      console.log('正在发送p2p text消息, id=' + msg.idClient)
      // pushMsg(msg);
      this.currentMessage = chatTools.getTargetChatMessages(this.currentMessage, msg, this.getChatInfo(), true)
    }
  }

  @action.bound sendImageMessage (options) {
    if (this.nim) {
      options.type = 'image'
      const { to = 'yizhimei_3', filePath, w, h } = options
      const idClient = chatTools.uuid()
      const msg = chatTools.generateFakeMsg({
        scene: 'p2p',
        to,
        idClient,
        type: 'image',
        url: filePath,
        w,
        h,
        from: 'yizhimei_2'
      })
      this.currentMessage = chatTools.getTargetChatMessages(this.currentMessage, msg, this.getChatInfo(), true)
      this.nim.previewFile({
        type: 'image',
        filePath,
        uploadprogress (obj) {
          console.log(`文件总大小: ${obj.total}bytes`)
          console.log(`已经上传的大小: ${obj.loaded}bytes`)
          console.log(`上传进度: ${obj.percentage}`)
          console.log(`上传进度文本: ${obj.percentageText}`)
        },
        done: (error, { name, url, ext }) => {
          const file = {
            name,
            url,
            w,
            h,
            md5: idClient,
            size: options.size,
            ext
          }
          if (!error) {
            this.nim.sendFile({
              type: 'image',
              scene: 'p2p',
              to,
              file,
              done: (err, newMsg) => {
                const status = !error ? 'success' : 'fail'
                newMsg.idClient = idClient
                this.currentMessage = chatTools.replaceMsg(this.currentMessage, newMsg, status)
              }
            })
          }
        }
      })
    }
  }

  @action.bound sendCustomMessage = (options) => {
    if (this.nim) {
      const { to = 'yizhimei_3', type = '', content = {} } = options
      const msg = this.nim.sendCustomMsg({
        scene: 'p2p',
        to,
        content: JSON.stringify({
          type,
          content
        }),
        done: (error, msg) => {
          const status = !error ? 'success' : 'fail'
          this.currentMessage = chatTools.replaceMsg(this.currentMessage, msg, status)
          console.log(this.currentMessage.slice(), '发送成功', msg.idClient)
        }
      })
      this.currentMessage = chatTools.getTargetChatMessages(this.currentMessage, msg, this.getChatInfo(), true)
    }
  }

  // todo
  @action.bound getChatInfo (sessionId) {
    if (this.chatUsersInfo.length === 0) {
      return {
        avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
        id: 'yizhimei_3',
        nickName: 'test2' // not require
      }
    } else {

    }
  }
}

export default new ChatStore()
