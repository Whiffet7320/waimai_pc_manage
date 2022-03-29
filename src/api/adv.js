import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/adv-list'),
    method: 'get',
  })
}

export function addAdv(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/save-adv'),
      method: 'post',
      data
    })
}

export function updateAdv(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/save-adv'),
      method: 'post',
      data
    })
}

export function deleteAdv(id) {
    return getRequest({
      url: getRequestUrl('/server/admin/delete-adv', {id,id}),
      method: 'post',
    })
}

export function getDetail(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/adv-detail', {id, id}),
    method: 'get',
  })
}

