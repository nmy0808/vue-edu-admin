import request from '@/utils/request'

/**
 * 订单列表
 * status订单类型：pendding待支付，success成功,fail失败
 */
export function getOrderListApi({ page, status, no }) {
  return request({
    url: '/admin/s/order',
    method: 'get',
    params: { page, status, no }
  })
}
/**
 * 订单列表
 * status订单类型：pendding待支付，success成功,fail失败
 */
export function deleteOrderByIdsApi(ids) {
  return request({
    url: '/admin/s/order/delete',
    method: 'post',
    data: { ids }
  })
}
