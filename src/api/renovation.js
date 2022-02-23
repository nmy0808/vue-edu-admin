import request from '@/utils/request'

/**
 * 获取装修页面列表
 */
export function getRenovationListApi({ page, ismobile }) {
  return request({
    url: '/admin/s/renovation',
    method: 'get',
    params: { page, ismobile }
  })
}
/**
 * 新增页面
 */
export function addRenovationApi({ title, ismobile }) {
  const data = {
    title,
    ismobile
  }
  return request({
    url: '/admin/s/renovation/save',
    method: 'post',
    data
  })
}
/**
 * 更新页面
 */
export function updateRenovationApi({ id, title, ismobile, type, isdefault }) {
  const data = {
    id,
    title,
    ismobile,
    type,
    isdefault
  }
  return request({
    url: '/admin/s/renovation/update',
    method: 'post',
    data
  })
}
/**
 * 删除页面
 */
export function deleteRenovationByIdsApi(ids) {
  const data = {
    ids
  }
  return request({
    url: '/admin/s/renovation/delete',
    method: 'post',
    data
  })
}
/**
 * 查看模板详情
 */
export function getRenovationDetailApi(id) {
  const params = {
    id
  }
  return request({
    url: '/admin/s/renovation/read',
    method: 'get',
    params
  })
}
