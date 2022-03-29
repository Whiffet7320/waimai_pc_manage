import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getIndex(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getindexhtml'),
    method: 'get',
  })
}

export function getBigData(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/bigdata', data),
    method: 'get',
  })
}

export function getGjData(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_apply', data),
    method: 'get',
  })
}

export function getHhrData(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/daili_list', data),
    method: 'get',
  })
}

export function getZbData(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/user-list', data),
    method: 'get',
  })
}