import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

// 骑手审核列表
export function getRiderCheckList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getriderstatuslist', data),
    method: 'get'
  })
}

// 审核
export function agreeCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setriderstatus', {
      id: data.id,
      uid: data.uid,
      agree: data.agree,
      text: data.textarea,
    }),
    method: 'get'
  })
}


// 学生骑手审核列表
export function getStudentCheckList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getstudentstatuslist', data),
    method: 'get'
  })
}

// 审核
export function agreeStudentCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setstudentstatus', {
      id: data.id,
      uid: data.uid,
      agree: data.agree,
      text: data.textarea,
    }),
    method: 'get'
  })
}


// 提现列表
export function getwithdrawlist(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gettixianapply', data),
    method: 'get'
  })
}
// 提现审核
export function agreeWithdraw(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/settixianapply', data),
    method: 'get'
  })
}

