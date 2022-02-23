import request from '@/utils/request'

/**
 * 获取申请提现列表
 */
export function getCashListApi({ page }) {
  return request({
    url: '/admin/s/cashconfirm',
    method: 'get',
    params: { page }
  })
}
/**
 * 申请提现
 */
export function getCashApi({ cash_id, price }) {
  const data = {
    cash_id,
    price
  }
  return request({
    url: '/admin/s/cashconfirm/save',
    method: 'post',
    data
  })
}

