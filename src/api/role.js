import request from '../utils/request'

const getRoleList = (data) => {
  return request({
    url:
      '/role/list?current= ' +
      data.current +
      '&size=' +
      data.size +
      '&name=' +
      data.name,
    method: 'GET'
  })
}
// 分配角色
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
const findOneRole = (id) => {
  return request({ url: `/role/info/${id}`, method: 'GET' })
}

const addRole = (data) => {
  return request({ url: '/role/add', method: 'POST', data })
}

const saveEdit = (data) => {
  return request({ url: '/role/update', method: 'PUT', data })
}

export default { getRoleList, updateRole, findOneRole, addRole, saveEdit }
