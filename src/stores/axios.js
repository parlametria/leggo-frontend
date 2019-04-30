import axios from 'axios'
import NProgress from 'nprogress'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

service.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, (error) => {
  NProgress.start()
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

export default service
