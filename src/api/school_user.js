import request from '@/utils/request'

/**
 * 网校用户列表
 */
export function getSchoolUserListApi({ page, keyword = '' }) {
  return request({
    url: '/admin/s/school_user',
    method: 'get',
    params: { page, keyword }
  })
}
/**
 * 查询网校用户详细信息
 * 参数: 网校id
 */
export function getSchoolUserInfoApi(id) {
  return request({
    url: '/admin/s/school_user/read',
    method: 'get',
    params: { id }
  })
}
/**
 * 查看网校用户订阅列表
 * type:类型：course课程，column专栏
 * comment:课程评价：0否，1是
 */
export function getSchoolUserSubApi({
  page,
  user_id,
  type = 'column',
  comment = 0
}) {
  return request({
    url: '/admin/s/order_item',
    method: 'get',
    params: { page, user_id, type, comment }
  })
}
/**
 * 查看网校用户订单列表
 */
export function getSchoolUserOrderListByIdApi({ page, user_id }) {
  return request({
    url: '/admin/s/order',
    method: 'get',
    params: { page, user_id }
  })
}
/**
 * 查看网校用户观看历史
 */
export function getSchoolUserHistoryApi({ page, user_id }) {
  return request({
    url: '/admin/s/user_history',
    method: 'get',
    params: { page, user_id }
  })
}
/**
 * 禁止/开启访问
 * no_access:是否禁止访问：0否，1是
 */
export function setSchoolUserAccessApi({ id, no_access }) {
  return request({
    url: '/admin/s/school_user/updateaccess',
    method: 'post',
    data: { id, no_access }
  })
}
/**
 * 禁止/开启评论
 * no_comment:是否禁止访问：0否，1是
 */
export function setSchoolUserCommentApi({ id, no_comment }) {
  return request({
    url: '/admin/s/school_user/updatecomment',
    method: 'post',
    data: { id, no_comment }
  })
}
