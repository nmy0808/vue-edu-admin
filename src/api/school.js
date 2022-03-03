import request from '@/utils/request'

/**
 * 网校列表
 */
export function getSchoolListApi({ page }) {
  return request({
    url: '/admin/school',
    method: 'get',
    params: { page }
  })
}

/**
 * 查看当前网校信息
 */
export function getSchoolInfoApi(id) {
  return request({
    url: '/admin/s/school/read',
    method: 'get',
    params: { id }
  })
}

/**
 * 创建网校
 */
export function createSchoolApi(name) {
  return request({
    url: '/admin/school/save',
    method: 'post',
    data: { name }
  })
}

/**
 * 更新网校信息
 */
export function updateSchoolApi({ id, name }) {
  return request({
    url: '/admin/s/school/update',
    method: 'post',
    data: { id, name }
  })
}
