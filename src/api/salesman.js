import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/salesman-list'),
    method: 'get',
    data
  })
}

export function addSalesman(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/save-salesman'),
      method: 'post',
      data
    })
}

export function updateSalesman(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/save-salesman'),
      method: 'post',
      data
    })
}

export function deleteSalesman(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/delete-salesman'),
      method: 'post',
      data
    })
}

export function getDetail() {
  return getRequest({
    url: getRequestUrl('/server/admin/salesman-detail'),
    method: 'get',
  })
}

