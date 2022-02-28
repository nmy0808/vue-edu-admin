import request from '@/utils/request'
// 题目 ----------------------------------------------------------------
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
// 试卷 ----------------------------------------------------------------
/**
 * 试卷列表
 */
export function getTestpaperListApi({ page, title }) {
  return request({
    url: '/admin/s/testpaper',
    method: 'get',
    params: { page, title }
  })
}
/**
 * 新建试卷
 * title: 试卷名称
 * total_score: 总分
 * pass_score: 及格分
 * expire: 考试时间
 * status: 状态  0禁用,1启用
 * questions: Object 题目列表
   {
    questions_question_id:题目id
    questions_score:题目分数
   }
 *
 */
export function addTestpaperApi(options) {
  const data = {}
  data.title = options.title
  data.total_score = options.total_score
  data.pass_score = options.pass_score
  data.expire = options.expire
  data.status = options.status
  data.questions = options.questions
  // data.questions_question_id = options.questions_question_id
  // data.questions_score = options.questions_score
  return request({
    url: '/admin/s/testpaper/save',
    method: 'post',
    data
  })
}
/**
 * 更新试卷
 * type 题目类型:  radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
 * value:
 * value.options ["",""] 选项
 * value.value   number  答案
 */
export function updateTestpaperApi(options) {
  const data = {}
  data.id = options.id
  data.title = options.title
  data.total_score = options.total_score
  data.pass_score = options.pass_score
  data.expire = options.expire
  data.status = options.status
  data.questions = options.questions
  // data.questions_question_id = options.questions_question_id
  // data.questions_score = options.questions_score
  return request({
    url: '/admin/s/testpaper/update',
    method: 'post',
    data
  })
}
/**
 * 删除试卷
 * @param {Array} ids
 */
export function deleteTestpaperByIdsApi(ids) {
  return request({
    url: '/admin/s/testpaper/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 查看试卷详情
 */
export function getTestpaperByIdsApi(id) {
  return request({
    url: '/admin/s/testpaper/read',
    method: 'get',
    params: { id }
  })
}
// 考试列表
// 删除考试
// 查看考试详情
// 考试阅卷
