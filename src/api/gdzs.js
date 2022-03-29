import request from '@/utils/request'
import { getRequestUrl, getRequest } from '@/utils/http'
//提现列表
export function getCash(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-cash', {page: data.page, limit:data.limit}),
    method: 'get',
  })
}
//提现审核
export function getAgreeCash(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/agree-cash'),
    method: 'post',
    data: {id: data.id, status:data.status}
  })
}
//查询关于我们协议
export function getUserAbout(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/user-about'),
    method: 'get'
  })
}
//修改关于我们协议
export function getSaveAbout(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save-about'),
    method: 'post',
    data: {
      about: data.about,
      agree: data.agree,
      liverule: data.liverule,
      logoff: data.logoff,
      gjrule:data.gjrule,
      ysrule:data.ysrule,
      quanyi:data.quanyi,
      hehuoren:data.hehuoren,
      pingtai:data.pingtai,
      tuanzhang:data.tuanzhang,
    }
  })
}
//商品列表
export function getGoodslist(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/goodslist'),
    method: 'get'
  })
}
//优惠券列表
export function getCouponList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/coupon-list',{type: data.type, page: data.page, limit:data.limit}),
    method: 'get'
  })
}
// 创建优惠劵
export function getCreateCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/create-coupon'),
    method: 'post',
    data: {
      type: data.type,
      name: data.name,
      price: data.price,
      mini: data.mini,
      num: data.num,
      limit: data.limit,
      start_time: data.start_time,
      end_time: data.end_time,
      goods_ids: data.goods_ids
    }
  })
}
// 增加优惠劵数量
export function getAddCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add-coupon',{id: data.id, num: data.num }),
    method: 'get'
  })
}

// 查询用户列表
export function getUserList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/user-list'),
    method: 'get'
  })
}

// 发送优惠券
export function getSendCoupon(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/send-coupon'),
    method: 'post',
    data: {
      id: data.id,
      user_id: data.user_id
    }
  })
}
// 发送优惠券列表
export function getSendCouponList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/coupon_send_type',{page: data.page, limit:data.limit}),
    method: 'get'
  })
}
// 发送优惠券列表
export function getSendUpdate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_coupon_send_type',{id: data.id, name: data.name, limit:data.limit, desc: data.desc}),
    method: 'get'
  })
}

// 添加轮播
export function getAddBanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addbanner',{type: data.type, sort:data.sort, img:data.img}),
    method: 'get'
  })
}
// 轮播列表
export function getBannerList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/banner',{page: data.page, limit:data.limit}),
    method: 'get'
  })
}

// 修改轮播
export function getEditBanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/editbanner',{type: data.type, sort:data.sort, img:data.img, id: data.id}),
    method: 'get'
  })
}

// 添加轮播
export function getDelBanner(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delbanner',{id: data.id}),
    method: 'get'
  })
}

// 特币模版列表
export function getCoinTemplateList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/coin_template',{
      page: data.page, limit:data.limit,type: data.type
    }),
    method: 'get'
  })
}
// 发送特币
export function getSendCoinTemplate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/send_coin_template'),
    method: 'post',
    data: {
      id: data.id,
      user_id: data.user_id
    }
  })
}
// 添加特币模版
export function getAddCoinTemplate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_coin_template',{
      mode:data.mode,
      type:data.type,
      name:data.name,
      price:data.price,
      mini:data.mini,
      num:data.num,
      start_time:data.start_time,
      end_time:data.end_time,
      goods_ids:data.goods_ids,
      limit:data.limit
    }),
    method: 'get'
  })
}


// 查询特币规则
export function getCoinRuleLists(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/coupon_coin_rule'),
    method: 'get'
  })
}

// 修改特币规则
export function getUpdateCoinRule(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_coupon_coin_rule',{
      coupon: data.coupon, coin:data.coin
    }),
    method: 'get'
  })
}

// 添加特币数量
export function getCoinRuldeAddNum(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_coin_num',{
      id: data.id, num:data.num
    }),
    method: 'get'
  })
}

// 资金明细列表
export function getBalanceLogList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/balance_log',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 充值规格列表
export function getCoinRuleList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/coin_rule',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}
// 添加充值规格
export function getAddCoinRule(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_coin_rule',{
      rmb: data.rmb, status:data.status, coin:data.coin
    }),
    method: 'get'
  })
}
// 修改充值规格
export function getUpdateCoinRuleFormat(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_coin_rule',{
      rmb: data.rmb, status:data.status, coin:data.coin,id: data.id
    }),
    method: 'get'
  })
}
// 删除充值规格
export function getDelCoinRuleFormat(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del_coin_rule',{
      id: data.id
    }),
    method: 'get'
  })
}

// 店铺分类列表
export function getShopClassifyList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/store-type',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}
// 添加店铺分类
export function getAddShopClassify(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add-store-type'),
    method: 'post',
    data: {
      name: data.name, sort:data.sort
    }
  })
}
// 修改店铺分类
export function getUpdateShopClassify(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-store-type'),
    method: 'post',
    data: {
      name: data.name, sort:data.sort,id: data.id
    }
  })
}
// 删除店铺分类
export function getDelShopClassify(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del-store-type',{
      id: data.id
    }),
    method: 'get'
  })
}


// 供货商申请列表
export function getSupplierList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/agree-list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 供货商审核
export function getSupplierAgree(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/store-agree',{
      status: data.status, id:data.id
    }),
    method: 'get'
  })
}

// 供货商协议
export function getSupAgree(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/sup_agree'),
    method: 'get'
  })
}
// 供货商协议
export function getUpdateSupAgree(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_sup_agree'),
    method: 'post',
    data: {
      apply: data.apply,
      live: data.live,
      service: data.service,
      strategy: data.strategy
    }
  })
}

// 满包邮列表
export function getFullList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/full-list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 添加满包邮
export function getAddFull(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/create-full'),
    method: 'post',
    data: {
      name: data.name,
      type: data.type,
      child: data.child
    }
  })
}

// 修改满包邮
export function getUpdateFull(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-full'),
    method: 'post',
    data: {
      name: data.name,
      type: data.type,
      child: data.child,
      id: data.id,
    }
  })
}

// 删除满包邮
export function getDelFullList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del-full',{
      id: data.id
    }),
    method: 'get'
  })
}

// 满包邮详情
export function getDelFullDetail(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/full-detail',{
      id: data.id
    }),
    method: 'get'
  })
}


// 运费模板列表
export function getTemplateList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/template-list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}
// 运费模板详情
export function getTemplateDetail(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/template-detail',{
      id: data.id
    }),
    method: 'get'
  })
}

// 删除运费模板
export function getDelTemplate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del-template',{
      id: data.id
    }),
    method: 'get'
  })
}
// 添加运费模板
export function getAddTemplate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/create-template'),
    method: 'post',
    data: {
      name: data.name,
      province: data.province,
      child: data.child
    }
  })
}

// 修改运费模板
export function getUpdateTemplate(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-template'),
    method: 'post',
    data: {
      id: data.id,
      name: data.name,
      province: data.province,
      child: data.child
    }
  })
}

// 查配置管理
export function getDeploy(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/get-config'),
    method: 'get'
  })
}
// 保存配置管理
export function getAddDeploy(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save-config',{
      data: data
    }),
    method: 'get',
  })
}

// 金币充值记录
export function getrechargeRecord(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/recharge_coin_log',{
      page: data.page, limit:data.limit
    }),
    method: 'get',
  })
}

// 实名认证表
export function getealName(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/real_name_list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 实名认修改状态
export function getealNameStatus(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/real_name_status',{
      id: data.id, status:data.status
    }),
    method: 'get'
  })
}

// 礼物记录列表
export function getGiftlogList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gift_log',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}
// 商城礼物列表
export function getGiftList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/gift_list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 添加礼物
export function getAddGift(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/add_gift',{
      img: data.img, name:data.name,coin:data.coin,sort:data.sort,status:data.status,svga:data.svga
    }),
    method: 'get'
  })
}

// 修改礼物
export function getUpdGift(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/save_gift',{
      img: data.img, name:data.name,coin:data.coin,sort:data.sort,status:data.status,id: data.id,svga:data.svga
    }),
    method: 'get'
  })
}

// 删除礼物
export function getDelGift(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del_gift',{
      id: data.id
    }),
    method: 'get'
  })
}

// 售后申请列表
export function getApplyAfterList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/apply_after_list',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 添加特卖
export function getAddsale(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/addsale',data),
    method: 'get'
  })
}

// 修改特卖
export function getEditsale(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/editsale',data),
    method: 'get'
  })
}

// 删除特卖
export function getDelsale(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/delsale',data),
    method: 'get'
  })
}
// 特卖列表
export function getSaleList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/salelist',{
      page: data.page, limit:data.limit
    }),
    method: 'get'
  })
}

// 添加发货仓
export function getCreateHouse(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/create-house'),
    method: 'post',
    data:data
  })
}

// 修改发货仓
export function getEditHouse(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/edit-house'),
    method: 'post',
    data:data
  })
}

// 删除发货仓
export function getDelHouse(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/del-house',data),
    method: 'get'
  })
}

// 发货仓详情
export function getHouseDetail(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/house-detail',data),
    method: 'get'
  })
}

// 发货仓列表
export function getHouseList(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/house-list',data),
    method: 'get'
  })
}
//代理列表
export function getAgencyList(data) {
  console.log(data);
  return getRequest({
    url: getRequestUrl('/server/admin/agency_list',{page: data.page, limit:data.limit, keywords:data.keywords}),
    method: 'get'
  })
}
// 修改代理
export function getEditAgency(data) {
  return getRequest({
    url: getRequestUrl('/server/admin/agency_edit',{fee: data.fee,id: data.id,num: data.num}),
    method: 'get'
  })
}
//活动列表
export function getActiveList(data) {
  console.log(data);
  return getRequest({
    url: getRequestUrl('/server/admin/active_list',
    {page: data.page,
    limit:data.limit,
    start_time:data.value1,
    end_time:data.value2,
    keywords:data.keywords,
    status:data.status,
    style:data.style,
    type:data.type,
    matter:data.matter}),
    method: 'get'
  })
}
//添加活动
export function getAddActive(data) {
  console.log(data);
  return getRequest({
    url: getRequestUrl('/server/admin/active_add',{title: data.title, img:data.img, desc:data.desc, style:data.style, matter:data.matter, starttime:data.starttime, endtime:data.endtime}),
    method: 'get'
  })
}
//编辑活动
export function getEditActive(data) {
  console.log(data);
  return getRequest({
    url: getRequestUrl('/server/admin/active_edit',{title: data.title, img:data.img, desc:data.desc, style:data.style, matter:data.matter, starttime:data.starttime, endtime:data.endtime, id: data.id}),
    method: 'get'
  })
}
//删除活动
export function getDelActive(data) {
  console.log(data);
  return getRequest({
    url: getRequestUrl('/server/admin/active_del',{id: data.id}),
    method: 'get'
  })
}
