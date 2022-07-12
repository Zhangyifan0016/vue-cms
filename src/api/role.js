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

export default { getRoleList }
