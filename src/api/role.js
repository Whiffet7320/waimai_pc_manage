import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getRoles() {
  return getRequest({
    url: getRequestUrl('/server/admin/roles'),
    method: 'get'
  })
}

export function addRole(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add-roles'),
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return getRequest({
    url:  getRequestUrl('/server/admin/edit-roles'),
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/delete-roles', {id: id}),
    method: 'get'
  })
}
