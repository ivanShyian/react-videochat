import axios from 'axios'
import {store} from '../store'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

if (axios.defaults.headers != null) {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

axiosClient.interceptors.request.use((config) => {
  // const user = (store as any).getStore()?.user
  // if (user?.token && config.headers) config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

export default {
  get: axiosClient.get,
  post: axiosClient.post,
  put: axiosClient.put,
  delete: axiosClient.delete,
  patch: axiosClient.patch
}