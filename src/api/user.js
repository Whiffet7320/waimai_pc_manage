import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'
export function login(data) {
  //beforeRequest(getRequestUrl('/server/admin/login'))
  return getRequest({
    url: getRequestUrl('/server/admin/login'),
    method: 'post',
    data
  })
}

export function getInfo() {
  return getRequest({
    url: getRequestUrl('/server/admin/user-info'),
    method: 'get',
  })
}

export function getList() {
  return getRequest({
    url: getRequestUrl('/server/admin/admin-list'),
    method: 'get',
  })
}

export function addAdmin(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add-admin'),
    method: 'post',
    data
  })
}

export function getStatus(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/admin-status'),
    method: 'post',
    data
  })
}

export function updateAdmin(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/update-admin'),
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delete-admin'),
    method: 'post',
    data
  })
}

//用户列表
export function getUserList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getuserlist', data),
    method: 'get',
  })
}
// 筛选
export function getFiltersUserList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/finduserbyqyery', {
      page: data.page,
      limit: data.limit,
      type: data.type,
      isstudent: data.isstudent,
      uid: data.id,
      level: data.level,
      xiadannum: data.xiadannum,
      phone: data.phone,
      coinbegin: data.mincoin,
      coinend: data.maxcoin,
      createbegin: parseInt(data.timefilter[0] / 1000),
      createend: parseInt(data.timefilter[1] / 1000),
      needdate: data.tabDay,
      yixiaofei: data.yixiaofei,
      weixiaofei: data.weixiaofei,
      shopname: data.shopname,
      shoptitle: data.shoptitle,
      daochu: data.daochu,
    }),
    method: 'get',
  })
}

//编辑 用户
export function editUserInfo(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/changeusernicknameorfenghao', {
      nickname: data.nickname,
      uid: data.id,
      accountstatus: data.accountstatus,
    }),
    method: 'get'
  })
}

//编辑 骑手
export function editRiderInfo(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setriderbyuid', data),
    method: 'get'
  })
}


// 查询充值账号
export function checkRecharge(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/loaduser', data),
    method: 'get'
  })
}
// 充值
export function recharge(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addcoinbyuid', data),
    method: 'get'
  })
}

export function rechargeJifen(data) {
    return getRequest({
      url: getRequestUrl('/server/admin/addriderfenbyuid', data),
      method: 'get'
    })
  }


// 封号

export function fenghao(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/fenghao', data),
    method: 'get'
  })
}


export function gerRechargeList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/findcoinlogbyqyery', {
      page: data.page,
      limit: data.limit,
      type: data.rechargetype,
      createbegin: parseInt(data.timefilter[0] / 1000),
      createend: parseInt(data.timefilter[1] / 1000),
      needdate: data.tabDay,
      daochu: data.daochu,
    }),
    method: 'get',
  })
}