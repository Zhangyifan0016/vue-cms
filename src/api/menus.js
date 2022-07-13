import request from '../utils/request'

const getMenuList = (data) => {
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

export default { getMenuList }
