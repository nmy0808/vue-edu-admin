import request from '@/utils/request'

/**
 * 课程列表
 */
export function getCourseListApi({ page, type, status, title, limit }) {
  return request({
    url: '/admin/s/course',
    method: 'get',
    params: { page, type, status, title, limit }
  })
}
/**
 * 课程列表
 */
export function deleteCourseByIdApi(ids) {
  return request({
    url: '/admin/s/course/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 上架/下架课程
 */
export function updateCourseStatusApi({ id, status }) {
  return request({
    url: '/admin/s/course/updatestatus',
    method: 'post',
    data: { id, status }
  })
}

/**
 * 更新课程
 */
export function updateCourseApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.cover = options.cover
  data.try = options.try
  data.content = options.content
  data.price = options.price
  data.t_price = options.t_price
  data.type = options.type
  data.status = options.status
  return request({
    url: '/admin/s/course/update',
    method: 'post',
    data
  })
}
/**
 * 新建课程
 */
export function addCourseApi(options) {
  const data = {}
  data.title = options.title
  data.cover = options.cover
  data.try = options.try
  data.content = options.content
  data.price = options.price
  data.t_price = options.t_price
  data.type = options.type
  data.status = options.status
  return request({
    url: '/admin/s/course/update',
    method: 'post',
    data
  })
}
