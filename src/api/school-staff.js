import request from '@/utils/request'

/**
 * 员工列表
 */
export function getStaffListApi(page) {
  return request({
    url: '/admin/s/schoolstaff',
    method: 'get',
    params: { page }
  })
}
/**
 * 创建员工
 */
export function createStaffApi(keyword) {
  return request({
    url: '/admin/s/schoolstaff/save',
    method: 'post',
    data: { keyword }
  })
}
/**
 * 删除员工
 */
export function deleteStaffByIdApi(staff_id) {
  return request({
    url: '/admin/s/schoolstaff/delete',
    method: 'post',
    data: { staff_id }
  })
}
/**
 * 给员工配置权限
 */
export function setStaffPermissionApi({ id, role_ids }) {
  return request({
    url: '/admin/s/schoolstaff/setroles',
    method: 'post',
    data: { id, role_ids }
  })
}
