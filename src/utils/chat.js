
// {
//   id: `${new Date().getTime()}`,
//     type: 'text',
//   content: 'hello world',
//   targetId: '12345678',
//   chatInfo: {
//   avatar: require('./app/source/image/avatar.png'),
//     id: '12345678',
//     nickName: 'Test'   // not require
// },
//   renderTime: true,
//     sendStatus: 0,
//   time: new Date().getTime()
// }

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

// content: {
//   uri: 'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
//     width: 100,
//     height: 80
// },

const compareTime = 5 * 60 * 1000

const getTargetChatMessages = (msgList: Array, currentMsg, chatInfo: Object, isNewMessage:Boolean = false) => {
  let newMsg = []
  if (!isNewMessage && Array.isArray(currentMsg) && currentMsg.length > 0) {
    const len = currentMsg.length
    currentMsg.sort((a, b) => a.time - b.time)
    for (let i = 0; i < len; i++) {
      const lastMsg = i > 0 ? currentMsg[i - 1] : {}
      newMsg.push(getTargetChatObj(currentMsg[i], chatInfo, lastMsg, false))
    }
    return newMsg
  }
  if (msgList.length > 0) {
    newMsg = [...msgList].sort((a, b) => a.time - b.time)
  }
  const len = newMsg.length
  const lastMsg = msgList.length > 0 ? newMsg[len - 1] : {}
  newMsg.push(getTargetChatObj(currentMsg, chatInfo, lastMsg, isNewMessage))
  return newMsg
}

const getTargetChatObj = (currentMsg: Object, chatInfo:Object, lastMsg: Object, isNewMessage: Boolean = true) => {
  const targetObj = {}
  targetObj.id = currentMsg.idClient
  targetObj.targetId = currentMsg.from
  targetObj.chatInfo = chatInfo
  // eslint-disable-next-line no-prototype-builtins
  if (lastMsg.hasOwnProperty('time')) {
    targetObj.renderTime = currentMsg.time - lastMsg.time > compareTime
  } else {
    targetObj.renderTime = true
  }
  targetObj.sendStatus = isNewMessage ? 0 : currentMsg.status === 'success' ? 1 : 2
  targetObj.time = currentMsg.time
  const typeAndContent = getMsgType(currentMsg.type, currentMsg)
  return Object.assign(targetObj, typeAndContent)
}

const replaceMsg = (msgList: Array, currentMsg, status = 'success') => {
  return msgList.map(item => {
    if (item.id === currentMsg.idClient) {
      return Object.assign({}, item, { sendStatus: status === 'success' ? 1 : 2 })
    }
    return item
  })
}

const generateFakeMsg = (options = {}) => {
  const {
    scene = 'p2p', to = 'yizhimei_3', type, url, from, idClient
  } = options
  return {
    sessionId: `${scene}-${to}`,
    scene,
    from,
    to,
    flow: 'out',
    type,
    file: {
      url,
      w: options.w,
      h: options.h
    },
    idClient,
    status: 0,
    time: (new Date()).getTime()
  }
}

const getMsgType = (type, msg) => {
  const content = {}
  let targetContent = {}
  switch (type) {
    case 'text':
      content.type = type
      content.content = msg.text
      break
    case 'image':
      content.type = type
      content.content = {}
      content.content.uri = msg?.file.url
      content.content.width = msg?.file.w
      content.content.height = msg?.file.h
      break
    case 'custom':
      targetContent = JSON.parse(msg.content)
      content.type = targetContent.type
      content.content = targetContent.content
      break
  }
  return content
}

function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export default {
  getTargetChatMessages,
  replaceMsg,
  uuid,
  generateFakeMsg
}
