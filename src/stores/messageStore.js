import { observable, action, computed } from 'mobx'

class MessageStore {
  @observable message: Array = [
    {
      id: 1,
      avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
      name: 'Test',
      message: 'XXXXXXXXXXXXX',
      time: new Date().getDate()
    },
    {
      id: 1,
      avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
      name: 'Test',
      message: 'XXXXXXXXXXXXX',
      time: new Date().getDate()
    },
    {
      id: 1,
      avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
      name: 'Test',
      message: 'XXXXXXXXXXXXX',
      time: new Date().getDate()
    },
    {
      id: 1,
      avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
      name: 'Test',
      message: 'XXXXXXXXXXXXX',
      time: new Date().getDate()
    },
    {
      id: 1,
      avatar: 'http://img4.imgtn.bdimg.com/it/u=2059461584,1499920776&fm=214&gp=0.jpg',
      name: 'Test',
      message: 'XXXXXXXXXXXXX',
      time: new Date().getDate()
    }
  ]
}

export default new MessageStore()
