import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

//商家列表
export function getStoreList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getuserlist', data),
    method: 'get',
  })
}

export function getCheckList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getshopstatuslist', data),
    method: 'get',
  })
}

export function agreeCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setshopstatus', data),
    method: 'get',
  })
}

export function agreeSchoolCheck(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setshopschoolstatus', data),
    method: 'get',
  })
}


export function cateListApi(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getgoodstype', data),
    method: 'get',
  })
}

export function goodsListApi(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getallgoodslist', data),
    method: 'get',
  })
}

// 获取分类列表
export function getManageList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getshoptype', data),
    method: 'get',
  })
}
// 删除
export function deleteClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delshoptype', data),
    method: 'get',
  })
}
// 添加
export function addClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addshoptype', data),
    method: 'get',
  })
}
// 编辑
export function editClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/changeshoptypeandsort', data),
    method: 'get',
  })
}

// 举报列表
export function getjubaolist(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getjubaoshop', data),
    method: 'get',
  })
}

// 举报处理
export function caozuojubao(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setjubaoshop', data),
    method: 'get',
  })
}

// 配置商户信息
export function setshopconfig(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setshopconfig', {
      shopid: data.id,
      peisongfei: data.peisongfei.toString(),
      qisongjia:data.qisongjia.toString(),
      peisongfanwei:data.peisongfanwei.toString(),
      koudian:data.koudian.toString(),
      qibujia:data.qibujia.toString(),
      overjia:data.overjia.toString(),
      qibufanwei:data.qibufanwei.toString(),
      isreceive : data.isreceive,
      tixianbiaozhun:data.tixianbiaozhun.toString(),
      peisongshijian:data.peisongshijian.toString(),
    }),
    method: 'get',
  })
}