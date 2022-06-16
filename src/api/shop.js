import request from '@/utils/request'
import store from '@/store'

// 添加商品类型
export function addGoodsCateApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/addgoodstype',
    method: 'get',
    params: data
  })
}

// 修改商品类型
export function editGoodsCateApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/changegoodstype',
    method: 'get',
    params: data
  })
}

// 删除商品类型
export function deleGoodsCateApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/delgoodstype',
    method: 'get',
    params: data
  })
}

// 商品类型列表
export function cateListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getgoodstype',
    method: 'get',
    params: data
  })
}

// 添加商品
export function addGoodsApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: `server/admin/addgoods?jwt=${store.getters.jwt}`,
    method: 'post',
    data
  })
}

// 商品列表
export function goodsListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getallgoodslist',
    method: 'get',
    params: data
  })
}

// 修改商品
export function editGoodsApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: `server/admin/changegoods?jwt=${store.getters.jwt}`,
    method: 'post',
    data
  })
}

// 商品上下架
export function upGoodsApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/upgoods',
    method: 'get',
    params: data
  })
}

// 删除商品
export function deleGoodsApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/delgoods',
    method: 'get',
    params: data
  })
}

// 添加优惠券
export function addCouponApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/addwaimaiquan',
    method: 'get',
    params: data
  })
}

// 获取优惠券列表
export function getCouponListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getwaimaiquanbystore',
    method: 'get',
    params: data
  })
}

// 删除优惠券
export function deleCouponApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/delwaimaiquan',
    method: 'get',
    params: data
  })
}

// 修改优惠券
export function changeCouponApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/changewaimaiquan',
    method: 'get',
    params: data
  })
}

// 满减列表
export function manjianListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getmanjianlist',
    method: 'get',
    params: data
  })
}

// 添加满减
export function addManjianApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/addmanjian',
    method: 'get',
    params: data
  })
}


// 删除满减
export function deleManjianApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/delmanjian',
    method: 'get',
    params: data
  })
}

// 编辑满减
export function editManjianApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/changemanjian',
    method: 'get',
    params: data
  })
}

// 评论列表
export function commentListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/paotui/getpingjiabyuid',
    method: 'get',
    params: data
  })
}

// 获取外卖订单
export function orderListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getmygoodsorderbystore',
    method: 'get',
    params: data
  })
}

// 接外卖订单
export function jiedanApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/storereceiving',
    method: 'get',
    params: data
  })
}

// 获取店铺类型
export function storeTypeListApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/getshoptype',
    method: 'get',
    params: data
  })
}

// 修改上线状态
export function changeOnlineStatusApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/changeonline',
    method: 'get',
    params: data
  })
}

// 修改店铺信息
export function changeStoreApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/changemessage',
    method: 'get',
    params: data
  })
}

// 修改店铺装饰
export function shopDecorateApi(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/addshophouse',
    method: 'post',
    data
  })
}


// 取消订单
export function cancelorder(data) {
  data.jwt = store.getters.jwt
  return request({
    url: 'server/admin/cancelorderbystore',
    method: 'get',
    params: data
  })
}






