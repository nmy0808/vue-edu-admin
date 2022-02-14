import request from '@/utils/request'

/**
 * 专栏列表
 */
export function getColumnListApi({ page, status, title, limit }) {
  return request({
    url: '/admin/s/column',
    method: 'get',
    params: { page, status, title, limit }
  })
}
/**
 * 删除专栏
 */
export function deleteColumnByIdApi(ids) {
  return request({
    url: '/admin/s/column/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 上架/下架专栏
 */
export function updateColumnStatusApi({ id, status }) {
  return request({
    url: '/admin/s/column/updatestatus',
    method: 'post',
    data: { id, status }
  })
}

/**
 * 更新专栏
 */
export function updateColumnApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.cover = options.cover
  data.try = options.try
  data.content = options.content
  data.price = options.price
  data.t_price = options.t_price
  data.isend = options.isend
  data.status = options.status
  return request({
    url: '/admin/s/column/update',
    method: 'post',
    data
  })
}
/**
 * 新建专栏
 */
export function addColumnApi(options) {
  const data = {}
  data.title = options.title
  data.cover = options.cover
  data.try = options.try
  data.content = options.content
  data.price = options.price
  data.t_price = options.t_price
  data.status = options.status
  data.isend = options.isend
  return request({
    url: '/admin/s/column/save',
    method: 'post',
    data
  })
}
/**
 * 修改专栏更新状态
 */
export function updateColumnISendStatusApi(options) {
  const data = {}
  data.id = options.id
  data.isend = options.isend
  return request({
    url: '/admin/s/column/updateend',
    method: 'post',
    data
  })
}
/**
 * 查看专栏详细信息
 */
export function getColumnDetailApi(id) {
  const params = {}
  params.id = id
  return request({
    url: '/admin/s/column/read',
    method: 'get',
    params
  })
}
/**
 * 新增专栏目录
 */
export function addColumnCourseApi({ column_id, course_id }) {
  const data = {}
  data.column_id = column_id
  data.course_id = course_id
  return request({
    url: '/admin/s/column_course/save',
    method: 'post',
    data
  })
}
/**
 * 专栏目录排序
 */
export function sortColumnCourseApi({ ids, column_id }) {
  const data = {}
  data.ids = ids
  data.column_id = column_id
  return request({
    url: '/admin/s/column_course/sort',
    method: 'post',
    data
  })
}
/**
 * 删除专栏目录
 */
export function deleteColumnCourseApi({ ids, column_id }) {
  const data = {}
  data.ids = ids
  data.column_id = column_id
  return request({
    url: '/admin/s/column_course/delete',
    method: 'post',
    data
  })
}
/**
 * 专栏目录列表
 */
export function getColumnCourseListApi({ column_id, page }) {
  const params = {}
  params.schoolid = column_id
  params.page = page
  return request({
    url: '/admin/s/column_course',
    method: 'get',
    params
  })
}
