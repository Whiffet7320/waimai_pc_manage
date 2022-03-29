import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'

//日志列表
export function getList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-log', { page: data.page, limit: data.limit }),
    method: 'get',
  })
}

//分类列表
export function getManageList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/category', { page: data.page, limit: data.limit }),
    method: 'get',
  })
}

//二级分类列表
export function getcategory(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/category2', { page: data.page, limit: data.limit, pid: data.pid }),
    method: 'get',
  })
}

//删除分类
export function deleteClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delcategory'),
    method: 'post',
    data
  })
}

//添加分类
export function addClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addcategory', { name: data.name, img: data.img, show: data.show, sort: data.sort, pid: data.pid, type: data.type }),
    method: 'get',
  })
}

//分类编辑
export function editClass(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/editcategory', { name: data.name, img: data.img, show: data.show, sort: data.sort, id: data.id, pid: data.pid }),
    method: 'get',
  })
}

//订单列表
export function orserList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/order-list', { page: data.page, limit: data.limit, uid: data.uid, type: data.type, store_order_id: data.store_order_id }),
    method: 'get',
  })
}

//运输方式
export function transportApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/express_list'),
    method: 'get',
  })
}

//发货
export function sendApi(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/send_out_goods', { order_id: data.order_id, express_id: data.express_id, track_num: data.track_num, track_type: data.track_type }),
    method: 'get',
  })
}


//查看申请详情
export function readDetailsApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/apply_after_detail', { order_goods_id: id }),
    method: 'get',
  })
}



//审核通过/拒绝
export function auditApi(id, code) {
  return getRequest({
    url: getRequestUrl('/server/admin/after_handle', { id: id, status: code }),
    method: 'get',
  })
}


//商品列表获取
export function getGoodsList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/goodslist', data),
    method: 'get',
  })
}

//添加商品
export function addGoodsApi(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addgoods'),
    method: 'post',
    data
  })
}


//查看分类
export function getCategoryIdApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/category'),
    method: 'get',
  })
}

//查看二级分类
export function getSubCategoryIdApi(pid) {
  return getRequest({
    url: getRequestUrl('/server/admin/category2', { pid: pid }),
    method: 'get',
  })
}


//满包邮列表
export function getFullListApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/full-list'),
    method: 'get',
  })
}


//满包邮列表
export function getHouseListApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/house-list'),
    method: 'get',
  })
}



//运费模版列表
export function getTemplateListApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/template-list'),
    method: 'get',
  })
}


//特卖列表
export function getSaleListApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/salelist'),
    method: 'get',
  })
}


// 获取商品规格
export function getAttrListApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-attr', { id: id }),
    method: 'get',
  })
}

// 获取详情图片

export function getGoodImgListApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-goods-img', { id: id }),
    method: 'get',
  })
}

//编辑商品详情
export function editGoodDetailtApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-goods-detail', { id: id }),
    method: 'get',
  })
}


// 修改商品
export function editGoodsApi(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/editgoods'),
    method: 'post',
    data
  })
}

// 删除商品
export function delGoodsApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/delgoods', { id: id }),
    method: 'get'
  })
}

// 关键词列表
// export function getKeywordsListApi() {
//   return getRequest({
//     url: getRequestUrl('/server/admin/keywords-list'),
//     method: 'get'
//   })
// }

// 商品上下架
export function goodsUpGoodsApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/up-goods', parms),
    method: 'get'
  })
}


// 快递列表
export function getExpressListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/express_list', parms),
    method: 'get'
  })
}

// 快递删除
export function delExpressApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/del_express', { id: id }),
    method: 'get'
  })
}

// 快递修改
export function editExpressApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_express', parms),
    method: 'get'
  })
}

// 快递新增
export function addExpressApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_express', parms),
    method: 'get'
  })
}

// 收货地址列表
export function getAddressListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/address_list', parms),
    method: 'get'
  })
}


// 关键字列表
export function getKeywordsListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/keywords-list', parms),
    method: 'get'
  })
}


// 关键字删除
export function delKeywordsApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/delkeywords', { id: id }),
    method: 'get'
  })
}

// 关键字修改
export function editKeywordsApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/editkeywords', parms),
    method: 'get'
  })
}

// 关键字新增
export function addKeywordsApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/addkeywords', parms),
    method: 'get'
  })
}




// 直播分类列表
export function getLiveTypeListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_type_list', parms),
    method: 'get'
  })
}

// 添加直播分类
export function addLiveTypeListApi(name, type, display, sort) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_live_type', { name: name, type: type, display: display, sort:sort }),
    method: 'get'
  })
}


// 修改直播分类
export function editLiveTypeListApi(name, id, type, display, sort) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_live_type', { name: name, id: id, type: type, display: display, sort:sort }),
    method: 'get'
  })
}

// 直播间列表
export function getLiveRoomListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_room_list', parms),
    method: 'get'
  })
}


// 修改直播间信息
export function editLiveRoomListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_live_room', parms),
    method: 'get'
  })
}


// 直播预告
export function liveNoticeApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_notice', parms),
    method: 'get'
  })
}

// 举报列表
export function getReportListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/report_list', parms),
    method: 'get'
  })
}

// 封禁直播间
export function closeRoomApi(id) {
  return getRequest({
    url: getRequestUrl('/server/admin/close_room', { id: id }),
    method: 'get'
  })
}

//  礼物列表
export function getGiftLogListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gift_log', parms),
    method: 'get'
  })
}

//  素材表
export function getMaterialListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/material_list', parms),
    method: 'get'
  })
}


//  开通直播权限表
export function getopenAnchorListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/open_anchor_list', parms),
    method: 'get'
  })
}
//团长列表
export function tuanzhangApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/tuanzhang_list', parms),
    method: 'get'
  })
}

//团长审核
export function checktuanzhangApi(id, status) {
  return getRequest({
    url: getRequestUrl('/server/admin/tuanzhang_check', {id:id, status:status}),
    method: 'get'
  })
}

//代理列表
export function dailiApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/daili_list', parms),
    method: 'get'
  })
}

//代理审核
export function checkdailiApi(id, status) {
  return getRequest({
    url: getRequestUrl('/server/admin/daili-check', {id:id, status:status}),
    method: 'get'
  })
}

//代理佣金记录
export function dailiProfitList(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/daili-profit', parms),
    method: 'get'
  })
}

//  订单消息列表
export function getorderNoticeListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/order_notice_list', parms),
    method: 'get'
  })
}


//  用户特币详情
export function getuserCoinListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/user_coin_list', parms),
    method: 'get'
  })
}

//  活动报名详情
export function getActiveRegisterList(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/active_register_list', parms),
    method: 'get'
  })
}

//  用户优惠券详情
export function getuserCouponListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/user_coupon_list', parms),
    method: 'get'
  })
}

//  商品上架购物袋
export function getGoodsUpListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/goods_up', parms),
    method: 'get'
  })
}

// 支付记录表

export function getpayLogListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/pay_log_list', parms),
    method: 'get'
  })
}

//  工匠订单详情
export function getGongJiangOrderListApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_order', parms),
    method: 'get'
  })
}

//工匠职能列表
export function gongjiangfunctionlist(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_function_list', parms),
    method: 'get'
  })
}

//  添加工匠职能
export function addgongjiangfunction(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_gongjiang_function', parms),
    method: 'get'
  })
}


//  修改工匠职能
export function savegongjiangfunction(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_gongjiang_function', parms),
    method: 'get'
  })
}


//  工匠分类
export function getGongJiangTypeApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_type', parms),
    method: 'get'
  })
}


//  添加工匠分类
export function addGongJiangTypeApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_gongjiang_type', parms),
    method: 'get'
  })
}


//  修改工匠分类
export function saveGongJiangTypeApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_gongjiang_type', parms),
    method: 'get'
  })
}


//  工匠申请列表
export function gongJiangApplyApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_apply', parms),
    method: 'get'
  })
}


//  工匠申请列表
export function gongjiangStatusApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_status', parms),
    method: 'get'
  })
}


//  工匠退款审核
export function getGongJiangTuikuanApplyApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_tuikuan', parms),
    method: 'get'
  })
}




//  工匠退款列表
export function gongJiangTuikuanApplyApi(parms) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_tuikuan_shenhe', parms),
    method: 'get'
  })
}

//  商铺列表
export function getStoreListApi() {
  return getRequest({
    url: getRequestUrl('/server/admin/storeList'),
    method: 'get'
  })
}


//工匠品牌申请列表
export function getBrandList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_pinpai_apply', { page: data.page, limit: data.limit, status: data.status === '' ? 0 : data.status }),
    method: 'get',
  })
}


//工匠品牌审核
export function brandStatus(params) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_pinpai_status', params),
    method: 'get',
  })
}

//小区申领列表
export function xiaoquApply(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_xiaoqu_apply', { page: data.page, limit: data.limit, status: data.status === '' ? 0 : data.status }),
    method: 'get',
  })
}

//审核
export function xiaoquStatus(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gongjiang_xiaoqu_status', { id: data.id, status: data.status }),
    method: 'get',
  })
}


//短视频列表
export function getliveVideoList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_video_list', { page: data.page, limit: data.limit }),
    method: 'get',
  })
}


//照片列表
export function getlivePhotoList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_photo_list', { page: data.page, limit: data.limit }),
    method: 'get',
  })
}




//短视频删除
export function delliveVideo(params) {
  return getRequest({
    url: getRequestUrl('/server/admin/live_video_del', { id: params }),
    method: 'get',
  })
}
//设置置顶
export function zhidingApi(params) {
  return getRequest({
    url: getRequestUrl('/server/admin/zhiding', { id: params }),
    method: 'get',
  })
}
