import request from '../utils/request'

// 获取验证码接口
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}

// 登录接口
const login = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST',
    data
  })
}

// 退出接口
const logout = () => {
  return request({ url: '/logout', method: 'POST' })
}

// 获取用户信息
const getUserInfo = () => {
  return request({ url: '/user/info', method: 'GET' })
}

// 获取用户菜单
const getMenuList = () => {
  return request({ url: '/menu/nav', method: 'GET' })
}

// 导出api接口
export default {
  getCaptcha,
  login,
  logout,
  getUserInfo,
  getMenuList
}
