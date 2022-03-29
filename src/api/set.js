import { getRequestUrl, getRequest } from '@/utils/http'

export function changInfoWx(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/wxunbindphone', {
      uid: data.uid,
    }),
    method: 'get',
  })
}


export function changInfoPhone(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/changephone', {
      uid: data.uid,
      newphone: data.phone,
    }),
    method: 'get',
  })
}

// 各项配置
export function getSet(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-config'),
    method: 'get',
  })
}

//  修改各项配置
export function editMoban(data) {
  return getRequest({
    url: getRequestUrl("/server/admin/save-config"),
    method: "post",
    data: {
      data: data
    }
  });
}

//  设置协议
export function setAgreement(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/sethtml'),
    method: 'post',
    data: {
      title: "设置",
      type: data.type,
      text: data.content,
    },
  })
}

//  获取协议
export function getAgreement(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gethtml', {
      type: data,
    }),
    method: 'get',
  })
}


//  添加banner
export function addbanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addbanner', data),
    method: 'get',
  })
}

export function delbanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delbanner', data),
    method: 'get',
  })
}

export function editbanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/changebanner', data),
    method: 'get',
  })
}

export function getbanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getbanner', data),
    method: 'get',
  })
}


//  添加首页
export function addhomebanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/setuserbanner', data),
    method: 'get',
  })
}

export function delhomebanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/deluserbanner', data),
    method: 'get',
  })
}

export function gethomebanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/getuserbanner', data),
    method: 'get',
  })
}