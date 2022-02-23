import request from '@/utils/request'

/**
 * 收款账户列表
 * 状态：0禁用 1启用
 */
export function getBankAccountListApi({ page, limit = 10, status }) {
  return request({
    url: '/admin/s/cash',
    method: 'get',
    params: { page, status, limit }
  })
}
/**
 * 新增收款账户
 */
export function addBankAccountApi({
  account,
  province,
  city,
  area,
  path,
  bank,
  name,
  status
}) {
  const data = {
    // 银行账号
    account,
    // 省
    province,
    // 市
    city,
    // 区
    area,
    // 详细支行
    path,
    // 所属银行
    bank,
    // 名称
    name,
    // 0禁用 1启用
    status
  }
  return request({
    url: '/admin/s/cash/save',
    method: 'post',
    data
  })
}
/**
 * 更新收款账户
 */
export function updateBankAccountApi({
  id,
  account,
  province,
  city,
  area,
  path,
  bank,
  name,
  status
}) {
  const data = {
    id,
    // 银行账号
    account,
    // 省
    province,
    // 市
    city,
    // 区
    area,
    // 详细支行
    path,
    // 所属银行
    bank,
    // 名称
    name,
    // 0禁用 1启用
    status
  }
  return request({
    url: '/admin/s/cash/update',
    method: 'post',
    data
  })
}
/**
 * 删除收款账户
 */
export function deleteBankAccountByIdsApi(ids) {
  return request({
    url: '/admin/s/cash/delete',
    method: 'post',
    data: { ids }
  })
}
