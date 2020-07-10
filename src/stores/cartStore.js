import { observable, action, computed } from 'mobx'

class CartStore {
  @observable isSelectAll:Boolean = false
  @observable isManage:Boolean = true
  @observable cartList: Array = []

  @action.bound selectAll (status) {
    this.isSelectAll = status
  }

  @action.bound setMange (status) {
    this.isManage = status
  }
}

export default new CartStore()
