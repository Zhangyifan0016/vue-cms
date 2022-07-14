import request from '../utils/request'

const getMenusList = (data) => {
  return request({
    url:
      '/menu/list?current=' +
      data.current +
      '&size=' +
      data.size +
      '&name=' +
      data.name,
    method: 'GET'
  })
}
const findOneMenus = (id) => {
  return request({ url: `/menu/info/${id}`, method: 'GET' })
}

const addMenus = (data) => {
  return request({ url: '/menu/add', method: 'POST', data })
}

const saveEdit = (data) => {
  return request({ url: '/menu/update', method: 'PUT', data })
}

export default { getMenusList, findOneMenus, addMenus, saveEdit }
