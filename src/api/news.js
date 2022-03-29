import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/news-list'),
    method: 'post',
    data
  })
}

export function getDetail() {
  return getRequest({
    url: getRequestUrl('/server/admin/news-detail'),
    method: 'get',
  })
}

