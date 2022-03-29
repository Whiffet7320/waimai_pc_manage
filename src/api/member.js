import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/user-list'),
    method: 'post',
    data
  })
}

// export function getInfo() {
//   return getRequest({
//     url: getRequestUrl('/server/admin/user-info'),
//     method: 'get',
//   })
// }

