import request from '../utils/request'

const getUserList = (data) => {
  return request({
    url:
      '/user/list?current=' +
      data.current +
      '&size=' +
      data.size +
      '&username=' +
      data.username,
    method: 'GET'
  })
}

const findOneUser = (id) => {
  return request({ url: `/user/userInfo/${id}`, method: 'GET' })
}

const addUser = (data) => {
  return request({ url: '/user/add', method: 'POST', data })
}

const saveEdit = (data) => {
  return request({ url: '/user/update', method: 'PUT', data })
}

export default { getUserList, addUser, findOneUser, saveEdit }
