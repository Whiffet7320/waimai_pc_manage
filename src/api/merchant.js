import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getCheckList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getmerchantapplylist', data),
    method: 'get',
  })
}

export function agreeCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setmerchantstatus', data),
    method: 'get',
  })
}

