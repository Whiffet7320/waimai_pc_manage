import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/phone-list'),
    method: 'post',
    data
  })
}

export function updatePhone(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/update-phone'),
    method: 'post',
    data
  })
}

export function del(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delete-phone', { _id: data._id, types: data.types, guishudi: data.info.guishudi }),
    method: 'post'
  })
}

export function saveSale(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save-sale-phone', { _id: data._id, ifsale: data.info.ifsale }),
    method: 'post'
  })
}

export function batchUpdate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/batch-update'),
    method: 'post',
    data
  })
}

export function delAll(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delete-all'),
    method: 'post',
    data
  })
}

export function delSearch(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del-search'),
    method: 'post',
    data
  })
}

export function getSelect() {
  return getRequest({
    url: getRequestUrl('/server/admin/get-select'),
    method: 'get'
  })
}

export function uploadSave(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/upload-save'),
    method: 'post',
    data
  })
}

export function getNote(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-note'),
    method: 'post',
    data
  })
}

export function updatePrice(data, phone) {
  return getRequest({
    url: getRequestUrl('/server/admin/update-all', { bai: phone.price }),
    method: 'post',
    data
  })
}

