// 引入axios
import axios from 'axios'
// 引入store
import store from '../store'

// 引入message消息提示
import { Message } from 'element-ui'

// 引入自定义消息提示
import exceptionMessage from './exceptionMessage'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000
})
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 设置请求头
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 全局响应处理
    if (response.data.code === 200) {
      return response.data.data
    }
    _showErrorMessage(response.data.code, response.data.msg)
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({ message, type: 'error' })
}
// 封装 处理get请求方式的参数问题
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return instance(options)
}

export default request
