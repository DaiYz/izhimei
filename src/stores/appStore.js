import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
class AppStore {
  @persist @observable authToken: String = 'fhjksahfuhsuihfusjfk237827fhjkshfjk'
}


export default new AppStore()
