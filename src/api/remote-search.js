import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

//后台首页接口
export function transactionList() {
  return getRequest({
    url: getRequestUrl('/server/admin/index'),
    method: 'get',
  })
}
