import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getCouponList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getyouhuiquan', data),
    method: 'get',
  })
}


export function addCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addpaotuiquan', data),
    method: 'get',
  })
}

export function sendCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/fafangpaotuiquan'),
    method: 'post',
    data,
  })
}

export function setCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setpaotuiquanstop', data),
    method: 'post',
  })
}

export function getTaskList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getriderrenwu', data),
    method: 'get',
  })
}

export function addTask(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addriderrenwu', data),
    method: 'get',
  })
}

export function delTask(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delriderrenwu', data),
    method: 'get',
  })
}