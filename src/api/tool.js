import request from '@/utils/request'

/**
 * 题目列表
 */
export function getQuestionListApi({ page, type, title }) {
  return request({
    url: '/admin/s/question',
    method: 'get',
    params: { page, type, title }
  })
}
/**
 * 新建题目
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function addQuestionApi(options) {
  const data = {}
  data.title = options.title
  data.remark = options.remark
  data.type = options.type
  data.value = options.value
  return request({
    url: '/admin/s/question/save',
    method: 'post',
    data
  })
}
/**
 * 更新题目
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function updateQuestionApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.remark = options.remark
  data.type = options.type
  data.value = options.value
  return request({
    url: '/admin/s/question/update',
    method: 'post',
    data
  })
}
/**
 * 删除题目
 * @param {Array} ids
 */
export function deleteQuestionByIdsApi(ids) {
  return request({
    url: '/admin/s/question/delete',
    method: 'post',
    data: { ids }
  })
}
