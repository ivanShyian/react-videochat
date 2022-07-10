import axios from 'axios'
import objectHasOwnProperty from '@/utils/objectHasOwnProperty'
import { bindActionCreators, Store } from 'redux'
import { AuthActionCreators } from '@/store/reducers/auth/action-creators'
import api from '@/api/routes'

let store: Store

export const injectStore = (_store: Store) => {
  store = _store
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

axiosClient.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (objectHasOwnProperty(token, 'accessToken') && config.headers) {
    config.headers.Authorization = `Bearer ${token.accessToken}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

axiosClient.interceptors.response.use(response => response, async err => {
  const config = err.config
  if (err.response.status === 401 && !config._retry) {
    config._retry = true
    const {token, user} = store.getState().auth

    if (objectHasOwnProperty(token, 'refreshToken')) {
      const response = await axiosClient.post(api.auth.postRefreshToken(), {refreshToken: token.refreshToken})
      if (response.status === 200) {
        bindActionCreators(AuthActionCreators.setUserAndToken, store.dispatch)({...user, ...response.data})
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        
        return axiosClient(config)
      }
      return bindActionCreators(AuthActionCreators.logout, store.dispatch)()
    }
  } else if (err.response.status === 403 && err.response.data.message === 'Refresh token is not in database!') {
    bindActionCreators(AuthActionCreators.logout, store.dispatch)()
  }
  return Promise.reject(err)
})

export default {
  get: axiosClient.get,
  post: axiosClient.post,
  put: axiosClient.put,
  delete: axiosClient.delete,
  patch: axiosClient.patch
}