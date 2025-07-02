import request from '@/utils/request'

// 验证码
export const verifyApi = (params: any) => {
  return request({
    url: '/adminapi/verify',
    method: 'get',
    params
  })
}

// 登录
export const loginApi = (data: any) => {
  return request({
    url: '/adminapi/login',
    method: 'post',
    data
  })
}

// 首页统计
export const homeApi = (params: any) => {
  return request({
    url: '/adminapi/home',
    method: 'get',
    params
  })
}

// 商品列表
export const goodsApi = (params: any) => {
  return request({
    url: '/adminapi/goods',
    method: 'get',
    params
  })
}

// 商品上架、下架
export const actionApi = (data: any) => {
  return request({
    url: '/adminapi/goods/action',
    method: 'post',
    data
  })
}

// 商品保存
export const goodsSaveApi = (data: any) => {
  return request({
    url: '/adminapi/goods/save',
    method: 'post',
    data
  })
}

// 商品删除
export const goodsDeleteApi = (params: any) => {
  return request({
    url: '/adminapi/goods/delete',
    method: 'get',
    params
  })
}

// 所属平台列表
export const platformApi = (params: any) => {
  return request({
    url: '/adminapi/platform',
    method: 'get',
    params
  })
}

// 所属平台保存
export const platformSaveApi = (data: any) => {
  return request({
    url: '/adminapi/platform/save',
    method: 'post',
    data
  })
}

// 订单列表
export const orderApi = (params: any) => {
  return request({
    url: '/adminapi/order',
    method: 'get',
    params
  })
}

// 订单详情
export const orderInfoApi = (params: any) => {
  return request({
    url: '/adminapi/order/info',
    method: 'get',
    params
  })
}

// 外部商品
export const otherGoodsApi = (params: any) => {
  return request({
    url: '/adminapi/other/goods',
    method: 'get',
    params
  })
}

// 添加商品
export const otherAddApi = (params: any) => {
  return request({
    url: '/adminapi/other/add',
    method: 'get',
    params
  })
}