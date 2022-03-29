import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getConfig() {
  return getRequest({
    url: getRequestUrl('/server/admin/get-config'),
    method: 'get',
  })
}

export function saveConfig(deploy, data) {
    return getRequest({
      url: getRequestUrl('/server/admin/save-config', {deploy : deploy, data:data}),
      method: 'get',
    })
}


