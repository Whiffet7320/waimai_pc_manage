import { getRequestUrl, getRequest } from '@/utils/http'

export function gettopmoney(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getallcoinbyadmin', data),
    method: 'get',
  })
}

export function getcentermoney(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gettongjibyadmin', data),
    method: 'get',
  })
}

export function getbottommoney(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getechartbyadmin', data),
    method: 'get',
  })
}

export function getchoucenglist(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getchoucheng', data),
    method: 'get',
  })
}

export function getfapiaolist(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getfapiaoapply', data),
    method: 'get',
  })
}

export function agreeFapiaoCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setfapiaoapply', data),
    method: 'get',
  })
}
