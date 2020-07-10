import React from 'react'
import appStore from './appStore'
import shopStore from './shopStore'
import cartStore from './cartStore'
import messageStore from './messageStore'
import chatStore from './chatStore'
import accountStore from './accountStore'
export const Stores = {
  appStore,
  shopStore,
  cartStore,
  messageStore,
  chatStore,
  accountStore
}
const storesContext = React.createContext(Stores)
export const useStores = () => React.useContext(storesContext)
