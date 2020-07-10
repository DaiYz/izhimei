import axios from 'axios'
import config from '../config'
import { Stores } from '../stores'
import { Platform } from 'react-native'
// const Stores = useStores()

const instance = axios.create({
  timeout: config.server.SESSION_TIMEOUT
})

instance.interceptors.request.use((config) => {
  const authToken = Stores.appStore.authToken
  if (authToken) {
    config.headers.auth = authToken
  }
  config.headers['Cache-Control'] = 'no-cache'
  config.headers['X-MOBILE-APP-VERSION'] = '1.0'
  config.headers['X-MOBILE-APP-PLATFORM'] = Platform.OS === 'android' ? 'AOS' : 'IOS'
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  const { config } = response
  const { url, method, headers } = config
  const _response = response || { data: null }
  return _response.data || {}
}, (err) => {
  console.log(err)
  try {
    if (err.config) {
      const { url = '', method = '' } = err.config
      const { data = {}, status = 0 } = err.response
      console.log(`[SESSION][${method.toUpperCase()}][${url}][${status}][${data}]`, err.response)
    } else {
      console.log(err)
    }
  } catch (e) {
    console.log(err)
  }
  return Promise.reject(err)
})

const sessionMethodBuild = (baseUrl) => {
  return {
    Post: (path: string, body = {}) => Promise.resolve(
      instance.post(`${baseUrl}${path}`, body)
    ),
    // Get: async (path: string, body = {}, params = {}) => {
    //   return await instance.get(`${baseUrl}${path}`, Object.assign({}, body, { params }))
    // },
    Get: (path: string, body = {}, params = {}) => Promise.resolve(
      instance.get(`${baseUrl}${path}`, Object.assign({}, body, { params }))
    ),
    Put: async (path: string, body = {}) => Promise.resolve(
      instance.put(`${baseUrl}${path}`, body)
    ),

    Delete: async (path: string, body = {}) => Promise.resolve(
      instance.delete(`${baseUrl}${path}`, body)
    ),

    Upload: async (path: string, body = {}) => Promise.resolve(
      instance.post(`${baseUrl}${path}`, body, { timeout: 120000 })
    )
  }
}

export default {
  shop: sessionMethodBuild(`${config.server.API_DOMAIN}/shop`)
}
