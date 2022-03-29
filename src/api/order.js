import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'


export function getOrder(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getorderlistbystatus', data),
    method: 'get',
  })
}


export function tuiOrder(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/paoduiquxiao', data),
    method: 'get',
  })
}

export function shifangOrder(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/paoduishifang', data),
    method: 'get',
  })
}

export function getOnlineQishou(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getonlineriderlist', data),
    method: 'get',
  })
}

export function getOrderQishou(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/findriderbyorder', data),
    method: 'get',
  })
}

export function getMapDetails(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getlujing', data),
    method: 'get',
  })
}

export function dispatchOrder(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/paoduizhiding', {
      id: data.id,
      uid: data.uid,
    }),
    method: 'get',
  })
}

export function getpingjia(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getpingjiabyadmin', data),
    method: 'get',
  })
}

