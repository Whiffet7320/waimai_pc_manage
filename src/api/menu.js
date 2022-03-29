import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'



export function getMenu(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-menu'),
    method: 'post',
    data
  })
}
 
export function getAllMenu() {
  return getRequest({
    url: getRequestUrl('/server/admin/get-all-menu'),
    method: 'post',
  })
}

export function addMenu(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add-menu'),
    method: 'post',
    data
  })
}

export function editMenu(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-menu'),
    method: 'post',
    data
  })
}

export function deleteMenu(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/delete-menu', {id: id}),
    method: 'post'
  })
}

export function getRoutes() {
  return getRequest({
    url: getRequestUrl('/server/admin/routes'),
    method: 'get'
  })
}
